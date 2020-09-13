import React, { Component } from 'react';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/config/ThemeContext';
import { IAlert } from 'shared/models/alert.model';

interface IAlertaTableProps {
  alerts: IAlert[];
};

export class AlertaTable extends Component<IAlertaTableProps> {

  static contextType = ThemeContext;

  render() {

    let theme = this.context;

    return (
      <div className="v-table__overflow">
        <table className={['v-datatable v-table v-datatable--select-all', theme].join(' ')}>
          <AlertaTableHeader />
          <AlertaTableBody alerts={this.props.alerts} />
        </table>
      </div>
    )
  }
}
