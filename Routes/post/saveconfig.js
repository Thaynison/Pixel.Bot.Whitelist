module.exports = {
    run: async (req, res, { client }) => {
        const member = await client.bot.guilds.cache.get(client.bot.options.mainGuild).members.fetch(req.user.id);  
        if (member.roles.cache.has(client.bot.options.rolesCfg.roleOwner)) {
            await client.database.config.update({
                logo: req.body.logo, banner: req.body.banner,tentativas: req.body.tentativas, whitelist: req.body.whitelist, canallogs: req.body.canallogs,
                cargoaprovado: req.body.cargoaprovado, cargoreprovado: req.body.cargoreprovado, mensagemaprovado: req.body.mensagemaprovado, 
                mensagemreprovado: req.body.mensagemreprovado}, {where: {id: 1}
            })
            return res.status(200).json({ success: true });
        }else return res.status(200).json({ success: false, mensagem: 'Erro ao executar a ação.'});
    },
    middlewares: [require("../../util/Functions/isAuthenticated.js")]
}