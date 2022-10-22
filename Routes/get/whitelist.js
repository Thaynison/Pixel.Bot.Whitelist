const User = require("../../util/User.js")

module.exports = {
    run: async (req, res, { client }) => {
        const config = await client.database.config.findAll({raw: true})

        let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
        if (guild.members.cache.get(req.user.id)) {
            if (config[0].whitelist == 'false') return res.render("../src/view/index.ejs", { website: client, user: new User(req.user), mensagem: 'A whitelist se encontra fechada.', config  },);

            const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);
            const questions = await client.database.questions.findAll()

            return res.render("../src/view/whitelist.ejs", {
                website: client,user: new User(req.user),member,questions,
            },);
        }else return res.render("../src/view/index.ejs", { website: client, user: new User(req.user), mensagem: 'Você não esta em nosso discord.', config },);
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
};
