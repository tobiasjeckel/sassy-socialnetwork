const spicedPg = require("spiced-pg");
// const db = spicedPg("postgres:postgres:postgres@localhost:5432/petition");

const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

exports.testFunction = function() {
    console.log("db is working");
};

exports.addUser = function(firstname, lastname, email, hash) {
    return db.query(
        `INSERT INTO users (firstname, lastname, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, firstname
        `,
        [firstname, lastname, email, hash]
    );
};

exports.getHash = function(email) {
    return db.query(
        `SELECT password, id, firstname FROM users WHERE email = $1`,
        [email]
    );
};

exports.addProfile = function(age, city, url, user_id) {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        RETURNING user_id
        `,
        [age || null, city || null, url || null, user_id]
    );
};

exports.getUser = function(id) {
    return db.query(
        `SELECT firstname, lastname, email, age, city, url
        FROM users
        LEFT OUTER JOIN user_profiles
        ON users.id = user_profiles.user_id
        WHERE users.id = $1
        `,
        [id]
    );
};

exports.editProfile = function(age, city, url, id) {
    return db.query(
        `INSERT INTO user_profiles (age, city, url, user_id)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id)
        DO UPDATE SET age = $1, city = $2, url = $3
        `,
        [age || null, city || null, url || null, id]
    );
};

exports.editUser = function(firstname, lastname, email, id) {
    return db.query(
        `
        UPDATE users
        SET firstname = $1, lastname = $2, email = $3
        WHERE id = $4
        RETURNING firstname
        `,
        [firstname, lastname, email, id]
    );
};

exports.editUserAndPass = function(firstname, lastname, email, id, hash) {
    return db.query(
        `
        UPDATE users
        SET firstname = $1, lastname = $2, email = $3, password = $5
        WHERE id = $4
        RETURNING firstname
        `,
        [firstname, lastname, email, id, hash]
    );
};
