import axios, { AxiosRequestConfig } from 'axios';

import instanceAxios from '../config';

const actions = {
  getUsername(config?: AxiosRequestConfig) {
    const baseUrl = instanceAxios.defaults.baseURL;
    axios.defaults.baseURL = baseUrl && baseUrl.replace('proxy/', '');
    return axios.request({ ...config, url: '', method: 'GET', data: null }).then(response => {
      return response.data;
    });
  }
}

export default {

  getUsername() {
    return actions.getUsername()
      .then((res) => {
        return {
          basicAuthUser: res.basicAuthUser
        };
      })
      .catch(error => console.log(error));
  }
}
