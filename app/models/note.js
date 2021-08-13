'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class note extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            note.belongsTo(models.user, {
                foreignKey: 'user_id',
                targetKey: 'id_user',
            })
        }
    };
    note.init({
        id_catatan: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        topik: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isi: {
            allowNull: false,
            type: DataTypes.TEXT
        },
        status: {
            defaultValue: 1,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'note',
        tableName: 'notes'
    });
    return note;
};