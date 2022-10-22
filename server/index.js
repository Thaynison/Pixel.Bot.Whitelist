require('dotenv/config')

const Server = require('./WebSite.js');

new Server({port: process.env.PORT || 5000});