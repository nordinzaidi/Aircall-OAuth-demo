/**
 *  Create all DynamoDB tables
 */
 
 const AWS = require('aws-sdk'),
 Env = require('./../src/modules/env');

AWS.config.update({
 region: Env.fetch('AWS_DEFAULT_REGION'),
 endpoint: Env.fetch('AWS_DYNAMO_ENDPOINT'),
});

let table = Env.fetch('DYNAMODB_TABLE') || 'Companies';

let dynamodb = new AWS.DynamoDB();

let params = {
 TableName: 'Companies',
 KeySchema: [{ AttributeName: 'WebhookToken', KeyType: 'HASH' }],
 AttributeDefinitions: [{ AttributeName: 'WebhookToken', AttributeType: 'S' }],
 ProvisionedThroughput: {
   ReadCapacityUnits: 10,
   WriteCapacityUnits: 10,
 },
};

dynamodb.createTable(params, function (err, data) {
 if (err) {
   console.error(
     'Unable to create table. Error JSON:',
     JSON.stringify(err, null, 2)
   );
 } else {
   console.log(
     'Created table. Table description JSON:',
     JSON.stringify(data, null, 2)
   );
 }
});