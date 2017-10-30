var PostsGetAll = function (connection, callback) {
    getAll(connection, "SELECT * FROM post", function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        callback(rows);
    });
}

var PostsGetUser = function (userId, connection, callback) {

    var sql = "SELECT * FROM post WHERE ?? = ?";
    var inserts = ['hanesst_id', userId];
    sql = mysql.format(sql, inserts);

    getAll(connection, sql, function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        callback(rows);
    });
}

var PostsInsert = function (req, connection, callback) {
    var sql = "INSERT into post (post_title,post_text,hanesst_id,post_type,post_parent,username,pwd_hash,post_url) VALUES(??,??,??,??,??,??,??,??)";
    var inserts = [req.post_title, req.post_text, req.hanesst_id, req.post_type, req.post_parent, req.username, req.pwd_hash, req.post_url];
    sql = mysql.format(sql, inserts);

    getAll(connection, sql, function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        callback(rows);
    });
}
module.exports.posts.get.all = PostsGetAll;
module.exports.posts.get.user = PostsByUser;
module.exports.posts.insert = PostsInsert;

var users = function (connection, callback) {
    getAll(connection, "SELECT * FROM user", function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        callback(rows);
    });
}
module.exports.comments = comments;

var votes = function (connection, callback) {
    getAll(connection, "SELECT * FROM vote", function (err, rows, fields) {
        if (err) throw err
        console.log(rows)
        callback(rows);
    });
}
module.exports.comments = comments;

function getAll(connection, query, callback) {
    connection.query(query, callback)
}