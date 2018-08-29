require('dotenv').config();

const {
  putItem,
  getItems,
} = require('./lib/aws');
const verify = require('./lib/recaptcha');
const generateResponse = require('./lib/generateResponse');
const removeEmptyStringElements = require('./lib/removeEmptyStringElements');

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
        const json = await putItem(response, removeEmptyStringElements(restProps));
        return generateResponse(200, { message: 'success' });
      } else {
        return generateResponse(401, { message: 'unauthorized' });
      }
    } catch (err) {
      console.log(err);
      return generateResponse(400, { message: 'invalid request' });
    }
  }
  if (httpMethod === 'GET' && path === process.env.API_GATEWAY_RESOURCE) {
    try {
      const json = await getItems();
      return generateResponse(200, json);
    } catch (err) {
      console.log(err);
      return generateResponse(400, { message: 'invalid request' });
    }
  }
  return generateResponse(404, { message: 'not found' });
};

exports.handler = handler;
