// Importação do módulo "express"
var express = require("express");

// Criação de uma instância do Express
var app = express();

// Configuração do middleware para análise de dados codificados na URL
app.use(express.urlencoded({ extended: true }));

// Configuração do middleware para análise de dados no formato JSON
app.use(express.json());

// Criação do objeto de roteamento
const router = express.Router();

// Definição da rota padrão ("/")
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API - CHAT</h1>");
}));

// Definição da rota "/sobre"
app.use("/", router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome": "api-node-mongo",
        "versão": "1.0.0",
        "autor": "Gustavo Andrade"
    });
}));
// Exportação do objeto "app" para uso em outros módulos
module.exports = app;