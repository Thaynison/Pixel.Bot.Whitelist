const { Model, DataTypes } = require("sequelize");

module.exports = class Questions extends (
    Model
) {
    static init(sequelize) {
        return super.init(
            {
                question: {
                    type: DataTypes.STRING
                },
                answers: {
                    type: DataTypes.STRING
                },
                type: {
                    type: DataTypes.STRING
                },
                correta: {
                    type: DataTypes.INTEGER
                }
            },
            { tableName: "questions", timestamps: false, sequelize }
        );
    }
};

