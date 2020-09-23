import React, { Component } from 'react';

import moment from 'moment';

import { IAlert } from 'shared/models/model-data/alert.model';
import { AlertaDataCell } from './AlertaDataCell';
import { AlertaTruncateCell } from './AlertaTruncateCell';
import { AlertaRowTools } from './AlertaRowTools';
import { AlertaUpCell } from './AlertaUpCell';
import config from '../../../shared/config/config.json';
import { Status } from 'shared/constants/status.enum';

const severityColors: any = config.alarm_model.colors.severity;

interface IAlertaRowProps {
  alert: IAlert;
}

interface IRowState {
  rowColor: string;
}

export class AlertaRow extends Component<IAlertaRowProps, IRowState> {
  constructor(props: any) {
    super(props);
  }

  severityColor(severity: string): string {
    return severityColors[severity] || 'white';
  }

  pad(s: any) {
    return ('0' + s).slice(-2);
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

  render() {
    const { alert } = this.props;

    return (
      <tr className="hover-lighten" style={{ backgroundColor: this.severityColor(alert.severity) }}>
        <AlertaUpCell trendIndication={alert.trendIndication} />

        <AlertaDataCell cellClass="" textClass={`label ${'label-' + alert.severity.toLowerCase()} text-capitalize`} text={alert.severity} />
        <AlertaDataCell cellClass="" textClass="label text-capitalize" text={alert.status} />
        <AlertaDataCell cellClass="" textClass="" text={this.formatDateTime('mediumDate', alert.lastReceiveTime)} />
        <AlertaDataCell cellClass="" textClass="text-xs-right" text={this.formatDateTime('hhmmss', this.timeoutLeft(alert))} />
        <AlertaDataCell cellClass="" textClass="" text={alert.duplicateCount} />
        <AlertaDataCell cellClass="" textClass="" text={alert.customer} />
        <AlertaDataCell cellClass="" textClass="" text={alert.environment} />
        <AlertaDataCell cellClass="" textClass="" text={alert.service.join(', ')} />
        <AlertaDataCell cellClass="" textClass="" text={alert.resource} />
        <AlertaDataCell cellClass="" textClass="" text={alert.event} />
        <AlertaDataCell cellClass="" textClass="" text={alert.value} />
        <AlertaTruncateCell cellClass="" textClass="" text={alert.text} />

        <AlertaRowTools alert={alert} />
      </tr>
    );
  }
}
