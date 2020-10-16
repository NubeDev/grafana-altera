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

interface IAlertaDetailToolbarProps {
  theme: any;
}

export class AlertaDetailToolbar extends Component<IAlertaDetailToolbarProps> {

  render() {
    const { theme } = this.props;

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
              // onClick={handleClearSelected}
            >
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button disabled={true} type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--disabled v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>refresh</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>visibility</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')} style={{ display: 'none' }}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>visibility_off</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>check</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')} style={{ display: 'none' }}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}
                    style={{ fontSize: '20px' }}>undo</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>schedule</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')} style={{ display: 'none' }}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>restore</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>highlight_off</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                <div className="v-btn__content">
                  <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '20px' }}>delete</i>
                </div>
              </button>
            </span>
          </span>
          <span className="v-tooltip v-tooltip--bottom">
            <span>
              <div className="v-menu v-menu--inline">
                <div className="v-menu__activator">
                  <button type="button" className={['btn--plain px-1 mx-0 v-btn v-btn--icon', theme].join(' ')}>
                    <div className="v-btn__content">
                      <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>more_vert</i>
                    </div>
                  </button>
                </div>
              </div>
            </span>
          </span>
        </div>
      </nav>
    );
  }
}
