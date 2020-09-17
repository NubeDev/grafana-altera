import React, { Component } from 'react';

import config from 'shared/config/config.json';

interface IAlertaTruncateCellProps {
  cellClass: any;
  textClass: any;
  text: any;
};

export class AlertaTruncateCell extends Component<IAlertaTruncateCellProps> {

  textColor(): string {
    return config.alarm_model.colors.text
      ? `${config.alarm_model.colors.text}--text`
      : ''
  }

  cellClass: string = 'text-no-wrap ' + this.textColor();

  constructor(props: IAlertaTruncateCellProps) {
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
