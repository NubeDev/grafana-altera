import React, { Component, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { DebouncedFunc } from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import InfoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentIcon from '@material-ui/icons/Assessment';

import './AlertDetail.scss';
import config from '../../shared/config/config.json';
import { AlertaDetailToolbar } from './AlertaDetailToolbar';
import { IAlert } from 'shared/models/model-data/alert.model';
import { AlertHistory } from './alert-history/AlertHistory';
import { AlertData } from './alert-data/AlertData';
import { THEME } from 'shared/constants/theme.constants';
import alertService from 'services/api/alert.service';

interface IAlertDetailProps {
  theme: any;
  basicAuthUser: string;
  ackTimeout: number;
  shelveTimeout: number;
  handleHiddenAlertDetails: () => void;
  alertDetailId: string;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
}

interface IAlertDetailContentProps {
  theme: any;
  basicAuthUser: string;
  ackTimeout: number;
  shelveTimeout: number;
  handleHiddenAlertDetails: () => void;
  alertDetailId: string;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
}

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function updateData(alertId: string, setAlertDetail: React.Dispatch<React.SetStateAction<IAlert>>) {
  alertService.getAlert(alertId)
    .then(res => {
      if (res) {
        setAlertDetail(res);
      }
    });
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

function AlertDetailContent(props: IAlertDetailContentProps) {
  // Get value from props
  const { theme,
    basicAuthUser,
    ackTimeout,
    shelveTimeout,
    alertDetailId,
    handleHiddenAlertDetails,
    handleDeleteAlertDetails,
  } = props;

  const color = theme === THEME.DARK_MODE ? 'white' : 'black';
  const background = theme === THEME.DARK_MODE ? '#424242' : '#ffffff';
  const useStyles = makeStyles((themeDefault: Theme) =>
    createStyles({
      rootTabs: {
        flexGrow: 1,
        background,
        color,
        boxShadow: 'unset'
      },
      accent: {
        backgroundColor: '#ffa726',
        borderColor: '#ffa726'
      },
      iconLabelWrapper: {
        flexDirection: 'row',
        alignItems: 'unset'
      },
      labelContainer: {
        width: 'auto',
        padding: 0
      }
    })
  );
  const classes = useStyles();

  /* Use for Alert detail tabs */
  const [tabValue, setTabValue] = React.useState(0);

  const handleChangeDetailTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const a11yProps = (index: any) => {
    return {
      id: `details-tab-${index}`,
      'aria-controls': `details-tabpanel-${index}`
    }
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
    }
    return dateTime;
  };

  const getTimeAgo = (value: any) => {
    return moment(String(value)).fromNow();
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
      return '';
    }
    return value.toString().replace(/([A-Z])/g, ' $1').split(' ').map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');
  };

  const history = (item: any) => {
    return item.history ? item.history.map((h: any, index: any) => ({ index, ...h })) : [];
  };

  const statusNote = (item: any) => {
    return history(item).filter((h: any) => h.type !== 'note' && h.status === item.status).pop();
  };

  /* Use for Alerta detail toolbars */
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
  const [alertDetail, setAlertDetail] = React.useState(initAlertDetail);

  useEffect(() => {
    // Update data
    updateData(alertDetailId, setAlertDetail);
  }, []);

  const handleWatchAlert = debounce((username: string, alertId: string) => {
    alertService.watchAlert(username, alertId)
      .then(() => updateData(alertId, setAlertDetail));
  }, 200, { leading: true, trailing: false });

  const handleUnwatchAlert = debounce((username: string, alertId: string) => {
    alertService.unWatchAlert(username, alertId)
      .then(() => updateData(alertId, setAlertDetail));
  }, 200, { leading: true, trailing: false });

  const handleAckAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, ackTimeout)
      .then(() => updateData(alertId, setAlertDetail));
  }, 200, { leading: true, trailing: false });

  const handleShelveAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, shelveTimeout)
      .then(() => updateData(alertId, setAlertDetail));
  }, 200, { leading: true, trailing: false });

  const handleTakeAction = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text)
      .then(() => updateData(alertId, setAlertDetail));
  }, 200, { leading: true, trailing: false });

  return (
    <>
      {alertDetail.id === '' ? '' : (
        <div className={clsx('v-card v-card--flat v-sheet', theme)}>
          <div className={clsx('v-card v-card--flat v-sheet v-sheet--tile', theme)}>
            <AlertaDetailToolbar
              theme={theme}
              basicAuthUser={basicAuthUser}
              alertDetail={alertDetail}
              handleHiddenAlertDetails={handleHiddenAlertDetails}
              handleDeleteAlertDetails={handleDeleteAlertDetails}
              handleWatchAlert={handleWatchAlert}
              handleUnwatchAlert={handleUnwatchAlert}
              handleAckAlert={handleAckAlert}
              handleShelveAlert={handleShelveAlert}
              handleTakeAction={handleTakeAction}
            />
            <div className={clsx('v-card v-card--flat v-sheet v-sheet-cus', theme)}>
              <div className="v-tabs" data-booted="true">
                <div className={clsx('v-tabs__bar', theme)}>
                  <div className="v-tabs__wrapper">
                    <div className="v-tabs__container v-tabs__container--grow height-unset">
                      <div className={classes.rootTabs}>
                        <Paper className={classes.rootTabs} square>
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
                            <Tab
                              label="&nbsp;Details"
                              icon={<InfoIcon />}
                              {...a11yProps(0)}
                              classes={{
                                wrapper: classes.iconLabelWrapper,
                                labelIcon: classes.labelContainer
                              }}
                            />
                            <Tab
                              label="&nbsp;History"
                              icon={<HistoryIcon />}
                              {...a11yProps(1)}
                              classes={{
                                wrapper: classes.iconLabelWrapper,
                                labelIcon: classes.labelContainer
                              }}
                            />
                            <Tab
                              label="&nbsp;Data"
                              icon={<AssessmentIcon />}
                              {...a11yProps(2)}
                              classes={{
                                wrapper: classes.iconLabelWrapper,
                                labelIcon: classes.labelContainer
                              }}
                            />
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
                        <div className={clsx('v-card v-card--flat v-sheet', theme)}>
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
                                    <span className="pre-c">{alertDetail.id}</span>
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
                                    <span className="pre-c">{alertDetail.lastReceiveId}</span>
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
                                        <span className="text-no-wrap">{formatDateTime('longDate', alertDetail.createTime)} </span>
                                      </span>
                                    </span>
                                    ({getTimeAgo(alertDetail.createTime)})
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
                                        <span className="text-no-wrap">{formatDateTime('longDate', alertDetail.receiveTime)} </span>
                                      </span>
                                    </span>
                                    ({getTimeAgo(alertDetail.receiveTime)})
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
                                        <span className="text-no-wrap">{formatDateTime('longDate', alertDetail.lastReceiveTime)} </span>
                                      </span>
                                    </span>
                                    ({getTimeAgo(alertDetail.lastReceiveTime)})
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
                                  <div>{alertDetail.service && alertDetail.service.join(', ')}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Environment</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.environment}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Resource</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.resource}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Event</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.event}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Correlate</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.correlate && alertDetail.correlate.join(', ')}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Group</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.group}</div>
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
                                    <span className={clsx('label', `label-${alertDetail.previousSeverity}`)}>
                                      {capitalize(alertDetail.previousSeverity)}
                                    </span>&nbsp;&rarr;&nbsp;
                                    <span className={clsx('label', `label-${alertDetail.severity}`)}>
                                      {capitalize(alertDetail.severity)}
                                    </span>
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
                                    <span className="label">{capitalize(alertDetail.status)}</span>
                                    {statusNote(alertDetail) && statusNote(alertDetail).user && (
                                      <span>&nbsp;by <b>{statusNote(alertDetail).user}</b> {getTimeAgo(statusNote(alertDetail).updateTime)}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                            {statusNote(alertDetail) && statusNote(alertDetail).user && statusNote(alertDetail).text && (
                              <div className="flex xs12 ma-1">
                                <div className="d-flex align-top">
                                  <div className="flex xs3 text-xs-left">
                                    <div className="grey--text" />
                                  </div>
                                  <div className="flex xs6 text-xs-left">
                                    <div>
                                      <i aria-hidden="true" className={clsx('v-icon material-icons', theme)} style={{ fontSize: '16px' }}>error_outline</i>
                                      <i>&nbsp;{statusNote(alertDetail).text}</i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            <div className="flex xs12 ma-1">
                              <div className="d-flex align-top">
                                <div className="flex xs3 text-xs-left">
                                  <div className="grey--text">Value</div>
                                </div>
                                <div className="flex xs6 text-xs-left">
                                  <div>{alertDetail.value}</div>
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
                                    <span>{alertDetail.text}</span>
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
                                    <span className="label">{splitCaps(alertDetail.trendIndication)}</span>
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
                                  <div>{alertDetail.timeout}</div>
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
                                    <span className="label">{splitCaps(alertDetail.type)}</span>
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
                                  <div>{alertDetail.duplicateCount}</div>
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
                                    <span className="label">{capitalize(alertDetail.repeat)}</span>
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
                                  <div>{alertDetail.origin}</div>
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
                                    {alertDetail.tags.map((tag, index) => {
                                      return (
                                        <span tabIndex={0} className={clsx('v-chip v-chip--label v-chip--small', theme)} key={index}>
                                          <span className="v-chip__content">
                                            <i aria-hidden="true" className={clsx('v-icon v-icon--left material-icons', theme)}>label</i>{tag}
                                          </span>
                                        </span>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              {Object.entries(alertDetail.attributes).map(([key, value]) => {
                                return (
                                  <div className="flex xs12 ma-1" key={key}>
                                    <div className="d-flex align-top">
                                      <div className="flex xs3 text-xs-left">
                                        <div className="grey--text">{splitCaps(key)}</div>
                                      </div>
                                      <div className="flex xs6 text-xs-left">
                                        <div>{`${value}`}</div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                      <AlertHistory
                        theme={theme}
                        historys={history(alertDetail)}
                      />
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                      <AlertData
                        theme={theme}
                        alertDetail={alertDetail}
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
                    <button type="button" className={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}>
                      <div className="v-btn__content">
                        <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>visibility</i>&nbsp;Watch
                      </div>
                    </button>
                    <button type="button" className={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}>
                      <div className="v-btn__content">
                        <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>visibility_off</i>&nbsp;Unwatch
                      </div>
                    </button>
                    <button type="button" className={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}>
                      <div className="v-btn__content">
                        <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>note_add</i>&nbsp;Add note
                      </div>
                    </button>
                    <button type="button" className={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}>
                      <div className="v-btn__content">
                        <i aria-hidden="true" className={clsx('v-icon material-icons', theme)}>delete_forever</i>&nbsp;Delete
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export class AlertDetail extends Component<IAlertDetailProps, any> {

  render() {
    const { theme,
      basicAuthUser,
      ackTimeout,
      shelveTimeout,
      alertDetailId,
      handleHiddenAlertDetails,
      handleDeleteAlertDetails,
    } = this.props;

    return (
      <div className="v-content" data-booted="true" style={{ padding: '0px' }}>
        <div className="v-content__wrap">
          <div className="v-alert v-alert--outline error--text">
            <div />
            <a className="v-alert__dismissible">
              <i aria-hidden="true" className={clsx('v-icon v-icon--right material-icons', theme)}>cancel</i>
            </a>
          </div>
          <div className="alert-detail">
            <AlertDetailContent
              theme={theme}
              basicAuthUser={basicAuthUser}
              ackTimeout={ackTimeout}
              shelveTimeout={shelveTimeout}
              alertDetailId={alertDetailId}
              handleHiddenAlertDetails={handleHiddenAlertDetails}
              handleDeleteAlertDetails={handleDeleteAlertDetails}
            />
          </div>
        </div>
      </div>
    )
  }
}
