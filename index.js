require('dotenv').config();

const { putItem } = require('./lib/aws');
const verify = require('./lib/recaptcha');

const handler = async ({
  body,
  httpMethod,
  path,
}) => {
  if (httpMethod === 'POST' && path === process.env.API_GATEWAY_RESOURCE) {
    try {
      const { response, ...restProps } = JSON.parse(body);
      const { success } = await verify(response);
      if (success) {
        const json = await putItem(response, restProps);
        return {
          statusCode: '200',
          body: 'success',
        };
      } else {
        return {
          statusCode: '401',
          body: 'unauthorized',
        };
      }
    } catch (err) {
      console.log(err);
      return {
        statusCode: '400',
        body: 'invalid request',
      };
    }
  }
  return {
    statusCode: '404',
    body: 'Not Found',
  };
};

exports.handler = handler;
