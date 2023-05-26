const { MongoClient, ObjectId } = require("mongodb");

let singleton;

async function connect() {
  if (singleton) return singleton;

  const client = new MongoClient(process.env.DB_HOST);
  await client.connect();

  singleton = client.db(process.env.DB_DATABASE);
  return singleton;
}

async function findOne(collection, filter) {
  const db = await connect();
  return db.collection(collection).findOne(filter);
}

async function updateOne(collection, filter, update) {
  const db = await connect();
  return db.collection(collection).updateOne(filter, update);
}

async function insertOne(collection, document) {
  const db = await connect();
  return db.collection(collection).insertOne(document);
}

async function findAll(collection) {
  const db = await connect();
  return db.collection(collection).find().toArray();
}

module.exports = {
  findOne,
  updateOne,
  insertOne,
  findAll
};
