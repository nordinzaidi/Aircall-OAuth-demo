/**
 *  Company model
 *
 *  Stores the following fields in DynamoDB
 *  - createdAt: UTC string of when the object was created
 *  - apiToken: string used to send API requests to Aircall
 *  - webhookToken: token sent in every Webhook payload Aircall sends
 */
 const Env = require('./../modules/env'),
 Logger = require('./../modules/logger'),
 AircallAPI = require('../modules/aircall_api_requester'),
 dynamoClient = require('./../modules/db').init();

const DB_TABLE_NAME = Env.fetch('DYNAMODB_TABLE') || 'Companies';

/**
*  Company JS class
*/
class CompanyClass {
 createdAt = null;
 apiToken = null;
 webhookToken = null;

 constructor(apiToken, webhookToken) {
   this.createdAt = new Date().toUTCString();
   this.apiToken = apiToken;
   this.webhookToken = webhookToken;
 }

 /**
  *  Save a company instance in DynamoDB
  */
 async save() {
   let params = {
     TableName: DB_TABLE_NAME,
     Item: {
       CreatedAt: this.createdAt,
       ApiToken: this.apiToken,
       WebhookToken: this.webhookToken,
     },
   };

   try {
     await dynamoClient.put(params).promise();
   } catch (e) {
     throw new Error('[Company][save] Error:' + e.message);
   }
 }

 /**
  *  Static methods
  */

 /**
  *  Retrieve Company in DyanoDB
  */
 static async getFromWebhookToken(webhookToken) {
   const params = {
     TableName: DB_TABLE_NAME,
     KeyConditionExpression: 'WebhookToken = :i',
     ExpressionAttributeValues: {
       ':i': webhookToken,
     },
   };

   let company = null;
   try {
     const { Items, Count } = await dynamoClient.query(params).promise();
     if (Count > 1) {
       Logger.warn(
         `[Company][getFromWebhookToken] More than 1 company found with webhookToken ${webhookToken}`
       );
     }
     company = Items[0];
   } catch (e) {
     throw new Error('[Company][getFromWebhookToken] Error:' + e.message);
   }
   return company;
 }

 /**
  *  Create a company by:
  *   1. creating an Aircall access token
  *   2. creating an Aircall Webhook
  */
  static async createFromOauth(accessToken) {
    // 2. Create Aircall Webhook
    let webhookToken = await AircallAPI.createAircallWebhook(accessToken);
    // 3. Save Company object
    let company = new CompanyClass(accessToken, webhookToken);
    await company.save();
 
    return company;
  }
  
}

module.exports = CompanyClass;