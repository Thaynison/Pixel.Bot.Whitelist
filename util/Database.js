const { Sequelize } = require("sequelize");
const config = require("../config.json");

const db = new Sequelize(config.db.name, config.db.user, config.db.pass, { dialect: config.db.dialect, host: config.db.host });

db.authenticate()
    .then(async () => {
        console.log("[DATABASE] CONECTADO A DATABASE");
        await db.sync();
    })
    .catch((err) => console.error(err));


db.questions = require("../models/Questions.js")
db.questions.init(db)
db.config = require("../models/Config.js")
db.config.init(db)
db.forms = require("../models/Forms.js")
db.forms.init(db)
db.users = require("../models/Users.js")
db.users.init(db)

module.exports = db;
