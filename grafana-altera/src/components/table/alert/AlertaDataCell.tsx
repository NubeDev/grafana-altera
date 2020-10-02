import React, { Component } from 'react';

import config from '../../../shared/config/config.json';

interface IAlertaDataCellProps {
  cellClass: any;
  textClass: any;
  text: any;
}

export class AlertaDataCell extends Component<IAlertaDataCellProps> {
  textColor(): string {
    return config.alarm_model.colors.text
      ? `${config.alarm_model.colors.text}--text`
      : '';
  }

  cellClass: string = 'text-no-wrap ' + this.textColor();

  constructor(props: IAlertaDataCellProps) {
    super(props);
    if (this.props.cellClass.trim() !== '') {
      this.cellClass = this.props.cellClass;
    }
  }

  render() {
    const { textClass, text } = this.props;

    return (
      <td className={this.cellClass}>
        <span className={textClass}>{text}</span>
      </td>
    );
  }
}
