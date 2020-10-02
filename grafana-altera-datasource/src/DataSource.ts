import { DataQueryResponse, DataSourceApi, DataSourceInstanceSettings } from '@grafana/data';
import { getBackendSrv } from '@grafana/runtime';
import { GenericOptions, GrafanaQuery, QueryRequest } from './types';

export class DataSource extends DataSourceApi<GrafanaQuery, GenericOptions> {
  url: string;
  withCredentials: boolean;
  headers: any;

  constructor(instanceSettings: DataSourceInstanceSettings<GenericOptions>) {
    super(instanceSettings);

    this.url = instanceSettings.url === undefined ? '' : instanceSettings.url;

    this.withCredentials = instanceSettings.withCredentials !== undefined;
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
    if (typeof instanceSettings.basicAuth === 'string' && instanceSettings.basicAuth.length > 0) {
      this.headers['Authorization'] = instanceSettings.basicAuth;
    }
  }

  query(options: QueryRequest): Promise<DataQueryResponse> {
    return this.doRequest({
      url: `${this.url}/api/config`,
      method: 'GET',
    });
  }

  testDatasource(): Promise<any> {
    return this.doRequest({
      url: `${this.url}/api/config`,
      method: 'GET',
    }).then(response => {
      if (response.status === 200) {
        console.log('Success: ' + 'Data source is working');
        return {
          status: 'success',
          message: 'Data source is working',
          title: 'Success'
        };
      } else {
        console.log('Error: ' + `Data source is not working: ${response.message}`);
        return {
          status: 'failed',
          message: `Data source is not working: ${response.message}`,
          title: 'Error'
        };
      }
    }).catch(error => {
      return {
        status: 'failed',
        message: `Data source is not working: ${error}`,
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
