import React, {Component} from 'react';

export class AlertaRowTools extends Component {
  render() {
    return (
      <td className="text-no-wrap black--text">
        <div className="action-buttons" style={{backgroundColor: "orange"}}>
          ...&nbsp;
          <button type="button"
                  className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
            <div className="v-btn__content">
              <i aria-hidden="true" className="v-icon material-icons theme--light"
                 style={{fontSize: "20px"}}>visibility</i>
            </div>
          </button>
          <button type="button"
                  className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
            <div className="v-btn__content">
              <i aria-hidden="true" className="v-icon material-icons theme--light"
                 style={{fontSize: "20px"}}>check</i>
            </div>
          </button>
          <button type="button"
                  className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
            <div className="v-btn__content">
              <i aria-hidden="true" className="v-icon material-icons theme--light"
                 style={{fontSize: "20px"}}>schedule</i>
            </div>
          </button>
          <button type="button"
                  className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
            <div className="v-btn__content">
              <i aria-hidden="true" className="v-icon material-icons theme--light"
                 style={{fontSize: "20px"}}>highlight_off</i>
            </div>
          </button>
          <button type="button"
                  className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
            <div className="v-btn__content">
              <i aria-hidden="true" className="v-icon material-icons theme--light"
                 style={{fontSize: "20px"}}>delete</i>
            </div>
          </button>
          <div className="v-menu v-menu--inline">
            <div className="v-menu__activator">
              <button type="button"
                      className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                <div className="v-btn__content">
                  <i aria-hidden="true" className="v-icon material-icons theme--light"
                     style={{fontSize: "16px"}}>more_vert</i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </td>
    )
  }
}
