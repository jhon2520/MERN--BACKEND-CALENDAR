const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const EventSchema = Schema({

    title:{
        type:String,
        required:true,
    },
    note:{
        type:String
    },
    start:{
        type:Date,
        required:true
    },
    end:{
        type:Date,
        required:true
    },
    user:{
        type:Schema.Types.ObjectId,
        // se referencia el otro esquema
        ref:"User",
        required:true
    }

})


EventSchema.method("toJSON",function(){
    const {__v,_id,...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports = model("Event",EventSchema)