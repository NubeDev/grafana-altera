import { IAlert } from './alert.model';
import { ISeverityCounts } from './severity-counts.model';
import { IStatusCounts } from './status-counts.model';

export interface IRootObject {
  alerts: IAlert[];
  autoRefresh: boolean;
  lastTime: string;
  more: boolean;
  page: number;
  pageSize: number;
  pages: number;
  severityCounts: ISeverityCounts;
  status: string;
  statusCounts: IStatusCounts;
  total: number;
}
