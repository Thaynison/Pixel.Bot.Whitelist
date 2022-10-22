const { Op } = require("sequelize");
const { MessageEmbed } = require("discord.js");

module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            const forms = await client.database.forms.findOne({where: { [Op.or]: {id: req.body.form, discordid: req.body.form }, [Op.and]: {status: "Pendente"}} })
            if (forms) {
                const config = await client.database.config.findAll({raw: true})
                let userForm = client.bot.users.cache.get(forms.discordid)

                let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
                if (guild.channels.cache.get(config[0].canallogs) !== undefined) {
                    let formsReprovados =  await client.database.forms.count({where: {discordid: forms.discordid}}) || 0

                    client.bot.channels.cache.get(config[0].canallogs).send(
                        new MessageEmbed()
                        .setAuthor(`Whitelist de ${userForm.username} | N°${forms.id}`)
                        .setDescription(`🆔 ${forms.discordid}\n📈 ${formsReprovados} whitelist(s) enviada(s)\n🕗 Data: ${forms.date}`)
                        .addField("Aprovado", '\n<@'+forms.discordid+'>')
                        .addField("Questões Corretas", '\n'+forms.questoesCorretas+'')
                        .setThumbnail(userForm.displayAvatarURL({ dynamic: true }))
                        .setFooter("Aprovado por: "+req.user.username+"#"+req.user.discriminator)
                        .setColor("#2f3136")
                    );
                }

                const embedWhitelist = new MessageEmbed()
                .setColor("#2f3136")
                .setDescription(`**Olá <@${userForm.id}>**\n\n${config[0].mensagemaprovado}`)
                userForm.send(embedWhitelist).catch((e) => console.log('Não consigo enviar DM'))
                guild.members.cache.get(userForm.id).roles.add(config[0].cargoaprovado).catch((e) => console.log('Erro na role'))

                await client.database.forms.update(
                    {status: 'Aprovada'},
                    {where: {id: forms.id}
                })
                await client.database.users.update(
                    {whitelisted: 1},
                    {where: {id: JSON.parse(forms.aswners)[3]}
                }).catch((e) => console.log('Erro ao adicionar whitelist'))
                return res.status(200).json({ success: true });
            }else return res.status(200).json({ success: false });
        }else return res.status(200).json({ success: false });
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}