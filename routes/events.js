
//rutas de eventos validadas con el jwt

/*
    Event Routes
    /api/events
*/

const express = require("express");
const {validateJWT} = require("../middlewares/validate-jwt");
const {getEvents,createEvents,updateEvents,deleteEvents} = require("../controllers/event.controller")
const {check} = require("express-validator")
const {validateFields} = require("../middlewares/validate-fileds")
const {isDate} = require("../helpers/IsDate")


const router = express.Router();

// Esto es lo mismo (todas las rutas de la linea siguiente en adelante son validadas con ValidateJWT)

router.use(validateJWT)

router.get("/",getEvents);
router.post(
    "/",
    [
        check("title","El titulo es obligatorio").not().isEmpty(),
        check("start","Fecha de inicio es obligatoria").custom( isDate),
        check("end","Fecha de finalización es obligatoria").custom( isDate),
        validateFields
    ]
    ,createEvents);
router.put(
    "/:id",
    [check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalización es obligatoria').custom(isDate)],
    updateEvents);

router.delete("/:id",deleteEvents);

//Que esto
/*
router.get("/",validateJWT,getEvents);
router.post("/",validateJWT,createEvents);
router.put("/:id",validateJWT,updateEvents);
router.delete("/:id",validateJWT,deleteEvents);

*/



module.exports = router