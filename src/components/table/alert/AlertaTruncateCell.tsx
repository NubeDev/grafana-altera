import React, { Component } from 'react';

import { IDataCell } from 'shared/models/data-cell.model';

export class AlertaTruncateCell extends Component<IDataCell> {

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
        <span>
          <div className="fixed-table">
            <div className="text-truncate"><span>{this.props.text}</span></div>
          </div>
        </span>
      </td>
    )
  }
}
