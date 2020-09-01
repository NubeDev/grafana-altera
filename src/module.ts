import { PanelPlugin } from '@grafana/data';

import { GrafanaAlertaOptions } from './types';
import { GrafanaAlertaPanel } from './GrafanaAlertaPanel';
import { optionsBuilder } from './options';

export const plugin = new PanelPlugin<GrafanaAlertaOptions>(GrafanaAlertaPanel)
  .setNoPadding()
  .setPanelOptions(optionsBuilder);
