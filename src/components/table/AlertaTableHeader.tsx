import React, { Component } from 'react';

interface IAlertaTableHeaderProps {
  theme: any;
}

export class AlertaTableHeader extends Component<IAlertaTableHeaderProps> {
  render() {
    return (
      <thead>
        <tr>
          <th>
            <div className={['v-input v-input--selection-controls v-input--checkbox v-input--hide-details', this.props.theme].join(' ')}>
              <div className="v-input__control">
                <div className="v-input__slot">
                  <div className="v-input--selection-controls__input">
                    <input aria-checked="false" role="checkbox" type="checkbox" value="" />
                    <div className="v-input--selection-controls__ripple"></div>
                    <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>check_box_outline_blank</i>
                  </div>
                </div>
              </div>
            </div>
          </th>
          <th>Severity</th>
          <th>Status</th>
          <th>Last Receive Time</th>
          <th>Timeout</th>
          <th>Dupl.</th>
          <th>Customer</th>
          <th>Environment</th>
          <th>Service</th>
          <th>Resource</th>
          <th>Event</th>
          <th>Value</th>
          <th>Description</th>
        </tr>
        <tr className="v-datatable__progress">
          <th colSpan={13} className="column"></th>
        </tr>
      </thead>
    )
  }
}
