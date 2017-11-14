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
//logging
const log4js = require('log4js');
const app = express();


const logger = log4js.getLogger();
log4js.configure({
    appenders: {
        console: { type: "console" },
        logfaces: { type: 'logFaces-HTTP', url: 'http://172.18.0.1:9700' },
         file: {type: "file", filename : '/root/log/log.log', "maxLogSize": 20480, "backups": 3 }
       //  server: { type: 'multiprocess', mode: 'master',appender: 'file', loggerHost : 'http://localhost:5000' }
    },
    categories: {
        default: { appenders: [ 'console', 'logfaces' , 'file' ], level: 'debug' }
    }
});


setInterval(() => {
    logger.level = 'error';
    logger.debug("Some debug message");
    logger.info('Some info message.');
    logger.warn("Warning ...");
    logger.error("ERROR ");
    logger.fatal("FATAL ");

}, 2000);


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//blah app.use blah
app.use('/status',status);
app.use('/post', post);
app.use('/user', user);
app.use('/latest',latest);
app.use('/metrics', metrics);





app.listen(3000, function ()
{
    console.log('app listening...on port 3000')
});



module.exports = app;

// log4js.configure({
//     appenders: {
//         console: { type: "console" },
//         logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' }
//     },
//     categories: {
//         default: { appenders: [ 'console', 'logfaces' ], level: 'info' }
//     }
// });
// setInterval(() => {
//     logger.level = 'debug';
//     logger.debug("Some debug message");
// }, 2000);

// var logger = require('fluent-logger').createFluentSender('tag', {
//     host: 'localhost',
//     port: 5000,
//     timeout: 3.0
// });
