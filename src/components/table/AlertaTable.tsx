import React, { Component } from 'react';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/config/ThemeContext';

interface IAlertaTableProps {
};

export class AlertaTable extends Component<IAlertaTableProps> {

  static contextType = ThemeContext;

  render() {

    let theme = this.context;

    return (
      <div className="v-table__overflow">
        <table className={['v-datatable v-table v-datatable--select-all', theme].join(' ')}>
          <AlertaTableHeader />
          <AlertaTableBody />
        </table>
      </div>
    )
  }
}
