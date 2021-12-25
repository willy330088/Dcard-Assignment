const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(
  cors({
    origin: '*',
  })
);

app.get('/getDcardPosts', (request, response) => {
  const url =
    request.query.isFirstPage === 'true'
      ? `https://www.dcard.tw/v2/posts?popular=true`
      : `https://www.dcard.tw/v2/posts?popular=true&before=${request.query.lastPost}`;
  axios(encodeURI(url))
    .then((res) => JSON.parse(JSON.stringify(res.data)))
    .then((json) => response.json(json));
});

app.listen(3000, () => {
  console.log('The application is running on localhost: 3000!');
});
