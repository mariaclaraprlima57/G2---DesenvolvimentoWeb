const postModel = require("../models/postModel");
const favoriteModel = require("../models/favoriteModel");

// Listar todos os posts
const getPosts = async (req, res) => {
    try {

        const posts = await postModel.getAllPosts();

        res.status(200).json(posts);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erro ao listar os posts."
        });

    }
};

// Criar um novo post
const createPost = async (req, res) => {

    try {

        const { content } = req.body;

        const userId = req.user.id;

        if (!content || content.trim() === "") {
            return res.status(400).json({
                message: "Digite algum conteúdo."
            });
        }

        const post = await postModel.createPost(content, userId);

        res.status(201).json({
            message: "Post publicado com sucesso.",
            post
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erro ao criar post."
        });

    }

};

// Curtir ou descurtir (toggle)
const toggleFavorite = async (req, res) => {

    try {

        const postId = req.params.id;

        const userId = req.user.id;

        const post = await postModel.findPostById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post não encontrado."
            });
        }

        const alreadyFavorited = await favoriteModel.hasFavorited(
            userId,
            postId
        );

        if (alreadyFavorited) {

            await favoriteModel.removeFavorite(
                userId,
                postId
            );

            return res.status(200).json({
                message: "Curtida removida."
            });

        }

        await favoriteModel.addFavorite(
            userId,
            postId
        );

        res.status(201).json({
            message: "Post curtido."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Erro ao curtir post."
        });

    }

};

module.exports = {
    getPosts,
    createPost,
    toggleFavorite
};