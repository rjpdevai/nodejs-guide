const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_schema', 'root', 'rcom@1726', {
    host: 'localhost',
    dialect: 'mysql'
});
module.exports = sequelize;
