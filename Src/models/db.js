const { MongoClient, ObjectId } = require("mongodb"); // Importando as dependências necessárias do pacote 'mongodb'

let singleton;

// Função para conectar ao banco de dados
async function connect() {
    if (singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST); // Criando uma instância do cliente MongoDB, passando o host do banco de dados como argumento
    await client.connect(); // Conectando ao banco de dados

    singleton = client.db(process.env.DB_DATABASE); // Armazenando a conexão em uma variável singleton
    return singleton;
}

// Função para buscar todos os documentos em uma coleção
async function findAll(collection) {
    const db = await connect(); // Obtendo a conexão com o banco de dados
    return db.collection(collection).findAll().toArray(); // Buscando todos os documentos na coleção e retornando como um array
}
module.exports = { findAll }; // Exportando a função 'findAll' como um módulo