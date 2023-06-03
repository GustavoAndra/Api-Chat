const { MongoClient, ObjectId } = require("mongodb")

let singleton;

let connect = async () => {
	
	if(singleton) return singleton;
	
	const client = new MongoClient(process.env.DB_HOST);
	
	await client.connect();
	
	singleton = client.db(process.env.DB_DATABASE);
	
	return singleton;
}

let findAll = async (collection)=>{
	const db = await connect();
	return await db.collection(collection).find().toArray();
}

let insertOne = async (collection, object)=>{
	const db = await connect();
	return await db.collection(collection).insertOne(object);
};

let findOne = async (collection, _id)=>{
	const db = await connect();
	let obj= await db.collection(collection).find({'_id':new ObjectId(_id)}).toArray();
	if(obj)
		return obj[0];
	return false;
}

let updateOne= async (collection, object, param)=>{
	const db = await connect();
	let result= await db.collection(collection).updateOne(param, { $set: object} );
	return result;
}

let deleteOne= async (collection, object)=>{

}
module.exports = {
	findAll,
	insertOne,
	findOne,
	updateOne,
	deleteOne
}