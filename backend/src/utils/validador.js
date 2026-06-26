// Valida usuário
const validarUsername = (username) => {

    if (!username) {
        return {
            valido: false,
            mensagem: "O nome de usuário é obrigatório."
        };
    }

    if (username.trim().length < 3) {
        return {
            valido: false,
            mensagem: "O nome de usuário deve possuir pelo menos 3 caracteres."
        };
    }

    return { valido: true };
};

// Valida senha
const validarPassword = (password) => {

    if (!password) {
        return {
            valido: false,
            mensagem: "A senha é obrigatória."
        };
    }

    if (password.length < 6) {
        return {
            valido: false,
            mensagem: "A senha deve possuir pelo menos 6 caracteres."
        };
    }

    return { valido: true };
};

// Valida conteúdo do post
const validarPost = (content) => {

    if (!content) {
        return {
            valido: false,
            mensagem: "O post não pode estar vazio."
        };
    }

    if (content.trim().length === 0) {
        return {
            valido: false,
            mensagem: "O post não pode conter apenas espaços."
        };
    }

    if (content.length > 280) {
        return {
            valido: false,
            mensagem: "O post pode conter no máximo 280 caracteres."
        };
    }

    return { valido: true };
};

module.exports = {
    validarUsername,
    validarPassword,
    validarPost
};