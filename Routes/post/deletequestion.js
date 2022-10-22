const { MessageEmbed } = require("discord.js");

module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            await client.database.questions.destroy({where: {id: req.body.id}})
            let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)

            if (guild.channels.cache.get(req.body.canalLogs) !== undefined) {
                client.bot.channels.cache.get(req.body.canalLogs).send(
                    new MessageEmbed()
                    .addField("Responsável:", `<@${req.body.discordid}>`)
                    .addField("Ação:", 'Deletou questão: \n\`\`\`'+req.body.textQuestion+'\`\`\`')
                    .setTimestamp()
                    .setColor("#2f3136")
                );
            }
            return res.status(200).json({ success: true });
        }else return res.status(200).json({ success: false });
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}