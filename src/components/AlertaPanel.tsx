import React, { Component } from 'react';

import { AlertaPanelHeader } from './AlertaPanelHeader';
import { AlertaPanelBody } from './AlertaPanelBody';

export class AlertaPanel extends Component<any, any> {
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
