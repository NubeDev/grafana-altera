type SeriesSize = 'sm' | 'md' | 'lg';

export interface IGrafanaAlertaOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
