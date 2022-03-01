const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
    static init(sequelize) {
        return super.init({
            email: {
                type: DataTypes.STRING(30),
                allowNull: false,
                unique: true,
            },
            nickname: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(70),
                allowNull: false,
            },
            admin: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        }, {
            modelName: 'User',
            tableName: 'users',
            charset: 'utf8',
            collate: 'utf8_general_ci',
            sequelize
        })
    };
    static associate(db) {
        db.User.hasMany(db.Post); // user.addPosts
        db.User.hasMany(db.Comment); // user.addComments
    };
};