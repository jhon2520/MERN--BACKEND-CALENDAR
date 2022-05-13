const {response} = require("express");
const {validationResult} = require("express-validator")


// si todo el middleware se ejecuta correctamente entonces se llama a la función next
const validateFields = (req,res = response,next)=>{

       //manejo de errores a través del midelware
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped()
        })
    }


    next();

}

module.exports ={
    validateFields
}