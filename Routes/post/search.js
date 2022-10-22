const { Op } = require("sequelize");
module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleAprovador) || member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            const forms = await client.database.forms.findOne({where: { [Op.or]: {id: req.body.form, discordid: req.body.form }, [Op.and]: {status: "Pendente"}} })
            if (forms) return res.status(200).json({ success: true, id: forms.id });
            else return res.status(200).json({ success: false });
        }else return res.status(200).json({ success: false, mensagem: 'Erro ao executar a ação.'});
    },  
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}