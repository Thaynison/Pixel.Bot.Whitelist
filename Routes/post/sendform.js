
const { MessageEmbed } = require("discord.js");

const formatarData  = (data) => {
    const ano = data.getFullYear();
    const mes = (`00${data.getMonth() + 1}`).slice(-2);
    const dia = (`00${data.getDate()}`).slice(-2);
    const horas = (`00${data.getHours()}`).slice(-2);
    const minutos = (`00${data.getMinutes()}`).slice(-2);
    return `${dia}/${mes}/${ano} | ${horas}:${minutos}`;
};

module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            const config = await client.database.config.findAll({raw: true})
            if (config[0].whitelist == "true"){
                let formsSends = await client.database.forms.count({where: {discordid: req.user.id}}) || 0
                if (formsSends >= config[0].tentativas) return res.status(200).json({ success: false, mensagem: 'Número de tentivas excedidos.'});
                let questoesCorretas = 0
                const questions = await client.database.questions.findAll()
                questions.filter(m => m.type === "alternative").map((g,j) => {if (req.body.finalAlternatives.split(",")[j] == g.correta) questoesCorretas++})

                await client.database.forms.create({discordid: req.user.id, aswners: req.body.finalResponse, date: formatarData(new Date()), status: "Pendente", questoesCorretas}).then(forms => {
                    let userForm = client.bot.users.cache.get(forms.discordid)
                    
                    let guild = client.bot.guilds.cache.get(client.bot.options.mainGuild)
                    if (guild.channels.cache.get(config[0].canallogs) !== undefined) {
                       
                        client.bot.channels.cache.get(config[0].canallogs).send(
                            new MessageEmbed()
                            .setAuthor(`Whitelist de ${userForm.username} | N°${forms.id}`)
                            .setFooter(`Formulário recebido com sucesso.`)
                            .setColor("#2f3136")
                        );
                    }
                    const embedWhitelist = new MessageEmbed()
                    .setColor("#2f3136")
                    .setDescription(`**Olá <@${userForm.id}>**\n\nSua **whitelist** foi enviada com sucesso, o **ID** de sua whitelist: \`${forms.id}\``)
                    userForm.send(embedWhitelist).catch((e) => console.log('Não consigo enviar DM'))
                })
                return res.status(200).json({ success: true});
            }else return res.status(200).json({ success: false, mensagem: 'A whitelist se encontra fechada.'});
        }else return res.status(200).json({ success: false, mensagem: 'Erro ao executar a ação.'});
    },
    
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}