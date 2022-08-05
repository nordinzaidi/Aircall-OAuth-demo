/**
 *  Env module
 *  Fetch information from process.env
 */
 const Logger = require('./../modules/logger');
 
 /**
  *  Fetch varName from process.env
  *  Logs an error if varName is not defined (and hideLog is false)
  */
 const _fetch = (varName, hideLog) => {
   const value = process.env[varName];
   if (!value && !hideLog) {
     Logger.error(`[Env] ${varName} is not defined.`);
   }
   return value || '';
 };
  
 module.exports = {
   fetch: _fetch,
 };