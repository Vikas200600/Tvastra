const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const ejs = require('ejs');
const path = require('path');
const flash = require('req-flash');

const appConfig = require('./backend/config/appConfig');
const routes = require('./backend/routes/routes');



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.engine("html", ejs.renderFile);
app.set("view engine", "ejs");
app.use(express.static('./src/client'));
app.use(express.static('./src/client/views'));
app.set("views", "./src/client/views");

// Using Express Session
app.use(session({
    secret:"tvastraapp",
    resave:false,
    saveUninitialized:false,
    cookie:{
        path:'/',
        httpOnly:true,
        maxAge: null,
        secure:false,
    }
}));

app.use(flash());


app.use('/', routes);  //Using Routes

// Mongoose connection
mongoose.connect(appConfig.db.uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', (err) => { console.log(err) }).on('open', () => { console.log("MongoDB Connection Successful.") });

// Start Listening server
app.listen(appConfig.port, () => {
    console.log(`App Listening At: ${appConfig.port}`);
})
