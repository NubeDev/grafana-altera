import api from './index';

export default {

  getRemoteConfig() {
    return api
      .get('/config')
      .then(response => {
        return response;
      })
      .catch((error: any) => {
        alert(
          'ERROR: Failed to connect to Alerta API due to missing or invalid ' +
          'config.json file.\n\n' +
          'Please confirm a config.json file exists, contains an "endpoint" ' +
          'setting and is in the same directory as the application index.html ' +
          'file.'
        );
        throw (error);
      })
  }
}
