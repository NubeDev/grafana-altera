import React, { Component } from 'react';

interface IAlertHistoryProps {
  theme: any;
}

export class AlertHistory extends Component<IAlertHistoryProps> {
  constructor(props: IAlertHistoryProps) {
    super(props);
  }

  render() {
    const { theme } = this.props;

    return (
      <div className="v-window-item">
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
                    <th colSpan={9} className="column" />
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
                        <div className="v-menu" />
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
    );
  }
}
