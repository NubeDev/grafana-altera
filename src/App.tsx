import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';

import { Moment } from 'moment';

import { GrafanaAlertaOptions } from './types';

import './App.scss';

interface Props extends PanelProps<GrafanaAlertaOptions> { };

interface State {
  now: Moment;
};

export class AppComponent extends PureComponent<Props, State> {

  render() {
    return (
      <div className="alerts">
        <div className="v-tabs px-1">
          <div className="v-tabs__bar theme--light">
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
                <button type="button" className="v-btn v-btn--flat v-btn--icon theme--light filter-active">
                  <div className="v-btn__content">
                    <i aria-hidden="true" className="v-icon material-icons theme--light">filter_list</i>
                  </div>
                </button>
                <div className="v-menu v-menu--inline">
                  <div className="v-menu__activator">
                    <button type="button" className="v-btn v-btn--flat v-btn--icon theme--light">
                      <div className="v-btn__content">
                        <i aria-hidden="true" className="v-icon material-icons theme--light">more_vert</i>
                      </div>
                    </button>
                  </div>
                </div>
                <span className="pr-2"></span>
              </div>
            </div>
          </div>

          <div className="v-window">
            <div className="v-window__container">
              <div className="v-window-item v-enter-to">
                <div>
                  <div className="alert-table comfortable">
                    <div className="v-table__overflow">
                      <table className="v-datatable v-table v-datatable--select-all theme--light">
                        <thead>
                          <tr>
                            <th>
                              <div className="v-input v-input--selection-controls v-input--checkbox v-input--hide-details theme--light">
                                <div className="v-input__control">
                                  <div className="v-input__slot">
                                    <div className="v-input--selection-controls__input">
                                      <input aria-checked="false" role="checkbox" type="checkbox" value="" />
                                      <div className="v-input--selection-controls__ripple"></div>
                                      <i aria-hidden="true" className="v-icon material-icons theme--light">check_box_outline_blank</i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </th>
                            <th>Severity</th>
                            <th>Status</th>
                            <th>Last Receive Time</th>
                            <th>Timeout</th>
                            <th>Dupl.</th>
                            <th>Customer</th>
                            <th>Environment</th>
                            <th>Service</th>
                            <th>Resource</th>
                            <th>Event</th>
                            <th>Value</th>
                            <th>Description</th>
                          </tr>
                          <tr className="v-datatable__progress">
                            <th colSpan={13} className="column"></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="hover-lighten" style={{ backgroundColor: "orange" }}>
                            <td className="text-no-wrap">
                              <i aria-hidden="true" className="v-icon trend-arrow v-icon--link material-icons theme--light">arrow_upward</i>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span><span className="label label-major">Major</span></span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span><span className="label">Open</span></span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>
                                <span className="v-tooltip v-tooltip--top">
                                  <span>
                                    <span className="text-no-wrap">T7 15 Thg 08 10:38</span>
                                  </span>
                                </span>
                              </span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span className="text-xs-right">0:00:00</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>0</span>
                            </td>
                            <td className="text-no-wrap black--text"></td>
                            <td className="text-no-wrap black--text">
                              <span>Production</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>example.com</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>web02</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>HttpServerError</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>Bad Gateway (501)</span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <span>
                                <div className="fixed-table">
                                  <div className="text-truncate"><span>Site is down.</span></div>
                                </div>
                              </span>
                            </td>
                            <td className="text-no-wrap black--text">
                              <div className="action-buttons" style={{ backgroundColor: "orange" }}>
                                ...&nbsp;
                                <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                  <div className="v-btn__content">
                                    <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "20px" }}>visibility</i>
                                  </div>
                                </button>
                                <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                  <div className="v-btn__content">
                                    <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "20px" }}>check</i>
                                  </div>
                                </button>
                                <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                  <div className="v-btn__content">
                                    <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "20px" }}>schedule</i>
                                  </div>
                                </button>
                                <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                  <div className="v-btn__content">
                                    <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "20px" }}>highlight_off</i>
                                  </div>
                                </button>
                                <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                  <div className="v-btn__content">
                                    <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "20px" }}>delete</i>
                                  </div>
                                </button>
                                <div className="v-menu v-menu--inline">
                                  <div className="v-menu__activator">
                                    <button type="button" className="btn--plain pa-0 ma-0 v-btn v-btn--flat v-btn--icon v-btn--small theme--light">
                                      <div className="v-btn__content">
                                        <i aria-hidden="true" className="v-icon material-icons theme--light" style={{ fontSize: "16px" }}>more_vert</i>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="v-datatable v-table v-datatable--select-all theme--light">
                      <div className="v-datatable__actions">
                        <div className="v-datatable__actions__select">Rows per page:
                          <div role="combobox" className="v-input v-text-field v-select v-input--hide-details v-input--is-label-active v-input--is-dirty theme--light">
                            <div className="v-input__control">
                              <div className="v-input__slot">
                                <div className="v-select__slot">
                                  <div className="v-select__selections">
                                    <div className="v-select__selection v-select__selection--comma">20</div>
                                    <input aria-label="Rows per page:" readOnly={true}  type="text" aria-readonly="false" />
                                  </div>
                                  <div className="v-input__append-inner">
                                    <div className="v-input__icon v-input__icon--append">
                                      <i aria-hidden="true" className="v-icon material-icons theme--light">arrow_drop_down</i>
                                    </div>
                                  </div>
                                </div>
                                <div className="v-menu"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="v-datatable__actions__range-controls">
                          <div className="v-datatable__actions__pagination">1-1 of 1</div>
                          <button type="button" className="v-btn v-btn--disabled v-btn--flat v-btn--icon theme--light" aria-label="Previous page">
                            <div className="v-btn__content">
                              <i aria-hidden="true" className="v-icon material-icons theme--light">chevron_left</i>
                            </div>
                          </button>
                          <button type="button" className="v-btn v-btn--disabled v-btn--flat v-btn--icon theme--light" aria-label="Next page">
                            <div className="v-btn__content">
                              <i aria-hidden="true" className="v-icon material-icons theme--light">chevron_right</i>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
