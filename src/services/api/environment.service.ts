import api from './index'

export default {
  getEnvironments(query: object) {
    const config = {
      params: query
    };
    return api.get('/environments', config);
  }
}
