import React, { Component } from 'react';

import moment from 'moment';

import { IAlert } from 'shared/models/model-data/alert.model';
import { AlertaDataCell } from './AlertaDataCell';
import { AlertaTruncateCell } from './AlertaTruncateCell';
import { AlertaRowTools } from './AlertaRowTools';
import { AlertaUpCell } from './AlertaUpCell';
import config from '../../../shared/config/config.json';

const severityColors: any = config.alarm_model.colors.severity;

interface IAlertaRowProps {
  alert: IAlert;
};

interface RowState {
  rowColor: string;
};

export class AlertaRow extends Component<IAlertaRowProps, RowState> {
  constructor(props: any) {
    super(props);
  }

  severityColor(severity: string): string {
    return severityColors[severity] || 'white';
  }

  formatDateTime(type: string, dateTime: any): string {
    if (type === 'mediumDate') {
      return moment(dateTime).format('ddd DD MMM HH:mm');
    } else if (type === 'hhmmss') {
      return moment(dateTime).format('HH:mm:ss');
    }
    return dateTime;
  }

  render() {

    const { alert } = this.props;

    return (
      <tr className="hover-lighten" style={{ backgroundColor: this.severityColor(alert.severity) }}>
        <AlertaUpCell trendIndication={alert.trendIndication} />

        <AlertaDataCell cellClass="" textClass={`label ${'label-' + alert.severity.toLowerCase()} text-capitalize`} text={alert.severity} />
        <AlertaDataCell cellClass="" textClass="label text-capitalize" text={alert.status} />
        <AlertaDataCell cellClass="" textClass="" text={this.formatDateTime('mediumDate', alert.lastReceiveTime)} />
        <AlertaDataCell cellClass="" textClass="text-xs-right" text={this.formatDateTime('hhmmss', alert.timeout)} />
        <AlertaDataCell cellClass="" textClass="" text={alert.duplicateCount} />
        <AlertaDataCell cellClass="" textClass="" text={alert.customer} />
        <AlertaDataCell cellClass="" textClass="" text={alert.environment} />
        <AlertaDataCell cellClass="" textClass="" text={alert.service.join(", ")} />
        <AlertaDataCell cellClass="" textClass="" text={alert.resource} />
        <AlertaDataCell cellClass="" textClass="" text={alert.event} />
        <AlertaDataCell cellClass="" textClass="" text={alert.value} />
        <AlertaTruncateCell cellClass="" textClass="" text={alert.text} />

        <AlertaRowTools alert={alert} />
      </tr>
    )
  }
}
