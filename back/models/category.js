const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Category extends Model {
    static init(sequelize) {
        return super.init({ 
            value: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
            label: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true,
            },
        }, {
            modelName: 'Category',
            tableName: 'categories',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize
        })
    }
    static associate(db) {
        db.Category.belongsToMany(db.Post, { through: 'PostCategory' });
    };
};