import { ResponseCommon } from '../model-data/response-common';
import { IAlert } from '../model-data/alert.model';
import { ISeverityCount } from '../model-data/severity-count.model';
import { IStatusCount } from '../model-data/status-count.model';

export interface IAlertResponse extends ResponseCommon {
  alerts: IAlert[];
  autoRefresh: boolean;
  lastTime: string;
  more: boolean;
  page: number;
  pageSize: number;
  pages: number;
  severityCounts: ISeverityCount;
  statusCounts: IStatusCount;
}
