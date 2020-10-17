import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import moment from 'moment';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SearchIcon from '@material-ui/icons/Search';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import './AlertaTable.scss';
import { AlertaTableToolbar } from './AlertaTableToolbar';
import { AlertaTableContent } from './AlertaTableContent';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';
import config from 'shared/config/config.json';
import { IAlert } from 'shared/models/model-data/alert.model';
import { IEnvironment } from 'shared/models/model-data/environment.model';
import alertService from 'services/api/alert.service';
import environmentService from 'services/api/environment.service';
import groupService from 'services/api/group.service';
import authService from 'services/api/auth.service';
import userService from 'services/api/user.service';
import { IService } from 'shared/models/model-data/service.model';
import { IGroup } from 'shared/models/model-data/group.model';
import { AlertDetail } from 'components/alert-detail/AlertDetail';

const { useEffect } = React;

interface IAlertaTableProps { }

interface IAlertaDataTable {
  alerts: IAlert[];
  total: number;
  pageSize: number;
}

interface IAlertaTableState {
  environments: IEnvironment[];
  services: IService[];
  groups: IGroup[];
  basicAuthUser: string;
  ackTimeout: number;
  shelveTimeout: number;
  refreshInterval: number;
}

interface IMainTableProps {
  theme: any;
  environments: IEnvironment[];
  services: IService[];
  groups: IGroup[];
  basicAuthUser: string;
  ackTimeout: number;
  shelveTimeout: number;
  refreshInterval: number;
}

interface IFilterForm { }

// Init state param request
const paramState = {
  filter: {
    status: config.filter.status,
    environment: '',
    service: [] as string[],
    group: [] as string[],
    dateRange: [] as any[]
  },
  pagination: {
    page: 1,
    rowsPerPage: 20,
    sortBy: config.sort_by as any,
    descending: 'asc'
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

/**
 * Alerta main Table.
 * @param props
 */
function MainTable(props: IMainTableProps) {
  // Get value from props
  const { theme, environments, services, groups, basicAuthUser, ackTimeout, shelveTimeout, refreshInterval } = props;

  // Theme
  const color = theme === THEME.DARK_MODE ? 'white' : 'black';
  const color2 = theme === THEME.DARK_MODE ? '#fff' : '#000000de';
  const background = theme === THEME.DARK_MODE ? '#424242' : '#ffffff';
  const border = theme === THEME.DARK_MODE ? '2px solid hsla(0,0%,100%,.7)' : '2px solid rgba(0,0,0,.54)';
  const border2 = theme === THEME.DARK_MODE ? '2px solid #fff' : '2px solid rgba(0,0,0,.87)';
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
      rootColor: {
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
        color: color2
      },
      chips: {
        paddingTop: '4px',
        display: 'flex',
        flexWrap: 'wrap',
      },
      oneSelect: {
        marginTop: 8,
        color: color2
      },
      rootTextField: {
        '& label.Mui-focused': {
          color: '#3f51b5',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#3f51b5',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border
          },
          '&:hover fieldset': {
            border: border2
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3f51b5',
          },
        },
      },
      rootOutlinedInput: {
        '& label.Mui-focused': {
          color: '#3f51b5',
        },
        '& .MuiInput-underline:after': {
          borderBottomColor: '#3f51b5',
        },
        '&.MuiOutlinedInput-root': {
          '& fieldset': {
            border
          },
          '&:hover fieldset': {
            border: border2
          },
          '&.Mui-focused fieldset': {
            borderColor: '#3f51b5',
          },
        },
      }
    })
  );
  const classes = useStyles();

  /* Use for table header */
  // Sort table
  const [order, setOrder] = React.useState('');
  const [orderBy, setOrderBy] = React.useState('');
  const [rowSelected, setRowSelected] = React.useState<IAlert[]>([]);

  const handleTableSort = (column: string) => {
    let orderByValue: any;
    let descendingValue: any;
    let sortByValue: any;
    if (order === '' || order === 'asc') {
      const isAsc = orderBy === column && order === 'asc';
      const descending = isAsc ? 'desc' : 'asc';

      orderByValue = column;
      descendingValue = descending;
      sortByValue = column;
    } else {
      // Reset defaul sort when click 3 times
      orderByValue = '';
      descendingValue = '';
      sortByValue = config.sort_by;
    }

    setOrder(descendingValue);
    setOrderBy(orderByValue);

    // Update data
    paramState.pagination.descending = descendingValue;
    paramState.pagination.sortBy = sortByValue;
    updateData(setAlertState);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>, filteredData: IAlert[]) => {
    if (event.target.checked) {
      setRowSelected(filteredData);
      return;
    }
    setRowSelected([]);
  };

  const handleSelectRowClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, alert: IAlert) => {
    // Stop TableRow click event & checkbox click event conflict
    event.stopPropagation();
    const selectedIndex = rowSelected.map(a => a.id).indexOf(alert.id);
    let newRowSelected: IAlert[] = [];

    if (selectedIndex === -1) {
      newRowSelected = newRowSelected.concat(rowSelected, alert);
    } else if (selectedIndex === 0) {
      newRowSelected = newRowSelected.concat(rowSelected.slice(1));
    } else if (selectedIndex === rowSelected.length - 1) {
      newRowSelected = newRowSelected.concat(rowSelected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newRowSelected = newRowSelected.concat(rowSelected.slice(0, selectedIndex), rowSelected.slice(selectedIndex + 1));
    }

    setRowSelected(newRowSelected);
  };

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
    }, refreshInterval);
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
  const [environment, setValue] = React.useState(0);
  const handleChangeEnvironment = (event: React.ChangeEvent<{}>, newEnvironment: number) => {
    setValue(newEnvironment);
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
    // Update data
    updateData(setAlertState);
  }

  /* Use for filter */
  // Set default value start date
  const startDateDefaultValue = () => {
    // 7 days ago
    const startDate = moment().unix() - 7 * 24 * 3600;
    return moment.unix(startDate).utc().format('YYYY-MM-DDTHH:mm');
  };

  // Set default value end date
  const endDateDefaultValue = () => {
    const endDate = moment().unix();
    return moment.unix(endDate).utc().format('YYYY-MM-DDTHH:mm');
  };

  const [filterState, setFilterState] = React.useState({ right: false });
  const [searchTextFilter, setSearchTextFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<string[]>(config.filter.status);
  const [serviceFilter, setServiceFilter] = React.useState<string[]>([]);
  const [groupFilter, setGroupFilter] = React.useState<string[]>([]);
  const [dateTime, setDateTime] = React.useState('Latest');
  const [showDateRange, setShowDateRange] = React.useState(false);
  const [startDateFilter, setStartDateFilter] = React.useState(startDateDefaultValue());
  const [endDateFilter, setEndDateFilter] = React.useState(endDateDefaultValue());

  // Toggle Drawer event
  const toggleDrawer = (anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setFilterState({ ...filterState, [anchor]: open });
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
    const serviceArr = services.map((s: any) => s.service).sort();
    // Remove duplicate elements
    const uniqueSet = new Set(serviceArr);
    return [...uniqueSet];
  };

  // Get groups list
  const groupsList = () => {
    const groupArr = groups.map((g: any) => g.group).sort();
    // Remove duplicate elements
    const uniqueSet = new Set(groupArr);
    return [...uniqueSet];
  };

  const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTextFilter(event.target.value);
  }

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    const status = event.target.value as string[];
    setStatusFilter(status);

    // Update data when filter status
    paramState.filter.status = status;
    updateData(setAlertState);
  };

  const handleChangeService = (event: React.ChangeEvent<{ value: unknown }>) => {
    const servicesFilter = event.target.value as string[];
    setServiceFilter(servicesFilter);

    // Update data when filter service
    paramState.filter.service = servicesFilter;
    updateData(setAlertState);
  };

  const handleChangeGroup = (event: React.ChangeEvent<{ value: unknown }>) => {
    const groupsFilter = event.target.value as string[];
    setGroupFilter(groupsFilter);

    // Update data when filter group
    paramState.filter.group = groupsFilter;
    updateData(setAlertState);
  };

  const handleChangeDateTime = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string;
    setDateTime(value);
    setShowDateRange(false);

    let range: any[];
    if ('Latest' === value) {
      range = [null, null];
    } else if ('1 hour' === value) {
      range = [-3600, null];
    } else if ('6 hours' === value) {
      range = [-3600 * 6, null];
    } else if ('12 hours' === value) {
      range = [-3600 * 12, null];
    } else {
      range = [0, 0];
      setShowDateRange(true);
    }

    // Update data when filter datetime
    paramState.filter.dateRange = range;
    updateData(setAlertState);
  };

  const handleChangeStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDateFilter(event.target.value);
  }

  const handleChangeEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDateFilter(event.target.value);
  }

  // Custom render value from select
  const renderValueSelect = (value: any) => {
    return (
      <div className={classes.oneSelect}>
        <div className="valign-center">
          <i aria-hidden="true" className={clsx('v-icon material-icons vertical-align-middle', theme)}>schedule</i>
          <span className="p-l-4">{value}</span>
        </div>
      </div>
    );
  };

  // Reset value all states
  const handleReset = () => {
    setStatusFilter(config.filter.status);
    setServiceFilter([]);
    setGroupFilter([]);
    setDateTime('Latest');
    setShowDateRange(false);
    setStartDateFilter(startDateDefaultValue());
    setEndDateFilter(endDateDefaultValue());
    setSearchTextFilter('');

    // Reset value param state and update data table
    paramState.filter.status = config.filter.status;
    paramState.filter.environment = '';
    paramState.filter.service = [] as string[];
    paramState.filter.group = [] as string[];
    paramState.filter.dateRange = [] as any[];
    updateData(setAlertState);
  };

  // Apply datetime filter
  const handleApply = () => {
    const toEpoch = (dt: any) => {
      return new Date(dt).getTime() / 1000;
    }
    paramState.filter.dateRange = [toEpoch(startDateFilter), toEpoch(endDateFilter)];
    updateData(setAlertState);
  }

  // Drawer  filter UI
  const alertListEventFilter = (anchor: string) => (
    <div className={clsx(classes.list, theme)} role="presentation">
      <div className="v-toolbar__content" style={{ height: '48px' }}>
        <div className="v-toolbar__title" style={{ color: color2 }}>Filters</div>
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
                          id="searchText"
                          name="searchText"
                          label="Search"
                          type="text"
                          variant="outlined"
                          fullWidth
                          value={searchTextFilter}
                          onChange={handleChangeSearchText}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon style={{ color: theme === THEME.DARK_MODE ? '#ffffff' : '#424242' }} />
                              </InputAdornment>
                            ),
                            autoComplete: "off"
                          }}
                          className={classes.rootTextField}
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
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="mutiple-status-label">Status</InputLabel>
                          <Select
                            id="mutiple-status"
                            labelId="mutiple-status-label"
                            variant="filled"
                            fullWidth
                            multiple
                            value={statusFilter}
                            onChange={handleChangeStatus}
                            input={<OutlinedInput className={classes.rootOutlinedInput} />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              getContentAnchorEl: null,
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  background,
                                  color
                                }
                              }
                            }}
                          >
                            {statusList().map((status) => (
                              <MenuItem key={status} value={status}>
                                <Checkbox
                                  checked={statusFilter.indexOf(status) > -1}
                                  style={{
                                    color: color2
                                  }}
                                />
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
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="mutiple-service-label">Service</InputLabel>
                          <Select
                            id="mutiple-service"
                            labelId="mutiple-service-label"
                            variant="filled"
                            fullWidth
                            multiple
                            value={serviceFilter}
                            onChange={handleChangeService}
                            input={<OutlinedInput className={classes.rootOutlinedInput} />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              getContentAnchorEl: null,
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  background,
                                  color
                                }
                              }
                            }}
                          >
                            {servicesList().map((service: any) => (
                              <MenuItem key={service} value={service}>
                                <Checkbox
                                  checked={serviceFilter.indexOf(service) > -1}
                                  style={{
                                    color: color2
                                  }}
                                />
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
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="mutiple-group-label">Group</InputLabel>
                          <Select
                            id="mutiple-group"
                            labelId="mutiple-group-label"
                            variant="filled"
                            fullWidth
                            multiple
                            value={groupFilter}
                            onChange={handleChangeGroup}
                            input={<OutlinedInput className={classes.rootOutlinedInput} />}
                            renderValue={(selected) => (
                              <div className={classes.chips}>
                                {(selected as string[]).map((val) => (
                                  <Chip key={val} label={val} className={classes.chip} />
                                ))}
                              </div>
                            )}
                            MenuProps={{
                              getContentAnchorEl: null,
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  background,
                                  color
                                }
                              }
                            }}
                          >
                            {groupsList().map((group: any) => (
                              <MenuItem key={group} value={group}>
                                <Checkbox
                                  checked={groupFilter.indexOf(group) > -1}
                                  style={{
                                    color: color2
                                  }}
                                />
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
                      <Grid item xs={12} className={theme}>
                        <FormControl fullWidth variant="filled">
                          <InputLabel id="date-time-label">Date/Time</InputLabel>
                          <Select
                            id="date-time"
                            labelId="date-time-label"
                            variant="filled"
                            fullWidth
                            value={dateTime}
                            onChange={handleChangeDateTime}
                            input={<OutlinedInput className={classes.rootOutlinedInput} />}
                            renderValue={(dt) => renderValueSelect(dt)}
                            MenuProps={{
                              getContentAnchorEl: null,
                              PaperProps: {
                                style: {
                                  maxHeight: 250,
                                  width: 250,
                                  background,
                                  color
                                }
                              }
                            }}
                          >
                            <MenuItem key={'Latest'} value={'Latest'}>Latest</MenuItem>
                            <MenuItem key={'Hour'} value={'1 hour'}>1 hour</MenuItem>
                            <MenuItem key={'SixHours'} value={'6 hours'}>6 hours</MenuItem>
                            <MenuItem key={'TwelveHours'} value={'12 hours'} divider>12 hours</MenuItem>
                            <MenuItem key={'SelectRange'} value={'Select Range'}>Select Range</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      {showDateRange && (
                        <Grid item xs={12} className={theme}>
                          <Field
                            component={TextField}
                            id="startDate"
                            name="startDate"
                            label="Start Date"
                            type="datetime-local"
                            value={startDateFilter}
                            onChange={handleChangeStartDate}
                            variant="outlined"
                            fullWidth
                            defa
                            InputLabelProps={{
                              shrink: true
                            }}
                            className={classes.rootTextField}
                          />
                        </Grid>
                      )}
                      {showDateRange && (
                        <Grid item xs={12} className={theme}>
                          <Field
                            component={TextField}
                            id="endDate"
                            name="endDate"
                            label="End Date"
                            type="datetime-local"
                            value={endDateFilter}
                            onChange={handleChangeEndDate}
                            variant="outlined"
                            fullWidth
                            InputLabelProps={{
                              shrink: true
                            }}
                            className={classes.rootTextField}
                          />
                        </Grid>
                      )}
                      <Grid container item xs={12} className={theme} justify={showDateRange ? 'space-between' : 'flex-end'}>
                        {showDateRange && (
                          <Button
                            id="apply-btn"
                            color="primary"
                            variant="contained"
                            size="medium"
                            type="button"
                            className={clsx(theme)}
                            onClick={() => handleApply()}
                          >
                            <div className="v-btn__content">Apply</div>
                          </Button>
                        )}
                        <Button
                          id="reset-btn"
                          color="primary"
                          size="medium"
                          type="button"
                          className={clsx(theme, 'blue--text text--darken-1')}
                          onClick={() => handleReset()}
                        >
                          <div className="v-btn__content">Reset</div>
                        </Button>
                      </Grid>
                    </Grid>
                  </Form>
                </div>
              </Container>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );

  /* Use for table function menu */
  const [anchorElFuncMenu, setAnchorElFuncMenu] = React.useState<null | HTMLElement>(null);

  const handleOpenFuncMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElFuncMenu(event.currentTarget);
  };

  const handleCloseFuncMenu = () => {
    setAnchorElFuncMenu(null);
  };

  /* Use for table toolbar */
  const handleClearSelected = () => {
    setRowSelected([]);
  };

  const handleToggleWatch = () => {
    const isWatched = (tags: string[]) => {
      const tag = `watch:${basicAuthUser}`;
      return tags ? tags.indexOf(tag) > -1 : false;
    }
    const watchAlert = (alertId: string) => {
      alertService.watchAlert(basicAuthUser, alertId);
    }
    const unwatchAlert = (alertId: string) => {
      alertService.unWatchAlert(basicAuthUser, alertId);
    }

    let map;
    if (rowSelected.some(a => !isWatched(a.tags))) {
      map = rowSelected.map(a => watchAlert(a.id));
    } else {
      map = rowSelected.map(a => unwatchAlert(a.id));
    }

    Promise.all(map).then(() => {
      handleClearSelected();
      updateData(setAlertState);
    })
  };

  const handleBulkAckAlert = () => {
    rowSelected.map(alert => {
      alertService.takeAction(alert.id, 'ack', '', ackTimeout)
        .then(() => updateData(setAlertState));
    }).reduce(() => handleClearSelected());
  };

  const handleBulkShelveAlert = () => {
    Promise
      .all(rowSelected.map(alert => alertService.takeAction(alert.id, 'shelve', '', shelveTimeout)))
      .then(() => {
        handleClearSelected();
        updateData(setAlertState);
      });
  };

  const handleTakeBulkAction = (action: string) => {
    Promise
      .all(rowSelected.map(alert => alertService.takeAction(alert.id, action, '')))
      .then(() => {
        handleClearSelected();
        updateData(setAlertState);
      });
  };

  const handleBulkDeleteAlert = () => {
    confirm('Are you sure you want to delete this item?') &&
      Promise
        .all(rowSelected.map(alert => alertService.deleteAlert(alert.id)))
        .then(() => {
          handleClearSelected();
          updateData(setAlertState);
        })
  };

  /* Use for function buttons of each row */
  const handleWatchAlert = debounce((username: string, alertId: string) => {
    alertService.watchAlert(username, alertId)
      .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  const handleUnWatchAlert = debounce((username: string, alertId: string) => {
    alertService.unWatchAlert(username, alertId)
      .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  const handleAckAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, ackTimeout)
      .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  const handleShelveAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, shelveTimeout)
      .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  const handleDeleteAlert = debounce((alertId: string) => {
    confirm('Are you sure you want to delete this item?') &&
      alertService.deleteAlert(alertId)
        .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  const handleTakeAction = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text)
      .then(() => updateData(setAlertState));
  }, 200, { leading: true, trailing: false });

  /* Use for Alert details */
  const [showAlertDetail, setShowAlertDetail] = React.useState(false)

  const initAlertDetail: IAlert = {
    attributes: {
      isOutOfHours: false,
      region: '',
      runBookUrl: ''
    },
    correlate: [],
    createTime: '',
    customer: null,
    duplicateCount: 0,
    environment: '',
    event: '',
    group: '',
    history: [],
    href: '',
    id: '',
    lastReceiveId: '',
    lastReceiveTime: '',
    origin: '',
    previousSeverity: '',
    rawData: null,
    receiveTime: '',
    repeat: false,
    resource: '',
    service: [],
    severity: '',
    status: '',
    tags: [],
    text: '',
    timeout: 0,
    trendIndication: '',
    type: '',
    updateTime: '',
    value: '',
  };
  const [alertDetail, setAlertDetail] = React.useState(initAlertDetail)

  const handleShowAlertDetails = (alert: IAlert) => {
    setShowAlertDetail(true);
    setAlertDetail(alert);
  };

  const handleHiddenAlertDetails = () => {
    setShowAlertDetail(false);
    setAlertDetail(initAlertDetail);
  };

  const handleDeleteAlertDetails = debounce((alertId: string) => {
    confirm('Are you sure you want to delete this item?') &&
      alertService.deleteAlert(alertId)
        .then(() => {
          updateData(setAlertState);
          handleHiddenAlertDetails();
        });
  }, 200, { leading: true, trailing: false });

  return (
    <>
      {showAlertDetail === false ? (
        <div className="v-tabs px-1">
          <AlertaTableToolbar
            theme={theme}
            numSelected={rowSelected.length}
            handleClearSelected={handleClearSelected}
            handleToggleWatch={handleToggleWatch}
            handleBulkAckAlert={handleBulkAckAlert}
            handleBulkShelveAlert={handleBulkShelveAlert}
            handleTakeBulkAction={handleTakeBulkAction}
            handleBulkDeleteAlert={handleBulkDeleteAlert}
          />
          <div className={clsx('v-tabs__bar', theme)}>
            <div className="v-tabs__wrapper">
              <div className="v-tabs__container v-tabs__container--grow">
                {(environments && environments.length > 0) && (
                  <div className={classes.rootEnvTabs}>
                    <Paper className={classes.rootEnvTabs} square>
                      <Tabs
                        value={environment}
                        onChange={handleChangeEnvironment}
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
                          <Tab id={env} label={`${env} (${environmentCounts()[env] || 0})`} onClick={() => handleEnvTabChange(env)} />
                        )}
                      </Tabs>
                    </Paper>
                  </div>
                )}
                <div className="spacer" />
                <div className={theme}>
                  <React.Fragment key="right">
                    <div className={clsx('v-btn v-btn--flat v-btn--icon filter-active', theme)}>
                      <Button
                        id="filter-list-btn"
                        size="medium"
                        onClick={toggleDrawer('right', true)}
                      >
                        <div className="v-btn__content">
                          <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>filter_list</i>
                        </div>
                      </Button>
                    </div>
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
                    <div className={clsx('v-btn v-btn--flat v-btn--icon', theme)}>
                      <Button
                        id="table-func-menu-btn"
                        size="medium"
                        aria-controls="table-func-menu"
                        aria-haspopup="true"
                        onClick={handleOpenFuncMenu}
                      >
                        <div className="v-btn__content">
                          <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>more_vert</i>
                        </div>
                      </Button>
                      <Menu
                        id="table-func-menu"
                        anchorEl={anchorElFuncMenu}
                        keepMounted
                        open={Boolean(anchorElFuncMenu)}
                        onClose={handleCloseFuncMenu}
                        PaperProps={{
                          style: {
                            background,
                            color
                          }
                        }}
                        className={theme}
                      >
                        <MenuItem onClick={handleCloseFuncMenu} className="menu-item">Show Panel</MenuItem>
                        <MenuItem onClick={handleCloseFuncMenu} className="menu-item">Display density</MenuItem>
                        <MenuItem onClick={handleCloseFuncMenu} className="menu-item">Download as CSV</MenuItem>
                      </Menu>
                    </div>
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
                        <AlertaTableContent
                          theme={theme}
                          order={order}
                          orderBy={orderBy}
                          handleTableSort={handleTableSort}
                          rowSelected={rowSelected}
                          numSelected={rowSelected.length}
                          handleSelectAllClick={handleSelectAllClick}
                          handleSelectRowClick={handleSelectRowClick}
                          alerts={alertState.alerts}
                          searchText={searchTextFilter}
                          basicAuthUser={basicAuthUser}
                          handleWatchAlert={handleWatchAlert}
                          handleUnWatchAlert={handleUnWatchAlert}
                          handleAckAlert={handleAckAlert}
                          handleShelveAlert={handleShelveAlert}
                          handleDeleteAlert={handleDeleteAlert}
                          handleTakeAction={handleTakeAction}
                          handleShowAlertDetails={handleShowAlertDetails}
                        />
                      </table>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
                        component="div"
                        count={alertState.total}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                        className={classes.rootColor}
                        classes={{
                          selectIcon: classes.rootColor
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <AlertDetail
          theme={theme}
          basicAuthUser={basicAuthUser}
          handleHiddenAlertDetails={handleHiddenAlertDetails}
          alertDetail={alertDetail}
          handleDeleteAlertDetails={handleDeleteAlertDetails}
        />
      )}
    </>
  );
}

export class AlertaTable extends Component<IAlertaTableProps, IAlertaTableState> {
  constructor(props: IAlertaTableProps) {
    super(props);
    this.state = {
      environments: [],
      services: [],
      groups: [],
      basicAuthUser: '',
      ackTimeout: config.timeouts.ack,
      shelveTimeout: config.timeouts.shelve,
      refreshInterval: config.refresh_interval
    };
  }

  static contextType = ThemeContext;

  componentDidMount() {
    this.getTimeout();
    this.getEnvironments();
    this.getServices();
    this.getGroups();
    this.getUsername();
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

  getUsername = () => {
    authService.getUsername()
      .then(res => {
        if (res) {
          this.setState({ basicAuthUser: res.basicAuthUser });
        }
      });
  };

  getTimeout = () => {
    userService.getUserPrefs()
      .then(res => {
        if (res && res.attributes.prefs) {
          if (res.attributes.prefs.ackTimeout) {
            this.setState({ ackTimeout: res.attributes.prefs.ackTimeout });
          }
          if (res.attributes.prefs.shelveTimeout) {
            this.setState({ shelveTimeout: res.attributes.prefs.shelveTimeout });
          }
          if (res.attributes.prefs.refreshInterval) {
            this.setState({ refreshInterval: res.attributes.prefs.refreshInterval });
          }
        }
      });
  }

  render() {
    const theme = this.context;

    const { environments, services, groups, basicAuthUser, ackTimeout, shelveTimeout, refreshInterval } = this.state;
    return (
      <MainTable
        theme={theme}
        environments={environments}
        services={services}
        groups={groups}
        basicAuthUser={basicAuthUser}
        ackTimeout={ackTimeout}
        shelveTimeout={shelveTimeout}
        refreshInterval={refreshInterval}
      />
    );
  }
}
