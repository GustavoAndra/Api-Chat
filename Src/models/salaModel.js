const db = require("./db");

let buscarSala = async (idsala) => {
  return db.findOne("salas", { _id: idsala });
};

let atualizarMensagens = async (sala) => {
  return await db.updateOne("salas", { _id: sala._id }, sala);
};

let buscarMensagens = async (idsala, timestamp) => {
  let sala = await buscarSala(idsala);
  if (sala.msgs) {
    let msgs = sala.msgs.filter((msg) => msg.timestamp >= timestamp);
    return msgs;
  }
  return [];
};

function listarSalas() {
  return [
    {
      id: "756463hhfh4858",
      nome: "salamaleico",
      tipo: "publica",
    },
    {
      id: "796809895804hfnm,",
      nome: "Cimolai só louco vai",
      tipo: "privada",
      chave: "at8q4haw",
    },
    {
      id: "3958930fjhe",
      nome: "Cimol hospício",
      tipo: "publica",
    },
  ];
}
module.exports = { listarSalas, buscarSala, atualizarMensagens, buscarMensagens };