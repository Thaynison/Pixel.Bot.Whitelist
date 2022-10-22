module.exports = {
    run: async (req, res, { client }) => {
        let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
        if (guild.members.cache.get(req.user.id)) {
            const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
            const questions = await client.database.questions.findAll()

            if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
                const forms = await client.database.forms.findOne({where: { id: req.params.id || null}})
                if (forms){
                    const respostas = JSON.parse(forms.getDataValue('aswners'))
                    const questionsAlternatives = await client.database.questions.findAll({where: {type: 'alternative'}})
                    const memberWhitelist = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(forms.discordid);  
                    const countWhitelists = await client.database.forms.findAll({raw: true})
                
                    return res.render("../src/view/about.ejs", { 
                    website: client,  user: new (require("../../util/User.js"))(req.user), member: member, memberWhitelist,questions,forms,respostas,countWhitelists,questionsAlternatives },);
                }else res.redirect('/dashboard')
            }else return res.render("../src/view/whitelist.ejs", { website: client, user: new (require("../../util/User.js"))(req.user), member: member, questions },);
        }else return res.render("../src/view/index.ejs", { website: client,user: new (require("../../util/User.js"))(req.user), mensagem: 'Você não esta em nosso discord.' },);
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
};
    