import { ISeverityCount } from './severity-count.model';
import { IStatusCount } from './status-count.model';

export interface IService {
  count: number;
  environment: string;
  service: string;
  severityCounts: ISeverityCount;
  statusCounts: IStatusCount;
}
