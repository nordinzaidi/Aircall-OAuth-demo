/**
 *  Webhooks Controller
 *
 *  Read this tutorial for more information:
 *  https://developer.aircall.io/tutorials/send-insights-to-agents/
 */
 const Logger = require('./../modules/logger'),
 OpenWeather = require('./../libs/openweathermap'),
 Company = require('./../models/company'),
 InsightCard = require('./../models/insight_card'),
 Region = require('./../models/region');

const WEBHOOK_EVENTS_HANDLED = ['call.created'];

/**
*  [POST] /webhooks
*  Endpoint request by Aircall each time a Webhook event is fired
*/
const _index = (req, res) => {
 // Avoid Aircall's webhook deactivation by setting HTTP Code to 202 Accepted
 res.status(202);

 if (!req.body || !req.body.event) {
   res.json({ error: 'Body or event fields not defined' });
   return;
 }

 // Only handle specifc Aircall events
 if (!!WEBHOOK_EVENTS_HANDLED.includes(req.body.event)) {
   if (!!req.body.data && !!req.body.data.id) {
     // Asynchronously triggers the flow
     Logger.info(
       `[WebhooksCtrl][_index] Webhook for call ${req.body.data.id} received.`
     );
     startFlow(req.body);
     res.json({
       message: `Processing request for callId ${req.body.data.id}...`,
     });
   } else {
     res.json({
       error: 'data or data.id not defined',
     });
   }
 } else {
   res.json({
     error: `'${req.body.event}' event not handled`,
   });
 }
};

/*********************************************************/
/*                   PRIVATE FUNCTIONS                   */
/*********************************************************/

/**
*  Handles webhook payload logic:
*  1. Authenticate request
*  2. Extract location information from number
*  3. Get weather
*  4. Send Insight Card
*/
const startFlow = async (webhookPayload) => {
 const callData = !!webhookPayload && webhookPayload.data;
 if (!callData) {
   Logger.warn('[WebhooksCtrl][startFlow] callData undefined');
   return;
 }

 try {
   // 1. Authenticate request
   let companyData = await Company.getFromWebhookToken(webhookPayload.token);
   if (!companyData) {
     return;
   }

   // 2. Extract location information from number
   let region = new Region(callData.raw_digits);
   let location = region.get();

   if (!location) {
     return;
   }

   // 3. Get weather
   let weatherData = await OpenWeather.getCityWeather(
     location.city,
     location.country
   );

   if (!weatherData) {
     return;
   }

   // 4. Build & send Insight Card
   let card = new InsightCard(location, weatherData);
   card.send(callData.id, companyData.ApiToken);
 } catch (e) {
   Logger.error(e.message);
 }
};

module.exports = {
 index: _index,
};