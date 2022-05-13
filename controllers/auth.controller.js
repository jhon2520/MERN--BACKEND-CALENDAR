const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const {generarJWT} = require("../helpers/jwt")




const createUser = async(req,res = express.response)=>{

    const {email,password} = req.body;
    

    try {
        
        //validar que no exista un usuario con el mismo correo
        let user = await User.findOne({email:email})
        
        if(user){
            return res.status(400).json({
                ok:false,
                msg:"Ya existe un usuario con este correo"
            });
        }

        user = new User(req.body);


        //encriptar contraseña
            // entre más valor de vuelta más compleja la contraseña pero también se hace más pesado el proceso
            //si no se coloca nada toma 10 por defecto
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt)

        const userSaved = await user.save();

        //generar token
        const token = await generarJWT(userSaved.id,userSaved.name)

        res.status(201).json({
            ok:true,
            userSaved,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Por favor hable con el administrador"
        })
    }


}

const loginUser = async(req,res= express.response)=>{

    const {email,password} =req.body

    try {
        
        //validar que el correo exista
        const user = await User.findOne({email:email})

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"No existe usuario con este correo"
            });
        }

        //confirmar contraseña, comparar la que el usaurio me da con la que está en la BD
        const validPassword = bcrypt.compareSync(password,user.password)
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                mgs:"Contraseña no válida"
            })
        }


        //generar token
        const token = await generarJWT(user.id,user.name)
    

        res.status(200).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Por favor hable con el administrador"
        })
    }


}

const revalidateTkn = async(req,res= express.response)=>{

    const uid = req.uid;
    const name = req.name;

    //generar nuevo token
    const token = await generarJWT(uid,name)

    res.status(200).json({
        ok:true,
        token
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidateTkn
}