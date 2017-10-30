var mysql = require('mysql');
var connection = mysql.createPool({
    host: '172.17.0.1',
    user: 'root',
    password: 'root',
    database: 'hackernews'
});
module.exports = connection;