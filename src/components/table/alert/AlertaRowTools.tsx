import React, {Component} from 'react';

import config from '../../../shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { Status } from 'shared/constants/status.enum';
import { ThemeContext } from 'shared/config/ThemeContext';

const severityColors: any = config.alarm_model.colors.severity;
const textColors: any = config.alarm_model.colors.text;

interface IAlertaRowToolsProps {
  alert: IAlert;
};

export class AlertaRowTools extends Component<IAlertaRowToolsProps> {

  static contextType = ThemeContext;

  theme: any = this.context;

  textColor(): string {
    return textColors ? `${textColors}--text` : '';
  }

  // CSS class
  cellClass: string = 'text-no-wrap ' + this.textColor();
  buttonClass: string = ['btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small', this.theme].join(' ');
  btnContentClass: string = 'v-btn__content';
  iTagClass: string = ['v-icon material-icons', this.theme].join(' ');

  username(): string {
    // return this.$store.getters['auth/getUsername'];
    return 'alice';
  }

  severityColor(severity: string): string {
    return severityColors[severity] || 'white';
  }

  isOpen(status: string): boolean {
    return status === Status.OPEN || status === Status.NORM;
  }

  isAcked(status: string): boolean {
    return status === Status.ACK || status === Status.ACKED;
  }

  isWatched(tags: string[]): boolean {
    return tags ? tags.indexOf(`watch:${this.username()}`) > -1 : false;
  }

  isShelved(status: string): boolean {
    return status === Status.SHELVED || status === Status.SHLVD;
  }

  isClosed(status: string): boolean {
    return status === Status.CLOSED;
  }

  render() {
    return (
      <td className={this.cellClass}>
        <div className="action-buttons" style={{ backgroundColor: this.severityColor(this.props.alert.severity) }}>
          ...&nbsp;
          { (this.isAcked(this.props.alert.status) || this.isClosed(this.props.alert.status)) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>refresh</i>
              </div>
            </button>
          }
          { !this.isWatched(this.props.alert.tags) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>visibility</i>
              </div>
            </button>
          }
          { this.isWatched(this.props.alert.tags) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>visibility_off</i>
              </div>
            </button>
          }
          { this.isOpen(this.props.alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>check</i>
              </div>
            </button>
          }
          { this.isAcked(this.props.alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>undo</i>
              </div>
            </button>
          }
          { (this.isOpen(this.props.alert.status) || this.isAcked(this.props.alert.status)) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>schedule</i>
              </div>
            </button>
          }
          { this.isShelved(this.props.alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>restore</i>
              </div>
            </button>
          }
          { !this.isClosed(this.props.alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>highlight_off</i>
              </div>
            </button>
          }
          <button type="button" className={this.buttonClass}>
            <div className={this.btnContentClass}>
              <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>delete</i>
            </div>
          </button>
          <div className="v-menu v-menu--inline">
            <div className="v-menu__activator">
              <button type="button" className={this.buttonClass}>
                <div className={this.btnContentClass}>
                  <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "16px"}}>more_vert</i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </td>
    )
  }
}
