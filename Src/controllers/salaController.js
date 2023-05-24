exports.get=async(req,res)=>{
    return{"status":"ok", "controller":"Sala"}
}

exports.get=()=>{
    let salaModel = require("../models/salaModel")
    return salaModel.listarSalas();
}