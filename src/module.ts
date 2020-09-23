import { PanelPlugin } from '@grafana/data';

import { IGrafanaAlertaOptions } from './types';
import { AppComponent } from './App';
import { optionsBuilder } from './options';

export const plugin = new PanelPlugin<IGrafanaAlertaOptions>(AppComponent)
  .setNoPadding()
  .setPanelOptions(optionsBuilder);
