module.exports = (statusCode, data) => ({
  statusCode,
  body: JSON.stringify(data),
  headers: {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Credentials' : true,
  },
});
