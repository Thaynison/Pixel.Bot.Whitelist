const User = require("../../util/User.js")

const Gamedig = require('gamedig')

module.exports = {
    run: async (req, res, { client }) => {
        const config = await client.database.config.findAll()

        let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
        if (guild.members.cache.get(req.user.id)) {
            const questions = await client.database.questions.findAll()

            const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
            if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
                const forms = await client.database.forms.findAll({where: {status: 'Pendente'}})

                let aprovadoresRole = guild.members.cache.filter(member => { 
                    return member.roles.cache.get(client.bot.options.rolesCfg.roleAprovador) && !member.roles.cache.get(client.bot.options.rolesCfg.roleOwner);
                }).map(member => {return member.id})
                let ownerRole = guild.members.cache.filter(member => { 
                    return member.roles.cache.get(client.bot.options.rolesCfg.roleOwner);
                }).map(member => {return member.id})

                const countWhitelists = await client.database.forms.findAll({raw: true})
                Gamedig.query({
                    type: "fivem",
                    host: client.bot.options.status.ip,
                    port: client.bot.options.status.porta,
                }).then(async(state) => {
                    let jogadoresOnline = state.raw.clients;
                    let jogadoresMax = state.raw.sv_maxclients;          
                    return res.render("../src/view/dashboard.ejs", { 
                        website: client, user: new User(req.user),member,forms,aprovadoresRole,ownerRole,countWhitelists,config,jogadoresOnline,jogadoresMax
                    });
                }).catch(async() => {               
                    let jogadoresOnline = -1;
                    let jogadoresMax = -1;          
                    return res.render("../src/view/dashboard.ejs", { 
                        website: client, user: new User(req.user),member,forms,aprovadoresRole,ownerRole,countWhitelists,config,jogadoresOnline,jogadoresMax
                    });
                })

            }else return res.render("../src/view/whitelist.ejs", { website: client, user: new User(req.user), member, questions},);
        }else return res.render("../src/view/index.ejs", { website: client, user: new User(req.user), mensagem: 'Você não esta em nosso discord.', config},);
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
};

