import React, { Component } from 'react';
import Tooltip from '@material-ui/core/Tooltip';

import config from '../../../shared/config/config.json';

interface IAlertaDataCellProps {
  cellClass: any;
  textClass: any;
  text: any;
  tooltip: string;
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
    const { textClass, text, tooltip } = this.props;

    return (
      <>
        {tooltip !== '' ? (
          <Tooltip title={tooltip} placement="top">
            <td className={this.cellClass}>
              <span className={textClass}>{text}</span>
            </td>
          </Tooltip>
        ) : (
          <td className={this.cellClass}>
            <span className={textClass}>{text}</span>
          </td>
        )}
      </>
    );
  }
}
