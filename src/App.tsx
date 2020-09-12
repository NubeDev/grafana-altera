import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';

import './App.scss';
import { GrafanaAlertaOptions } from './types';
import { AlertaPanel } from './components/AlertaPanel';
import { THEME } from 'shared/constants/theme.constants';

const isDarkMode = config.theme.isDark;

interface Props extends PanelProps<GrafanaAlertaOptions> {
};

interface State {
  theme: any;
};

export class AppComponent extends PureComponent<Props, State> {

  state = {
    theme: isDarkMode ? THEME.DARK_MODE : THEME.LIGHT_MODE
  };

  render() {
    return (
      <AlertaPanel theme={this.state.theme} />
    );
  }
};
