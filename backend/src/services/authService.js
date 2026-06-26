const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;

// Criptografa a senha
const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

// Compara senha digitada com a senha criptografada
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

// Gera o token JWT
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "24h"
        }
    );
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken
};