const db = require("../config/database");

// Buscar usuário pelo nome
const findByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT * FROM users WHERE username = ?",
            [username],
            (err, row) => {
                if (err) {
                    return reject(err);
                }

                resolve(row);
            }
        );
    });
};

// Buscar usuário pelo ID
const findById = (id) => {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT id, username FROM users WHERE id = ?",
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

// Criar novo usuário
const createUser = (username, password) => {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, password],
            function (err) {
                if (err) {
                    return reject(err);
                }

                resolve({
                    id: this.lastID,
                    username
                });
            }
        );
    });
};

module.exports = {
    findByUsername,
    findById,
    createUser
};