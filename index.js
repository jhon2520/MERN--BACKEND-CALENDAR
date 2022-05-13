const express = require("express");
const dbConnection = require("./database/config");
const cors = require("cors")
require("dotenv").config();


//console.log(process.env);

const app = express();

//base datos
dbConnection();

//CORS
app.use(cors());

//directorio publico que muestra el html
app.use(express.static("public"))

//parseo del body
app.use(express.json());

//rutas
app.use("/api/auth",require("./routes/auth"))
app.use("/api/events",require("./routes/events"))



app.listen(process.env.PORT,()=>{
    console.log(`Listen on ${process.env.PORT}`);
})