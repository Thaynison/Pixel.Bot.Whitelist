module.exports = {
    run: async (req, res, { client }) => {
        req.logout();
        res.redirect('/');
    },

    middlewares: [require("../../util/Functions/isAuthenticated.js")]
};