const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Inicializa o banco de dados
require("./src/config/database");

const authRoutes = require("./src/routes/authRoutes");
const postRoutes = require("./src/routes/postRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rota inicial
app.get("/", (req, res) => {
    res.json({
        mensagem: "API Echo funcionando!"
    });
});

// Rotas
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

// Porta
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});