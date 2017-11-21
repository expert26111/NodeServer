/**
 * Created by Yoana on 11/1/2017.
 */
var express = require('express');
var router = express.Router();
var Post = require('../models/Post');
var logger = require('.././log4js.js').fileAll;
var loggerInfo = require('.././log4js.js').fileInfo;
var net = require('.././log4js.js').logfaces;

router.get('/', function (req, res, next)
{
    // Post.getLatestRow(req.body, function (err, rows)
    // {
    //     if (err)
    //     {

            logger.info('System was asked if it is alive !!!');
            loggerInfo.info('System was asked if it is alive !!!');
            net.info('System was asked if it is alive !!!');
            res.status(200).json("Alive");

                    // if (err)
                    // {
                    //     res.json(err);
                    //     logger.error("Error for asking if system is alive ");
                    //     logger.debug("Debug for latest Story: ", err);
                    // }
                    // else
                    // {
                    //     logger.info('System was asked if it is alive !!!');
                    //     res.json("Alive");
                    //
                    // }
        // }
        // else
        // {
        //     res.json(rows);
        // }
    // });
});


module.exports = router;