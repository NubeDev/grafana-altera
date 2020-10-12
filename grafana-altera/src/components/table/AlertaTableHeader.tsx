import React, { Component } from 'react';
import clsx from 'clsx';

import config from 'shared/config/config.json';

interface IAlertaTableHeaderProps {
  theme: any;
  order: string;
  orderBy: string;
  handleTableSort: (column: string) => void;
}

export class AlertaTableHeader extends Component<IAlertaTableHeaderProps> {

  customHeaders = () => {
    const headersMap: any = {
      severity: { text: 'Severity', value: 'severity' },
      status: { text: 'Status', value: 'status' },
      lastReceiveTime: { text: 'Last Receive Time', value: 'lastReceiveTime' },
      timeoutLeft: { text: 'Timeout', value: 'timeoutLeft' },
      duplicateCount: { text: 'Dupl.', value: 'duplicateCount' },
      customer: { text: 'Customer', value: 'customer' },
      environment: { text: 'Environment', value: 'environment' },
      service: { text: 'Service', value: 'service' },
      resource: { text: 'Resource', value: 'resource' },
      event: { text: 'Event', value: 'event' },
      value: { text: 'Value', value: 'value' },
      text: { text: 'Description', value: 'text' },
    };
    return config.columns.map(c =>
      headersMap[c]
    );
  };

  render() {
    const { theme, order, orderBy, handleTableSort } = this.props;

    return (
      <thead>
        <tr>
          <th>
            <div className={clsx('v-input v-input--selection-controls v-input--checkbox v-input--hide-details', theme)}>
              <div className="v-input__control">
                <div className="v-input__slot">
                  <div className="v-input--selection-controls__input">
                    <input aria-checked="false" role="checkbox" type="checkbox" value="" />
                    <div className="v-input--selection-controls__ripple" />
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>check_box_outline_blank</i>
                  </div>
                </div>
              </div>
            </div>
          </th>
          {this.customHeaders().map((header) => header &&
            <th
              role="columnheader"
              scope="col"
              className={clsx('column sortable text-xs-left', orderBy === header.value ? 'active' : '', order)}
              onClick={() => handleTableSort(header.value)}
            >
              {header.text}
              <i aria-hidden="true" className="v-icon material-icons theme--dark" style={{ fontSize: '16px' }}>arrow_drop_down</i>
            </th>
          )}
        </tr>
        <tr className="v-datatable__progress">
          <th colSpan={13} className="column" />
        </tr>
      </thead>
    );
  }
}
