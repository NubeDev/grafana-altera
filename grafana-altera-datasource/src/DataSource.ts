import { DataQueryResponse, DataSourceApi, DataSourceInstanceSettings, MutableDataFrame } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';

import { GenericOptions, GrafanaQuery, QueryRequest } from './types';
import { APP_CONFIG } from 'shared/config/config';

export class DataSource extends DataSourceApi<GrafanaQuery, GenericOptions> {
  url: string;
  withCredentials: boolean;
  headers: any;

  constructor(instanceSettings: DataSourceInstanceSettings<GenericOptions>) {
    super(instanceSettings);

    this.url = instanceSettings.url === undefined ? '' : instanceSettings.url;

    this.withCredentials = instanceSettings.withCredentials !== undefined;
    this.headers = {
      'Access-Control-Allow-Origin': APP_CONFIG.HEADERS_ACCESS_CONTROL_ALLOW_ORIGIN,
      'Content-Type': APP_CONFIG.HEADERS_CONTENT_TYPE
    };
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  query(options: QueryRequest): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) =>
      this.doRequest({
        url: `${this.url}/api/environments`,
        method: 'GET'
      })
      .then(() => {
        const frame = new MutableDataFrame({
          refId: query.refId,
          fields: [],
        });

        return frame;
      })
    );

    return Promise.all(promises).then((data) => ({ data }));
  }

  testDatasource(): Promise<any> {
    return this.doRequest({
      url: `${this.url}/api/environments`,
      method: 'GET'
    }).then(response => {
      if (response.status === 200) {
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success'
        };
      } else {
        return {
          status: 'failed',
          message: `Data source is not working: ${response.statusText}`,
          title: 'Error'
        };
      }
    }).catch(error => {
      return {
        status: 'failed',
        message: `Data source is not working: ${error.status} - ${error.data.message}`,
        title: 'Error'
      };
    });
  }

  doRequest(options: any) {
    options.withCredentials = this.withCredentials;
    options.headers = this.headers;

    return getBackendSrv().datasourceRequest(options);
  }
}
