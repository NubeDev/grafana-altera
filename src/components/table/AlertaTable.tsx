import React, { Component } from 'react';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';

export class AlertaTable extends Component {
  render() {
    return (
      <div className="v-table__overflow">
        <table className="v-datatable v-table v-datatable--select-all theme--light">
          <AlertaTableHeader />
          <AlertaTableBody />
        </table>
      </div>
    )
  }
}
