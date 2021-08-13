'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('anggotas', {
            id_anggota: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            nik: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            nama_anggota: {
                allowNull: false,
                type: Sequelize.STRING
            },
            provinsi: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            kota: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            kecamatan: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            status: {
                defaultValue: 1,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('anggotas');
    }
};