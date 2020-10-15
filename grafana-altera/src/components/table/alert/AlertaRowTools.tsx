import React, { Component } from 'react';
import { DebouncedFunc } from 'lodash';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/Check';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RefreshIcon from '@material-ui/icons/Refresh';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import UndoIcon from '@material-ui/icons/Undo';
import RestoreIcon from '@material-ui/icons/Restore';

import config from '../../../shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { Status } from 'shared/constants/status.enum';
import { ThemeContext } from 'shared/contexts/ThemeContext';

const severityColors: any = config.alarm_model.colors.severity;
const textColors: any = config.alarm_model.colors.text;

interface IAlertaRowToolsProps {
  alert: IAlert;
  basicAuthUser: string;
  handleWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleUnWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleAckAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShelveAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleDeleteAlert: DebouncedFunc<(alertId: string) => void>;
}

export class AlertaRowTools extends Component<IAlertaRowToolsProps> {
  constructor(props: IAlertaRowToolsProps) {
    super(props);
    this.state = {
      ackTimeout: 0
    };
  }
  static contextType = ThemeContext;

  theme: any = this.context;

  textColor(): string {
    return textColors ? `${textColors}--text` : '';
  }

  // CSS class
  cellClass: string = 'text-no-wrap ' + this.textColor();
  buttonClass: string = clsx('btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small', this.theme);
  btnContentClass: string = 'v-btn__content';
  iTagClass: string = clsx('v-icon material-icons', this.theme);

  severityColor(severity: string): string {
    return severityColors[severity] || 'white';
  }

  isOpen(status: string): boolean {
    return status === Status.open || status === Status.NORM;
  }

  isAcked(status: string): boolean {
    return status === Status.ack || status === Status.ACKED;
  }

  isWatched(tags: string[], username: string): boolean {
    return tags ? tags.indexOf(`watch:${username}`) > -1 : false;
  }

  isShelved(status: string): boolean {
    return status === Status.shelved || status === Status.SHLVD;
  }

  isClosed(status: string): boolean {
    return status === Status.closed;
  }

  render() {
    const { alert, basicAuthUser,
      handleWatchAlert,
      handleUnWatchAlert,
      handleAckAlert,
      handleShelveAlert,
      handleDeleteAlert
    } = this.props;

    return (
      <td className={this.cellClass}>
        <div className="action-buttons row-tools" style={{ backgroundColor: this.severityColor(alert.severity) }}>
          ...&nbsp;
          {(this.isAcked(alert.status) || this.isClosed(alert.status)) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              // onClick={handleTakeAction(props.item.id, 'open')}
            >
              <RefreshIcon />
            </IconButton>
          )}
          {!this.isWatched(alert.tags, basicAuthUser) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              onClick={() => handleWatchAlert(basicAuthUser, alert.id)}
            >
              <VisibilityIcon />
            </IconButton>
          )}
          {this.isWatched(alert.tags, basicAuthUser) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              onClick={() => handleUnWatchAlert(basicAuthUser, alert.id)}
            >
              <VisibilityOffIcon />
            </IconButton>
          )}
          {this.isOpen(alert.status) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              onClick={() => handleAckAlert(alert.id, 'ack', '')}
            >
              <CheckIcon />
            </IconButton>
          )}
          {this.isAcked(alert.status) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              // onClick={handleTakeAction(props.item.id, 'unack')}
            >
              <UndoIcon />
            </IconButton>
          )}
          {(this.isOpen(alert.status) || this.isAcked(alert.status)) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              onClick={() => handleShelveAlert(alert.id, 'shelve', '')}
            >
              <ScheduleIcon />
            </IconButton>
          )}
          {this.isShelved(alert.status) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              // onClick={handleTakeAction(props.item.id, 'unshelve')}
            >
              <RestoreIcon />
            </IconButton>
          )}
          {!this.isClosed(alert.status) && (
            <IconButton
              className={this.buttonClass}
              color="default"
              size="medium"
              component="span"
              // onClick={handleTakeAction(props.item.id, 'close')}
            >
              <HighlightOffIcon />
            </IconButton>
          )}
          <IconButton
            className={this.buttonClass}
            color="default"
            size="medium"
            component="span"
            onClick={() => handleDeleteAlert(alert.id)}
          >
            <DeleteIcon />
          </IconButton>
          <div className="v-menu v-menu--inline">
            <div className="v-menu__activator">
              <IconButton
                className={this.buttonClass}
                color="default"
                size="medium"
                component="span"
                // onClick={handleTakeAction}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </td>
    );
  }
}
