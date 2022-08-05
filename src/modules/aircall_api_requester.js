/**
 *  Aircall API requester
 *  Sends HTTPS requests to Aircall's API
 */
 
 const axios = require('axios'),
 Logger = require('./logger'),
 Env = require('./env');

/**
*  Sends a GET request to Aircall Public API
*/
const _get = async (path, accessToken, headers) => {
    
  // Validation
  if (!path) {
    throw new Error('[ApiRequester][_get] path is not defined.');
  }

  if (!accessToken) {
    throw new Error(
      '[ApiRequester][_get] accessToken is undefined'
    );
  }

  // Build URL
  const apiUrl = Env.fetch('AIRCALL_API_URL');
  const url = apiUrl + path;
  
  // Prepare headers (Aircall's API works better with `application/json` type)
  headers = headers || {};
  headers['Content-Type'] = 'application/json';
  headers['Authorization'] = `Bearer ${accessToken}`;


  let httpOptions = { headers };

  try {
    let payload = await axios.get(url, httpOptions);
    return payload.data;
  } catch (e) {
    throw new Error(`[ApiRequester][_get][${url}] ${e.message}`);
  }
 }


/**
*  Sends a POST request to Aircall Public API
*/
const _post = async (path, headers, body) => {
  const apiUrl = Env.fetch('AIRCALL_API_URL');
  if (!path) {
    throw new Error('[ApiRequester][_post] path is not defined.');
  }

  headers = headers || {};
  // Aircall's API works better with `application/json` type
  headers['Content-Type'] = 'application/json';

  const url = apiUrl + path;
  let httpOptions = { headers };

  try {
    let payload = await axios.post(url, body, httpOptions);
    return payload.data;
  } catch (e) {
    throw new Error(`[ApiRequester][_post][${url}] ${e.message}`);
  }
};


/**
*  Create an Access Token to be used with Aircall's API
*/
exchangeOauthCode = async (oauthCode) => {
  if (!oauthCode) {
    throw new Error('[Company][exchangeOauthCode] oauthCode is undefined');
  }

  const body = {
    code: oauthCode,
    redirect_uri:  Env.fetch('APP_BASE_URL') + Env.fetch('APP_OAUTH_ENDPOINT'),
    client_id: Env.fetch('AIRCALL_OAUTH_ID'),
    client_secret: Env.fetch('AIRCALL_OAUTH_SECRET'),
    grant_type: 'authorization_code',
  };
  try {
    let payload = await _post(`/v1/oauth/token`, null, body);
    return payload.access_token;
  } catch (e) {
    Logger.error(e.message);
  }
}
 
/**
 *  Create an Aircall Webhook
 *  and return the Webhook token
 */
createAircallWebhook = async (accessToken) => {
  if (!accessToken) {
    throw new Error(
      '[Company][createAircallWebhook] accessToken is undefined'
    );
  }

  const httpHeaders = { Authorization: `Bearer ${accessToken}` };

  const body = {
    custom_name: 'Aircall Weather',
    url: Env.fetch('APP_BASE_URL') + Env.fetch('APP_WEBHOOK_LISTENER_ENDPOINT'),
    events: ['call.created'],
  };

  try {
    let payload = await _post(`/v1/webhooks`, httpHeaders, body);
    return payload.webhook.token;
  } catch (e) {
    Logger.error(e.message);
  }
}

module.exports = {
 GET: _get,
 POST: _post,
 exchangeOauthCode,
 createAircallWebhook,
};