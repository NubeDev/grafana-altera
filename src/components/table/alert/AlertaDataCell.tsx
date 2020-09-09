import React, { Component } from 'react';

import { IDataCell } from 'shared/models/data-cell.model';

export class AlertaDataCell extends Component<IDataCell> {

  cellClass: string = 'text-no-wrap black--text';

  constructor(props: IDataCell) {
    super(props);
    if (this.props.cellClass.trim() !== '') {
      this.cellClass = this.props.cellClass
    }
  }

  render() {
    return (
      <td className={this.cellClass}>
        <span className={this.props.textClass}>{this.props.text}</span>
      </td>
    )
  }
}
