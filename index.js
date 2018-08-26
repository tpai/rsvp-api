require('dotenv').config();

const { putItem } = require('./lib/aws');
const verify = require('./lib/recaptcha');
const generateResponse = require('./lib/generateResponse');

const handler = async ({
  body,
  httpMethod,
  path,
}) => {
  console.log(httpMethod, path);
  if (httpMethod === 'POST' && path === process.env.API_GATEWAY_RESOURCE) {
    try {
      const { response, ...restProps } = JSON.parse(body);
      const { success } = await verify(response);
      if (success) {
        const json = await putItem(response, restProps);
        return generateResponse(200, 'success');
      } else {
        return generateResponse(401, 'unauthorized');
      }
    } catch (err) {
      console.log(err);
      return generateResponse(400, 'invalid request');
    }
  }
  return generateResponse(404, 'not found');
};

exports.handler = handler;
