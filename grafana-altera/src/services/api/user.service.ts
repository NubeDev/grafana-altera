import api from './index';

const actions = {
  getMeAttributes() {
    return api.get('/api/user/me/attributes');
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
  }
}
