var mysql = require('mysql');
//172.18.0.1
var connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'hackernews'
});
module.exports = connection;
