const db = require("../config/database");

// Criar um novo post
const createPost = (content, userId) => {
    return new Promise((resolve, reject) => {

        db.run(
            `INSERT INTO posts (content, user_id)
             VALUES (?, ?)`,
            [content, userId],
            function (err) {

                if (err) {
                    return reject(err);
                }

                resolve({
                    id: this.lastID,
                    content,
                    userId
                });

            }
        );

    });
};

// Listar todos os posts
const getAllPosts = () => {
    return new Promise((resolve, reject) => {

        db.all(
            `
            SELECT
                posts.id,
                posts.content,
                posts.created_at,
                users.username,

                (
                    SELECT COUNT(*)
                    FROM favorites
                    WHERE favorites.post_id = posts.id
                ) AS likes

            FROM posts

            INNER JOIN users
            ON users.id = posts.user_id

            ORDER BY posts.created_at DESC
            `,
            [],
            (err, rows) => {

                if (err) {
                    return reject(err);
                }

                resolve(rows);

            }
        );

    });
};

// Buscar um post pelo ID
const findPostById = (id) => {
    return new Promise((resolve, reject) => {

        db.get(
            "SELECT * FROM posts WHERE id = ?",
            [id],
            (err, row) => {

                if (err) {
                    return reject(err);
                }

                resolve(row);

            }
        );

    });
};

module.exports = {
    createPost,
    getAllPosts,
    findPostById
};