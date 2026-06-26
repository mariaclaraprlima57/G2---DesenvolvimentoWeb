const postModel = require("../models/postModel");
const favoriteModel = require("../models/favoriteModel");
const validator = require("../utils/validador");

// Listar todos os posts
const getPosts = async (req, res) => {

    try {

        const posts = await postModel.getAllPosts();

        return res.status(200).json(posts);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao listar os posts."
        });

    }

};

// Criar novo post
const createPost = async (req, res) => {

    try {

        const { content } = req.body;

        const validation = validator.validarPost(content);

        if (!validation.valido) {
            return res.status(400).json({
                message: validation.mensagem
            });
        }

        const userId = req.user.id;

        const newPost = await postModel.createPost(
            content,
            userId
        );

        return res.status(201).json({
            message: "Post publicado com sucesso.",
            post: newPost
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao criar o post."
        });

    }

};

// Curtir / Descurtir
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

        const alreadyFavorited =
            await favoriteModel.hasFavorited(
                userId,
                postId
            );

        if (alreadyFavorited) {

            await favoriteModel.removeFavorite(
                userId,
                postId
            );

            const totalLikes =
                await favoriteModel.countFavorites(postId);

            return res.status(200).json({
                message: "Curtida removida.",
                likes: totalLikes
            });

        }

        await favoriteModel.addFavorite(
            userId,
            postId
        );

        const totalLikes =
            await favoriteModel.countFavorites(postId);

        return res.status(201).json({
            message: "Post curtido.",
            likes: totalLikes
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Erro ao atualizar curtida."
        });

    }

};

module.exports = {
    getPosts,
    createPost,
    toggleFavorite
};