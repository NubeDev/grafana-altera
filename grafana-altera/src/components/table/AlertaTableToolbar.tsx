import React, { Component } from 'react';
import clsx from 'clsx';

interface IAlertaTableToolbarProps {
  theme: any;
  numSelected: number;
}

export class AlertaTableToolbar extends Component<IAlertaTableToolbarProps> {

  render() {
    const { theme, numSelected } = this.props;

    return (
      <div>
        {numSelected > 0 ? (
          <div className={clsx('mb-1 v-toolbar', theme, 'v-toolbar__content alerta-toolbars-darkmode')}>
            <button type="button" className={clsx('v-btn v-btn--icon', theme)}>
              <div className="v-btn__content"><i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>arrow_back</i></div>
            </button>
            <div className="v-toolbar__title">Back</div>
            <div className="spacer" />
            <span className="subheading">{numSelected}<span className="hidden-xs-only"> Selected</span></span>
            <div className="spacer" />
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <button type="button" className={clsx('btn--plain v-btn v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>visibility</i>
                  </div>
                </button>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <button type="button" className={clsx('btn--plain v-btn v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>check</i>
                  </div>
                </button>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <button type="button" className={clsx('btn--plain v-btn v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>schedule</i>
                  </div>
                </button>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <button type="button" className={clsx('btn--plain v-btn v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>highlight_off</i>
                  </div>
                </button>
              </span>
            </span>
            <span className="v-tooltip v-tooltip--bottom">
              <span>
                <button type="button" className={clsx('btn--plain v-btn v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>delete</i>
                  </div>
                </button>
              </span>
            </span>
            <div className="v-menu v-menu--inline">
              <div className="v-menu__activator">
                <button type="button" className={clsx('btn--plain px-1 mx-0 v-btn v-btn--flat v-btn--icon v-btn--small', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>more_vert</i>
                  </div>
                </button>
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
