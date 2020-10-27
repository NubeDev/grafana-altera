import axios from 'axios';

import { APP_CONSTS } from 'shared/constants/app.constants';

// Create instance axios
const instanceAxios = axios.create();

instanceAxios.get('api/datasources')
  .then(response => {
    const data = response.data;
    const datasourceId = data.find((e: any) => e.type === APP_CONSTS.DATASOURCE_TYPE).id;

    // Set base URL
    instanceAxios.defaults.baseURL = `api/datasources/proxy/${datasourceId}`;
  })
  .catch(error => {
    return { status: 'error', message: error, title: 'Error' };
  });

export default instanceAxios;
