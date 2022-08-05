/**
 *  Database (DynamoDB)
 *  Handles db connection
 */
 const AWS = require('aws-sdk'),
 Env = require('./env'),
 Logger = require('./logger.js');

let dynamoClient = null;

/**
*  Init dynamo client with the proper aws config
*/
const _init = () => {
 if (!dynamoClient) {
   let awsConfig = { region: Env.fetch('AWS_DEFAULT_REGION') };

   // AWS_DYNAMO_ENDPOINT needs to be defined only when working in local
   if (!!Env.fetch('AWS_DYNAMO_ENDPOINT', true)) {
     awsConfig['endpoint'] = Env.fetch('AWS_DYNAMO_ENDPOINT');
   }

   AWS.config.update(awsConfig);

   dynamoClient = new AWS.DynamoDB.DocumentClient();
 }
 return dynamoClient;
};

module.exports = {
 init: _init,
};