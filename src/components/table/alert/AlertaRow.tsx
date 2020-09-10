import React, { Component } from 'react';

import moment from 'moment';

import { IAlert } from 'shared/models/alert.model';
import { AlertaDataCell } from './AlertaDataCell';
import { AlertaTruncateCell } from './AlertaTruncateCell';
import { AlertaRowTools } from './AlertaRowTools';
import { AlertaUpCell } from './AlertaUpCell';
import config from '../../../shared/config/config.json';

const severityColors: any = config.alarm_model.colors.severity;

interface RowState {
  rowColor: string
}

export class AlertaRow extends Component<{ alert: IAlert }, RowState> {
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
    return (
      <tr className="hover-lighten" style={{ backgroundColor: this.severityColor(this.props.alert.severity) }}>
        <AlertaUpCell trendIndication={this.props.alert.trendIndication} />

        <AlertaDataCell cellClass="" textClass={`label ${'label-' + this.props.alert.severity.toLowerCase()} text-capitalize`} text={this.props.alert.severity} />
        <AlertaDataCell cellClass="" textClass="label text-capitalize" text={this.props.alert.status} />
        <AlertaDataCell cellClass="" textClass="" text={this.formatDateTime('mediumDate', this.props.alert.lastReceiveTime)} />
        <AlertaDataCell cellClass="" textClass="text-xs-right" text={this.formatDateTime('hhmmss', this.props.alert.timeout)} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.duplicateCount} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.customer} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.environment} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.service.join(", ")} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.resource} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.event} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.value} />
        <AlertaTruncateCell cellClass="" textClass="" text={this.props.alert.text} />

        <AlertaRowTools />
      </tr>
    )
  }
}
