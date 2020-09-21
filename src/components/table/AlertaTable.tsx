import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { IAlertResponse } from 'shared/models/model-responses/alert-response';
import { THEME } from 'shared/constants/theme.constants';
import alertService from 'services/api/alert.service';

interface IAlertaTableProps {
};

interface IAlertaTableState {
  alertResponse?: IAlertResponse;
};

function EnhancedTable(props: any) {
  // Set default value page, rowsPerPage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Theme
  const color = props.theme === THEME.DARK_MODE ? 'white' : 'black';
  const useStyles = makeStyles({
    root: {
      color
    },
    selectIcon: {
      color
    }
  });

  const classes = useStyles();

  return (
    <div className="v-table__overflow">
      <table className={['v-datatable v-table v-datatable--select-all', props.theme].join(' ')}>
        <AlertaTableHeader />
        <AlertaTableBody alertResponse={props.alertResponse} page={page} rowsPerPage={rowsPerPage} />
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
        component="div"
        count={props.alertResponse.alerts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        className={classes.root}
        classes={{
          selectIcon: classes.selectIcon
        }}
      />
    </div>
  );
}

export class AlertaTable extends Component<IAlertaTableProps, IAlertaTableState> {

  static contextType = ThemeContext;

  initAlertResponse: IAlertResponse = {
    alerts: [],
    autoRefresh: false,
    lastTime: '',
    more: false,
    page: 0,
    pageSize: 0,
    pages: 0,
    severityCounts: {},
    status: '',
    statusCounts: {},
    total: 0
  };

  state = {
    alertResponse: this.initAlertResponse
  };

  componentDidMount() {
    // Get all Alerts
    alertService.getAlerts()
      .then(response => {
        this.setState({
          alertResponse: response
        });
      })
      .catch(error => console.log(error));
  }

  render() {

    let theme = this.context;

    const { alertResponse } = this.state;

    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <EnhancedTable alertResponse={alertResponse} theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
