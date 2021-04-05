const dotenv = require('dotenv');
const express = require("express");
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const applicationModuleConfig = require("./module/application/config");
// const ebookModuleConfig = require("./module/ebook/config");
let configInit = dotenv.config();
if (configInit.error) {
    throw "Niepoprawna konfiguracja pliku '.env'."
}

const config = require('./config/config');
const deletedAtPlugin = require('./module/application/plugin/deletedAtPlugin');

//Główne połączenie do bazy
mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DBNAME}`, config.dbOptions);
mongoose.plugin(deletedAtPlugin);

//Globalna klasa dla errorów ze statusem
class AppError extends Error {
    constructor(message, status, field) {
        super(message);
        this.status = status || 500;
        this.field = field || null;
    }
}
global.AppError = AppError;

//Ustawienie root directory
global.appRoot = path.resolve(__dirname);

//zabezpieczenia: cors, headery, limit requestów
var corsOptions = {
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(helmet());

//parsery
app.use(bodyParser.json({
    limit: '20mb'
}));
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.get('/media/:name', (req, res, next) => {
    const name = req.params.name;
    res.sendFile(name, { root: './media' });
});

app.use("/", applicationModuleConfig);
// app.use("/ebook", ebookModuleConfig);

//Zwrotka 404 dla nieistniejących routów
app.use((req, res, next) => {
    const error = new AppError("Ścieżka nie istnieje", 404);
    next(error);
});

app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(error.status || 500);
    let message = error.message;
    if (!error.status || error.status === 500) {
        message = "Wystąpił błąd";
    }
    if (error.status === 422) {
        let isJson = (/^[\],:{}\s]*$/.test(error.message.replace(/\\["\\\/bfnrtu]/g, '@').
            replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
            replace(/(?:^|:|,)(?:\s*\[)+/g, '')));
        res.send({
            success: false,
            errors: isJson ? JSON.parse(error.message) : error.field ? { [error.field]: error.message } : { message: error.message }
        });
    } else {
        res.send({
            success: false,
            errors: error.field ? { [error.field]: message } : {
                message: message
            }
        });
    }
});

app.listen(3001);
