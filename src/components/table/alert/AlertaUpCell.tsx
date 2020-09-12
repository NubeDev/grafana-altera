import React, { Component } from 'react';

import { TrendIndication } from 'shared/constants/trend-indication.enum';
import { ThemeContext } from 'shared/config/ThemeContext';

interface IAlertaUpCellProps {
  trendIndication: any;
};

export class AlertaUpCell extends Component<IAlertaUpCellProps, { upCount: number }> {

  static contextType = ThemeContext;

  theme: any = this.context;

  constructor(props: IAlertaUpCellProps) {
    super(props);
    this.setState({
      upCount: 0
    })
  }

  renderIcon() {
    let iconType;
    const iconClass = ['v-icon trend-arrow v-icon--link material-icons', this.theme].join(' ');
    if (this.props.trendIndication == TrendIndication.MORE_SEVERE) {
      iconType = 'arrow_upward';
    } else if (this.props.trendIndication == TrendIndication.LESS_SEVERE) {
      iconType = 'arrow_downward';
    } else {
      iconType = 'remove';
    }

    return <i aria-hidden="true" className={iconClass}>{iconType}</i>;
  }

  render() {
    return (
      <td className="text-no-wrap">
        {this.renderIcon()}
      </td>
    )
  }
}
