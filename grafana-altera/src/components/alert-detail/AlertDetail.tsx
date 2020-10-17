import React, { Component } from 'react';
import { DebouncedFunc } from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentIcon from '@material-ui/icons/Assessment';

import './AlertDetail.scss';
import { AlertaDetailToolbar } from './AlertaDetailToolbar';
import { IAlert } from 'shared/models/model-data/alert.model';
import { AlertHistory } from './alert-history/AlertHistory';
import { AlertData } from './alert-data/AlertData';
import { THEME } from 'shared/constants/theme.constants';

interface IAlertDetailProps {
  theme: any;
  basicAuthUser: string;
  handleHiddenAlertDetails: () => void;
  alertDetail: IAlert;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
}

interface IAlertDetailContentProps {
  theme: any;
  basicAuthUser: string;
  handleHiddenAlertDetails: () => void;
  alertDetail: IAlert;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
}

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function AlertDetailContent(props: IAlertDetailContentProps) {
  // Get value from props
  const { theme,
    basicAuthUser,
    alertDetail,
    handleHiddenAlertDetails,
    handleDeleteAlertDetails,
  } = props;

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
      }
    })
  );
  const classes = useStyles();

  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeDetailTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const a11yProps = (index: any) => {
    return {
      id: `details-tab-${index}`,
      'aria-controls': `details-tabpanel-${index}`,
    }
  };

  return (
    <div className={['v-card v-card--flat v-sheet', theme].join(' ')}>
      <div className={['v-card v-card--flat v-sheet v-sheet--tile', theme].join(' ')}>
        <AlertaDetailToolbar
          theme={theme}
          basicAuthUser={basicAuthUser}
          alertDetail={alertDetail}
          handleHiddenAlertDetails={handleHiddenAlertDetails}
          handleDeleteAlertDetails={handleDeleteAlertDetails}
        />
        <div className={['v-card v-card--flat v-sheet', theme].join(' ')}>
          <div className="v-tabs" data-booted="true">
            <div className={['v-tabs__bar', theme].join(' ')}>
              <div className="v-tabs__wrapper">
                <div className="v-tabs__container v-tabs__container--grow">
                  <div className={classes.rootEnvTabs}>
                    <Paper className={classes.rootEnvTabs} square>
                      <Tabs
                        value={tabValue}
                        onChange={handleChangeDetailTabs}
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
                        {/* <Tab label="Details" icon={<InfoIcon />} {...a11yProps(0)} />
                        <Tab label="History" icon={<HistoryIcon />} {...a11yProps(1)} />
                        <Tab label="Data" icon={<AssessmentIcon />} {...a11yProps(2)} /> */}
                        <Tab label="Details" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />
                        <Tab label="Data" {...a11yProps(2)} />
                      </Tabs>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
            <div className="v-window">
              <div className="v-window__container">
                <TabPanel value={tabValue} index={0}>
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
                              <div className="grey--text" />
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
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                  <AlertHistory
                    theme={theme}
                  />
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                  <AlertData
                    theme={theme}
                  />
                </TabPanel>
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
                <button type="button" className={['v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2'].join(' ')}>
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
  );
}

function TabPanel(props: ITabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`details-tabpanel-${index}`}
      aria-labelledby={`details-tab-${index}`}
      {...other}
    >
      {value === index && (children)}
    </div>
  );
}

export class AlertDetail extends Component<IAlertDetailProps, any> {

  render() {
    const { theme,
      basicAuthUser,
      alertDetail,
      handleHiddenAlertDetails,
      handleDeleteAlertDetails,
    } = this.props;

    return (
      <div className="v-content" data-booted="true" style={{ padding: '0px' }}>
        <div className="v-content__wrap">
          <div className="v-alert v-alert--outline error--text">
            <div />
            <a className="v-alert__dismissible">
              <i aria-hidden="true" className={['v-icon v-icon--right material-icons', theme].join(' ')}>cancel</i>
            </a>
          </div>
          <div className="alert-detail">
            <AlertDetailContent
              theme={theme}
              basicAuthUser={basicAuthUser}
              alertDetail={alertDetail}
              handleHiddenAlertDetails={handleHiddenAlertDetails}
              handleDeleteAlertDetails={handleDeleteAlertDetails}
            />
          </div>
        </div>
      </div>
    )
  }
}
