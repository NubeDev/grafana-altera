import { ISeverityCount } from './severity-count.model';
import { IStatusCount } from './status-count.model';

export interface IEnvironment {
  count: number;
  environment: string;
  severityCounts: ISeverityCount;
  statusCounts: IStatusCount;
}
