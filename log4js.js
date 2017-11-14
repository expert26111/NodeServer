//
// const log4js = require('log4js');
// const logger = log4js.getLogger();
// log4js.configure({
//     appenders: {
//         console: { type: "console" },
//         logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' },
//         file: {type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logs.txt', "maxLogSize": 20480, "backups": 3 }
//     },
//     categories: {
//         default: { appenders: [ 'console', 'logfaces' , 'file' ], level: 'debug' }
//     }
// });
// setInterval(() => {
//     logger.level = 'error';
//     logger.debug("Some debug message");
//     logger.info('Some info message.');
//     logger.warn("Warning ...");
//     logger.error("ERROR ");
//     logger.fatal("FATAL ")
//
// }, 2000);