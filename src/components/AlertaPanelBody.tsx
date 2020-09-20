import React, { Component } from 'react';

import { AlertaTable } from './table/AlertaTable';
import raw from './table/data/test-data.json';
import AlertsApi from '../services/api/alert.service';
import { IAlertResponse } from 'shared/models/model-responses/alert-response';

const data: IAlertResponse = raw;

interface IAlertaPanelBodyProps {
};

interface IAlertaPanelBodyState {
  alertResponse: IAlertResponse;
};

export class AlertaPanelBody extends Component<IAlertaPanelBodyProps, IAlertaPanelBodyState> {

  componentDidMount() {
    AlertsApi.getAlerts()
      .then(res => {
        const alerts = res.data;
        console.log({ alerts });
      });
  }

  render() {
    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <AlertaTable alertResponse={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
