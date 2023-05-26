const salaModel = require("../models/salaModel"); // Importando o módulo 'salaModel' do diretório '../models'

// Função para obter todas as salas
exports.get = async (req, res) => {
  try {
    const salas = await salaModel.listarSalas(); // Chamando a função 'listarSalas' do módulo 'salaModel'
    res.status(200).json(salas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao obter as salas" });
  }
};

// Função para entrar em uma sala
exports.entrar = async (req, res) => {
  const iduser = req.headers.iduser;
  const idsala = req.query.idsala;

  try {
    const sala = await salaModel.buscarSala(idsala); // Chamando a função 'buscarSala' do módulo 'salaModel' passando o 'idsala'
    if (!sala) {
      return res.status(404).json({ error: "Sala não encontrada" });
    }

    const usuarioModel = require("../models/usuarioModel"); // Importando o módulo 'usuarioModel' do diretório '../models'
    const user = await usuarioModel.buscarUsuario(iduser); // Chamando a função 'buscarUsuario' do módulo 'usuarioModel' passando o 'iduser'
    user.sala = { _id: sala._id, nome: sala.nome, tipo: sala.tipo }; // Adicionando a sala ao usuário

    if (await usuarioModel.alterarUsuario(user)) {
      // Chamando a função 'alterarUsuario' do módulo 'usuarioModel' passando o 'user'
      return res
        .status(200)
        .json({ msg: "OK", timestamp: (timestamp = Date.now()) });
    } else {
      return res.status(500).json({ error: "Erro ao entrar na sala" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao entrar na sala" });
  }
};

// Função para buscar mensagens em uma sala
exports.buscarMensagens = async (req, res) => {
  const idsala = req.query.idsala;
  const timestamp = req.query.timestamp;

  try {
    const mensagens = await salaModel.buscarMensagens(idsala, timestamp);
    res.status(200).json({
      timestamp: mensagens[mensagens.length - 1].timestamp,
      msgs: mensagens,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar as mensagens" });
  }
};

// Função para enviar uma mensagem em uma sala
exports.enviarMensagem = async (req, res) => {
  const nick = req.headers.nick;
  const msg = req.body.msg;
  const idsala = req.body.idSala;

  try {
    const sala = await salaModel.buscarSala(idsala); // Chamando a função 'buscarSala' do módulo 'salaModel' passando o 'idsala'
    if (!sala) {
      return res.status(404).json({ error: "Sala não encontrada" });
    }

    if (!sala.msgs) {
      // Inicializa msgs como um array vazio se não existir
      sala.msgs = [];
    }

    const timestamp = Date.now();
    sala.msgs.push({
      timestamp: timestamp,
      msg: msg,
      nick: nick,
    });
    await salaModel.atualizarMensagens(sala); // Chamando a função 'atualizarMensagens' do módulo 'salaModel' passando a 'sala'
    res.status(200).json({ msg: "OK", timestamp: timestamp });
  } catch (error) {
    res.status(500).json({ error: "Erro ao enviar a mensagem" });
  }
};