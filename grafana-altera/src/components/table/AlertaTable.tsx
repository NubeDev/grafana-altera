import React, { Component } from 'react';
import clsx from 'clsx';
import TablePagination from '@material-ui/core/TablePagination';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SaveIcon from '@material-ui/icons/Save';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

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

interface ISettingsForm {
  url: string;
  username: string;
  password: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const statuses = [
  'ack', 
  'assign', 
  'blackout', 
  'closed', 
  'expired', 
  'open', 
  'shelved', 
  'unknown'
];

const SettingsForm = (props: any) => {
  const CustomTextField = props.theme === THEME.DARK_MODE ? withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#3f51b5',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#3f51b5',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#c1c1c1',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#3f51b5',
        }
      }
    },
  })(TextField) : (TextField);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        marginTop: theme.spacing(2)
      },
      typography: {
        marginBottom: theme.spacing(2)
      },
      formControl: {
        margin: theme.spacing(1)
      },
      chip: {
        margin: 2,
      },
      chips: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    })
  );
  const classes = useStyles();

  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);

  const handleChangeStatus = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStatusFilter(event.target.value as string[]);
  };

  return (
    <Formik
      initialValues={{
        url: '',
        username: '',
        password: '',
      }}
      validate={(values) => {
        const errors: Partial<ISettingsForm> = {};
        if (!values.url) {
          errors.url = 'Your URL is required.';
        }
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
                <Typography className={[classes.typography, props.theme].join(' ')} component="h1" variant="h5">Settings</Typography>
                <Form className="settings-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12} className={props.theme}>
                      <Field
                        component={CustomTextField}
                        id="search"
                        name="search"
                        label="Search"
                        type="text"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search style={{ color: props.theme === THEME.DARK_MODE ? '#ffffff' : '#424242' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} className={props.theme}>
                      <FormControl 
                        fullWidth
                        variant="outlined"
                      >
                        <InputLabel id="mutiple-status">Status</InputLabel>
                        <Select
                          labelId="mutiple-status"
                          id="mutiple-status"
                          variant="outlined"
                          fullWidth
                          multiple
                          value={statusFilter}
                          onChange={handleChangeStatus}
                          input={<Input />}
                          renderValue={(selected) => (
                            <div className={classes.chips}>
                              {(selected as string[]).map((value) => (
                                <Chip key={value} label={value} className={classes.chip} />
                              ))}
                            </div>
                          )}
                          MenuProps={MenuProps}
                        >
                          {statuses.map((status) => (
                            <MenuItem key={status} value={status}>
                              <Checkbox checked={statusFilter.indexOf(status) > -1} />
                              <ListItemText primary={status} />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      )}
    </Formik>
  );
}

/**
 * Table
 * @param props
 */
function MainTable(props: any) {
  const { theme, environments } = props;

  // Theme
  const color = theme === THEME.DARK_MODE ? 'white' : 'black';
  const background = theme === THEME.DARK_MODE ? '#424242' : '#ffffff';
  const useStyles = makeStyles({
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

  const alertListFilter = (anchor: string) => (
    <div
      className={clsx(classes.list, 'v-card v-sheet v-sheet--tile', theme)}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
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
      <div className="container fluid grid-list-xl">
        <div className="layout align-center wrap">
          <div className="flex pb-0 xs12">
            <div className="v-input v-text-field v-text-field--enclosed v-text-field--outline theme--dark">
              <div className="v-input__control">
                <div className="v-input__slot">
                  <div className="v-input__prepend-inner">
                    <div className="v-input__icon v-input__icon--prepend-inner">
                      <i aria-hidden="true" className="v-icon material-icons theme--dark">search</i>
                    </div>
                  </div>
                  <div className="v-text-field__slot">
                    <label aria-hidden="true" className="v-label theme--dark" style={{ left: '0px', right: 'auto', position: 'absolute' }}>Search</label>
                    <input aria-label="Search" type="text" />
                  </div>
                  <div className="v-input__append-inner">
                    <div className="v-input__icon v-input__icon--">
                      <i aria-hidden="true" className="v-icon v-icon--link material-icons theme--dark" />
                    </div>
                  </div>
                </div>
                <div className="v-text-field__details">
                  <div className="v-messages theme--dark">
                    <div className="v-messages__wrapper">
                      <div className="v-messages__message">Filter results by text search</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
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
                  {alertListFilter('right')}
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

    const { environments } = this.state;

    return (
      <SettingsForm theme={theme} />
      // <MainTable theme={theme} environments={environments} />
    );
  }
}
