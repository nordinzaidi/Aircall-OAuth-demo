/**
 *  OAuth Controller
 *
 *  Read this tutorial for more information:
 *  https://developer.aircall.io/tutorials/how-aircall-oauth-flow-works/
 */
 const { access } = require('fs');
 const path = require('path'),
 Logger = require('./../modules/logger'),
 Env = require('./../modules/env'),
 AircallAPI = require('../modules/aircall_api_requester'),
 Company = require('./../models/company');


/**
*  [GET] /oauth/install
*  Redirect request to Aircall's consent page
*  Second step of Aircall OAuth flow: https://developer.aircall.io/api-references/#oauth-flow
*/
const _install = (req, res) => {
    
    // Get values from .env
    const baseURL = Env.fetch('APP_BASE_URL');
    const oauthEndpoint = Env.fetch('APP_OAUTH_ENDPOINT')
    
    // Prepare vars for buidling URL
    const appRedirectUrl = baseURL + oauthEndpoint ;
    const oauthUrl = Env.fetch('AIRCALL_OAUTH_AUTHORIZE_URL');
    const oauthId = Env.fetch('AIRCALL_OAUTH_ID');

    // Define Aircall's consent page url
    const url = `${oauthUrl}?client_id=${oauthId}&redirect_uri=${appRedirectUrl}&response_type=code&scope=public_api`;

    res.redirect(url);
};


/**
*  [GET] /oauth/callback
*  Requested by Aircall once the user has authorized the application
*  Aircall must send a `code` query params
*  Fifth step of Aircall OAuth flow: https://developer.aircall.io/api-references/#oauth-flow
*/
const _callback = async (req, res) => {

    const errorPath = path.join(__dirname, '..', 'public', 'error.html');
    let accessToken = false;

    // Check for errors
    if (!req.query) {
        Logger.error('[OauthCtrl][_callback] No query params provided');
        res.sendFile(errorPath);
        return;
    }

    if (!!req.query.error) {
        Logger.error('[OauthCtrl][_callback] Error:' + JSON.stringify(req.query.error));
        res.sendFile(errorPath);
        return;
    }

    if (!req.query.code) {
        Logger.error('[OauthCtrl][_callback] No authorization code provided.');
        res.sendFile(errorPath);
        return;
    }

    /**
     * If no errors then get the final token. 
     * It will be stored and used to access API on behalf the 3rd party company/user.
     */ 
    try {   
        accessToken = await AircallAPI.exchangeOauthCode(req.query.code); 
        // console.log(`Token given for this customer is: ${accessToken}.`);
    } catch (e) {
        Logger.error(e.message);
        res.status(503).sendFile(errorPath);
    }

    // Now that we have the token let's call the API.
    if(!!accessToken){
        try {
            let companyData = await AircallAPI.GET('/v1/company', accessToken)
            res.status(201).json({
                // 'token': accessToken,
                'company': companyData
            }); 
        } catch (e) {
           Logger.error(e.message);
           res.status(503).sendFile(errorPath);            
        }
    }

};



/**
*  [GET] /oauth/success
*/
const _success = (req, res) => {
 const oauthSuccessUrl = Env.fetch('AIRCALL_OAUTH_SUCCESS_URL');
 res.redirect(oauthSuccessUrl);
};

module.exports = {
 install: _install,
 callback: _callback,
 success: _success,
};