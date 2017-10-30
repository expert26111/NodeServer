var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res, next) {

    User.getAllUsers(function (err, rows)
    {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });

});

router.get('/:name', function (req, res, next) {   //Yoana changed a bit because it is not working

  //  if (req.params.name)
   // {

                User.getUserByName(req.params.name, function (err, rows) {

                    if (err) {
                        res.json(err);
                    }
                    else {
                        res.json(rows);
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
            res.json(err);
        }
        else
        {
            res.json(req.body);
        }
    });
});

router.delete('/:name', function (req, res, next) {

    User.deleteUser(req.params.name, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(count);
        }

    });
});

router.put('/:name', function (req, res, next) {

    User.updateUser(req.params.name, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
});
module.exports = router;