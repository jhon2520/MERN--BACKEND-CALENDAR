/*
rutas auth
    host + /api/auth
*/

const express = require("express")
const {createUser,loginUser,revalidateTkn} = require("../controllers/auth.controller")
const {check} = require("express-validator");
const {validateFields} = require("../middlewares/validate-fileds")
const {validateJWT} = require("../middlewares/validate-jwt")


const router = express.Router();

router.post(
    "/new",
    [   
        check("name","El nombre es obligatorio").not().isEmpty(),
        check("email","el email es obligatorio").isEmail(),
        check("password","el password es obligatorio, debe de ser de 6 caracteres").isLength({min:6}),
        validateFields
    ],
    createUser);

router.post(
    "/",
    [
        check("email","el email es obligatorio").isEmail(),
        check("password","el password es obligatorio, debe de ser de 6 caracteres").isLength({min:6}),
        validateFields
    ],
    loginUser);

router.get("/renew",validateJWT,revalidateTkn);

module.exports = router