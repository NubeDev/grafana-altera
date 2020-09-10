import React, { Component } from 'react';

import { IDataCell } from 'shared/models/data-cell.model';
import config from '../../../shared/config/config.json';

export class AlertaTruncateCell extends Component<IDataCell> {

  textColor(): string {
    return config.alarm_model.colors.text
      ? `${config.alarm_model.colors.text}--text`
      : ''
  }

  cellClass: string = 'text-no-wrap ' + this.textColor();

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
