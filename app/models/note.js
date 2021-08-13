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
        }
    };
    note.init({
        id_catatan: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        topik: {
            allowNull: false,
            type: DataTypes.STRING
        },
        isi: {
            allowNull: false,
            type: DataTypes.STRING
        },
        status: {
            defaultValue: 1,
            type: DataTypes.INTEGER
        }
    }, {
        sequelize,
        modelName: 'note',
        tableName: 'nates'
    });
    return note;
};