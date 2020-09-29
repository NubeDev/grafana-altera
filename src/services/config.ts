import axios from 'axios';

export default axios.create({
  baseURL: 'http://188.166.245.250:8080/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  auth: {
    username: 'alice',
    password: 'Pa55w0rd'
  }
});
