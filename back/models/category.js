const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Category extends Model {
    static init(sequelize) {
        return super.init({ 
            // id가 기본적으로 자동 삽입
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
            collate: 'utf8_general_ci', // 한글 저장
            sequelize
        })
    }
    static associate(db) {
        db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' });
    };
};