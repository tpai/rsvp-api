require('dotenv').config();

const FormData = require('form-data');
const fetch = require('isomorphic-fetch');

const recaptcha = (response) => {
  const form = new FormData();
  form.append('secret', process.env.RECAPTCHA_SECRET);
  form.append('response', response);

  return fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    body: form,
  }).then(res => res.json());
};

module.exports = recaptcha;
