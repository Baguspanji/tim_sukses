'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class anggota extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            anggota.belongsTo(models.user, {
                foreignKey: 'user_id',
                targetKey: 'id_user',
            })
            anggota.belongsTo(models.province, {
                foreignKey: 'provinsi',
                targetKey: 'id'
            })
            anggota.belongsTo(models.regency, {
                foreignKey: 'kota',
                targetKey: 'id'
            })
            anggota.belongsTo(models.district, {
                foreignKey: 'kecamatan',
                targetKey: 'id'
            })
        }
    };
    anggota.init({
        id_anggota: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        user_id: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        nik: {
            allowNull: false,
            type: DataTypes.INTEGER
        },
        nama_anggota: {
            allowNull: false,
            type: DataTypes.STRING
        },
        provinsi: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        kota: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        kecamatan: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        status: {
            defaultValue: 1,
            type: DataTypes.INTEGER
        },
    }, {
        sequelize,
        modelName: 'anggota',
        tableName: 'anggotas'
    });
    return anggota;
};