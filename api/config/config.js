const classmap = require("./classmap");

module.exports = {
    dbOptions: {
        useNewUrlParser: true,
        autoIndex: false,
        poolSize: 10,
        useUnifiedTopology: true
    },
    classmap: classmap,
    application: {
        frontHost: process.env.FRONT_HOST,
        apiHost: process.env.API_HOST,
        JWT_SECRET: process.env.JWT_SECRET
    },
    settings: {
        JWT_TOKEN_EXPIRE: 28800 //Ile czasu ważny jest token autoryzacyjny i użytkownik jest zalogowany
    },
    mail: {
        name: "ebooks",
        host: 'mail22.mydevil.net',
        port: 587,
        auth: {
            user: 'ebooks@overcloud.usermd.net',
            pass: 'eWI6iiYJZCOv72xLHv3V'
        },
        tls: {
            rejectUnauthorized: false
        }
    },
};