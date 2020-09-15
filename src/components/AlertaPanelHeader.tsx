import React, { Component } from 'react';

import { ThemeContext } from 'shared/config/ThemeContext';
import { IEnvironmentResponse } from 'shared/models/model-responses/environment-response';
import raw from './table/data/environments_2.json';

const data: IEnvironmentResponse = raw;

interface IAlertaPanelHeaderProps {
};

export class AlertaPanelHeader extends Component<IAlertaPanelHeaderProps, any> {

  static contextType = ThemeContext;

  environments(): string[] {
    const result = data.environments.map(e => e.environment).sort();
    return ['ALL'].concat(result);
  }

  environmentCounts() {
    return data.environments.reduce((group: any, e) => {
      group[e.environment] = e.count;
      group['ALL'] = group['ALL'] + e.count;
      return group;
    }, { 'ALL': 0 })
  }

  render() {

    let theme = this.context;

    return (
      <div className={['v-tabs__bar', theme].join(' ')}>
        <div className="v-tabs__wrapper">
          <div className="v-tabs__container v-tabs__container--grow">
            <div className="v-tabs__slider-wrapper" style={{ left: "0px", width: "597px" }}>
              <div className="v-tabs__slider accent"></div>
            </div>
            {data.environments.length > 0 &&
              this.environments().map((env) => env &&
                <div className="v-tabs__div">
                  <a href={'#tab-' + env} className="v-tabs__item v-tabs__item--active">
                    { env }&nbsp;({ this.environmentCounts()[env] || 0 })
                  </a>
                </div>
              )
            }
            <div className="spacer"></div>
            <button type="button" className={['v-btn v-btn--flat v-btn--icon filter-active', theme].join(' ')}>
              <div className="v-btn__content">
                <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>filter_list</i>
              </div>
            </button>
            <div className="v-menu v-menu--inline">
              <div className="v-menu__activator">
                <button type="button" className={['v-btn v-btn--flat v-btn--icon', theme].join(' ')}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>more_vert</i>
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
