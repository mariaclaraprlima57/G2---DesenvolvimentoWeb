const userModel = require("../models/userModel");
const authService = require("../services/authService");
const validator = require("../utils/validador");

// Cadastro de usuário

const register = async (req, res) => {
    try {

        const { username, password } = req.body;

        // Validação do usuário
        const usernameValidation = validator.validarUsername(username);

        if (!usernameValidation.valido) {
            return res.status(400).json({
                message: usernameValidation.mensagem
            });
        }

        // Validação da senha
        const passwordValidation = validator.validarPassword(password);

        if (!passwordValidation.valido) {
            return res.status(400).json({
                message: passwordValidation.mensagem
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

        // Salva no banco
        const newUser = await userModel.createUser(
            username,
            hashedPassword
        );

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso.",
            user: {
                id: newUser.id,
                username: newUser.username
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno do servidor."
        });

    }
};

// Login

const login = async (req, res) => {

    try {

        const { username, password } = req.body;

        // Validação
        const usernameValidation = validator.validarUsername(username);

        if (!usernameValidation.valido) {
            return res.status(400).json({
                message: usernameValidation.mensagem
            });
        }

        const passwordValidation = validator.validarPassword(password);

        if (!passwordValidation.valido) {
            return res.status(400).json({
                message: passwordValidation.mensagem
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
        const passwordMatch = await authService.comparePassword(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Usuário ou senha inválidos."
            });
        }

        // Gera token
        const token = authService.generateToken(user);

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro interno do servidor."
        });

    }
};


// Logout 
const logout = (req, res) => {

    return res.status(200).json({
        message: "Logout realizado com sucesso."
    });

};

module.exports = {
    register,
    login,
    logout
};