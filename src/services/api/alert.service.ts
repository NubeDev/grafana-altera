import api from './index'
// import axios from 'axios'

// let queryInProgress;
let config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
    "Content-Type": "application/json",
  },
  "auth": {
    "username": "alice",
    "password": "Pa55w0rd"
  }
}
export default {
  getAlerts() {
    return api.get('/alerts', config);
  }
}
