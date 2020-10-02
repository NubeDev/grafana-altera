import { IAlert } from './alert.model';
import { ISeverityCount } from './severity-count.model';
import { IStatusCount } from './status-count.model';

export interface IRootObject {
  alerts: IAlert[];
  autoRefresh: boolean;
  lastTime: string;
  more: boolean;
  page: number;
  pageSize: number;
  pages: number;
  severityCounts: ISeverityCount;
  status: string;
  statusCounts: IStatusCount;
  total: number;
}
