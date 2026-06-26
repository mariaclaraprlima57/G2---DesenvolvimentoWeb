const userModel = require("../models/userModel");
const authService = require("../services/authService");

// Cadastro de usuário
const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validação básica
        if (!username || !password) {
            return res.status(400).json({
                message: "Usuário e senha são obrigatórios."
            });
        }

        // Verifica se o usuário já existe
        const existingUser = await userModel.findByUsername(username);

        if (existingUser) {
            return res.status(409).json({
                message: "Usuário já cadastrado."
            });
        }

        // Criptografa a senha
        const hashedPassword = await authService.hashPassword(password);

        // Cria o usuário
        const newUser = await userModel.createUser(
            username,
            hashedPassword
        );

        res.status(201).json({
            message: "Usuário cadastrado com sucesso.",
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erro interno do servidor."
        });
    }
};

// Login
const login = async (req, res) => {
    try {

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Usuário e senha são obrigatórios."
            });
        }

        // Procura usuário
        const user = await userModel.findByUsername(username);

        if (!user) {
            return res.status(401).json({
                message: "Usuário ou senha inválidos."
            });
        }

        // Compara senha
        const validPassword = await authService.comparePassword(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Usuário ou senha inválidos."
            });
        }

        // Gera token
        const token = authService.generateToken(user);

        res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erro interno do servidor."
        });

    }
};

module.exports = {
    register,
    login
};