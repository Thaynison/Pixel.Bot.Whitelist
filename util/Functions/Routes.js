const { readdir } = require("fs");

module.exports = class Routes {
    constructor(client) {
        this.client = client;
        this.app = client.app;

        this.loadRoutes();
    }
    loadRoutes() {
        readdir("./Routes/get", (err, files) => {
            for (var i = 0; i < [...files].length; i++) {
                const file = files[i];
                console.log(`/${file.split(".")[0].replace(/#/g, ":").replace(/__/g, "/")},'GET`)

                const required = require(`../../Routes/get/${file}`);
                this.app.get(`/${file.split(".")[0].replace(/#/g, ":").replace(/__/g, "/")}`, ...required.middlewares, async (req, res) => {
                    required.run(req, res, { client: this.client });
                });
            }
            this.app.get("/*", async (req, res) => {
                res.redirect("/");
            });
        });
        readdir("./Routes/post", (err, files) => {
            for (var i = 0; i < [...files].length; i++) {
                const file = files[i];
                console.log(`/${file.split(".")[0].replace(/#/g, ":").replace(/__/g, "/")},POST`)

                const required = require(`../../Routes/post/${file}`);
                this.app.post(`/${file.split(".")[0]}`, ...required.middlewares, async (req, res) => {
                    required.run(req, res, { client: this.client });
                });
            }
        });
    }
};
