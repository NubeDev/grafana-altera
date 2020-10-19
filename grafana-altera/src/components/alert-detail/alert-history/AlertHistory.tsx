import React, { Component } from 'react';
import moment from 'moment';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Tooltip from '@material-ui/core/Tooltip';

import { THEME } from 'shared/constants/theme.constants';
import config from '../../../shared/config/config.json';
import { IHistory } from 'shared/models/model-data/history.model';

interface IAlertHistoryProps {
  theme: any;
  historys: IHistory[];
}

interface IAlertHistoryTableProps {
  theme: any;
  historys: IHistory[];
}

function AlertHistoryTable(props: IAlertHistoryTableProps) {
  // Get value from props
  const { theme, historys } = props;

  // Theme
  const color = theme === THEME.DARK_MODE ? 'white' : 'black';
  const useStyles = makeStyles((themeDefault: Theme) =>
    createStyles({
      rootColor: {
        color
      }
    })
  );
  const classes = useStyles();

  const shortId = (value: any) => {
    if (value) {
      return String(value).substring(0, 8);
    }
    return '';
  };

  const formatDateTime = (type: string, dateTime: any) => {
    if (type === 'longDate') {
      return moment(dateTime).format(config.dates.longDate);
    } else if (type === 'mediumDate') {
      return moment(dateTime).format(config.dates.mediumDate);
    } else if (type === 'shortTime') {
      return moment(dateTime).format(config.dates.shortTime);
    } else if (type === 'hhmmss') {
      const pad = (s: number) => {
        return ('0' + s).slice(-2);
      };
      if (dateTime) {
        const duration = moment.duration(dateTime, 'seconds');
        const seconds = pad(duration.seconds());
        const minutes = pad(duration.minutes());
        const hours = Math.floor(duration.as('h'));
        return `${hours}:${minutes}:${seconds}`;
      }
    } else if (type === 'tooltip') {
      return moment(dateTime).utcOffset('+00:00').format('YYYY/MM/DD HH:mm:ss.SSS +00:00');
    }
    return dateTime;
  };

  const capitalize = (value: any) => {
    if (value === null) {
      return '';
    }
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  const splitCaps = (value: any) => {
    if (value === null) {
      return 'unknown';
    }
    return value.toString().replace(/([A-Z])/g, ' $1').split(' ').map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  /* Use for data table */
  // Set default value page, rowsPerPage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div className="v-table__overflow">
        <table className={clsx('v-datatable v-table', theme)}>
          <thead>
            <tr>
              <th role="columnheader" scope="col" aria-label="Alert/Note Id: Not sorted. Activate to sort ascending." aria-sort="none" tabIndex={0} className="column sortable text-xs-left">
                Alert/Note Id<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Update Time: Sorted descending. Activate to remove sorting."
                aria-sort="descending" tabIndex={0}
                className="column sortable active desc text-xs-left">
                Update Time<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Severity: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Severity<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Status: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Status<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Timeout: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Timeout<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Type: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Type<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Event: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Event<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Value: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Value<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="User: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                User<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
              <th role="columnheader" scope="col"
                aria-label="Text: Not sorted. Activate to sort ascending." aria-sort="none"
                tabIndex={0} className="column sortable text-xs-left">
                Text<i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>arrow_upward</i>
              </th>
            </tr>
            <tr className="v-datatable__progress">
              <th colSpan={10} className="column" />
            </tr>
          </thead>
          <tbody>
            {(historys.length > 0) &&
              historys
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((history, index) => {
                  return (
                    <tr key={index}>
                      <td className="hidden-sm-and-down">
                        <span className="pre-c">{shortId(history.id)}</span>
                      </td>
                      <td className="hidden-sm-and-down text-no-wrap">
                        <Tooltip title={formatDateTime('tooltip', history.updateTime)} placement="top">
                          <span className="v-tooltip v-tooltip--top">
                            <span>
                              <span className="text-no-wrap">{formatDateTime('mediumDate', history.updateTime)}</span>
                            </span>
                          </span>
                        </Tooltip>
                      </td>
                      <td className="hidden-md-and-up text-no-wrap">
                        <span className="v-tooltip v-tooltip--top">
                          <span>
                            <span className="text-no-wrap">{formatDateTime('shortTime', history.updateTime)}</span>
                          </span>
                        </span>
                      </td>
                      <td className="hidden-sm-and-down">
                        <span className={clsx('label', `label-${history.severity}`)}>{capitalize(history.severity)}</span>
                      </td>
                      <td className="hidden-sm-and-down">
                        <span className="label">{capitalize(history.status)}</span>
                      </td>
                      <td className="hidden-sm-and-down">
                        {formatDateTime('hhmmss', history.timeout)}
                      </td>
                      <td>
                        <span className="label">{splitCaps(history.type)}</span>
                      </td>
                      <td className="hidden-sm-and-down">{history.event}</td>
                      <td className="hidden-sm-and-down">{history.value}</td>
                      <td>{history.user}</td>
                      <td>{history.text}</td>
                    </tr>
                  );
                })
            }
            {(historys && historys.length === 0) && (
              <tr className="hover-lighten">
                <td colSpan={13} className="text-no-wrap">
                  <span className="no-record">No matching records found!</span>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {historys && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { value: historys.length, label: 'All' }]}
            component="div"
            count={historys.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            className={classes.rootColor}
            classes={{
              selectIcon: classes.rootColor
            }}
          />
        )}
      </div>
    </div>
  );
}

export class AlertHistory extends Component<IAlertHistoryProps> {
  constructor(props: IAlertHistoryProps) {
    super(props);
  }

  render() {
    const { theme, historys } = this.props;

    return (
      <div className="v-window-item">
        <div className="tab-item-wrapper">
          <AlertHistoryTable
            theme={theme}
            historys={historys}
          />
        </div>
      </div>
    );
  }
}
