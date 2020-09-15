import React, { Component } from 'react';

import { AlertaRow } from './alert/AlertaRow';
import { IAlertResponse } from 'shared/models/model-responses/alert-response';

interface IAlertaTableBodyProps {
  alertResponse: IAlertResponse;
};

export class AlertaTableBody extends Component<IAlertaTableBodyProps> {
  render() {
    let data = this.props.alertResponse.alerts;
    return (
      <tbody>
        {
          data.map((item) => item && <AlertaRow alert={item} />)
        }
        { data.length === 0 &&
          <tr className="hover-lighten">
            <td colSpan={13} className="text-no-wrap"><span className="no-record">No matching records found!</span></td>
          </tr>
        }
      </tbody>
    )
  }
}
