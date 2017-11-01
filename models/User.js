var db = require('../connection'); //reference of connection.js

var User = {
    getAllUsers: function (callback) {
        return db.query("Select * from user", callback);
    },
    getUserByName: function (name, callback) {
        return db.query("select * from user where username=?", [name], callback);
    },
    addUser: function (User, callback) {
        return db.query("Insert into user values(?,?)", [User.name, User.pwd], callback);
    },
    deleteUser: function (name, callback) {
        return db.query("delete from user where username=?", [name], callback);
    },
    updateUser: function (User, callback) {
        return db.query("update user set pwd_hash=? where username=?", [User.pwd, User.name], callback);
    }

};
module.exports = User;