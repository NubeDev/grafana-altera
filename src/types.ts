type SeriesSize = 'sm' | 'md' | 'lg';

export interface GrafanaAlertaOptions {
  text: string;
  showSeriesCount: boolean;
  seriesCountSize: SeriesSize;
}
