import React, { Component } from 'react';

import { AlertaTable } from './table/AlertaTable';
import { AlertaTablePaging } from './table/AlertaTablePaging';
import { IAlert } from 'shared/models/alert.model';
import raw from './table/data/test-data.json';

const data: IAlert[] = raw.alerts;

interface IAlertaPanelBodyProps {
};

export class AlertaPanelBody extends Component<IAlertaPanelBodyProps, any> {
  render() {
    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <AlertaTable alerts={data} />
                <AlertaTablePaging alerts={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
