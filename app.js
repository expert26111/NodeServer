const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const index = require('./routes/Index');
const post = require('./routes/Post');
const user = require('./routes/User');
const latest = require('./routes/latest');
const status = require('./routes/status');
const metrics = require('./routes/metrics');
const routerAuthenticate = require('./routes/authenticate');
var jwt = require('jsonwebtoken');
var config = require('./config');
//logging
//const log4js = require('log4js');
 var logger = require('./log4js.js').fileAll;
var loggerInfo = require('./log4js.js').fileInfo;

const app = express();
//const logger = log4js.getLogger();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//blah app.use blah
// app.use(function(err, req, res, next) {
//     log.error(err);
//     res.send(500, 'An error occurred');
// });

app.use('/authenticate',routerAuthenticate);
// app.use(function(req, res, next) {
//
//     // check header or url parameters or post parameters for token
//     var token = req.body.token || req.query.token || req.headers['x-access-token'];
//
//     // decode token
//     if (token) {
//
//         // verifies secret and checks exp
//         jwt.verify(token, config.secret , function(err, decoded) {
//             if (err) {
//                 return res.json({ success: false, message: 'Failed to authenticate token.' });
//             } else {
//                 // if everything is good, save to request for use in other routes
//                 req.decoded = decoded;
//                 next();
//             }
//         });
//
//     } else {
//
//         // if there is no token
//         // return an error
//         return res.status(403).send({
//             success: false,
//             message: 'No token provided.'
//         });
//
//     }
// });
app.use('/status',status);
app.use('/post', post);
app.use('/user', user);
app.use('/latest',latest);
app.use('/metrics', metrics);
app.set('port', 3000);

var server = app.listen(app.get('port'), function()
{
     logger.info('Express server listening on port ', server.address().port, " with pid ", process.pid );
     loggerInfo.info('Express server listening on port ', server.address().port, " with pid ", process.pid);
})

module.exports = app;

