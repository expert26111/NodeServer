
// var log4js = require('log4js');

// log4js.configure(
//     {
//     "appenders":
//         [
//                 {
//                     "type": "clustered",
//                      "appenders":
//                      [
//                         {
//                             "category": "access",
//                             "type": "dateFile",
//                             "filename": "C:\\Users\\Yoana\\Desktop\\access.txt",
//                             "pattern": "-yyyy-MM-dd",
//                             "backups": 3,
//                             "level": "ALL"
//                         },
//                         {
//                             "category": "system",
//                             "type": "dateFile",
//                             "filename": "C:\\Users\\Yoana\\Desktop\\log\\system.txt",
//                             "pattern": "-yyyy-MM-dd",
//                             "backups": 3,
//                             "level": "ALL"
//                         },
//                         {
//                             "category": "error",
//                             "type": "dateFile",
//                             "filename": "C:\\Users\\Yoana\\Desktop\\error.txt",
//                             "pattern": "-yyyy-MM-dd",
//                             "backups": 3,
//                             "error": "ERROR"
//                         }
//                         // ,
//                         // {
//                         //     "type": "console"
//                         // }
//                      ]
//                 }
//         ]
// });
//
//     // "levels":
//     //     {
//     //         "access": "ALL",
//     //         "system": "ALL",
//     //         "error": "ERROR"
//     //     }
// module.exports =
//     {
//             access: log4js.getLogger('access'),
//             system: log4js.getLogger('system'),
//             error: log4js.getLogger('error'),
//             express: log4js.connectLogger(log4js.getLogger('access'), {level: log4js.levels.INFO}),
//             isDebug: function(category)
//             {
//                 return (log4js.levels.DEBUG.level >= category.level.level);
//             }
//     };




const log4js = require('log4js');
// const logger = log4js.getLogger();
//
// log4js.configure({
//     appenders: {
//         console: { type: "console" },
//         logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' }
//     },
//     categories: {
//         default: { appenders: [ 'console', 'logfaces' ], level: 'info' }
//     }
// });

log4js.configure({

    // appenders: [
    // {
    //     type: "file",
    //     absolute: true,
    //     filename: "C:\\Users\\Yoana\\Desktop\\logsAll.txt",
    //     maxLogSize: 20480,
    //     backups: 3,
    //     category: "fileAll"
    // },
    //     {
    //         // type: "logLevelFilter",
    //         // level: "INFO",
    //         type: "file",
    //         absolute: true,
    //         filename: "C:\\Users\\Yoana\\Desktop\\logsError.txt",
    //         maxLogSize: 20480,
    //         backups: 3,
    //         category: "fileInfo"
    //     },
    //     {
    //        type : "console"
    //     }
    // ],
    //    levels: {
    //               "fileAll": "ALL",
    //                "fileInfo" : "INFO",
    //                "console" : "ALL"
    //            }


    // log4js.configure({
    appenders: {
        logfaces: { type: 'logFaces-HTTP', url: '172.18.0.1:9700' },
        fileAll: { type: 'file', filename: '/var/log/logsAll.log' },
        console: { type: 'console'},
        fileInfo: { type: 'file', filename: '/var/log/logsInfo.log' },
        fileError: { type: 'file', filename: '/var/log/logsError.log' },

    },
    categories: {
        default : { appenders: ['fileAll', 'console'], level: 'all' },
        fileInfo : { appenders: ['fileInfo'], level: 'info' },
        fileError : { appenders: ['fileError'], level: 'error' },
        fileDebug : { appenders: ['fileDebug'], level: 'debug' },
        logfaces : { appenders: ['logfaces'], level: 'debug' }
    }
// });





});

module.exports =
    {
        // fileAll : log4js.getLogger('fileAll'),
        fileError : log4js.getLogger('fileError'),
        fileDebug : log4js.getLogger('fileDebug'),
        fileAll : log4js.getLogger('default'),
        fileInfo : log4js.getLogger('fileInfo'),
        logfaces : log4js.getLogger('logfaces')

    }








//           appenders:   {  type: "console" },
//            appenders:  {  type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logsAll.txt', "maxLogSize": 20480},
//             // logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' },
// appenders:     {   appender: {type : "logLevelFilter", filename : 'C:\\Users\\Yoana\\Desktop\\logsError.txt'},  level: "ERROR"},
// appenders:       { appender: {type : "logLevelFilter", filename : 'C:\\Users\\Yoana\\Desktop\\logsError.txt'},  level: "ERROR"},
// appenders:        {  appender: {type : "logLevelFilter", filename : 'C:\\Users\\Yoana\\Desktop\\logsError.txt'},  level: "INFO"},
//   //  fileInfo: {type: "logLevelFilter", filename : 'C:\\Users\\Yoana\\Desktop\\logsInfo.txt', "maxLogSize": 20480, "backups": 3 , "level": "INFO"}
//
// categories: { default: [{ appenders: ['console','fileAll','fileError','fileDebug','fileInfo'], level: 'all' }],

// log4js.configure({
//     appenders: {
//         console: { type: "console" },
//         fileAll: {type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logsAll.txt', "maxLogSize": 20480, "backups": 3 , "level": "ERROR"},
//         // logfaces: { type: 'logFaces-HTTP', url: 'http://localhost:9700' },
//         fileError: {type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logsError.txt', "maxLogSize": 20480, "backups": 3 , "level": "ERROR"},
//         fileDebug: {type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logsDebug.txt', "maxLogSize": 20480, "backups": 3 ,"level": "ERROR"},
//         fileInfo: {type: "file", filename : 'C:\\Users\\Yoana\\Desktop\\logsInfo.txt', "maxLogSize": 20480, "backups": 3 , "level": "DEBUG"}
//     },
//     categories: {
//         // default: { appenders: [ 'console', 'logfaces' , 'file' ], level: 'debug' }
//         // default: { appenders: [ 'console' , 'fileAll','fileError','fileDebug','fileInfo' ], level: 'debug' }
//         default: {
//             appenders:
//                 ['console', 'fileAll', 'fileError', 'fileDebug', 'fileInfo'], level: 'all'}
//         // default: { appenders: [ 'console' ],level: 'all'} ,
//         //          { appenders: [ 'fileAll' ],level: 'all'},
//         //          { appenders: [ 'fileError' ],level: 'all'},
//         //          { appenders: [ 'fileDebug' ],level: 'all'},
//         //          { appenders: [ 'fileInfo' ],level: 'all'}
//     }
// });
//
// module.exports =
//     {
//         fileAll : log4js.getLogger('fileAll'),
//         fileError : log4js.getLogger('fileError'),
//         fileDebug : log4js.getLogger('fileDebug'),
//         fileInfo : log4js.getLogger('fileInfo')
//
//     }

// setInterval(() =>
// {
//     logger.level = 'error';
//     logger.debug("Some debug message");
//     logger.info('Some info message.');
//     logger.warn("Warning ...");
//     logger.error("ERROR ");
//     logger.fatal("FATAL ")
//
// }, 2000);