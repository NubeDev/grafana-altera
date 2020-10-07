import React, { Component } from 'react';
import clsx from 'clsx';
import TablePagination from '@material-ui/core/TablePagination';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import './AlertaTable.scss';
import { AlertaTableHeader } from './AlertaTableHeader';
import { AlertaTableBody } from './AlertaTableBody';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';
import config from 'shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { IEnvironment } from 'shared/models/model-data/environment.model';
import alertService from 'services/api/alert.service';
import environmentService from 'services/api/environment.service';
import groupService from 'services/api/group.service';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { IService } from 'shared/models/model-data/service.model';
import { IGroup } from 'shared/models/model-data/group.model';

interface IAlertaTableProps {}

interface IAlertaDataTable {
  alerts: IAlert[];
  total: number;
  pageSize: number;
}

interface IAlertaTableState {
  environments: IEnvironment[];
  services: IService[];
  groups: IGroup[];
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

/**
 * Call API get alerts.
 * @param setAlertState
 */
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

interface IFilterForm {
}

/**
 * Table
 * @param props
 */
function MainTable(props: any) {
  const { theme, environments, services, groups } = props;

  // Theme
  const color = theme === THEME.DARK_MODE ? 'white' : 'black';
  const background = theme === THEME.DARK_MODE ? '#424242' : '#ffffff';
  const useStyles = makeStyles((themeDefault: Theme) =>
    createStyles({
      rootEnvTabs: {
        flexGrow: 1,
        background,
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
      },
      rootDrawer: {
        background,
      },
      list: {
        width: 300,
      },
      button: {
        marginTop: themeDefault.spacing(2)
      },
      typography: {
        marginBottom: themeDefault.spacing(2)
      },
      formControl: {
        margin: themeDefault.spacing(1)
      },
      chip: {
        margin: 2,
        background: theme === THEME.DARK_MODE ? '#555' : '#e0e0e0',
        color: theme === THEME.DARK_MODE ? '#fff' : '#000000de'
      },
      chips: {
        paddingTop: '4px',
        display: 'flex',
        flexWrap: 'wrap',
      }
    })
  );
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
    const result = environments.map((e: any) => e.environment).sort();
    return ['ALL'].concat(result);
  };

  const environmentCounts = () => {
    return environments.reduce((group: any, e: any) => {
      group[e.environment] = e.count;
      group['ALL'] = group['ALL'] + e.count
      return group;
    }, { 'ALL': 0 });
  }

  const handleEnvTabChange = (env: string) => {
    if (env !== 'ALL') {
      paramState.filter.environment = env;
    } else {
      paramState.filter.environment = '';
    }
    updateData(setAlertState);
  }

  /* Use for filter */
  const [filterState, setFilterState] = React.useState({ right: false });

  const toggleDrawer = (anchor: string, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setFilterState({ ...filterState, [anchor]: open });
  };

  const [statusFilter, setStatusFilter] = React.useState<string[]>(config.filter.status);
  const [serviceFilter, setServiceFilter] = React.useState<string[]>([]);
  const [groupFilter, setGroupFilter] = React.useState<string[]>([]);

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string[]);
  };

  const handleChangeService = (event: React.ChangeEvent<{ value: unknown }>) => {
    setServiceFilter(event.target.value as string[]);
  };

  const handleChangeGroup = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroupFilter(event.target.value as string[]);
  };

  // Get status list
  const statusList = () => {
    const statusMap: any = config.alarm_model.status;
    return Object.keys(statusMap).sort((a, b) => {
      return statusMap[a].localeCompare(statusMap[b]);
    });
  };

  // Get services list
  const servicesList = () => {
    return services.map((s: any) => s.service).sort();
  };

  // Get groups list
  const groupsList = () => {
    return groups.map((g: any) => g.group).sort();
  };

  const alertListEventFilter = (anchor: string) => (
    <div className={clsx(classes.list, theme)} role="presentation">
      <div className="v-toolbar__content" style={{ height: '48px' }}>
        <div className="v-toolbar__title">Filters</div>
        <div className="spacer" />
        <div className="v-toolbar__items" />
        <div className="v-menu v-menu--inline">
          <div className="v-menu__activator">
            <button onClick={toggleDrawer(anchor, false)} type="button" className={clsx('v-btn v-btn--flat v-btn--icon', theme)}>
              <div className="v-btn__content">
                <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>close</i>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
        }}
        validate={(values) => {
          const errors: Partial<IFilterForm> = {};
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            console.log(JSON.stringify(values, null, 2));
          }, 500);
        }}
      >
        {({ submitForm, isSubmitting, touched, errors }) => (
          <div className="settings">
            <div className="v-tabs px-1">
              <Container component="main" maxWidth="xs">
                <div className="settings-paper">
                  <Form className="settings-form">
                    <Grid container spacing={2}>
                      <Grid item xs={12} className={theme}>
                        <Field
                          component={TextField}
                          id="search"
                          name="search"
                          label="Search"
                          type="text"
                          variant="outlined"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search style={{ color: theme === THEME.DARK_MODE ? '#ffffff' : '#424242' }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <div className="v-text-field__details">
                          <div className={clsx('v-messages', theme)}>
                            <div className="v-messages__wrapper">
                              <div className="v-messages__message">Filter results by text search</div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} className={theme}>
                        <FormControl 
                          fullWidth
                          variant="filled"
                        >
                          <InputLabel id="mutiple-status-label">Status</InputLabel>
                          <Select
                            variant="filled"
                            labelId="mutiple-status-label"
                            id="mutiple-status"
                            fullWidth
                            multiple
                            value={statusFilter}
                            onChange={handleChangeStatus}
                            input={<OutlinedInput />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  marginTop: 155
                                }
                              }
                            }}
                          >
                            {statusList().map((status) => (
                              <MenuItem key={status} value={status}>
                                <Checkbox checked={statusFilter.indexOf(status) > -1} color="primary" />
                                <ListItemText primary={status} />
                              </MenuItem>
                            ))}
                          </Select>
                          <div className="v-text-field__details">
                            <div className={clsx('v-messages', theme)}>
                              <div className="v-messages__wrapper">
                                <div className="v-messages__message">Choose one or more status</div>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className={theme}>
                        <FormControl 
                          fullWidth
                          variant="filled"
                        >
                          <InputLabel id="mutiple-service-label">Service</InputLabel>
                          <Select
                            variant="filled"
                            labelId="mutiple-service-label"
                            id="mutiple-service"
                            fullWidth
                            multiple
                            value={serviceFilter}
                            onChange={handleChangeService}
                            input={<OutlinedInput />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  marginTop: 258
                                }
                              }
                            }}
                          >
                            {servicesList().map((service: any) => (
                              <MenuItem key={service} value={service}>
                                <Checkbox checked={serviceFilter.indexOf(service) > -1} color="primary" />
                                <ListItemText primary={service} />
                              </MenuItem>
                            ))}
                          </Select>
                          <div className="v-text-field__details">
                            <div className={clsx('v-messages', theme)}>
                              <div className="v-messages__wrapper">
                                <div className="v-messages__message">Choose one or more service</div>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} className={theme}>
                        <FormControl 
                          fullWidth
                          variant="filled"
                        >
                          <InputLabel id="mutiple-group-label">Group</InputLabel>
                          <Select
                            variant="filled"
                            labelId="mutiple-group-label"
                            id="mutiple-group"
                            fullWidth
                            multiple
                            value={groupFilter}
                            onChange={handleChangeGroup}
                            input={<OutlinedInput />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  marginTop: 348
                                }
                              }
                            }}
                          >
                            {groupsList().map((group: any) => (
                              <MenuItem key={group} value={group}>
                                <Checkbox checked={groupFilter.indexOf(group) > -1} color="primary" />
                                <ListItemText primary={group} />
                              </MenuItem>
                            ))}
                          </Select>
                          <div className="v-text-field__details">
                            <div className={clsx('v-messages', theme)}>
                              <div className="v-messages__wrapper">
                                <div className="v-messages__message">Choose one or more group</div>
                              </div>
                            </div>
                          </div>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
              </Container>
            </div>
          </div>
        )}
      </Formik>
      <div className={clsx('v-card v-card--flat v-sheet', theme)}>
        <div className="flex xs12">
          <div className="v-card__actions">
            <button type="button" className={clsx('v-btn', theme, 'primary')} style={{ display: 'none' }}>
              <div className="v-btn__content">Apply</div>
            </button>
            <div className="spacer" />
            <button type="button" className={clsx('v-btn v-btn--flat', theme, 'blue--text text--darken-1')}>
              <div className="v-btn__content">
                Reset
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="v-navigation-drawer__border" />
    </div>
  );

  return (
    <div className="v-tabs px-1">
      <div className={clsx('v-tabs__bar', theme)}>
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
            <div className={theme}>
              <React.Fragment key="right">
                <button type="button" onClick={toggleDrawer('right', true)} className={clsx('v-btn v-btn--flat v-btn--icon filter-active', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>filter_list</i>
                  </div>
                </button>
                <SwipeableDrawer
                  anchor={'right'}
                  open={filterState['right']}
                  // onClose = true -> stop close when click
                  onClose={toggleDrawer('right', true)}
                  onOpen={toggleDrawer('right', true)}
                  classes={{
                    paperAnchorRight: classes.rootDrawer
                  }}
                >
                  {alertListEventFilter('right')}
                </SwipeableDrawer>
              </React.Fragment>
            </div>
            <div className="v-menu v-menu--inline">
              <div className="v-menu__activator">
                <button type="button" className={clsx('v-btn v-btn--flat v-btn--icon', theme)}>
                  <div className="v-btn__content">
                    <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>more_vert</i>
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
                  <table className={clsx('v-datatable v-table v-datatable--select-all', theme)}>
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
      environments: [],
      services: [],
      groups: []
    };
  }

  static contextType = ThemeContext;

  componentDidMount() {
    this.getEnvironments();
    this.getServices();
    this.getGroups();
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

  getServices = () => {
    alertService.getServices()
      .then(res => {
        if (res) {
          this.setState({ services: res.services });
        }
      });
  };

  getGroups = () => {
    groupService.getGroups()
      .then(res => {
        if (res) {
          this.setState({ groups: res.groups });
        }
      });
  };

  render() {
    const theme = this.context;

    const { environments, services, groups } = this.state;

    return (
      <MainTable theme={theme} environments={environments} services={services} groups={groups} />
    );
  }
}
