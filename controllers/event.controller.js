const {response} = require("express");
const Event = require("../models/Event.model")



const getEvents = async(req,res=response)=>{

    // con el método populate y pasándole una referencia obtengo agrego toda la información del usuario, quiero 
    // obtener el name, el id viene por defecto
    const events = await Event.find().populate("user","name")



        res.status(200).json({
            ok:true,
            msg:events
        })
    
        


}
const createEvents = async(req,res=response)=>{

    const event = new Event(req.body)

    try {

        event.user = req.uid

        const eventSaved = await event.save();

        res.status(200).json({
            ok:true,
            eventSaved
        })
    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el administrador"
        })
    }


}
const updateEvents = async(req,res=response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Evento no existe con el id"
            })
        }

        //verificar que la personas que creo el evento sea el mismo que la va a actualizar
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"no puede editar este evento"
            })
        }

        const newEvent = {
            ...req.body,
            user:uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId,newEvent,{new:true});

        return res.status(200).json({
            ok:true,
            event: eventUpdated
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el admin"
        })
        
    }

}
const deleteEvents = async(req,res=response)=>{

    const eventId = req.params.id;
    const uid = req.uid;

    try {
        
        const event = await Event.findById(eventId);

        if(!event){
            return res.status(404).json({
                ok:false,
                msg:"Evento no existe con el id"
            })
        }

        //verificar que la personas que creo el evento sea el mismo que la va a eliminar
        if(event.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"no puede editar este evento"
            })
        }



        await Event.findByIdAndRemove(eventId);

        return res.status(200).json({
            ok:true,
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:"Hable con el admin"
        })
        
    }


}


module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}