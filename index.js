const express = require("express");
const app = express();
const compression = require("compression");
const bc = require("./utils/bc");
const db = require("./utils/db");
const cookieSession = require("cookie-session");

//middleware

app.use(compression());
app.use(
    cookieSession({
        secret: `supersecret`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

// app.use(
//     express.urlencoded({
//         extended: false
//     })
// );
// app.use(express.static("./public")); //for css

app.use(express.json());

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
                    // res.sendStatus(404);
                });
        })
        .catch(err => {
            res.json({
                message: "Something went wrong. Please try again."
            });
            console.log(err);
        });
});

// app.get("/", (req,res) => {
//
// })
//all other get routes need to be before this
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(8080, () => {
    console.log("I'm listeningggg.");
});
