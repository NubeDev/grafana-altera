import React, { Component } from 'react';

interface IAlertDataProps {
  theme: any;
}

export class AlertData extends Component<IAlertDataProps> {
  constructor(props: IAlertDataProps) {
    super(props);
  }

  render() {
    const { theme } = this.props;

    return (
      <div className="v-window-item">
        <div className={['mx-1 v-card v-card--flat v-sheet', theme, 'grey darken-1'].join(' ')} style={{ overflowX: 'auto' }}>
          <div className="v-card__text">
            <span className="pre-c">no raw data</span>
          </div>
        </div>
      </div>
    );
  }
}
