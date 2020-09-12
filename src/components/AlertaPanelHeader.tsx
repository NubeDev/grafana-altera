import React, { Component } from 'react';

interface IAlertaPanelHeaderProps {
  theme: any;
}

export class AlertaPanelHeader extends Component<IAlertaPanelHeaderProps, any> {
  render() {
    return (
      <div className={['v-tabs__bar', this.props.theme].join(' ')}>
        <div className="v-tabs__wrapper">
          <div className="v-tabs__container v-tabs__container--grow">
            <div className="v-tabs__slider-wrapper" style={{ left: "0px", width: "597px" }}>
              <div className="v-tabs__slider accent"></div>
            </div>
            <div className="v-tabs__div">
              <a href="#tab-ALL" className="v-tabs__item v-tabs__item--active">
                ALL&nbsp;(1)
              </a>
            </div>
            <div className="v-tabs__div">
              <a href="#tab-Production" className="v-tabs__item">
                Production&nbsp;(1)
              </a>
            </div>
            <div className="spacer"></div>
            <button type="button" className={['v-btn v-btn--flat v-btn--icon filter-active', this.props.theme].join(' ')}>
              <div className="v-btn__content">
                <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>filter_list</i>
              </div>
            </button>
            <div className="v-menu v-menu--inline">
              <div className="v-menu__activator">
                <button type="button" className={['v-btn v-btn--flat v-btn--icon', this.props.theme].join(' ')}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>more_vert</i>
                  </div>
                </button>
              </div>
            </div>
            <span className="pr-2"></span>
          </div>
        </div>
      </div>
    )
  }
}
