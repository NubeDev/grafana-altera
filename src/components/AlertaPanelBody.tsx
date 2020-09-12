import React, { Component } from 'react';

import { AlertaTable } from './table/AlertaTable';
import { AlertaTablePaging } from './table/AlertaTablePaging';

interface IAlertaPanelBodyProps {
  theme: any;
}

export class AlertaPanelBody extends Component<IAlertaPanelBodyProps, any> {
  render() {
    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <AlertaTable theme={this.props.theme} />
                <AlertaTablePaging theme={this.props.theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
