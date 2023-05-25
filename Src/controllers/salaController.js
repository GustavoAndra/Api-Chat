const salaModel = require('../models/salaModel');

exports.get = async (req, res) => {
  return await salaModel.listarSalas();
}

exports.entrar= async (iduser,idsala)=>{
    const sala = await salaModel.buscarSala(idsala);
    let usuarioModel=require('../models/usuarioModel');
    let user= await usuarioModel.buscarUsuario(iduser);
    user.sala={_id:sala._id, nome:sala.nome, tipo:sala.tipo};
    if(await usuarioModel.alterarUsuario(user)){
      return {msg:"OK", timestamp:timestamp=Date.now()};
    }
    return false;
}

exports.enviarMensagem = async (nick, msg, idsala) => {
  const sala = await salaModel.buscarSala(idsala);
  if (!sala) {
    // Sala não encontrada
    return { "error": "Sala não encontrada" };
  }
  
  if (!sala.msgs) {
    // Inicializa msgs como um array vazio
    sala.msgs = [];
  }
  
  const timestamp = Date.now();
  sala.msgs.push({
    timestamp: timestamp,
    msg: msg,
    nick: nick
  });
  
  await salaModel.atualizarMensagens(sala);
  
  return { "msg": "OK", "timestamp": timestamp };
}