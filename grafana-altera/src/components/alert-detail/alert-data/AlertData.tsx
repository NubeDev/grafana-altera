import React, { Component } from 'react';
import clsx from 'clsx';

import { THEME } from 'shared/constants/theme.constants';
import { IAlert } from 'shared/models/model-data/alert.model';

interface IAlertDataProps {
  theme: any;
  alertDetail: IAlert;
}

export class AlertData extends Component<IAlertDataProps> {
  constructor(props: IAlertDataProps) {
    super(props);
  }

  render() {
    const { theme, alertDetail } = this.props;

    const colors = theme === THEME.DARK_MODE ? 'grey darken-1' : 'grey lighten-3';

    return (
      <div className="v-window-item">
        <div className={clsx('mx-1 v-card v-card--flat v-sheet', theme, 'grey', colors)} style={{ overflowX: 'auto' }}>
          <div className="v-card__text">
            <span className="pre-c">{alertDetail.rawData || 'no raw data'}</span>
          </div>
        </div>
      </div>
    );
  }
}
