// import moment from 'moment';

import api from './index';
import { IEnvironmentResponse } from 'shared/models/model-responses/environment-response';

const actions = {
  getEnvironments(query: object) {
    let config = {
      params: query
    };
    return api.get('/environments', config);
  }
}

export default {

  getEnvironments({ commit, state }: any) {
    let params = new URLSearchParams(state.query);

    // append filter params to query params
    state.filter.status && state.filter.status.map((st: any) => params.append('status', st));
    state.filter.customer && state.filter.customer.map((c: any) => params.append('customer', c));
    state.filter.service && state.filter.service.map((s: any) => params.append('service', s));
    state.filter.group && state.filter.group.map((g: any) => params.append('group', g));

    // apply any date/time filters
    // if (state.filter.dateRange[0] > 0) {
    //   params.append(
    //     'from-date',
    //     moment.unix(state.filter.dateRange[0]).toISOString()
    //   );
    // } else if (state.filter.dateRange[0] < 0) {
    //   params.append(
    //     'from-date',
    //     moment().utc().add(state.filter.dateRange[0], 'seconds').toISOString()
    //   );
    // }
    // if (state.filter.dateRange[1] > 0) {
    //   params.append(
    //     'to-date',
    //     moment.unix(state.filter.dateRange[1]).toISOString()
    //   );
    // } else if (state.filter.dateRange[1] < 0) {
    //   params.append(
    //     'to-date',
    //     moment().utc().add(state.filter.dateRange[1], 'seconds').toISOString()
    //   );
    // }

    return actions.getEnvironments(params)
      .then((res: IEnvironmentResponse) => {
        return {
          environments: res.environments
        };
      })
      .catch(error => console.log(error));
  }
}
