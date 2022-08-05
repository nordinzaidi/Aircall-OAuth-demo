/**
 *  Insight Card model
 *
 *  Check API documentation
 *  https://developer.aircall.io/api-references/#insight-cards
 */
 const Env = require('./../modules/env'),
 Logger = require('./../modules/logger'),
 AircallAPI = require('../modules/aircall_api_requester');

/**
*  InsightCard JS class
*/
class InsightCardClass {
 contents = [];

 /**
  *  Build the JSON `contents` object that has to be sent in Insight Cards
  */
 constructor(locationData, weatherData) {
   this.contents = [];

   // City/Region
   if (!!locationData && locationData.city) {
     this.contents.push({
       type: 'shortText',
       label: 'City',
       text: locationData.city,
       link: `https://en.wikipedia.org/w/index.php?search=${locationData.city}`,
     });
   }

   // Weather Data
   if (!!weatherData) {
     if (!!weatherData.temps) {
       this.contents.push({
         type: 'shortText',
         label: 'Temperature',
         text: weatherData.temps,
       });
     }
     if (!!weatherData.description) {
       this.contents.push({
         type: 'shortText',
         label: weatherData.description || 'Description',
         text: weatherData.emoji,
       });
     }
   }

   if (this.contents.length > 0) {
     this.contents.push({
       type: 'title',
       text: 'Weather',
     });
   }
 }

 /**
  *  Send an Insight Card request to Aircall asynchronously
  */
 send(callId, apiToken) {
   if (!this.contents.length) {
     return;
   }

   const path = `/v1/calls/${callId}/insight_cards`;
   const headers = { Authorization: `Bearer ${apiToken}` };
   Logger.info(
     `[InsightCard][send] Sending insight card for call ${callId}`,
     this.contents
   );
   try {
      AircallAPI.POST(path, headers, { contents: this.contents });
   } catch (e) {
     Logger.error(e.message);
   }
 }
}

module.exports = InsightCardClass;