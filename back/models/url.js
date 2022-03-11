const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Url extends Model {
    static init(sequelize) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            link: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        }, {
            modelName: 'Url',
            tableName: 'urls',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize
        })
    }
};