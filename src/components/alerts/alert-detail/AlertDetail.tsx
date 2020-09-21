import React, { Component } from 'react';

import { ThemeContext } from 'shared/contexts/ThemeContext';

import './AlertDetail.scss';

interface IAlertDetailProps {
};

export class AlertDetail extends Component<IAlertDetailProps, any> {

  static contextType = ThemeContext;

  render() {

    let theme = this.context;

    return (
      <div className="v-content" data-booted="true" style={{ padding: '0px' }}>
        <div className="v-content__wrap">
          <div className="v-alert v-alert--outline error--text" style={{ display: 'none' }}>
            <div>
            </div>
            <a className="v-alert__dismissible">
              <i aria-hidden="true" className={['v-icon v-icon--right material-icons', theme].join(' ')}>cancel</i>
            </a>
          </div>
          <div className="alert-detail">
            <div className={['v-card v-card--flat v-sheet', theme].join(' ')}>
              <div className={['v-card v-card--flat v-sheet v-sheet--tile', theme].join(' ')}>
                <nav className={['v-toolbar v-toolbar--dense nav-style', theme].join(' ')} data-booted="true">
                  <div className="v-toolbar__content" style={{ height: '48px' }}>
                    <button type="button" className={['v-btn v-btn--icon', theme].join(' ')}>
                      <div className="v-btn__content">
                        <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>arrow_back</i>
                      </div>
                    </button>
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
                <div className={['v-card v-card--flat v-sheet', theme].join(' ')}>
                  <div className="v-tabs" data-booted="true">
                    <div className={['v-tabs__bar', theme].join(' ')}>
                      <div className="v-tabs__wrapper">
                        <div className="v-tabs__container v-tabs__container--grow">
                          <div className="v-tabs__slider-wrapper" style={{ left: '0px', width: '512px' }}>
                            <div className="v-tabs__slider accent"></div>
                          </div>
                          <div className="v-tabs__div">
                            <a className="v-tabs__item v-tabs__item--active">
                              <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>info</i>&nbsp;Details
                            </a>
                          </div>
                          <div className="v-tabs__div">
                            <a className="v-tabs__item">
                              <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>history</i>&nbsp;History
                            </a>
                          </div>
                          <div className="v-tabs__div">
                            <a className="v-tabs__item">
                              <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>assessment</i>&nbsp;Data
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="v-window">
                      <div className="v-window__container">
                        <div className="v-window-item">
                          <div className={['v-card v-card--flat v-sheet', theme].join(' ')}>
                            <div className="v-card__text">
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">
                                      Alert ID
                                    </div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="pre-c">44340be9-e7d0-4739-952f-21bf70e62700</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">
                                      Last Receive Alert ID
                                    </div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="pre-c">44340be9-e7d0-4739-952f-21bf70e62700</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Create Time</div>
                                  </div>
                                  <div className="flex xs9 text-xs-left">
                                    <div>
                                      <span className="v-tooltip v-tooltip--top">
                                        <span>
                                          <span className="text-no-wrap">T7 19 Thg 09, 2020 08:34:21.722 +07:00 </span>
                                        </span>
                                      </span>
                                      (39 min ago)
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Receive Time</div>
                                  </div>
                                  <div className="flex xs9 text-xs-left">
                                    <div>
                                      <span className="v-tooltip v-tooltip--top">
                                        <span>
                                          <span className="text-no-wrap">T7 19 Thg 09, 2020 08:34:21.739 +07:00 </span>
                                        </span>
                                      </span>
                                      (39 min ago)
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Last Receive Time</div>
                                  </div>
                                  <div className="flex xs9 text-xs-left">
                                    <div>
                                      <span className="v-tooltip v-tooltip--top">
                                        <span>
                                          <span className="text-no-wrap">T7 19 Thg 09, 2020 08:34:21.739 +07:00 </span>
                                        </span>
                                      </span>
                                      (39 min ago)
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Service</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>example.com</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Environment</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>Production</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Resource</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>web01</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Event</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>HttpServerProblem</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Correlate</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>HttpServerError, HttpServerOK, HttpServerProblem</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Group</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>Web</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Severity</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="label label-indeterminate">Indeterminate</span>&nbsp;→&nbsp;
                                      <span className="label label-major">Major</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Status</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="label">Open</span>
                                      <span>&nbsp;by <b>nam.nguyen@localhost.com</b> (39 min ago)</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text"></div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>error_outline</i>
                                      <i>&nbsp;MAJOR: Everything is down.</i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Value</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>Bad Gateway (501)</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Text</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span>MAJOR: Everything is down.</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Trend Indication</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="label">More Severe</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Timeout</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>86400</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Type</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="label">Exception Alert</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Duplicate count</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>0</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Repeat</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span className="label">False</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Origin</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>curl</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Tags</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <span tabIndex={0} className={['v-chip v-chip--label v-chip--small', theme].join(' ')}>
                                        <span className="v-chip__content">
                                          <i aria-hidden="true" className={['v-icon v-icon--left material-icons', theme].join(' ')}>label</i>dc1
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Is Out Of Hours</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>true</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Region</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>EU</div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text">Run Book Url</div>
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>http://www.example.com/wiki/RunBook/HttpServerProblem</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="v-window-item" style={{ display: 'none' }}>
                          <div className="tab-item-wrapper">
                            <div>
                              <div className="v-table__overflow">
                                <table className={['v-datatable v-table', theme].join(' ')}>
                                  <thead>
                                    <tr>
                                      <th role="columnheader" scope="col" aria-label="Alert/Note Id: Not sorted. Activate to sort ascending." aria-sort="none" tabIndex={0} className="column sortable text-xs-left">
                                        Alert/Note Id<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Update Time: Sorted descending. Activate to remove sorting."
                                        aria-sort="descending" tabIndex={0}
                                        className="column sortable active desc text-xs-left">
                                        Update Time<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Severity: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Severity<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Status: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Status<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Type: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Type<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Event: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Event<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Value: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Value<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="User: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        User<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                      <th role="columnheader" scope="col"
                                        aria-label="Text: Not sorted. Activate to sort ascending." aria-sort="none"
                                        tabIndex={0} className="column sortable text-xs-left">
                                        Text<i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')} style={{ fontSize: '16px' }}>arrow_upward</i>
                                      </th>
                                    </tr>
                                    <tr className="v-datatable__progress">
                                      <th colSpan={9} className="column"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="hidden-sm-and-down">
                                        <span className="pre-c">44340be9</span>
                                      </td>
                                      <td className="hidden-sm-and-down text-no-wrap">
                                        <span className="v-tooltip v-tooltip--top">
                                          <span>
                                            <span className="text-no-wrap">T7 19 Thg 09 08:34</span>
                                          </span>
                                        </span>
                                      </td>
                                      <td className="hidden-md-and-up text-no-wrap">
                                        <span className="v-tooltip v-tooltip--top">
                                          <span>
                                            <span className="text-no-wrap">08:34</span>
                                          </span>
                                        </span>
                                      </td>
                                      <td className="hidden-sm-and-down">
                                        <span className="label label-major">Major</span>
                                      </td>
                                      <td className="hidden-sm-and-down">
                                        <span className="label">Open</span>
                                      </td>
                                      <td>
                                        <span className="label">New</span>
                                      </td>
                                      <td className="hidden-sm-and-down">
                                        HttpServerProblem
                                      </td>
                                      <td className="hidden-sm-and-down">
                                        Bad Gateway (501)
                                      </td>
                                      <td>
                                        nam.nguyen@localhost.com
                                      </td>
                                      <td>
                                        MAJOR: Everything is down.
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className={['v-datatable v-table', theme].join(' ')}>
                                <div className="v-datatable__actions">
                                  <div className="v-datatable__actions__select">Rows per page:
                                    <div role="combobox" className={['v-input v-text-field v-select v-input--hide-details v-input--is-label-active v-input--is-dirty', theme].join(' ')}>
                                      <div className="v-input__control">
                                        <div className="v-input__slot">
                                          <div className="v-select__slot">
                                            <div className="v-select__selections">
                                              <div className="v-select__selection v-select__selection--comma">10</div>
                                              <input aria-label="Rows per page:" readOnly={true} type="text" autoComplete="on" aria-readonly="false" />
                                            </div>
                                            <div className="v-input__append-inner">
                                              <div className="v-input__icon v-input__icon--append">
                                                <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>arrow_drop_down</i>
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
                                    <button type="button" className={['v-btn v-btn--disabled v-btn--flat v-btn--icon', theme].join(' ')} aria-label="Previous page" disabled={true}>
                                      <div className="v-btn__content">
                                        <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>chevron_left</i>
                                      </div>
                                    </button>
                                    <button type="button" className={['v-btn v-btn--disabled v-btn--flat v-btn--icon', theme].join(' ')} aria-label="Next page" disabled={true}>
                                      <div className="v-btn__content">
                                        <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>chevron_right</i>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="v-window-item" style={{ display: 'none' }}>
                          <div className={['mx-1 v-card v-card--flat v-sheet', theme, 'grey lighten-3'].join(' ')} style={{ overflowX: 'auto' }}>
                            <div className="v-card__text">
                              <span className="pre-c">no raw data</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="container pa-1 fluid">
                    <div className="layout">
                      <div className="flex">
                        <button type="button" className={['v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2'].join(' ')}>
                          <div className="v-btn__content">
                            <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>visibility</i>&nbsp;Watch
                          </div>
                        </button>
                        <button type="button" className={['v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2'].join(' ')} style={{ display: 'none' }}>
                          <div className="v-btn__content">
                            <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>visibility_off</i>&nbsp;Unwatch
                          </div>
                        </button>
                        <button type="button" className={['v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2'].join(' ')}>
                          <div className="v-btn__content">
                            <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>note_add</i>&nbsp;Add note
                          </div>
                        </button>
                        <button type="button" className={['v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2'].join(' ')}>
                          <div className="v-btn__content">
                            <i aria-hidden="true" className={['v-icon material-icons', theme].join(' ')}>delete_forever</i>&nbsp;Delete
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
    )
  }
}
