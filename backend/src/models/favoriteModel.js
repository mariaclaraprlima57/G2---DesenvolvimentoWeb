const db = require("../config/database");

// Verifica se o usuário já curtiu o post
const hasFavorited = (userId, postId) => {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT * FROM favorites WHERE user_id = ? AND post_id = ?",
            [userId, postId],
            (err, row) => {

                if (err) {
                    return reject(err);
                }

                resolve(row);

            }
        );

    });
};

// Curtir um post
const addFavorite = (userId, postId) => {
    return new Promise((resolve, reject) => {

        db.run(
            "INSERT INTO favorites (user_id, post_id) VALUES (?, ?)",
            [userId, postId],
            function (err) {

                if (err) {
                    return reject(err);
                }

                resolve(this.lastID);

            }
        );

    });
};

// Remover curtida
const removeFavorite = (userId, postId) => {
    return new Promise((resolve, reject) => {

        db.run(
            "DELETE FROM favorites WHERE user_id = ? AND post_id = ?",
            [userId, postId],
            function (err) {

                if (err) {
                    return reject(err);
                }

                resolve(this.changes);

            }
        );

    });
};

// Contar curtidas
const countFavorites = (postId) => {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT COUNT(*) AS total FROM favorites WHERE post_id = ?",
            [postId],
            (err, row) => {

                if (err) {
                    return reject(err);
                }

                resolve(row.total);

            }
        );

    });
};

module.exports = {
    hasFavorited,
    addFavorite,
    removeFavorite,
    countFavorites
};