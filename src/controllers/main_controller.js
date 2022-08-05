/**
 *  Main Controller
 */
 const path = require('path'),
 Logger = require('./../modules/logger');

/**
*  [GET] /
*  Render main page
*/
const _index = (req, res) => {
 res.json({
   error: null,
   data: {
     message: 'Hello! 🌤',
   },
 });
};

/**
*  [GET] /health
*  Render an empty 200 page
*  Used by cron to check if server is up
*/
const _health = (req, res) => {
 res.status(200).json({ status: 'available' });
};

module.exports = {
 index: _index,
 health: _health,
};