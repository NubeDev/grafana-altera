import React, {Component} from 'react'

export class AlertaUpCell extends Component<any, {upCount: number}> {
  constructor(props: any) {
    super(props);
    this.setState({
      upCount: 0
    })
  }

  showAlert() {
    this.setState({upCount: this.state.upCount + 1})
    alert("I'll move this line up! " + this.state.upCount)
  }

  render() {
    return (
      <td className="text-no-wrap">
        <i aria-hidden="true"
           onClick={this.showAlert}
           className="v-icon trend-arrow v-icon--link material-icons theme--light">arrow_upward</i>
      </td>
    )
  }
}
