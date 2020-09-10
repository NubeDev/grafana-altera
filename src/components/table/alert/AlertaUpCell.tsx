import React, { Component } from 'react';

import { TrendIndication } from 'shared/constants/trend-indication.enum';

interface IAlertaUpCellProps {
  trendIndication: any;
}

export class AlertaUpCell extends Component<IAlertaUpCellProps, { upCount: number }> {
  constructor(props: IAlertaUpCellProps) {
    super(props);
    this.setState({
      upCount: 0
    })
  }

  showAlert() {
    this.setState({ upCount: this.state.upCount + 1 })
    alert('I\'ll move this line up! ' + this.state.upCount)
  }

  renderIcon() {
    let iconType;
    const iconClass = 'v-icon trend-arrow v-icon--link material-icons theme--light';
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
