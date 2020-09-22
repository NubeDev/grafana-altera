import React, {Component} from 'react';

import config from '../../../shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { Status } from 'shared/constants/status.enum';
import { ThemeContext } from 'shared/contexts/ThemeContext';

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
    return status === Status.open || status === Status.NORM;
  }

  isAcked(status: string): boolean {
    return status === Status.ack || status === Status.ACKED;
  }

  isWatched(tags: string[]): boolean {
    return tags ? tags.indexOf(`watch:${this.username()}`) > -1 : false;
  }

  isShelved(status: string): boolean {
    return status === Status.shelved || status === Status.SHLVD;
  }

  isClosed(status: string): boolean {
    return status === Status.closed;
  }

  render() {

    const { alert } = this.props;

    return (
      <td className={this.cellClass}>
        <div className="action-buttons" style={{ backgroundColor: this.severityColor(alert.severity) }}>
          ...&nbsp;
          { (this.isAcked(alert.status) || this.isClosed(alert.status)) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>refresh</i>
              </div>
            </button>
          }
          { !this.isWatched(alert.tags) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>visibility</i>
              </div>
            </button>
          }
          { this.isWatched(alert.tags) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>visibility_off</i>
              </div>
            </button>
          }
          { this.isOpen(alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>check</i>
              </div>
            </button>
          }
          { this.isAcked(alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>undo</i>
              </div>
            </button>
          }
          { (this.isOpen(alert.status) || this.isAcked(alert.status)) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>schedule</i>
              </div>
            </button>
          }
          { this.isShelved(alert.status) &&
            <button type="button" className={this.buttonClass}>
              <div className={this.btnContentClass}>
                <i aria-hidden="true" className={this.iTagClass} style={{fontSize: "20px"}}>restore</i>
              </div>
            </button>
          }
          { !this.isClosed(alert.status) &&
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
