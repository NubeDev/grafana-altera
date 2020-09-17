import api from './index'

export default {
  getEnvironments(query: object) {
    let config = {
      params: query
    };
    return api.get('/environments', config);
  }
}
