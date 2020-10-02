import axios from 'axios';

import { APP_CONSTS } from 'shared/constants/app.constants';
import { SERVER_API } from 'shared/constants/server-api.constants';

// Create instance axios
const instanceAxios = axios.create();

instanceAxios.get(SERVER_API.GRA_FETCH_DATASOURCE)
  .then(response => {
    const data = response.data;
    const datasourceId = data.find((e: any) => e.type === APP_CONSTS.DATASOURCE_TYPE).id;

    // Set base URL
    instanceAxios.defaults.baseURL = `${SERVER_API.GRA_DATASOURCE_PROXY}/${datasourceId}`;
  })
  .catch(error => {
    return { status: 'error', message: error, title: 'Error' };
  });

export default instanceAxios;
