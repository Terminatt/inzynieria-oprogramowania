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
        FAILED_LOGINS_BLOCK: 3, //Ilość nieudanych logowań do zablokowania konta
        JWT_TOKEN_EXPIRE: 28800, //Ile czasu ważny jest token autoryzacyjny i użytkownik jest zalogowany
    }
};