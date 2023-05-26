let express = require("express");
let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criação de um objeto de roteador
const router = express.Router();

// Rota raiz para exibir uma mensagem simples
app.use('/', router.get('/', (req, res) => {
    res.status(200).send("<h1>API-CHAT</h1>");
}));

// Rota para exibir informações sobre a versão do chat
app.use("/", router.get("/sobre", (req, res, next) => {
    res.status(200).send({
        "nome": "API - CHAT",
        "versão": "0.1.0",
        "autor": "Gustavo Andrade"
    });
}));

app.use("/entrar", router.post("/entrar", async (req, res, next) => {
    const usuarioController = require("../controllers/usuariocontroller");
    let resp = await usuarioController.entrar(req.body.nick);
    res.status(200).send(resp);
}));

// Rota para obter a lista de salas
app.use("/salas", router.get("/salas", async (req, res, next) => {
    const salaController = require("../controllers/salacontroller");
    let resp = await salaController.get();
    res.status(200).send(resp);
}));

// Rota para entrar em uma sala
app.use("/sala/entrar", router.put("/sala/entrar", async (req, res) => {
    if (!token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick))
        return false;
    let resp = await salaController.entrar(req.headers.iduser, req.query.idsala);
    res.status(200).send(resp);
}));

app.use("/sala/mensagem", router.post("/sala/mensagem", async (req, res) => {
    if (!(await token.checkToken(req.headers.token, req.headers.iduser, req.headers.nick)))
        return false;
    let resp = await salaController.enviar(req.headers.nick, req.body.msg, req.body.idSala);
    res.status(200).send(resp);
}));
module.exports = app;