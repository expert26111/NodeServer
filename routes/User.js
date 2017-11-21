var express = require('express');
var router = express.Router();
var User = require('../models/User');
var loggerError = require('.././log4js.js').fileError;
var loggerDebug = require('.././log4js.js').fileDebug;
var loggerInfo = require('.././log4js.js').fileInfo;
var net = require('.././log4js.js').logfaces;

router.get('/', function (req, res, next) {

    User.getAllUsers(function (err, rows)
    {

        if (err)
        {
            loggerError.error('System has error returning all Users User.getAllUsers!!!');
            loggerDebug.debug('System has error returning all Users User.getAllUsers : ', err);
            net.debug('System has error returning all Users User.getAllUsers  ',err);
            res.status(500).json(err);
        }
        else {
            loggerInfo.info('System returning all users.');
            net.info('System returning all users. ');
            res.status(200).json(rows);
        }

    });

});

router.get('/:name', function (req, res, next) {   //Yoana changed a bit because it is not working

  //  if (req.params.name)
   // {

                User.getUserByName(req.params.name, function (err, rows) {

                    if (err) {

                        loggerError.error('System has error returning User by Name User.getUserByName!!!');
                        loggerDebug.debug('System has error returning User by Name User.getUserByName ',err);
                        res.status(500).json(err);
                    }
                    else {
                        loggerInfo.info('System returning user by name.')
                        res.status(200).json(rows);
                    }
                });

   // }
    // else {
    //
    //     User.getAllUsers(function (err, rows)
    //     {
    //
    //                 if (err) {
    //                     res.json(err);
    //                 }
    //                 else {
    //                     res.json(rows);
    //                 }
    //
    //     });
    //  }
});


router.post('/', function (req, res, next) {

    User.addUser(req.body, function (err, count) {
        if (err)
        {
            loggerError.error('System has error posting User User.addUser!!!');
            loggerDebug.debug('System has error posting User User.addUser : ',err);
            net.debug('System has error posting User User.addUser : ',err);
            res.status(500).json(err);
        }
        else
        {
            loggerInfo.info('System posting User .')
            net.info('System posting User .  ');
            res.status(201).json(req.body);
        }
    });
});

router.delete('/:name', function (req, res, next) {

    User.deleteUser(req.params.name, function (err, count) {

        if (err) {

            loggerError.error('System has error deleting User User.deleteUser!!!');
            loggerDebug.debug('System has error deleting User User.deleteUser ', err);
            net.debug('System has error deleting User User.deleteUser ', err);
            res.status(500).json(err);
        }
        else {
            loggerInfo.info('System deleting user .')
            net.info('System deleting user .');
            res.status(202).json(count);
        }

    });
});

router.put('/:name', function (req, res, next) {

    User.updateUser( req.body, function (err, rows) {

        if (err) {

            loggerError.error('System has error updating User User.updateUser!!!');
            loggerDebug.debug('System has error updating User User.updateUser ',err);
            res.status(500).json(err);
        }
        else {
            loggerInfo.info('System updating user by name.')
            res.status(200).json(rows);
        }
    });
});

module.exports = router;