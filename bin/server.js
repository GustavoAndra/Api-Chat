// Importação do módulo "dotenv" para carregar variáveis de ambiente a partir de um arquivo .env
require("dotenv").config();

// Importação do módulo "app" que contém as rotas da API
const app = require("../Src/routers/api");

// Middleware para passar para o próximo middleware/rota
app.use((req, res, next) => {
    next();
});

// Acessando a variável de ambiente API_PORT definida no arquivo .env
console.log(process.env.API_PORT);

// Atribuição do valor da variável de ambiente API_PORT à variável "port"
let port = process.env.API_PORT ||5000;

// Inicialização do servidor para escutar na porta especificada
app.listen(port);

// Exibição do console informando em qual porta o servidor está ouvindo
console.log(`listening on ${port}`);