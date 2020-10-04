import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';
import config from 'shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { IEnvironment } from 'shared/models/model-data/environment.model';
import alertService from 'services/api/alert.service';
import environmentService from 'services/api/environment.service';

interface IAlertaTableProps {}

interface IAlertaDataTable {
  alerts: IAlert[];
  total: number;
  pageSize: number;
}

interface IAlertaTableState {
  environments: IEnvironment[];
}

const { useEffect } = React;

// Init state param request
const paramState = {
  filter: {
    status: config.filter.status,
    environment: ''
  },
  pagination: {
    page: 1,
    rowsPerPage: 20,
    sortBy: config.sort_by
  }
};

async function updateData(setAlertState: React.Dispatch<React.SetStateAction<IAlertaDataTable>>) {
  alertService.getAlerts({ state: paramState })
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
  // Theme
  const color = props.theme === THEME.DARK_MODE ? 'white' : 'black';
  const useStyles = makeStyles({
    rootEnvTabs: {
      flexGrow: 1,
      background: props.theme === THEME.DARK_MODE ? '#424242' : '#ffffff',
      color,
      boxShadow: 'unset'
    },
    accent: {
      backgroundColor: '#ffa726',
      borderColor: '#ffa726'
    },
    rootTable: {
      color
    },
    selectIcon: {
      color
    }
  });
  const classes = useStyles();

  /* Use for data table */
  // Set default value page, rowsPerPage
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const initAlertState: IAlertaDataTable = {
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
    paramState.pagination.page = newPage + 1;
    updateData(setAlertState);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);

    // Update data
    paramState.pagination.page = 1;
    paramState.pagination.rowsPerPage = parseInt(event.target.value, 10);
    updateData(setAlertState);
  };

  /* Use for Environment tabs */
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const mergeEnvironments = () => {
    const result = props.environments.map((e: any) => e.environment).sort();
    return ['ALL'].concat(result);
  };

  const environmentCounts = () => {
    return props.environments.reduce((group: any, e: any) => {
      group[e.environment] = e.count;
      group.ALL = group.ALL + e.count;
      return group;
    }, { ALL: 0 });
  }

  const handleEnvTabChange = (env: string) => {
    if (env !== 'ALL') {
      paramState.filter.environment = env;
    } else {
      paramState.filter.environment = '';
    }
    updateData(setAlertState);
  }

  const { theme, environments } = props;

  return (
    <div className="v-tabs px-1">
      <div className={['v-tabs__bar', theme].join(' ')}>
        <div className="v-tabs__wrapper">
          <div className="v-tabs__container v-tabs__container--grow">
            {(environments && environments.length > 0) && (
              <div className={classes.rootEnvTabs}>
                <Paper className={classes.rootEnvTabs} square>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    classes={{
                      indicator: classes.accent
                    }}
                    TabIndicatorProps={{
                      style: {
                        backgroundColor: '#ffa726',
                        borderColor: '#ffa726'
                      }
                    }}
                  >
                    {mergeEnvironments().map((env) => env &&
                      <Tab label={`${ env } (${ environmentCounts()[env] || 0 })`} onClick={() => handleEnvTabChange(env)} />
                    )}
                  </Tabs>
                </Paper>
              </div>
            )}
            <div className="spacer" />
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
            <span className="pr-2" />
          </div>
        </div>
      </div>
      <div className="v-window">
        <div className="v-window__container">
          <div className="v-window-item v-enter-to">
            <div>
              <div className="alert-table comfortable">
                <div className="v-table__overflow">
                  <table className={['v-datatable v-table v-datatable--select-all', theme].join(' ')}>
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
                    className={classes.rootTable}
                    classes={{
                      selectIcon: classes.selectIcon
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export class AlertaTable extends Component<IAlertaTableProps, IAlertaTableState> {
  constructor(props: IAlertaTableProps) {
    super(props);
    this.state = {
      environments: []
    };
  }

  static contextType = ThemeContext;

  componentDidMount() {
    this.getEnvironments();
    setInterval(this.getEnvironments, config.refresh_interval);
  }

  getEnvironments = async () => {
    environmentService.getEnvironments({ state: paramState })
      .then(res => {
        if (res) {
          this.setState({ environments: res.environments });
        }
      });
  };

  render() {
    const theme = this.context;

    return (
      <EnhancedTable theme={theme} environments={this.state.environments} />
    );
  }
}
