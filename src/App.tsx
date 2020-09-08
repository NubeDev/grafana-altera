import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { Moment } from 'moment';

import './App.scss';
import { GrafanaAlertaOptions } from './types';
import { AlertaPanel } from './components/AlertaPanel';

interface Props extends PanelProps<GrafanaAlertaOptions> {
};

interface State {
  now: Moment;
};

export class AppComponent extends PureComponent<Props, State> {
  render() {
    return (
      <AlertaPanel />
    );
  }
};
