import React, {Component} from 'react'

export class AlertaUpCell extends Component {
  showAlert() {
    alert("I'll move this line up!")
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
