import React, { Component } from 'react';

import { AlertaPanelHeader } from './AlertaPanelHeader';
import { AlertaTable } from './table/AlertaTable';

interface IAlertaPanelProps { }

export class AlertaPanel extends Component<IAlertaPanelProps, any> {
  render() {
    return (
      <div className="alerts" style={{ width: '100%' }}>
        <div className="v-tabs px-1">
          <AlertaPanelHeader />
          <AlertaTable />
        </div>
      </div>
    );
  }
}
