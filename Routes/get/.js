
module.exports = {
    run: async (req, res, { client }) => {
        const config = await client.database.config.findAll({raw: true})
        return res.render("../src/view/index.ejs", { website: client, mensagem: false, config: config});
    },

    middlewares: []
};
