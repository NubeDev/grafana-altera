import { PanelPlugin } from '@grafana/data';

import { GrafanaAlertaOptions } from './types';
import { AppComponent } from './App';
import { optionsBuilder } from './options';

export const plugin = new PanelPlugin<GrafanaAlertaOptions>(AppComponent)
  .setNoPadding()
  .setPanelOptions(optionsBuilder);
