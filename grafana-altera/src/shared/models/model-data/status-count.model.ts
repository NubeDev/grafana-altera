export interface IStatusCount {
  open?: number;
  assign?: number;
  ack?: number;
  closed?: number;
  expired?: number;
  blackout?: number;
  shelved?: number;
  unknown?: number;
}
