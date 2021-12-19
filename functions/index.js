const functions = require('firebase-functions');
const axios = require('axios');
const cors = require('cors')({ origin: true });

exports.getDcardPosts = functions
  .region('asia-east1')
  .https.onRequest((request, response) => {
    cors(request, response, () => {
      axios(encodeURI(`https://www.dcard.tw/v2/posts?popular=true`))
        .then((res) => JSON.parse(JSON.stringify(res.data)))
        .then((json) => response.json(json));
    });
  });
