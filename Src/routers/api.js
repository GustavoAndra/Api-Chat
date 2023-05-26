const express = require('express');
const app = express();
const usuarioController = require('../controllers/usuariocontroller');
const salaController = require('../controllers/salacontroller');
const token = require('../util/token');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rota raiz para exibir uma mensagem simples
app.get('/', (req, res) => {
  res.status(200).send("<h1>API-CHAT</h1>");
});

// Rota para exibir informações sobre a versão do chat
app.get('/sobre', (req, res) => {
  res.status(200).send({
    "nome": "API - CHAT",
    "versão": "0.1.0",
    "autor": "Gustavo Andrade"
  });
});

// Rota para entrar
app.get('/entrar', async (req, res) => {
  let resp = await usuarioController.entrar(req.query.nick);
  res.status(200).send(resp);
});

// Rota para obter a lista de salas
app.get('/salas', async (req, res) => {
  let resp = await salaController.get();
  res.status(200).send(resp);
});

// Rota para entrar em uma sala
app.put('/sala/entrar', async (req, res) => {
  if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
    return res.status(401).send('Token inválido');

  let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
  res.status(200).send(resp);
});
module.exports = app;