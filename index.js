const express = require('express');
const userRoute = require("./route/userRoute")
const adminRoute = require("./route/adminRoute")
const dotenv = require('dotenv').config();
const path = require('path');
const dbConnection = require('./config/dbConnection');
const session = require('express-session');
const morgan = require('morgan');

const app = express();
const port = process.env.PORT || 5001;
dbConnection();
app.use(
    session({
        secret: process.env.SESSIONSECRET,
        resave: false,
        saveUninitialized :true,
    })
)


app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,"./public")))


app.set("view engine","ejs");
app.set("views","./views")



app.use("/", userRoute);
app.use("/admin", adminRoute);    


app.listen(port,()=>{
    console.log(`Development server running on http://localhost:${port}`)
})


