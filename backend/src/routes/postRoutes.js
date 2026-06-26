const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");
const authMiddleware = require("../middleware/authMiddleware");


// Rotas Públicas

// Listar todos os posts
router.get("/", postController.getPosts);

// Rotas Protegidas
 
// Criar um novo post
router.post(
    "/",
    authMiddleware,
    postController.createPost
);

// Curtir ou descurtir um post (toggle)
router.post(
    "/favorite/:id",
    authMiddleware,
    postController.toggleFavorite
);

module.exports = router;

