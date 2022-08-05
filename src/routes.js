/**
 *  Main router file
 *  Declare each endpoint and redirect requests to the right controller
 */
 
 const mainCtrl = require('./controllers/main_controller'),
 oauthCtrl = require('./controllers/oauth_controller'),
 webhooksCtrl = require('./controllers/webhooks_controller'),
 Logger = require('./modules/logger');

const _init = (app) => {
 if (!app) {
   throw '[Router] app is not defined';
 }

 // Log each request
 app.use(logRequest);

 /**
  *  [GET] /
  *  Render the main page
  */
 app.get('/', mainCtrl.index);

 /**
  *  [GET] /health
  *  Healthcheck endpoint
  */
 app.get('/health', mainCtrl.health);

 /**
  *  [GET] /oauth/install
  *  Install page, redirects to Aircall authorize URL
  */
 app.get('/oauth/install', oauthCtrl.install);

 /**
  *  [GET] /oauth/callback
  *  Called by Aircall once the admin has authorized the application scope
  */
 app.get('/oauth/callback', oauthCtrl.callback);

 /**
  *  [GET] /oauth/success
  *  Success page, redirect to Aircall' success
  */
 app.get('/oauth/success', oauthCtrl.success);

 /**
  *  [POST] /webhooks
  *  Fetch weather information and post an Insight Card
  *  Called by Aircall each time a webhook event is posted
  */
 app.post('/webhooks', webhooksCtrl.index);

 /**
  *  [GET/POST/PUT] Handle 404
  */
 app.get('*', render404);
 app.post('*', render404);
 app.put('*', render404);
};

/**
*  Render a HTTP 404 code with error message
*/
const render404 = (req, res) => {
 Logger.warn(`[routes][${req.method}][${req.url}] - 404 not found`);
 res.status(404).json({
   error: 'route not found',
 });
};

/**
*  Log request's info
*/
const logRequest = (req, res, next) => {
 // Remove sensitive information from the URL before logging it
 const cleanedURL = !!req.url && req.url.split('?')[0];

 // Avoid logging each `[GET] /health` requests
 if (cleanedURL !== '/health') {
   Logger.info(`[Router][${req.method}]` + cleanedURL, {
     http_method: req.method,
     url: cleanedURL,
   });
 }

 next();
};

module.exports = {
 init: _init,
};