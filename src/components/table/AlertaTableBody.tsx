import React, { Component } from 'react';

import raw from './data/test-data.json';
import { AlertaRow } from './alert/AlertaRow';
import { IAlert } from 'shared/models/alert.model';

const data: IAlert[] = raw.alerts;

export class AlertaTableBody extends Component {
  render() {
    return (
      <tbody>
        {data.map((item) => item && <AlertaRow alert={item} />)}
      </tbody>
    )
  }
}
