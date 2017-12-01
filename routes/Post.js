var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var loggerError = require('.././log4js.js').fileError;
var loggerDebug = require('.././log4js.js').fileDebug;
var loggerInfo = require('.././log4js.js').fileInfo;
var net = require('.././log4js.js').logfaces;
var jwt = require('jsonwebtoken');
var config = require('.././config');
//var ip = require('ip');

router.post('/', function (req, res, next)
{
            // console.log("the body is "+req.body);
            Post.addPostnoid(req.body.post_title,req.body.post_text,req.body.post_url,
         req.body.post_type,req.body.post_parent,req.body.username,
         req.body.pwd_hash,function (err, count)
            {


                if (err)
                {
                 //   loggerError.error('System has error posting a post!!!');
                 //   loggerDebug.debug('System has error posting a post : ', err);
                    net.debug('System has error posting a post : ', err);
                    res.status(500).json(err);
                }
                else {

                            if(req.ip.toString().includes('138.68.91.198') )
                            {
                               // console.log('The ip is  ',req.ip.toString());
                                net.info('Posting a post from Helge WITH IP ',req.ip.toString());
                                res.status(201).json(req.body);

                            }else{

                                //net.info('I am inside else blog');
                                ///console.log('The ip is  ',req.ip.toString());
                                var token = req.body.token || req.query.token || req.headers['x-access-token'];
                                if (token)
                                {

                                    // verifies secret and checks exp
                                    jwt.verify(token, config.secret , function(err, decoded)
                                    {
                                        if (err)
                                        {
                                            return res.json({ success: false, message: 'Failed to authenticate token.' });
                                        } else
                                        {
                                            // if everything is good, save to request for use in other routes
                                            req.decoded = decoded;
                                            net.info('Posting a post from authenticated user');
                                            res.status(201).json(req.body);
                                            //next();
                                        }
                                    });

                                } else
                                {

                                    // if there is no token
                                    // return an error
                                    net.info('Trying to post a post from non authenticated user');
                                    return res.status(403).send({
                                        success: false,
                                        message: 'No token provided.'
                                    });

                                }

                            }


                    }
            });
});


// router.post('/array', function (req, res, next)
// {
//    // console.log("the body is ",req.body);
//     Post.addPostArray(req.body, function (err, count)
//     {
//         if (err)
//         {
//             loggerError.error('System has error posting an array of posts!!!');
//             loggerDebug.debug('System has error posting an array of posts : ', err);
//             res.status(500).json(err);
//         }
//         else
//         {
//             res.status(201).json(req.body);
//         }
//     });
// });

// router.post('/noid', function (req, res, next)
// {
//     Post.addPostnoid(
// req.body.post_title,req.body.post_text,req.body.post_url,
//         req.body.post_type,req.body.post_parent,req.body.username,
//         req.body.pwd_hash,
// function (err, count)
//     {
//         if (err)
//         {
//             loggerError.error('System has error posting a post with noid!!!');
//             loggerDebug.debug('System has error posting a post with noid : ', err);
//             res.status(500).json(err);
//         }
//         else
//         {
//             res.status(201).json(req.body);
//
//
//         }
//     });
// });

// router.get('/', function (req, res, next)
// {
//     Post.getAllPosts(function (err, rows)
//     {
//
//         if (err)
//         {
//             loggerError.error('System has error getting all post!!!');
//             loggerDebug.debug('System has error getting all post : ', err);
//             net.debug('System has error getting all post : ', err);
//             res.status(500).json(err);
//         }
//         else
//         {
//             //  console.log('the ip is ',req.ip.toString());
//             //  console.log('the ip is ',ip.address());
//             net.info("Getting all posts ");
//             res.status(200).json(rows);
//         }
//
//     });
// });


router.get('/:begin/:last4', function (req, res, next)
{
        Post.getlastRangePosts(req.params.begin, req.params.last4,function (err, rows)
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
              //  console.log('the ip is ',req.ip.toString());
              //  console.log('the ip is ',ip.address());
                net.info("Getting range posts from ", req.params.begin , req.params.last);
                console.log("the rows are ",rows);
                res.status(200).json(rows);
            }

        });
});

router.get('/:id', function (req, res, next)
{

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
});

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
// check if id is anumber
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