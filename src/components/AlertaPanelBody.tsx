import React, {Component} from 'react'
import {AlertaTable} from "./table/AlertaTable";
import {AlertaTablePaging} from "./table/AlertaTablePaging";

export class AlertaPanelBody extends Component<any, any> {
  render() {
    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <AlertaTable/>
                <AlertaTablePaging/>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}