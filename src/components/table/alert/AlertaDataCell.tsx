import React, { Component } from 'react';

import { IDataCell } from 'shared/models/model-data/data-cell.model';
import config from '../../../shared/config/config.json';

export class AlertaDataCell extends Component<IDataCell> {
  
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
        <span className={this.props.textClass}>{this.props.text}</span>
      </td>
    )
  }
}
