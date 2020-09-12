import React, { Component } from 'react';

import raw from './data/test-data.json';
import { AlertaRow } from './alert/AlertaRow';
import { IAlert } from 'shared/models/alert.model';

const data: IAlert[] = raw.alerts;

interface IAlertaTableBodyProps {
  theme: any;
}

export class AlertaTableBody extends Component<IAlertaTableBodyProps> {
  render() {
    return (
      <tbody>
        {data.map((item) => item && <AlertaRow alert={item} theme={this.props.theme} />)}
      </tbody>
    )
  }
}
