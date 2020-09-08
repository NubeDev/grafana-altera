import React, { Component } from 'react';

import { IAlert } from '../../../models/IAlert';
import { AlertaDataCell } from './AlertaDataCell';
import { AlertaTruncateCell } from './AlertaTruncateCell';
import { AlertaRowTools } from './AlertaRowTools';
import { AlertaUpCell } from './AlertaUpCell';

interface RowState {
  rowColor: string
}

export class AlertaRow extends Component<{ alert: IAlert }, RowState> {
  constructor(props: any) {
    super(props);
    this.state = {
      rowColor: (this.props.alert.severity == 'major') ? 'orange' : 'green'
    }
  }

  render() {
    return (
      <tr className="hover-lighten" style={{ backgroundColor: this.state.rowColor }}>
        <AlertaUpCell />

        <AlertaDataCell cellClass="" textClass="label label-major" text={this.props.alert.severity} />
        <AlertaDataCell cellClass="" textClass="label" text={this.props.alert.status} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.lastReceiveTime} />
        <AlertaDataCell cellClass="" textClass="text-xs-right" text={this.props.alert.timeout} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.duplicateCount} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.customer} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.environment} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.service.join(",")} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.resource} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.event} />
        <AlertaDataCell cellClass="" textClass="" text={this.props.alert.value} />
        <AlertaTruncateCell cellClass="" textClass="" text={this.props.alert.text} />

        <AlertaRowTools />
      </tr>
    )
  }
}
