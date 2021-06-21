const Sequelize = require('sequelize');
const connection = require('../database/database');
const Admin = connection.define('Admins', {
    email: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Admin.sync({ force: false });

module.exports = Admin;
