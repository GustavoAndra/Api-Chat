const token = require("../util/token");
const usuarioModel = require("../models/usuarioModel");

exports.entrar = async (nick) => {
    let resp = await usuarioModel.registrarUsuario(nick);
    if(resp.insertedId){
        return{
            "IdUser": resp.insertedId,
            "token": await token.setToken(JSON.stringify(resp.insertedId).replace(/"/g, ''),nick),
            "nick":nick}
    } 
};

module.exports = usuarioModel;