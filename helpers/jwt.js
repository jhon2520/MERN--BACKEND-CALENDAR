const jwt = require("jsonwebtoken");

// voy a generar el jwt en base al uid y el nombre del usuario y los paso como payload,
// le paso una semilla para firmar el token y un objeto con la duración del toke
const generarJWT =(uid, name)=>{

    return new Promise((resolve,reject)=>{

        const payload = {uid,name};

        jwt.sign(payload,process.env.SECRET_JWT_SEED,{
            expiresIn:"2h"
        },(err,token)=>{

            // si hay errores
            if(err){
                console.log(err);
                reject("no se puedo generar el token")
            }
            // si todo sale bien
            resolve(token)

        })

    })

}

module.exports = {
    generarJWT
}