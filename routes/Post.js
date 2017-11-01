var express = require('express');
var router = express.Router();
var Post = require('../models/Post');


router.post('/', function (req, res, next)
{
            console.log("the body is "+req.body);
            Post.addPost(req.body, function (err, count)
            {
                if (err)
                {
                    res.json(err);
                }
                else
                {
                    res.json(req.body);
                }
            });
});


router.post('/array', function (req, res, next)
{
    console.log("the body is ",req.body);
    Post.addPostArray(req.body, function (err, count)
    {
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(req.body);
        }
    });
});

router.post('/noid', function (req, res, next)
{
    Post.addPostnoid(req.body.post_title,req.body.post_text,req.body.post_url,
        req.body.post_type,req.body.post_parent,req.body.username,
        req.body.pwd_hash,function (err, count)
    {
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(req.body);
        }
    });
});


router.get('/', function (req, res, next)
{
        Post.getAllPosts(function (err, rows)
        {

            if (err)
            {
                res.json(err);
            }
            else
            {
                res.json(rows);
            }

        });
});

router.get('/:id', function (req, res, next)
{

    // if (req.params.id)
    // {

            Post.getPostById(req.params.id, function (err, rows)
            {

                    if (err)
                    {
                        res.json(err);
                    }
                    else
                    {
                        res.json(rows);
                    }
            });
    // }
    // else {
    //
    //             Post.getAllPosts(function (err, rows) {
    //
    //                 if (err) {
    //                     res.json(err);
    //                 }
    //                 else {
    //                     res.json(rows);
    //                 }
    //
    //             });
    //     }
});


// router.post('/', function (req, res, next) {
//
//     Post.addPost(req.body, function (err, count) {
//         if (err) {
//             res.json(err);
//         }
//         else {
//             res.json(req.body);
//         }
//     });
// });

router.delete('/:id', function (req, res, next)
{

    Post.deletePost(req.params.id, function (err, count)
    {

            if (err)
            {
                res.json(err);
            }
            else
            {
                res.json(count);
            }

    });
});

router.put('/:id', function (req, res, next)
{

    Post.updatePost(req.params.id, req.body, function (err, rows)
    {

        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(rows);
        }

    });
});

module.exports = router;