export interface IAlert {
  environment: string,
  event: string,
  group: string,
  origin: string,
  resource: string,
  service: Array<string>,
  severity: string,
  text: string,
  type: string,
  value: string,
  status: string,
  createTime: string,
  lastReceiveTime: string,
  timeout: string,
  duplicateCount: string,
  customer: string
}
