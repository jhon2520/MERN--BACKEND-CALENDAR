const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const UserSchema = Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

// mongoose por defecto guarda el modelo en plural (Users), si quiero cambiar esto coloco como segundo parametros del 
// modelo lo siguiente ,{collection:"User"} 

module.exports = model("User",UserSchema);
