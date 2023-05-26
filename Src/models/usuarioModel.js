const db = require("./db");

// Função para registrar um usuário ao entrar
async function entrar(nick) {
    return await db.insertOne("usuario", { "nick": nick });
}

// Função para buscar um usuário pelo idUser
let buscarUsuario = async (idUser) => {
    let user = await db.findOne("usuarios", idUser);
    return user;
}

// Função para alterar um usuário
let alterarUsuario = async (user) => {
    return await db.updateOne("usuarios", user, { _id: user._id });
}
module.exports = {entrar}; // Exportando a função 'entrar' como um módulo