const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node_schema',
    password: 'rcom@1726'
});
module.exports = pool.promise();
