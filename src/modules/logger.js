/**
 *  Winston logger module
 *  https://github.com/winstonjs/winston
 */
 
 const { createLogger, format, transports } = require('winston');
 
 let _logger = null;
  
 // Prettify the console output in LOCAL
 let consoleOptions =
   process.env.LOCAL === 'true'
     ? { format: format.combine(format.colorize(), format.simple()) }
     : {};
  
 let maxLoggingLevel = process.env.DEBUG === 'true' ? 'info' : 'warn';
  
 module.exports =
   _logger ||
   createLogger({
     level: maxLoggingLevel,
     exitOnError: false,
     format: format.json(),
     transports: [new transports.Console(consoleOptions)],
   });