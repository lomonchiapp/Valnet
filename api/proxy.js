const axios = require('axios');

module.exports = async (req, res) => {
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

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({ message: error.message });
  }
};