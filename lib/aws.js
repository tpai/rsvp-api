require('dotenv').config();

const aws = require('aws-sdk');

aws.config.update({ region: process.env.AWS_DEFAULT_REGION });

module.exports = {
  putItem: (id, payload) => {
    return new aws.DynamoDB.DocumentClient().put({
      TableName: process.env.DYNAMODB_TABLE,
      Item: { id, ...payload },
    }).promise();
  },
};
