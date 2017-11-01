/**
 * Created by Yoana on 11/1/2017.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');


router.get('/', function (req, res, next)
{
    // Post.getLatestRow(req.body, function (err, rows)
    // {
    //     if (err)
    //     {
            res.json("Alive");
        // }
        // else
        // {
        //     res.json(rows);
        // }
    // });
});


module.exports = router;