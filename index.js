const express = require('express');
const userRoute = require("./route/userRoute")

const adminRoute = require("./route/adminRoute")
const orderRoute = require("./route/orderRoute")
const cartRoute = require("./route/cartRoute")
// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config();
const path = require('path');
const dbConnection = require('./config/dbConnection');
const session = require('express-session');
const morgan = require('morgan');
const colors = require('colors');
const {disableCacheMiddleware} = require("./middleware/userAuth")
const { signInWithGoogle, signInWithPopup }=require('./firebase');
const app = express();
const port = process.env.PORT || 5001;
dbConnection();



app.use(session({
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }
}));


app.use(disableCacheMiddleware);
app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,"./public")))

          
app.set("view engine","ejs");
app.set("views","./views")



app.use("/", userRoute);
app.use("/admin", adminRoute); 
app.use("/order", orderRoute);
app.use("/cart", cartRoute);


app.listen(port,()=>{
    console.log(`Development server running on http://localhost:${port}`.magenta)
})


