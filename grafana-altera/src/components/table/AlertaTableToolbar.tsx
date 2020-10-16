import React, { Component } from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CheckIcon from '@material-ui/icons/Check';
import ScheduleIcon from '@material-ui/icons/Schedule';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

interface IAlertaTableToolbarProps {
  theme: any;
  numSelected: number;
  handleClearSelected: () => void;
  handleToggleWatch: () => void;
  handleBulkAckAlert: () => void;
  handleBulkShelveAlert: () => void;
  handleTakeBulkAction: (action: string) => void;
  handleBulkDeleteAlert: () => void;
}

export class AlertaTableToolbar extends Component<IAlertaTableToolbarProps> {

  render() {
    const { theme, numSelected, handleClearSelected, handleToggleWatch, handleBulkAckAlert,
      handleBulkShelveAlert, handleTakeBulkAction, handleBulkDeleteAlert
    } = this.props;

    return (
      <div>
        {numSelected > 0 ? (
          <div className={clsx('mb-1 v-toolbar', theme, 'v-toolbar__content alerta-toolbars alerta-toolbars-darkmode')}>
            <Tooltip title="Back">
              <IconButton
                className={clsx('v-btn v-btn--icon', theme)}
                aria-label="back"
                color="default"
                size="medium"
                component="span"
                onClick={handleClearSelected}
              >
                <ArrowBackIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <div className="v-toolbar__title">Back</div>
            <div className="spacer" />
            <span className="subheading">{numSelected}<span className="hidden-xs-only"> Selected</span></span>
            <div className="spacer" />
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <Tooltip title="Watch">
                  <IconButton
                    className={clsx('btn--plain v-btn v-btn--icon', theme)}
                    aria-label="watch"
                    color="default"
                    size="medium"
                    component="span"
                    onClick={handleToggleWatch}
                  >
                    <VisibilityIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <Tooltip title="Ack">
                  <IconButton
                    className={clsx('btn--plain v-btn v-btn--icon', theme)}
                    aria-label="ack"
                    color="default"
                    size="medium"
                    component="span"
                    onClick={handleBulkAckAlert}
                  >
                    <CheckIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <Tooltip title="Shelve">
                  <IconButton
                    className={clsx('btn--plain v-btn v-btn--icon', theme)}
                    aria-label="shelve"
                    color="default"
                    size="medium"
                    component="span"
                    onClick={handleBulkShelveAlert}
                  >
                    <ScheduleIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <Tooltip title="Close">
                  <IconButton
                    className={clsx('btn--plain v-btn v-btn--icon', theme)}
                    aria-label="close"
                    color="default"
                    size="medium"
                    component="span"
                    onClick={() => handleTakeBulkAction('close')}
                  >
                    <HighlightOffIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <Tooltip title="Delete">
                  <IconButton
                    className={clsx('btn--plain v-btn v-btn--icon', theme)}
                    aria-label="delete"
                    color="default"
                    size="medium"
                    component="span"
                    onClick={handleBulkDeleteAlert}
                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </span>
            </span>
            <div className="v-menu v-menu--inline">
              <div className="v-menu__activator">
                <Tooltip title="More">
                  <IconButton
                    className={clsx('btn--plain px-1 mx-0 v-btn v-btn--flat v-btn--icon v-btn--small', theme)}
                    aria-label="more"
                    color="default"
                    size="medium"
                    component="span"
                  // onClick={handleClearSelected}
                  >
                    <MoreVertIcon fontSize="large" />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className="spacer" />
          </div>
        ) : (
            ''
          )}
      </div>
    );
  }
}
