const Sequelize = require('sequelize');
const connection = require('../database/database');
const Client = connection.define('Clients', {
    name: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    rg: {
        type: Sequelize.STRING(13),
        allowNull: false
    },
    birth: {
        type: Sequelize.DATE,
        allowNull: false
    },
    sex: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    zipCode: {
        type: Sequelize.STRING(8),
        allowNull: false
    },
    address: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    number: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    district: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    complement: {
        type: Sequelize.STRING(244),
        allowNull: false
    },
    state: {
        type: Sequelize.STRING(244),
        allowNull: false
    },
    city: {
        type: Sequelize.STRING(244),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(244),
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1,
        allowNull: false
    }
});


Client.sync({ force: false });

module.exports = Client;