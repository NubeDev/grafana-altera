import axios, { AxiosRequestConfig } from 'axios';
import { IGrafanaUser } from 'shared/models/model-data/grafana-user.model';

import api from './index';

const actions = {
  getMeAttributes() {
    return api.get('/api/user/me/attributes');
  },
  getGrafanaUsers(config?: AxiosRequestConfig) {
    axios.defaults.baseURL = '';
    return axios.request({
      ...config,
      url: '/api/org/users',
      method: 'GET',
      data: null
    })
    .then(response => response.data);
  }
}

export default {

  getUserPrefs() {
    return actions.getMeAttributes()
      .then(({ attributes }) => {
        return {
          attributes
        };
      });
  },
  getGrafanaUsers() {
    return actions.getGrafanaUsers()
      .then((response: IGrafanaUser[]) => response);
  }
}
