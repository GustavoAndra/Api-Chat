// Importando o módulo 'db' do arquivo './db'
const db = require("./db");

let buscarSala = async(idsala) =>{
    return db.finOne("salas",idsala)
}
let atualizarMensagens = async(sala) =>{
    return await db.updateOne("salas",sala,{id:sala._id});
}
// Função para listar as salas
function listarSalas() {
    return [
        {
            "id": {
                "$oid": "756463hhfh4858"
            },
            "nome": "salamaleico",
            "tipo": "publica"
        },
        {
            "id": {
                "$oid": "796809895804hfnm,"
            },
            "nome": "Cimolai só louco vai",
            "tipo": "privada",
            "chave": "at8q4haw"
        },
        {
            "id": {
                "$oid": "3958930fjhe"
            },
            "nome": "Cimol hospício",
            "tipo": "publica"
        }
    ];
}
module.exports = { listarSalas,
buscarSala }; // Exportando a função 'listarSalas' como um módulo