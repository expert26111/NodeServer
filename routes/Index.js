var express = require('express');
var router = express.Router();
var Post = require('../models/Post');


router.get('/latest', function (req, res, next) {
    Post.getStoriesByUser(req.params.id, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/comments/:username', function (req, res, next) {
    Post.getCommentsByUser(req.params.id,function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.get('/stories/:username', function (req, res, next)
{
    Post.getStoriesByUser(req.params.id, function (err, rows)
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