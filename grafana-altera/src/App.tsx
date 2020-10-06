import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';

import './App.scss';
import { IGrafanaAlertaOptions } from './types';
import { AlertaPanel } from './components/AlertaPanel';
import { THEME } from 'shared/constants/theme.constants';
import { ThemeContext } from 'shared/contexts/ThemeContext';
// import { AlertDetail } from 'components/alerts/alert-detail/AlertDetail';

const isDarkMode = config.theme.isDark;

interface IProps extends PanelProps<IGrafanaAlertaOptions> { }

interface IState {
  theme: any;
}

export class AppComponent extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      theme: isDarkMode ? THEME.DARK_MODE : THEME.LIGHT_MODE
    };
  }

  render() {
    const clazz = clsx('application', this.state.theme);

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <div className={clazz}>
          <AlertaPanel />
          {/* <AlertDetail /> */}
        </div>
      </ThemeContext.Provider>
    );
  }
}
