import api from './index'
// import axios from 'axios'

// let queryInProgress;

export default {
  getAlerts() {
    return api.get('/alerts');
  }
}
