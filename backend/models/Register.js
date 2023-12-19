const mongoose = require('mongoose')

const Reg_model = new mongoose.Schema({
    name:String,
    email:String,
    pswd:String,
    conpswd:String
})
const RegModel = mongoose.model('RegisterUser' , Reg_model)
module.exports = RegModel