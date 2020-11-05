import React, { Component } from 'react';
import { DebouncedFunc } from 'lodash';
import clsx from 'clsx';
import moment from 'moment';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import RemoveIcon from '@material-ui/icons/Remove';

import { IAlert } from 'shared/models/model-data/alert.model';
import config from '../../shared/config/config.json';
import { Status } from 'shared/constants/status.enum';
import { AlertaRowTools } from './alert/AlertaRowTools';
import { AlertaDataCell } from './alert/AlertaDataCell';
import { AlertaTruncateCell } from './alert/AlertaTruncateCell';
import { TrendIndication } from 'shared/constants/trend-indication.enum';

const severityColors: any = config.alarm_model.colors.severity;

interface IAlertaTableContentProps {
  theme: any;
  order: string;
  orderBy: string;
  handleTableSort: (column: string) => void;
  rowSelected: IAlert[];
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, filteredData: IAlert[]) => void;
  handleSelectRowClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, alert: IAlert) => void;
  alerts: IAlert[];
  basicAuthUser: string;
  handleWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleUnWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleAckAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShelveAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleDeleteAlert: DebouncedFunc<(alertId: string) => void>;
  handleTakeAction: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShowAlertDetails: (alert: IAlert) => void;
}

export class AlertaTableContent extends Component<IAlertaTableContentProps> {
  customHeaders = () => {
    const headersMap: any = {
      id: { text: 'ID', value: 'id' },
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
    return config.columns.map(c => headersMap[c]);
  };

  severityColor(severity: string): string {
    return severityColors[severity] || 'white';
  }

  formatDateTime(type: string, dateTime: any): string {
    if (type === 'longDate') {
      return moment(dateTime).format(config.dates.longDate);
    } else if (type === 'mediumDate') {
      return moment(dateTime).format(config.dates.mediumDate);
    } else if (type === 'shortTime') {
      return moment(dateTime).format(config.dates.shortTime);
    } else if (type === 'hhmmss') {
      const pad = (s: number) => {
        return ('0' + s).slice(-2);
      };
      if (dateTime) {
        const duration = moment.duration(dateTime, 'seconds');
        const seconds = pad(duration.seconds());
        const minutes = pad(duration.minutes());
        const hours = Math.floor(duration.as('h'));
        return `${hours}:${minutes}:${seconds}`;
      }
    } else if (type === 'tooltip') {
      return moment(dateTime).utcOffset('+00:00').format('YYYY/MM/DD HH:mm:ss.SSS +00:00');
    }
    return dateTime;
  }

  timeoutLeft(alert: IAlert) {
    const ackedOrShelved = this.isShelved(alert.status) || this.isAcked(alert.status);
    const lastModified = ackedOrShelved && alert.updateTime ? alert.updateTime : alert.lastReceiveTime;
    const expireTime = moment(lastModified).add(alert.timeout, 'seconds');
    return expireTime.isAfter() ? expireTime.diff(moment(), 'seconds') : moment.duration();
  }

  isAcked(status: string) {
    return status === Status.ack || status === Status.ACKED;
  }

  isShelved(status: string) {
    return status === Status.shelved || status === Status.SHLVD;
  }

  renderIcon(trendIndication: string, rowSelected: IAlert[]) {
    let icon;
    if (rowSelected && rowSelected.length > 0) {
      icon = <CheckBoxOutlineBlankIcon />;
    } else if (trendIndication === TrendIndication.MORE_SEVERE) {
      icon = <ArrowUpwardIcon />;
    } else if (trendIndication === TrendIndication.LESS_SEVERE) {
      icon = <ArrowDownwardIcon />;
    } else {
      icon = <RemoveIcon />;
    }

    return icon;
  }

  shortId(value: any) {
    if (value) {
      return String(value).substring(0, 8);
    }
    return '';
  }

  render() {
    const {
      theme,
      order,
      orderBy,
      rowSelected,
      alerts,
      basicAuthUser,
      handleTableSort,
      handleSelectAllClick,
      handleSelectRowClick,
      handleShowAlertDetails,
      handleWatchAlert,
      handleUnWatchAlert,
      handleAckAlert,
      handleShelveAlert,
      handleDeleteAlert,
      handleTakeAction,
    } = this.props;

    const isSelected = (id: string) => rowSelected.map(alert => alert.id).indexOf(id) !== -1;

    const someSelected = () => {
      if (alerts) {
        const availableToSelect = alerts.map(alert => alert.id);
        const selection = rowSelected.map(alert => alert.id);
        const selectionSet = new Set(selection);

        return availableToSelect.length !== 0 && selectionSet.size !== 0
          && availableToSelect.some(elem => selectionSet.has(elem))
          && availableToSelect.some(elem => !selectionSet.has(elem));
      }
      return false;
    };

    const allSelected = () => {
      if (alerts) {
        const availableToSelect = alerts && alerts.map(alert => alert.id);
        const selection = rowSelected.map(alert => alert.id);
        const selectionSet = new Set(selection);

        return selectionSet.size !== 0 && availableToSelect.length !== 0
          && !availableToSelect.some(elem => !selectionSet.has(elem));
      }
      return false;
    };

    return (
      <>
        <thead>
          <tr>
            <th>
              <div className={clsx('v-input v-input--selection-controls v-input--checkbox v-input--hide-details', theme)}>
                <Checkbox
                  className={clsx('v-icon material-icons', theme)}
                  color="default"
                  indeterminate={someSelected()}
                  checked={allSelected()}
                  onChange={(event) => handleSelectAllClick(event, alerts)}
                  inputProps={{ 'aria-label': 'select all alerts' }} />
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
                <i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_drop_down</i>
              </th>
            )}
          </tr>
          <tr className="v-datatable__progress">
            <th colSpan={14} className="column" />
          </tr>
        </thead>
        <tbody>
          {(alerts && alerts.length > 0) && alerts.map((alert, index) => {
            const labelId = `main-table-checkbox-${index}`;
            const isRowSelected = isSelected(alert.id);

            return (
              <TableRow
                className="hover-lighten"
                style={{ backgroundColor: this.severityColor(alert.severity) }}
                key={alert.id}
                tabIndex={-1}
                role="checkbox"
                onClick={() => handleShowAlertDetails(alert)}
              >
                <td className="text-no-wrap">
                  <div className={clsx('v-input v-input--selection-controls v-input--checkbox v-input--hide-details', theme)}>
                    <Checkbox
                      className={clsx('v-icon material-icons', theme)}
                      color="default"
                      checked={isRowSelected}
                      inputProps={{ 'aria-labelledby': labelId }}
                      onClick={(event) => handleSelectRowClick(event, alert)}
                      icon={this.renderIcon(alert.trendIndication, rowSelected)}
                      checkedIcon={<CheckBoxIcon />} />
                  </div>
                </td>

                <AlertaDataCell tooltip="" text={this.shortId(alert.id)} />
                <AlertaDataCell tooltip="" textClass={`label ${'label-' + alert.severity.toLowerCase()} text-capitalize`} text={alert.severity} />
                <AlertaDataCell tooltip="" textClass="label text-capitalize" text={alert.status} />
                <AlertaDataCell tooltip={this.formatDateTime('tooltip', alert.lastReceiveTime)} text={this.formatDateTime('mediumDate', alert.lastReceiveTime)} />
                <AlertaDataCell tooltip="" textClass="text-xs-right" text={this.formatDateTime('hhmmss', this.timeoutLeft(alert))} />
                <AlertaDataCell tooltip="" text={alert.duplicateCount} />
                <AlertaDataCell tooltip="" text={alert.customer} />
                <AlertaDataCell tooltip="" text={alert.environment} />
                <AlertaDataCell tooltip="" text={alert.service && alert.service.join(', ')} />
                <AlertaDataCell tooltip="" text={alert.resource} />
                <AlertaDataCell tooltip="" text={alert.event} />
                <AlertaDataCell tooltip="" text={alert.value} />
                <AlertaTruncateCell text={alert.text} />

                <AlertaRowTools
                  alert={alert}
                  basicAuthUser={basicAuthUser}
                  handleWatchAlert={handleWatchAlert}
                  handleUnWatchAlert={handleUnWatchAlert}
                  handleAckAlert={handleAckAlert}
                  handleShelveAlert={handleShelveAlert}
                  handleDeleteAlert={handleDeleteAlert}
                  handleTakeAction={handleTakeAction}
                />
              </TableRow>
            );
          })}
          {(alerts && alerts.length === 0) && (
            <tr className="hover-lighten">
              <td colSpan={14} className="text-no-wrap">
                <span className="no-record">No matching records found!</span>
              </td>
            </tr>
          )}
        </tbody>
      </>
    );
  }
}
