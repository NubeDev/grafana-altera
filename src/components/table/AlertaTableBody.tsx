import React, {Component} from 'react'
import {AlertaRow} from "./alert/AlertaRow";
// @ts-ignore
import raw from './data/test-data.json';
import {IAlert} from "../../models/IAlert";

const data: IAlert[] = raw.alerts;

export class AlertaTableBody extends Component {
  render() {
    return (
      <tbody>
      {data.map((item) => item && <AlertaRow alert={item}/>)}
      </tbody>
    )
  }
}
