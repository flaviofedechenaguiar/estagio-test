const Sequelize = require('sequelize');
const connection = new Sequelize('project_database', 'root', '', {
    host: 'mysql-container',
    dialect: 'mysql'
});

module.exports = connection;