RSVP API
===

This repo is API lambda function for [RSVP repo](https://github.com/tpai/rsvp) based on Node.js

## Services

- AWS API Gateway
- AWS Lambda
- AWS DynamoDB
- Google reCAPTCHA v2

## Deployment

Prepare all the cloud services first, and fill the following environment variables in `.env`.

```
# if you want to test on local
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=

# dynamo db table name
DYNAMODB_TABLE=

# API gateway resource name
API_GATEWAY_RESOURCE=

# recaptcha secret key
RECAPTCHA_SECRET=
```

Build an archived file and upload to lambda manually.

```
npm run build
```
