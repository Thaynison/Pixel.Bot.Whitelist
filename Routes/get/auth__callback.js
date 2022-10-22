module.exports = {
    run: async (req, res, { client }) => {},
    middlewares: [require("passport").authenticate("discord", { failureRedirect: "/", successRedirect: "/dashboard" })]
};
