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

exports.getUsers = function(input) {
    return db.query(
        `SELECT first, last, avatarurl, id
        FROM users
        WHERE first || ' ' || last ILIKE $1
        ORDER BY first
        LIMIT 4
        `,
        [input + "%"]
    );
};

exports.getNewUsers = function() {
    return db.query(
        `SELECT first, last, avatarurl, id
        FROM users
        ORDER BY id DESC
        LIMIT 4
        `
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

exports.getFriendStatus = function(viewerId, ownerId) {
    return db.query(
        `SELECT receiver_id, sender_id, accepted
        FROM friendships
        WHERE (receiver_id =$1 AND sender_id=$2)
        OR (receiver_id=$2 AND sender_id=$1)
        `,
        [viewerId, ownerId]
    );
};

exports.sendFriendRequest = function(viewerId, ownerId) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
        VALUES ($1, $2)
        RETURNING sender_id, receiver_id, accepted
        `,
        [ownerId, viewerId]
    );
};

exports.cancelFriendRequest = function(viewerId, ownerId) {
    return db.query(
        `DELETE FROM friendships
        WHERE (receiver_id =$1 AND sender_id=$2)
        OR (receiver_id=$2 AND sender_id=$1)
        RETURNING receiver_id
        `,
        [ownerId, viewerId]
    );
};

exports.acceptFriendRequest = function(viewerId, ownerId) {
    return db.query(
        `UPDATE friendships
        SET accepted=TRUE
        WHERE (sender_id=$1 AND receiver_id=$2)
        RETURNING sender_id
        `,
        [ownerId, viewerId]
    );
};

exports.getFriendsWannabes = function(viewerId) {
    return db.query(
        `SELECT users.id, first, last, avatarurl, accepted
        FROM friendships
        JOIN users
        ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
        OR (accepted = true AND sender_id = $1 AND receiver_id = users.id)
        `,
        [viewerId]
    );
};

exports.getLastTenMessages = function() {
    return db.query(
        `SELECT chats.id AS messageid, sender_id, message, chats.created_at, first, last, avatarurl, users.id AS userid
        FROM chats
        JOIN users
        ON (sender_id = users.id)
        ORDER BY created_at DESC
        LIMIT 10
        `
    );
};

exports.addMessage = function(senderId, message) {
    return db.query(
        `INSERT INTO chats (sender_id, message)
        VALUES ($1, $2)
        RETURNING id AS messageid, sender_id, message, created_at
        `,
        [senderId, message]
    );
};

exports.getUserChatInfo = function(id) {
    return db.query(
        `SELECT first, last, avatarurl, id AS userid
        FROM users
        WHERE (id = $1)`,
        [id]
    );
};

exports.addTom = function(id) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id, accepted)
        VALUES ($1, 1, TRUE)
        RETURNING receiver_id`,
        [id]
    );
};
