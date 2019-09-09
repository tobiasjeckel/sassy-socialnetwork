const express = require("express");
const app = express();
const compression = require("compression");
const bc = require("./utils/bc");
const db = require("./utils/db");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
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
//middleware
app.use(compression());
app.use(express.json());

app.use(
    cookieSession({
        secret:
            process.env.NODE_ENV == "production"
                ? process.env.SESS_SECRET
                : require("./secrets").sessionSecret,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
    console.log("this is the body of reg", req.body);
    bc.hash(req.body.password)
        .then(hash => {
            db.addUser(req.body.first, req.body.last, req.body.email, hash)
                .then(data => {
                    req.session.id = data.rows[0].id;
                    req.session.first = data.rows[0].first;
                    console.log("session id is: ", req.session.id);
                    res.json({
                        message: "Registration successful"
                    });
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
    db.getUser(id)
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

app.get("*", (req, res) => {
    if (req.session.id) {
        res.sendFile(__dirname + "/index.html");
    } else {
        res.redirect("/welcome");
    }
});

app.listen(8080, () => {
    console.log("I'm listeningggg.");
});
