var db = require('../connection'); //reference of connection.js

// var postexmaple = {
//     post_title: "Y Combinator",
//     post_text: "", 
//     hanesst_id: 1,
//     post_type: "story", 
//     post_parent: -1, 
//     username: "pg",  
//     pwd_hash: "Y89KIJ3frM", 
//     post_url: "http://ycombinator.com"
// };

var Post = {
    getAllPosts: function(callback) {
        return db.query("Select * from post", callback);
    },
    getlastNPosts: function(callback) {
        return db.query("Select * from post order by id desc limit 100 ", callback);
    },

    getlastRangePosts: function(N , M , callback) {
        console.log("the n is ", N, " and the M is ,",M);
        return db.query("Select * from post where hanesst_id <= ? AND hanesst_id >= ? ",[N , M], callback);
    },

    getPostById: function(id, callback) {
        return db.query("select * from post where hanesst_id=?", [id], callback);
    },

    getAllStories: function(callback) {
        return db.query("Select * from post where post_type=story", callback);
    },

    getStoriesByUser: function(name, callback) {
        return db.query("Select * from post where post_type=story AND username=?", [name], callback);
    },

    getAllComments: function(callback) {
        return db.query("Select * from post where post_type=comment", callback);
    },

    getCommentsByUser: function(name, callback) {
        return db.query("Select * from post where post_type=comment AND username=?", [name], callback);
    },

    getLatest: function(callback)
    {
        return db.query("Select * from post ORDER BY post_created DESC LIMIT 1", callback);
    },

    getLatestRow: function(id,callback)
    {
        return db.query("Select hanesst_id from post ORDER BY hanesst_id DESC LIMIT 1",[id], callback);
    },

    // getstatus: function(id,callback)
    // {
    //     return db.query("Select * from post ORDER BY hanesst_id DESC LIMIT 1",[id], callback);
    // },


    addPost: function(Post, callback)
    {
        console.log("the post is ", Post);

        return db.query("Insert into post values(?,?,?,?,?,?,?,?)",
            [
                 Post.hanesst_id,
                Post.post_title,
                Post.post_text,
                Post.post_url,
                Post.post_type,
                Post.post_parent,
                Post.username,
                Post.pwd_hash
            ],
            callback);
    },


    addPostArray: function(Post, callback)
    {
        console.log("the post is array ", Post);

            for(var i = 0; i < Post.length; i++)
        {

            db.query("Insert into post values(?,?,?,?,?,?,?,?)",
                [
                    Post[i].hanesst_id,
                    Post[i].post_title,
                    Post[i].post_text,
                    Post[i].post_url,
                    Post[i].post_type,
                    Post[i].post_parent,
                    Post[i].username,
                    Post[i].pwd_hash
                ],
                callback);

        }
    },



    addPostnoid: function(hanesst_id,post_title, post_text ,post_url,post_type,post_parent,
                          username,pwd_hash,
                          callback)
    {
        var values = [hanesst_id,post_title,post_text, post_url,post_type, post_parent,username, pwd_hash ]
      //  console.log("the post is ", Post);
        return db.query("Insert into post (hanesst_id,post_title,post_text,post_url,post_type,post_parent,username,pwd_hash) values(?,?,?,?,?,?,?,?)",
            values,
            callback);
    },

    deletePost: function(id, callback)
    {
        return db.query("delete from post where hanesst_id=?", [id], callback);
        // IMPLEMENT DELETION OF CHILD COMMENTS?
    },


    updatePost: function(id, Post, callback) {
        return db.query("update post set post_title=?,post_text=?,post_url=? where hanesst_id=?",
            [
                Post.post_title,
                Post.post_text,
                Post.post_url,
                id
            ],
            callback);
    }

};

module.exports = Post;