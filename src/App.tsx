import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';

import './App.scss';
import { GrafanaAlertaOptions } from './types';
import { AlertaPanel } from './components/AlertaPanel';
import { THEME } from 'shared/constants/theme.constants';
import { ThemeContext } from 'shared/contexts/ThemeContext';
// import { AlertDetail } from 'components/alerts/alert-detail/AlertDetail';

const isDarkMode = config.theme.isDark;

interface Props extends PanelProps<GrafanaAlertaOptions> {
};

interface State {
  theme: any;
};

export class AppComponent extends PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      theme: isDarkMode ? THEME.DARK_MODE : THEME.LIGHT_MODE
    };
  }

  render() {
    return (
      <ThemeContext.Provider value={this.state.theme}>
        <div className={['application', this.state.theme].join(' ')}>
          <AlertaPanel />
          {/* <AlertDetail /> */}
        </div>
      </ThemeContext.Provider>
    );
  }
};
