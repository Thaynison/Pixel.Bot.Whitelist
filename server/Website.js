const ejs = require("ejs");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const DiscordStrategy = require("passport-discord").Strategy;
const multer = require("multer");
const bodyParser = require("body-parser");
const Routes = require("../util/Functions/Routes");
const config = require("../config.json");

const https = require("http");
const cors = require("cors");
const { Client } = require("discord.js");
/*
const key = fs.readFileSync(__dirname + '/../certs/selfsigned.key');
const cert = fs.readFileSync(__dirname + '/../certs/selfsigned.cert');
*/
const serverOpts = {
    /*key,
    cert*/
};

module.exports = class WebSite {
    constructor(options = {}) {
        this.routes = null;
        this._port = options.port || process.env.PORT || 3000;

        this.upload = multer();
        this.app = express();
        this.database = require("../util/Database.js");


        this.bot = new Client({
            ...config,
            messageCacheLifetime: 1,
            messageCacheMaxSize: 1,
            messageSweepInterval: 1,
            messageEditHistoryMaxSize: 1,
            restTimeOffset: 0,
            disabledEvents: [
                "TYPING_START",
                "VOICE_SERVER_UPDATE",
                "RELATIONSHIP_ADD",
                "RELATIONSHIP_REMOVE",
                "GUILD_ROLE_DELETE",
                "GUILD_ROLE_UPDATE",
                "GUILD_BAN_ADD",
                "GUILD_BAN_REMOVE",
                "CHANNEL_UPDATE",
                "CHANNEL_PINS_UPDATE",
                "MESSAGE_DELETE",
                "MESSAGE_UPDATE",
                "MESSAGE_DELETE_BULK",
                "MESSAGE_REACTION_ADD",
                "MESSAGE_REACTION_REMOVE",
                "GUILD_MEMBER_UPDATE",
                "GUILD_MEMBERS_CHUNK",
                "GUILD_ROLE_CREATE",
                "MESSAGE_REACTION_REMOVE_ALL",
                "USER_UPDATE",
                "USER_NOTE_UPDATE",
                "USER_SETTINGS_UPDATE",
                "PRESENCE_UPDATE",
                "VOICE_STATE_UPDATE",
                "GUILD_UPDATE",
                "GUILD_MEMBER_ADD",
                "GUILD_MEMBER_REMOVE"
            ]
        });

        this.bot.on("ready", async () => {
            console.log("[BOT] LIGADO");
        });

        this.passport = passport;

        this.passport.serializeUser((user, done) => {
            done(null, user);
        });

        this.passport.deserializeUser((user, done) => {
            done(null, user);
        });

        this.passport.use(
            new DiscordStrategy(
                {
                    clientID: process.env.CLIENT_ID,
                    clientSecret: process.env.CLIENT_SECRET,
                    callbackURL: process.env.CLIENT_REDIRECT,
                    scope: ["identify"]
                },
                (accessToken, refreshToken, profile, done) => {
                    process.nextTick(() => done(null, profile));
                }
            )
        );

        this.app.use(cors());
        this.app.use(express.static(`${__dirname}/../src/public`));
        this.app.use(bodyParser.json({ limit: "50mb" }));
        this.app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
        this.app.use(this.upload.array());

        this.app.use(
            session({
                secret: process.env.CLIENT_SECRET,
                cookie: {
                    maxAge: 60000 * 60 * 24
                },
                store: new MemoryStore({ checkPeriod: 86400000 }),
                resave: false,
                saveUninitialized: false
            })
        );

        this.app.use(this.passport.initialize());
        this.app.use(this.passport.session());

        this.app.engine("html", ejs.renderFile);
        this.app.set("view engine", "html");
        this.app.set("views", __dirname);

        this.server = https.createServer(serverOpts, this.app);

        this.server.listen(this._port, () => {
            this.routes = new Routes(this);
            console.log(`[Website] Foi iniciado com sucesso na porta: ${this._port}`);
        });

        this.bot.login(process.env.TOKEN);
    }

    get port() {
        return this._port;
    }
};
