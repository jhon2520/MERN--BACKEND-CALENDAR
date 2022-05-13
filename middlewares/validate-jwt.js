const {response} = require("express");
const jwt = require("jsonwebtoken");


const validateJWT = (req,res = response,next)=>{

    //recibir el jwt en x-token del header
    const token = req.header("x-token");

    //validar el token
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:"No hay token en la petición"
        })
    }

    try {

        // extraer el payload
        const payload = jwt.verify(token,process.env.SECRET_JWT_SEED);

        req.uid = payload.uid
        req.name = payload.name

        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:"Token no valido"
        })
    }


    next();


}


module.exports ={
    validateJWT,
}