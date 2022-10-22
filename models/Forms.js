const { Model, DataTypes } = require("sequelize");

module.exports = class Forms extends (
    Model
) {
    static init(sequelize) {
        return super.init(
            {
                discordid: {
                    type: DataTypes.STRING
                },
                aswners: {
                    type: DataTypes.STRING
                },
                date: {
                    type: DataTypes.STRING
                },
                status: {
                    type: DataTypes.STRING
                },
                questoesCorretas:{
                    type: DataTypes.INTEGER
                }

            },
            { tableName: "forms", timestamps: false, sequelize }
        );
    }
};

