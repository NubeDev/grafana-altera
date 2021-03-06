import React, { Component } from 'react';
import clsx from 'clsx';
import { DebouncedFunc } from 'lodash';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
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

import { IAlert } from 'shared/models/model-data/alert.model';

interface IAlertaDetailToolbarProps {
  theme: any;
  basicAuthUser: string;
  handleHiddenAlertDetails: () => void;
  alertDetail: IAlert;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
  handleWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleUnwatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleAckAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShelveAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleTakeAction: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  isOpen: boolean;
  isClosed: boolean;
  isWatched: boolean;
  isAcked: boolean;
  isShelved: boolean;
}

export class AlertaDetailToolbar extends Component<IAlertaDetailToolbarProps> {

  render() {
    const {
      theme, basicAuthUser, alertDetail,
      handleHiddenAlertDetails,
      handleDeleteAlertDetails,
      handleWatchAlert,
      handleUnwatchAlert,
      handleAckAlert,
      handleShelveAlert,
      handleTakeAction,
      isOpen, isClosed, isWatched, isAcked, isShelved
    } = this.props;

    return (
      <nav className={clsx('v-toolbar v-toolbar--dense nav-style alerta-toolbars-details', theme)} data-booted="true">
        <div className="v-toolbar__content h-48">
          <Tooltip title="Back">
            <IconButton
              className={clsx('v-btn v-btn--icon', theme)}
              aria-label="back"
              color="default"
              size="medium"
              component="span"
              onClick={handleHiddenAlertDetails}
            >
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open">
            <IconButton
              className={clsx('v-btn v-btn--icon', theme)}
              aria-label="open"
              color="default"
              size="medium"
              component="span"
              disabled={!isAcked && !isClosed}
              onClick={() => handleTakeAction(alertDetail.id, 'open', '')}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
          {(!isWatched) && (
            <Tooltip title="Watch">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="watch"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleWatchAlert(basicAuthUser, alertDetail.id)}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          )}
          {(isWatched) && (
            <Tooltip title="Unwatch">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="unwatch"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleUnwatchAlert(basicAuthUser, alertDetail.id)}
              >
                <VisibilityOffIcon />
              </IconButton>
            </Tooltip>
          )}
          {(!isAcked) && (
            <Tooltip title="Ack">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="ack"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleAckAlert(alertDetail.id, 'ack', '')}
                disabled={!isOpen}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          )}
          {(isAcked) && (
            <Tooltip title="Unack">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="unack"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleTakeAction(alertDetail.id, 'unack', '')}
              >
                <UndoIcon />
              </IconButton>
            </Tooltip>
          )}
          {(!isShelved) && (
            <Tooltip title="Shelve">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="Shelve"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleShelveAlert(alertDetail.id, 'shelve', '')}
                disabled={!isOpen && !isAcked}
              >
                <ScheduleIcon />
              </IconButton>
            </Tooltip>
          )}
          {(isShelved) && (
            <Tooltip title="Unshelve">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="unshelve"
                color="default"
                size="medium"
                component="span"
                onClick={() => handleTakeAction(alertDetail.id, 'unshelve', '')}
              >
                <RestoreIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Close">
            <IconButton
              className={clsx('v-btn v-btn--icon', theme)}
              aria-label="close"
              color="default"
              size="medium"
              component="span"
              onClick={() => handleTakeAction(alertDetail.id, 'close', '')}
              disabled={isClosed}
            >
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              className={clsx('v-btn v-btn--icon', theme)}
              aria-label="delete"
              color="default"
              size="medium"
              component="span"
              onClick={() => handleDeleteAlertDetails(alertDetail.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <div className="v-menu v-menu--inline">
            <div className="v-menu__activator">
              <Tooltip title="More">
                <IconButton
                  className={clsx('v-btn v-btn--icon', theme)}
                  aria-label="more"
                  color="default"
                  size="medium"
                  component="span"
                >
                  <MoreVertIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}
