import React, { PureComponent } from 'react';
import clsx from 'clsx';
import { PanelProps } from '@grafana/data';
import { config } from '@grafana/runtime';

import './App.scss';
import { IGrafanaAlertaOptions } from './types';
import { AlertaTable } from 'components/table/AlertaTable';
import { THEME } from 'shared/constants/theme.constants';
import { ThemeContext } from 'shared/contexts/ThemeContext';

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
          <div className="alerts" style={{ width: '100%' }}>
            <div className="v-tabs px-1">
              <AlertaTable />
            </div>
          </div>
        </div>
      </ThemeContext.Provider>
    );
  }
}
