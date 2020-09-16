import React, { Component } from 'react';

import { AlertaRow } from './alert/AlertaRow';
import { IAlertResponse } from 'shared/models/model-responses/alert-response';

interface IAlertaTableBodyProps {
  alertResponse: IAlertResponse;
  page: number;
  rowsPerPage: number;
};

export class AlertaTableBody extends Component<IAlertaTableBodyProps> {
  render() {
    const { alertResponse, page, rowsPerPage } = this.props;
    return (
      <tbody>
        {
          alertResponse.alerts
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              // const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <AlertaRow alert={row} />
              );
            })
        }
        {alertResponse.alerts.length === 0 &&
          <tr className="hover-lighten">
            <td colSpan={13} className="text-no-wrap"><span className="no-record">No matching records found!</span></td>
          </tr>
        }
      </tbody>
    )
  }
}
