const salaModel = require('../models/salaModel');
const usuarioModel = require('../models/usuarioModel');

exports.get = async (req, res) => {
    const salas = await salaModel.listarSalas();
    return res.json(salas);
}

exports.entrar = async (iduser, idsala) => {
    const sala = await salaModel.buscarSala(idsala);
    const user = await usuarioModel.buscarUsuario(iduser);

    if (sala && user) {
        user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo };
        if (await usuarioModel.alterarUsuario(user)) {
            const timestamp = Date.now();
            return { msg: "OK", timestamp };
        }
    }
}

exports.enviarMensagem = async (nick, msg, idsala) => {
    let sala = await salaModel.buscarSala(idsala);
    const timestamp = Date.now();
  
    if (!sala || !sala.msgs) {
        sala = { msgs: [] };
    }
  
    sala.msgs.push({
        timestamp,
        msg,
        nick
    });
  
    const resp = await salaModel.atualizarMensagens(sala);
    return { "msg": "OK", "timestamp": timestamp };
}

exports.buscarMensagens = async (idsala, timestamp) => {
  let mensagens = await salaModel.buscarMensagens(idsala, timestamp);
  if (mensagens.length > 0) {
    return {
      timestamp: mensagens[mensagens.length - 1].timestamp,
      msgs: mensagens
    };
  } else {
    return {
      timestamp: null,
      msgs: []
    };
  }
};

exports.sairSala = async (idsala, iduser) => {
    const user = await usuarioModel.buscarUsuario(iduser);
  
    if (user) {
        await exports.enviarMensagem(iduser, "Saiu da sala!", idsala);
        delete user.sala;
  
        if (await usuarioModel.alterarUsuario(user)) {
            const timestamp = Date.now();
            return { msg: "OK", timestamp };
        }
    }
  
    return false;
};

exports.criarSala = async (nome, tipo) => {
    const sala = {
        nome,
        tipo,
        msgs: []
    };
  
    const novaSala = await salaModel.criarSala(sala);
    return novaSala;
};