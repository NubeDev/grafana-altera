import { DataQuery, DataQueryRequest, DataSourceJsonData, VariableModel } from '@grafana/data';
import { TemplateSrv as GrafanaTemplateSrv } from '@grafana/runtime';

export interface DataSourceOptions extends DataSourceJsonData {}

export interface QueryRequest extends DataQueryRequest<GrafanaQuery> {
  adhocFilters?: any[];
}

export interface GrafanaQuery extends DataQuery {
  alias?: string;
  target?: string;
  data: string;
  type: Format;
}

export interface GenericOptions extends DataSourceJsonData {}
