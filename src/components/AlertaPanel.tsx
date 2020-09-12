import React, { Component } from 'react';

import { AlertaPanelHeader } from './AlertaPanelHeader';
import { AlertaPanelBody } from './AlertaPanelBody';

interface IAlertaPanelProps {
};

export class AlertaPanel extends Component<IAlertaPanelProps, any> {
  render() {
    return (
      <div className="alerts">
        <div className="v-tabs px-1">
          <AlertaPanelHeader />
          <AlertaPanelBody />
        </div>
      </div>
    )
  }
}
