const axios = require('axios');

exports.handler = async (event, context) => {
  const API_URL = 'http://38.57.232.66:3031/v1/ListInstall';
  const API_TOKEN = process.env.API_TOKEN;

  try {
    const response = await axios.post(API_URL, {
      token: API_TOKEN,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    return {
      statusCode: error.response ? error.response.status : 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};