var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var loggerError = require('.././log4js.js').fileError;
var loggerDebug = require('.././log4js.js').fileDebug;
var loggerInfo = require('.././log4js.js').fileInfo;
var net = require('.././log4js.js').logfaces;

router.post('/', function (req, res, next)
{
            console.log("the body is "+req.body);
            Post.addPost(req.body, function (err, count)
            {
                if (err)
                {
                    loggerError.error('System has error posting a post!!!');
                    loggerDebug.debug('System has error posting a post : ', err);
                    net.debug('System has error posting a post : ', err);
                    res.status(500).json(err);
                }
                else
                {
                  //  loggerInfo.info('Posting a post ');
                    net.info('Posting a post ');
                    res.status(201).json(req.body);
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
            loggerError.error('System has error posting an array of posts!!!');
            loggerDebug.debug('System has error posting an array of posts : ', err);
            res.status(500).json(err);
        }
        else
        {
            res.status(201).json(req.body);
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
            loggerError.error('System has error posting a post with noid!!!');
            loggerDebug.debug('System has error posting a post with noid : ', err);
            res.status(500).json(err);
        }
        else
        {
            res.status(201).json(req.body);

            Post.addPostnoid(req.body.post_title,req.body.post_text,req.body.post_url,
                req.body.post_type,req.body.post_parent,req.body.username,
                req.body.pwd_hash,function (err, count){

                });
        }
    });
});


router.get('/', function (req, res, next)
{
        Post.getAllPosts(function (err, rows)
        {

            if (err)
            {
                loggerError.error('System has error getting all post!!!');
                loggerDebug.debug('System has error getting all post : ', err);
                net.debug('System has error getting all post : ', err);
                res.status(500).json(err);
            }
            else
            {
                net.info("Getting all posts ");
                res.status(200).json(rows);
            }

        });
});

router.get('/:id', function (req, res, next)
{

    // if (req.params.id)
    // {


            // Post.getPostById(req.params.id, function (err, rows)
            // {
            //
            //     if (err)
            //     {
            //         loggerError.error('System has error getting  post by id !!!');
            //         loggerDebug.debug('System has error getting post by id : ', err);
            //         net.debug('System has error getting post by id : ', err);
            //         res.staus(500).json(err);
            //     }
            //     else
            //     {
            //         net.info('Getting a post by id');
            //         res.status(200).json(rows);
            //     }
            // });



            Post.getPostById(req.params.id, function (err, rows)
            {

                    if (err)
                    {
                        loggerError.error('System has error getting  post by id !!!');
                        loggerDebug.debug('System has error getting post by id : ', err);
                        net.debug('System has error getting post by id : ', err);
                        res.staus(500).json(err);
                    }
                    else
                    {

                        net.info('Getting a post by id');
                        res.status(200).json(rows);
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
                loggerError.error('System has error getting deleting a  post!!!');
                loggerDebug.debug('System has error getting deleting a post : ', err);
                net.debug('System has error getting deleting a post : ', err);
                res.status(500).json(err);
                //server error
            }
            else
            {
                net.info('Deleting a post by id');
                res.status(202).json(count);
                //status 204 no content
                //sttaus 202 accepted
            }

    });
});

router.put('/:id', function (req, res, next)
{

    Post.updatePost(req.params.id, req.body, function (err, rows)
    {

        if (err)
        {
            loggerError.error('System has error getting updating a post!!!');
            loggerDebug.debug('System has error getting updating a  post : ', err);
            res.status(500).json(err);
        }
        else
        {
            res.status(200).json(rows);
        }

    });
});

module.exports = router;