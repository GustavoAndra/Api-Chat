const salaModel = require("../models/salaModel"); // Importando o módulo 'salaModel' do diretório '../models'
// Função para obter todas as salas
exports.get = async (req, res) => {
  return await salaModel.listarSalas(); // Chamando a função 'listarSalas' do módulo 'salaModel'
}

// Função para entrar em uma sala
exports.entrar = async (iduser, idsala) => {
  const sala = await salaModel.buscarSala(idsala); // Chamando a função 'buscarSala' do módulo 'salaModel' passando o 'idsala'
 
  const usuarioModel = require("../models/usuarioModel"); // Importando o módulo 'usuarioModel' do diretório '../models'
 
  let user = await usuarioModel.buscarUsuario(iduser); // Chamando a função 'buscarUsuario' do módulo 'usuarioModel' passando o 'iduser'
 
  user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo }; // Adicionando a sala ao usuário
 
  if (await usuarioModel.alterarUsuario(user)) 
  { // Chamando a função 'alterarUsuario' do módulo 'usuarioModel' passando o 'user'
    return { msg: "OK", timestamp: (timestamp = Date.now()) };
  }
  return false;
}

// Função para enviar uma mensagem em uma sala
exports.enviarMensagem = async (nick, msg, idsala) => {
  const sala = await salaModel.buscarSala(idsala); // Chamando a função 'buscarSala' do módulo 'salaModel' passando o 'idsala'
  if (!sala)
  {
    // Sala não encontrada
  return { error: "Sala não encontrada" };
  }

  if (!sala.msgs)
   {
    // Inicializa msgs como um array vazio se não existir
    sala.msgs = [];
  }

  const timestamp = Date.now();
  sala.msgs.push({
    timestamp: timestamp,
    msg: msg,
    nick: nick
  });
  await salaModel.atualizarMensagens(sala); // Chamando a função 'atualizarMensagens' do módulo 'salaModel' passando a 'sala'
  return { msg: "OK", timestamp: timestamp };
}