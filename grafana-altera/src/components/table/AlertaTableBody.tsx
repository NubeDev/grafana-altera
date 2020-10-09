import React, { Component } from 'react';

import { AlertaRow } from './alert/AlertaRow';
import { IAlert } from 'shared/models/model-data/alert.model';

interface IAlertaTableBodyProps {
  alerts: IAlert[];
  searchText: string;
}

export class AlertaTableBody extends Component<IAlertaTableBodyProps> {
  render() {
    const { alerts, searchText } = this.props;
    const filteredData = alerts && alerts.filter(value => {
      return (
        (value.severity && value.severity.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.status && value.status.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.duplicateCount && value.duplicateCount.toString().toLowerCase().includes(searchText.toLowerCase())) ||
        (value.customer && value.customer.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.environment && value.environment.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.service && value.service.join(', ').toLowerCase().includes(searchText.toLowerCase())) ||
        (value.resource && value.resource.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.event && value.event.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.value && value.value.toLowerCase().includes(searchText.toLowerCase())) ||
        (value.text && value.text.toLowerCase().includes(searchText.toLowerCase()))
      );
    })

    return (
      <tbody>
        {(filteredData.length > 0) && filteredData.map((row, index) => {
          const labelId = `main-table-checkbox-${index}`;

          return (
            <AlertaRow alert={row} key={labelId} />
          );
        })}
        {(filteredData.length === 0) && (
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
