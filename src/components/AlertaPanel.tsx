import React, { Component } from 'react';

import { AlertaPanelHeader } from './AlertaPanelHeader';
import { AlertaPanelBody } from './AlertaPanelBody';

interface IAlertaPanelProps {
  theme: any;
}

export class AlertaPanel extends Component<IAlertaPanelProps, any> {
  render() {
    return (
      <div className="alerts">
        <div className="v-tabs px-1">
          <AlertaPanelHeader theme={this.props.theme} />
          <AlertaPanelBody theme={this.props.theme} />
        </div>
      </div>
    )
  }
}
