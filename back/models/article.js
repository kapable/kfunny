const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Article extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING(70),
                allowNull: false,
            },
            contents: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // for banning a abusing article
            enabled: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        }, {
            modelName: 'Article',
            tableName: 'articles',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
            sequelize
        });
    };
    static associate(db) {
        db.Article.belongsTo(db.User);
        db.Article.hasMany(db.Comment);
        db.Article.belongsToMany(db.Category, { through: 'ArticleCategory' });
    };
};