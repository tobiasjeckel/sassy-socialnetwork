const express = require("express");
const app = express();
const compression = require("compression");
const bc = require("./utils/bc");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const cookieSessionMiddleware = cookieSession({
    secret:
        process.env.NODE_ENV == "production"
            ? process.env.SESS_SECRET
            : require("./secrets").sessionSecret,
    maxAge: 1000 * 60 * 60 * 24 * 14
});

const server = require("http").Server(app);
const secrets = require("./secrets");
const io = require("socket.io")(server, {
    origins: `localhost:8080 ${secrets.MY_IP}`
}); //space separated list which allows socket.io connections -change this when deploying to Heroku

//file upload
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const config = require("./config");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

//momentjs to make dates and times look pretty
const moment = require("moment");

//middleware
app.use(compression());
app.use(express.json());

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// app.use(
//     express.urlencoded({
//         extended: false
//     })
// );
app.use(express.static("./public")); //for css

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.post("/registration", (req, res) => {
    bc.hash(req.body.password)
        .then(hash => {
            db.addUser(req.body.first, req.body.last, req.body.email, hash)
                .then(data => {
                    req.session.id = data.rows[0].id;
                    req.session.first = data.rows[0].first;
                    console.log("session id is: ", req.session.id);
                    db.addTom(data.rows[0].id)
                        .then(() => {
                            console.log("Tom was added as friend");
                            res.json({
                                message: "Registration successful"
                            });
                        })
                        .catch(err =>
                            console.log("error when adding Tom", err)
                        );
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        message: "error"
                    });
                });
        })
        .catch(err => {
            res.json({
                message: "Something went wrong. Please try again."
            });
            console.log(err);
        });
});

app.post("/login", (req, res) => {
    db.getHash(req.body.email)
        .then(data => {
            bc.compare(req.body.password, data.rows[0].password)
                .then(match => {
                    if (match) {
                        req.session.id = data.rows[0].id;
                        req.session.first = data.rows[0].first;
                        res.json({
                            message: "Login successful"
                        });
                    } else {
                        res.json({
                            message: "error"
                        });
                    }
                })
                .catch(err => {
                    console.log("error when comparing password: ", err);
                    res.json({
                        message: "error"
                    });
                });
        })
        .catch(err => {
            console.log("error when comparing the hash", err);
            res.json({
                message: "error"
            });
        });
});

app.post("/uploadAvatar", uploader.single("file"), s3.upload, (req, res) => {
    const { filename } = req.file;
    const url = config.s3Url + filename;
    // const { title, username, description } = req.body;

    db.uploadAvatar(req.session.id, url)
        .then(data => {
            res.json(data.rows[0]);
            // console.log("log of data from index.js", data.rows);
        })
        .catch(err => {
            console.log("error when adding image to database: ", err);
        });
});

app.post("/editBio", (req, res) => {
    db.editBio(req.session.id, req.body.bio)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("error when updating bio: ", err);
        });
});

app.get("/logout", function(req, res) {
    req.session = null;
    res.redirect("/welcome");
});
app.get("/welcome", (req, res) => {
    // res.render();
    res.sendFile(__dirname + "/index.html");
});

app.get("/api/user/:id", (req, res) => {
    let id = req.params.id;
    let myId = req.session.id;
    db.getUser(id)
        .then(data => {
            // console.log(data.rows[0]);
            res.json({
                first: data.rows[0].first,
                last: data.rows[0].last,
                avatarurl: data.rows[0].avatarurl,
                bio: data.rows[0].bio,
                id: data.rows[0].id,
                myId: myId
            });
        })
        .catch(err => {
            console.log("error when getting user data: ", err);
            res.json({ message: "error" });
        });
});

app.get("/api/myuser", (req, res) => {
    db.getUser(req.session.id)
        .then(data => {
            // console.log(data.rows[0]);
            res.json({
                first: data.rows[0].first,
                last: data.rows[0].last,
                avatarurl: data.rows[0].avatarurl,
                bio: data.rows[0].bio
            });
        })
        .catch(err => {
            console.log("error when getting user data: ", err);
        });
});

app.get("/api/users/", (req, res) => {
    let input = req.query.q;
    db.getUsers(input)
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log("error when getting list of users: ", err);
        });
});

app.get("/api/newusers", (req, res) => {
    db.getNewUsers()
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log("error when getting list of NEW users: ", err);
        });
});

app.get("/api/friendstatus/:id", (req, res) => {
    let viewerId = req.session.id;
    let ownerId = req.params.id;

    db.getFriendStatus(viewerId, ownerId)
        .then(data => {
            res.json({ ...data.rows[0], myId: viewerId });
        })
        .catch(err => {
            console.log("error when getting friend statuses: ", err);
        });
});

app.post("/api/sendfriendrequest/:id", (req, res) => {
    let viewerId = req.session.id;
    let ownerId = req.params.id;

    db.sendFriendRequest(viewerId, ownerId)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("error when adding friend", err);
        });
});

app.post("/api/cancelfriendrequest/:id", (req, res) => {
    let viewerId = req.session.id;
    let ownerId = req.params.id;

    db.cancelFriendRequest(viewerId, ownerId)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("error when adding friend", err);
        });
});

app.post("/api/acceptfriendrequest/:id", (req, res) => {
    let viewerId = req.session.id;
    let ownerId = req.params.id;

    db.acceptFriendRequest(viewerId, ownerId)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("error when accepting friend", err);
        });
});

app.post("/api/unfriend/:id", (req, res) => {
    let viewerId = req.session.id;
    let ownerId = req.params.id;

    db.cancelFriendRequest(viewerId, ownerId)
        .then(data => {
            res.json(data.rows[0]);
        })
        .catch(err => {
            console.log("error when unfriending: ", err);
        });
});

app.get("/api/friendswannabes", (req, res) => {
    let viewerId = req.session.id;

    db.getFriendsWannabes(viewerId)
        .then(data => {
            res.json(data.rows);
        })
        .catch(err => {
            console.log("error when getting friends and wannabes: ", err);
        });
});

app.get("*", (req, res) => {
    if (req.session.id) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

//changed from app.listen to server.listen
server.listen(8080, () => {
    console.log("I'm listeningggg.");
});

//server side socket code

const onlineUsers = {};

io.on("connection", function(socket) {
    // console.log(`socket with id ${socket.id} is now connected`);

    onlineUsers[socket.id] = socket.request.session.id;
    // Object.values(onlineUsers);
    console.log("online userss: ", onlineUsers);

    socket.on("disconnect", () => {
        delete onlineUsers[socket.id];
    });

    socket.on("new-friend-request-from-client", otherUserId => {
        console.log(
            `new friend request from client ${
                onlineUsers[socket.id]
            } for user ${otherUserId}`
        );
        const otherSocketId = Object.keys(onlineUsers).find(
            key => onlineUsers[key] == otherUserId
        ); //find socket id for user
        // console.log(Object.keys(onlineUsers));
        // console.log(otherSocketId);
        // console.log(otherUserId);
        io.to(otherSocketId).emit(
            "new-friend-request-from-server",
            onlineUsers[socket.id]
        );
    });

    if (!socket.request.session.id) {
        return socket.disconnect(true);
    }

    let id = socket.request.session.id; //get correct user id

    db.getLastTenMessages()
        .then(data => {
            data.rows.map(
                item => (item.created_at = moment(item.created_at).fromNow())
            );

            io.sockets.emit("last-ten-messages", data.rows.reverse());
        })
        .catch(err => {
            console.log("error when getting last ten messages: ", err);
        });

    socket.on("new-message", msg => {
        let addMessage = db.addMessage(id, msg);
        let getUser = db.getUserChatInfo(id);
        Promise.all([addMessage, getUser])
            .then(array => {
                array = [...array[0].rows, ...array[1].rows];
                const obj = { ...array[0], ...array[1] };
                obj.created_at = moment(obj.created_at).fromNow(); //make times look pretty with momentjs
                io.sockets.emit("new-message-from-server", obj);
            })
            .catch(err => console.log("error on promise all: ", err));
    });
});
