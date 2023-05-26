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
let findOne = async (collection,_id) =>{
    const db = await connect();
    let obj = await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
    if(obj)
    return obj[0];
    return false;
}

let updateOne = async (collection, object, param)=>{
    const db = await connect ();
    let result = await db.collection(collection).updateOne(param, {$set: object}
        );
    return result;
}

async function insertOne(collection,objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

module.exports = { findAll,findOne,updateOne,insertOne }; // Exportando a função 'findAll' como um módulo