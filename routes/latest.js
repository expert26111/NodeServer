/**
 * Created by Yoana on 10/30/2017.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var loggerError = require('.././log4js.js').fileError;
var loggerDebug = require('.././log4js.js').fileDebug;
var loggerInfo = require('.././log4js.js').fileInfo;
var net = require('.././log4js.js').logfaces;

router.get('/', function (req, res, next)
{
    Post.getLatestRow(req.body, function (err, rows)
    {
            if (err)
            {
                loggerError.error("Error getting latest Story ");
                loggerDebug.debug("Debug for latest Story: ", err);
                net.debug("Debug for latest Story: ", err);
                res.json(err);
            }
            else
            {
                net.info("Info for getting latest Story ", rows);
                loggerInfo.info("Info for getting latest Story ", rows);
                res.json(rows);

            }
    });
});
module.exports = router;