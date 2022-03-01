const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Post extends Model {
    static init(sequelize) {
        return super.init({
            title: {
                type: DataTypes.STRING(70),
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true,
            }
        }, {
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', // 한글 저장
            sequelize
        })
    };
    static associate(db) {

    };
};