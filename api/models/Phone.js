const Sequelize = require('sequelize');
const Client = require('../models/Client');
const connection = require('../database/database');
const Phone = connection.define('Phone', {
    type: {
        type: Sequelize.INTEGER(1),
        allowNull: false
    },
    dd: {
        type: Sequelize.STRING(2),
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Client.hasMany(Phone, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Phone.belongsTo(Client);

Phone.sync({ force: false });

module.exports = Phone;