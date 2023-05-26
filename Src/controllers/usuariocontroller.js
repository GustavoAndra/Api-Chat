const token = require("../util/token"); // Importando o módulo 'token' do diretório '../util'
const usuarioModel = require("../models/usuarioModel"); // Importando o módulo 'usuarioModel' do diretório '../models'

// Exportando a função 'entrar' como um módulo
exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick); // Chamando a função 'registrarUsuario' do módulo 'usuarioModel'
    if(resp.insertedId){
        return {
            "IdUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick), // Gerando um token com o 'IdUser' e o 'nick'
            "nick": nick
        }
    } 
};

module.exports = usuarioModel; // Exportando o módulo 'usuarioModel'
