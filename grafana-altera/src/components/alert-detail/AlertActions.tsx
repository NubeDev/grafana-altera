import React, { Component } from 'react';
import clsx from 'clsx';

import { THEME } from 'shared/constants/theme.constants';

interface IAlertActionsProps {
  theme: any;
}

export class AlertActions extends Component<IAlertActionsProps> {
  constructor(props: IAlertActionsProps) {
    super(props);
  }

  render() {
    const { theme } = this.props;

    const colors = theme === THEME.DARK_MODE ? 'grey darken-1' : 'grey lighten-3';

    return (
      <div className="v-window-item">
        <div className={clsx('mx-1 v-card v-card--flat v-sheet', theme, 'grey', colors)} style={{ overflowX: 'auto' }}>
          <div className="v-card__text">
            <span className="pre-c">no raw data</span>
          </div>
        </div>
      </div>
    );
  }
}
