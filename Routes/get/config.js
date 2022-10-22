const User = require("../../util/User.js")

module.exports = {
    run: async (req, res, { client }) => {

        let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
        if (guild.members.cache.get(req.user.id)) {
            const config = await client.database.config.findAll()
            const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
            if (member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
                const questions = await client.database.questions.findAll() 

                return res.render("../src/view/config.ejs", { website: client, user: new User(req.user), member, questions, config });
            }else{
                const forms = await client.database.forms.findAll({where: {status: 'Pendente'}})

                let aprovadoresRole = guild.members.cache.filter(member => { 
                    return member.roles.cache.get(client.bot.options.rolesCfg.roleAprovador) && !member.roles.cache.get(client.bot.options.rolesCfg.roleOwner);
                }).map(member => {return member.id})
                let ownerRole = guild.members.cache.filter(member => { 
                    return member.roles.cache.get(client.bot.options.rolesCfg.roleOwner);
                }).map(member => {return member.id})

                const countWhitelists = await client.database.forms.findAll({raw: true})
                
                return res.render("../src/view/dashboard.ejs", { 
                    website: client, user: new User(req.user),member,forms,aprovadoresRole,ownerRole,countWhitelists,config
                });
            }
        }else return res.render("../src/view/index.ejs", { website: client, user: new User(req.user), mensagem: 'Você não esta em nosso discord.', config },);
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
};

