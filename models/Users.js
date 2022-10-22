const { Model, DataTypes } = require("sequelize");

module.exports = class Forms extends (
    Model
) {
    static init(sequelize) {
        return super.init(
            {
                whitelisted: {
                    type: DataTypes.INTEGER
                },
            },
            { tableName: "vrp_users", timestamps: false, sequelize }
        );
    }
};

