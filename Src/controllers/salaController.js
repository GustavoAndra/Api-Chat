const salaModels = require('../models/salaModel');

exports.get=async()=>{
    return await salaModels.listarSalas();
}

exports.get=async(req,res)=>{
    return{"status":"ok", "controller":"Sala"}
}

exports.get=()=>{
    let salaModels = require('../models/salaModel');
    return salaModels.listarSalas();
}