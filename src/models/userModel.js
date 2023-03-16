//Require
const mongoose = require('mongoose');
// Define User schema and model

const userSchema = new mongoose.Schema({
    Username :{
        type: String,
        required: true,
        collection: String
    },
    Email :{
        type: String,
        required: true,
        
    },
    Password:{
        type: String,
        required : true
    },
    isActive:{
        type: String,
        default :'inActive'
    }

},{timestamps : true})

//Export;
module.exports = mongoose.model('Users',userSchema,"User_Data");

