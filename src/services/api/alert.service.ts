import axios from 'axios';

import api from './index';
import config from 'shared/config/config.json';

let queryInProgress: any;

const actions = {
  getAlerts(query: object) {
    if (query && queryInProgress) {
      queryInProgress.cancel('Too many search requests. Cancelling current query.');
    }
    queryInProgress = axios.CancelToken.source();
    let config = {
      params: query,
      cancelToken: queryInProgress.token
    };
    return api.get('/alerts', config);
  }
}

export default {

  getAlerts() {
    let params = new URLSearchParams();

    // append filter params to query params
    // config.filter.environment && params.append('environment', state.filter.environment)
    config.filter.status && config.filter.status.map(st => params.append('status', st));
    // config.filter.customer && config.filter.customer.map(c => params.append('customer', c))
    // config.filter.service && config.filter.service.map(s => params.append('service', s))
    // config.filter.group && config.filter.group.map(g => params.append('group', g))

    return actions.getAlerts(params);
  }
}
