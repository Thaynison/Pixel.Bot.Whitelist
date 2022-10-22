const { Model, DataTypes } = require("sequelize");

module.exports = class Config extends (
    Model
) {
    static init(sequelize) {
        return super.init(
            {
                logo: {
                    type: DataTypes.STRING
                },
                banner: {
                    type: DataTypes.STRING
                },
                tentativas: {
                    type: DataTypes.INTEGER
                },
                whitelist: {
                    type: DataTypes.STRING
                },
                canallogs: {
                    type: DataTypes.STRING
                },
                cargoaprovado: {
                    type: DataTypes.STRING
                },
                cargoreprovado: {
                    type: DataTypes.STRING
                },
                mensagemaprovado: {
                    type: DataTypes.STRING
                },
                mensagemreprovado: {
                    type: DataTypes.STRING
                },
            },
            { tableName: "configs", timestamps: false, sequelize }
        );
    }
};

