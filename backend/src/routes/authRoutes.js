const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Cadastro de usuário
router.post("/register", authController.register);

// Login de usuário
router.post("/login", authController.login);

module.exports = router;