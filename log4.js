
const { configure, getLogger } =require( 'log4js');

// appenders
const path = require('path');


logfiles = function logfiles(file=''){
    if(file<=1){
        configure({
            appenders: {
              console: { type: 'stdout', layout: { type: 'colored' } },
              dateFile: {
                type: "dateFile",
                filename: `./logs/alllog.log`,
                layout: { type: 'basic' }, //different layouts - are basic,colored,pattern,messagePassThrough,dummy

                compress: true,  /* compress - boolean (default false) - compress the backup files using gzip 
                                  (backup files will have .gz extension) */

                //daysToKeep: 1, 
                numBackups : 2,
                /** numBackups - integer (default 1) - the number of old files 
                                  that matches the pattern to keep (excluding the hot file). */

                keepFileExt: true   /*keepFileExt - preserve the file extension when rotating log files 
                                    (file.log becomes file.2017-05-30.log instead of file.log.2017-05-30).*/
              },
              everything: {
                type: "file",  
                filename: "all-the-logs.log", /*filename - the path of the file where you want your logs written.*/

                maxLogSize: 1000000,  /* maxLogSize - integer (optional, defaults to undefined) - the maximum size (in bytes) for the log file. If not specified or 0, then no log rolling will happen. 
                                        maxLogSize can also accept string with the size suffixes: K, M, G such as 1K, 1M, 1G.*/

                backups: 3, /**backups - integer (optional, defaults to 5) - the number of old log files
                             to keep during log rolling (excluding the hot file). */
                compress: true, /**compress - boolean (default false) - compress the backup files using gzip (backup files will have .gz extension) */
              },

            },
              categories: {
              default: { appenders: ['console', 'dateFile'], level: "ALL" },
              app : { appenders : ['everything'], level: "info"}  /**Level - a log level is the severity or priority of a log event
               (debug, info, etc). Whether an appender will see the event or 
               not is determined by the category’s level. If this is less than or 
               equal to the event’s level, it will be sent to the category’s appender(s).
               priority order - 
               ALL < TRACE < DEBUG < INFO < WARN < ERROR < FATAL < MARK < OFF - note that 
               OFF is intended to be used to turn off logging */
            }
          });
    }
    else  configure({
        appenders: {
          console: { type: 'stdout', layout: { type: 'colored' } },
          dateFile: {
            type: 'dateFile',
            filename: `./logs/${file}`,
            layout: { type: 'basic' },
            compress: true,
            numBackups : 2,
            keepFileExt: true
          },
          everything: {
            type: "file",  
            filename: "all-the-logs.log", /*filename - the path of the file where you want your logs written.*/

            maxLogSize: 1000000,  /* maxLogSize - integer (optional, defaults to undefined) - the maximum size (in bytes) for the log file. If not specified or 0, then no log rolling will happen. 
                                    maxLogSize can also accept string with the size suffixes: K, M, G such as 1K, 1M, 1G.*/

            backups: 3, /**backups - integer (optional, defaults to 5) - the number of old log files
                         to keep during log rolling (excluding the hot file). */
            compress: true, /**compress - boolean (default false) - compress the backup files using gzip (backup files will have .gz extension) */
          },
        },
          categories: {
          default: { appenders: ['console', 'dateFile'], level: "debug" },
          app : { appenders : ['everything'], level: "debug"}
        }
      });
  
}
logger = getLogger();
// logger = getLogger("app");  // to specify the costume categery 
// fetch logger and export
module.exports = {logger, logfiles};


