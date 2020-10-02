import { IAttributes } from './attributes.model';
import { IHistory } from './history.model';

export interface IAlert {
  attributes: IAttributes;
  correlate: any[];
  createTime: string;
  customer: any;
  duplicateCount: number;
  environment: string;
  event: string;
  group: string;
  history: IHistory[];
  href: string;
  id: string;
  lastReceiveId: string;
  lastReceiveTime: string;
  origin: string;
  previousSeverity: string;
  rawData: string[] | null;
  receiveTime: string;
  repeat: boolean;
  resource: string;
  service: string[];
  severity: string;
  status: string;
  tags: string[];
  text: any;
  timeout: number;
  trendIndication: string;
  type: string;
  updateTime: string;
  value: string;
}
