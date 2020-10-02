import React, { Component } from 'react';

import { AlertaRow } from './alert/AlertaRow';
import { IAlert } from 'shared/models/model-data/alert.model';

interface IAlertaTableBodyProps {
  alerts: IAlert[];
}

export class AlertaTableBody extends Component<IAlertaTableBodyProps> {
  render() {
    const { alerts } = this.props;
    return (
      <tbody>
        {(alerts && alerts.length > 0) && alerts.map((row, index) => {
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <AlertaRow alert={row} key={labelId} />
          );
        })}
        {(alerts && alerts.length === 0) && (
          <tr className="hover-lighten">
            <td colSpan={13} className="text-no-wrap">
              <span className="no-record">No matching records found!</span>
            </td>
          </tr>
        )}
      </tbody>
    );
  }
}
