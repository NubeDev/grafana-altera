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
  numSelected: number;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, filteredData: IAlert[]) => void;
  handleSelectRowClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, alert: IAlert) => void
  alerts: IAlert[];
  searchText: string;
  basicAuthUser: string;
  handleWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleUnWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleAckAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShelveAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleDeleteAlert: DebouncedFunc<(alertId: string) => void>;
  handleTakeAction: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShowAlertDetails: (alert: IAlert) => void;
  isWatch: boolean;
}

export class AlertaTableContent extends Component<IAlertaTableContentProps> {

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

  render() {
    const {
      theme, order, orderBy, rowSelected, numSelected, alerts, searchText, basicAuthUser, isWatch,
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

    const isWatchAlerts = isWatch
      ? alerts && alerts.filter(alert => (alert.tags && alert.tags.indexOf(`watch:${basicAuthUser}`) !== -1))
      : alerts;

    const filteredData = isWatchAlerts && isWatchAlerts.filter(alert => {
      return (
        (alert.severity && alert.severity.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.status && alert.status.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.duplicateCount && alert.duplicateCount.toString().toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.customer && alert.customer.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.environment && alert.environment.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.service && alert.service.join(', ').toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.resource && alert.resource.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.event && alert.event.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.value && alert.value.toLowerCase().includes(searchText.toLowerCase())) ||
        (alert.text && alert.text.toLowerCase().includes(searchText.toLowerCase()))
      );
    });

    const isSelected = (id: string) => rowSelected.map(alert => alert.id).indexOf(id) !== -1;

    return (
      <>
        <thead>
          <tr>
            <th>
              <div className={clsx('v-input v-input--selection-controls v-input--checkbox v-input--hide-details', theme)}>
                <Checkbox
                  className={clsx('v-icon material-icons', theme)}
                  color="default"
                  indeterminate={numSelected > 0 && numSelected < filteredData.length}
                  checked={filteredData.length > 0 && numSelected === filteredData.length}
                  onChange={(event) => handleSelectAllClick(event, filteredData)}
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
            <th colSpan={13} className="column" />
          </tr>
        </thead>
        <tbody>
          {(filteredData.length > 0) && filteredData.map((alert, index) => {
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

                <AlertaDataCell tooltip="" cellClass="" textClass={`label ${'label-' + alert.severity.toLowerCase()} text-capitalize`} text={alert.severity} />
                <AlertaDataCell tooltip="" cellClass="" textClass="label text-capitalize" text={alert.status} />
                <AlertaDataCell tooltip={this.formatDateTime('tooltip', alert.lastReceiveTime)} cellClass="" textClass="" text={this.formatDateTime('mediumDate', alert.lastReceiveTime)} />
                <AlertaDataCell tooltip="" cellClass="" textClass="text-xs-right" text={this.formatDateTime('hhmmss', this.timeoutLeft(alert))} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.duplicateCount} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.customer} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.environment} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.service && alert.service.join(', ')} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.resource} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.event} />
                <AlertaDataCell tooltip="" cellClass="" textClass="" text={alert.value} />
                <AlertaTruncateCell cellClass="" textClass="" text={alert.text} />

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
          {(filteredData.length === 0) && (
            <tr className="hover-lighten">
              <td colSpan={13} className="text-no-wrap">
                <span className="no-record">No matching records found!</span>
              </td>
            </tr>
          )}
        </tbody>
      </>
    );
  }
}
