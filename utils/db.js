const spicedPg = require("spiced-pg");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.testFunction = function() {
    console.log("db is working");
};

exports.addUser = function(first, last, email, hash) {
    return db.query(
        `INSERT INTO users (first, last, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, first
        `,
        [first, last, email, hash]
    );
};

exports.getHash = function(email) {
    return db.query(`SELECT password, id, first FROM users WHERE email = $1`, [
        email
    ]);
};

exports.getUser = function(id) {
    return db.query(
        `SELECT first, last, avatarurl, bio, id
        FROM users
        WHERE users.id = $1
        `,
        [id]
    );
};

exports.getUsers = function(query) {
    return db.query(
        `SELECT first, last, avatarurl, id
        FROM users
        WHERE first ILIKE $1
        ORDER BY first
        LIMIT 4
        `,
        [query + "%"]
    );
};

exports.editBio = function(id, bio) {
    return db.query(
        `UPDATE users
        SET bio = $2
        WHERE id = $1
        RETURNING bio
        `,
        [id, bio]
    );
};

exports.uploadAvatar = function(id, avatarurl) {
    return db.query(
        `UPDATE users
        SET avatarurl = $2
        WHERE id = $1
        RETURNING avatarurl
        `,
        [id, avatarurl]
    );
};
