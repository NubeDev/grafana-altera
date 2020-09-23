import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';
import config from 'shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import alertService from 'services/api/alert.service';

interface IAlertaTableProps {}

interface IAlertaTableState {
  alerts: IAlert[];
  total: number;
  pageSize: number;
}

const { useEffect } = React;

// Init state param request
const state = {
  filter: {
    status: config.filter.status
  },
  pagination: {
    page: 1,
    rowsPerPage: 20,
    sortBy: config.sort_by
  }
};

async function updateData(setAlertState: React.Dispatch<React.SetStateAction<IAlertaTableState>>) {
  alertService.getAlerts({ state })
    .then(res => {
      if (res) {
        setAlertState({
          alerts: res.alerts,
          total: res.total,
          pageSize: res.pageSize
        });
      }
    });
}

function EnhancedTable(props: any) {
  // Set default value page, rowsPerPage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const initAlertState: IAlertaTableState = {
    alerts: [],
    total: 0,
    pageSize: 50
  };
  const [alertState, setAlertState] = React.useState(initAlertState);

  useEffect(() => {
    // Update data
    updateData(setAlertState);
    setInterval(() => {
      updateData(setAlertState);
    }, config.refresh_interval);
  }, []);

  // Handle change page
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);

    // Update data
    state.pagination.page = newPage + 1;
    updateData(setAlertState);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // Update data
    state.pagination.page = 1;
    state.pagination.rowsPerPage = parseInt(event.target.value, 10);
    updateData(setAlertState);
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
        <AlertaTableBody alerts={alertState.alerts} />
      </table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
        component="div"
        count={alertState.total}
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

  render() {
    const theme = this.context;

    return (
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <EnhancedTable theme={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
