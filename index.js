const express = require('express');
const userRoute = require("./route/userRoute")
const dotenv = require('dotenv').config();
const path = require('path');
const dbConnection = require('./config/dbConnection');
const app = express();
const port = process.env.PORT || 5001;

dbConnection();
app.use(express.static(path.join(__dirname,"./public")))
app.set("view engine","ejs");
app.set("views","./views")



app.use("/", userRoute);
    


app.listen(port,()=>{
    console.log(`Development server running on http://localhost:${port}`)
})


