import axios from 'axios';
import moment from 'moment';

import api from './index';
import { IAlertResponse } from 'shared/models/model-responses/alert-response';
import { SERVER_API } from 'shared/constants/server-api.constants';
import { IServiceResponse } from 'shared/models/model-responses/service-response';

let queryInProgress: any;

const actions = {
  getAlerts(query: object) {
    if (query && queryInProgress) {
      queryInProgress.cancel('Too many search requests. Cancelling current query.');
    }
    queryInProgress = axios.CancelToken.source();
    const config = {
      params: query,
      cancelToken: queryInProgress.token
    };
    return api.get(SERVER_API.ALE_FETCH_ALERTS, config);
  },
  getServices(query: object) {
    const config = {
      params: query
    }
    return api.get(SERVER_API.ALE_FETCH_SERVICES, config);
  }
}

export default {

  getAlerts({ rootGetters, commit, state }: any) {
    const params = new URLSearchParams();

    // append filter params to query params
    state.filter.environment && params.append('environment', state.filter.environment);
    state.filter.status && state.filter.status.map((st: any) => params.append('status', st));
    state.filter.customer && state.filter.customer.map((c: any) => params.append('customer', c));
    state.filter.service && state.filter.service.map((s: any) => params.append('service', s));
    state.filter.group && state.filter.group.map((g: any) => params.append('group', g));

    // add server-side sorting
    const sortBy = state.pagination.sortBy;
    if (typeof sortBy === 'string') {
      params.append('sort-by', (state.pagination.descending ? '-' : '') + sortBy);
    } else {
      sortBy.map((sb: any) => params.append('sort-by', sb));
    }

    // add server-side paging
    state.pagination.page && params.append('page', state.pagination.page);
    state.pagination.rowsPerPage && params.append('page-size', state.pagination.rowsPerPage);

    // apply any date/time filters
    if (state.filter.dateRange[0] > 0) {
      params.append(
        'from-date',
        moment.unix(state.filter.dateRange[0]).toISOString()
      );
    } else if (state.filter.dateRange[0] < 0) {
      params.append(
        'from-date',
        moment().utc().add(state.filter.dateRange[0], 'seconds').toISOString()
      );
    }
    if (state.filter.dateRange[1] > 0) {
      params.append(
        'to-date',
        moment.unix(state.filter.dateRange[1]).toISOString()
      );
    } else if (state.filter.dateRange[1] < 0) {
      params.append(
        'to-date',
        moment().utc().add(state.filter.dateRange[1], 'seconds').toISOString()
      );
    }

    return actions.getAlerts(params)
      .then((res: IAlertResponse) => {
        return {
          alerts: res.alerts,
          total: res.total,
          pageSize: res.pageSize
        };
      })
      // tslint:disable-next-line: no-console
      .catch(error => console.log(error));
  },
  getServices() {
    return actions.getServices({})
      .then((res: IServiceResponse) => {
        return {
          services: res.services
        };
      })
      // tslint:disable-next-line: no-console
      .catch(error => console.log(error));
  },
}
