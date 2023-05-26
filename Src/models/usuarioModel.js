const { MongoClient, ObjectId } = require("mongodb"); // Importando as dependências necessárias do pacote 'mongodb'
const db = require('./db')
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

// Função para registrar um usuário ao entrar
async function entrar(nick) {
    const db = await connect(); // Obtendo a conexão com o banco de dados
    return db.collection("usuario").insertOne({ nick: nick }); // Inserindo um novo usuário na coleção "usuarios"
}

// Função para buscar um usuário pelo idUser
async function buscarUsuario(idUser) {
    const db = await connect(); // Obtendo a conexão com o banco de dados
    return db.collection("usuario").findOne({ _id: ObjectId(idUser) }); // Buscando um usuário na coleção "usuarios" pelo ID
}

// Função para alterar um usuário
async function alterarUsuario(user) {
    const db = await connect(); // Obtendo a conexão com o banco de dados
    return db.collection("usuario").updateOne({ _id: user._id }, { $set: user }); // Atualizando um usuário na coleção "usuarios"
}

// Função para registrar um usuário
async function registrarUsuario(nick) {
    return await db.insertOne('usuario',{'nick':nick})


    /*try {
        const db = await connect(); // Obtendo a conexão com o banco de dados
        const usuario = {
            nick: nick,
            dataRegistro: new Date()
        };console.log("bjsdhb")
  
        const result = await db.collection("usuario").insertOne(usuario); // Inserindo um novo usuário na coleção "usuarios"
        return result;
    } catch (error) {
        throw new Error("Erro ao registrar usuário: " + error.message);
    }*/
}

module.exports = {
    entrar,
    buscarUsuario,
    alterarUsuario,
    registrarUsuario,
    findAll
};