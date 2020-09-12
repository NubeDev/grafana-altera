import React, { Component } from 'react';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';

interface IAlertaTableProps {
  theme: any;
}

export class AlertaTable extends Component<IAlertaTableProps> {
  render() {
    return (
      <div className="v-table__overflow">
        <table className={['v-datatable v-table v-datatable--select-all', this.props.theme].join(' ')}>
          <AlertaTableHeader theme={this.props.theme} />
          <AlertaTableBody theme={this.props.theme} />
        </table>
      </div>
    )
  }
}
