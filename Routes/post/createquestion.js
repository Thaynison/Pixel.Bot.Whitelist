const { MessageEmbed } = require("discord.js");

module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            if (req.body.type == "alternative"){
                if (req.body.action == "create") client.database.questions.create({question: req.body.textQuestion,answers: req.body.finalResponse, type: req.body.type, correta: req.body.correta})
                else client.database.questions.update({question: req.body.textQuestion,answers: req.body.finalResponse, type: req.body.type, correta: req.body.correta}, {where: {id: req.body.action.replace("edit-","")}})
            }else{
                if (req.body.action == "create") client.database.questions.create({question: req.body.textQuestion, answers: "0", type: req.body.type, correta: 0})
                else client.database.questions.update({question: req.body.textQuestion, answers: "0", type: req.body.type, correta: 0}, {where: {id: req.body.action.replace("edit-","")}})
            }
            let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
            if (guild.channels.cache.get(req.body.canalLogs) !== undefined) {
                client.bot.channels.cache.get(req.body.canalLogs).send(
                    new MessageEmbed()
                    .addField("Responsável:", `<@${req.body.discordid}>`)
                    .addField("Ação:", 'Criou questão: \n\`\`\`'+req.body.textQuestion+'\`\`\`')
                    .setTimestamp()
                    .setColor("#2f3136")
                );
            }
            return res.status(200).json({ success: true });
        }else return res.status(200).json({ success: false });
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}