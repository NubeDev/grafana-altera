const express = require('express');
const app = express();
const axios = require('axios');

const axiosImpl = axios.create({
  baseURL: 'http://188.166.245.250:8080/api'
});

app.get('/alerts', (req, res) => {
  axiosImpl.get('/alerts')
    .then(response => {
      res.send(response.data);
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(8080, () =>
  console.log(`App listening on port 8080!`)
);
