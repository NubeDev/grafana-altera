import React, { Component, useEffect } from 'react';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import moment from 'moment';
import debounce from 'lodash/debounce';
import { DebouncedFunc } from 'lodash';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
import HistoryIcon from '@material-ui/icons/History';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import './AlertDetail.scss';
import config from '../../shared/config/config.json';
import { AlertaDetailToolbar } from './AlertaDetailToolbar';
import { IAlert } from 'shared/models/model-data/alert.model';
import { INote } from 'shared/models/model-data/note.model';
import { AlertHistory } from './alert-history/AlertHistory';
import { AlertData } from './alert-data/AlertData';
import { AlertaDetailActions } from './AlertaDetailActions';
import { THEME } from 'shared/constants/theme.constants';
import alertService from 'services/api/alert.service';
import { Status } from 'shared/constants/status.enum';

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

interface IAlertDataCellProps {
  label: string;
  value: any;
  timeAgo?: any;
  clazz?: string;
  tooltip?: any;
}

interface IAlertNoteProps {
  theme: any;
  type: string;
  icon: string;
  note: INote;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

interface ITabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function getAlert(alertId: string, setAlertDetail: React.Dispatch<React.SetStateAction<IAlert>>) {
  alertService.getAlert(alertId)
    .then(res => {
      if (res) {
        setAlertDetail(res);
      }
    })
    .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
}

function getNotes(alertId: string, setNotes: React.Dispatch<React.SetStateAction<INote[]>>) {
  alertService.getNotes(alertId)
    .then(res => {
      if (res) {
        setNotes(res);
      }
    })
    .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
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

function AlertNote(props: IAlertNoteProps) {
  const { theme, type, icon, note, onClick } = props;

  return (
    <div className={clsx('v-alert ma-1', type)}>
      <i aria-hidden="true" className={clsx('v-icon material-icons', theme, 'v-alert__icon')}>{icon}</i>
      <div>
        <b>{note.user || 'Anonymous'}</b> added note on
        {note.updateTime ? (
          <span>
            <b>
              <span className="text-no-wrap"> {moment(note.updateTime).format(config.dates.longDate)}</span>
            </b> ({moment(String(note.updateTime)).fromNow()})
            <br />
          </span>
        ) : (
          <span>
            <b>
              <span className="text-no-wrap"> {moment(note.createTime).format(config.dates.longDate)}</span>
            </b> ({moment(String(note.createTime)).fromNow()})
            <br />
          </span>
          )}
        <i>{note.text}</i>
      </div>
      <button className="v-alert__dismissible" onClick={onClick}>
        <i aria-hidden="true" className={clsx('v-icon v-icon--right material-icons', theme)}>cancel</i>
      </button>
    </div>
  );
}

function AlertDataCell(props: IAlertDataCellProps) {
  const { clazz, label, value } = props;

  return (
    <div className="flex xs12 ma-1">
      <div className="d-flex align-top">
        <div className="flex xs3 text-xs-left">
          <div className="grey--text">{label}</div>
        </div>
        <div className="flex xs6 text-xs-left">
          <div>
            <span className={clazz}>{value}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AlertDataCellForTime(props: IAlertDataCellProps) {
  const { label, value, timeAgo, tooltip } = props;

  return (
    <div className="flex xs12 ma-1">
      <div className="d-flex align-top">
        <div className="flex xs3 text-xs-left">
          <div className="grey--text">{label}</div>
        </div>
        <div className="flex xs9 text-xs-left">
          <div>
            <span className="v-tooltip v-tooltip--top">
              <Tooltip title={tooltip} placement="top">
                <span className="text-no-wrap">{value} </span>
              </Tooltip>
            </span>
            ({timeAgo})
          </div>
        </div>
      </div>
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
      },
      rootSkeleton: {
        width: 400,
        backgroundColor: theme === THEME.DARK_MODE ? '#717171' : 'rgba(0, 0, 0, 0.11)'
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
    };
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
    return value
      .toString()
      .replace(/([A-Z])/g, ' $1')
      .split(' ')
      .map((word: string) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  const history = (item: any) => {
    return item.history ? item.history.map((h: any, index: any) => ({ index, ...h })) : [];
  };

  const statusNote = (item: any) => {
    return history(item)
      .filter((h: any) => h.type !== 'note' && h.status === item.status)
      .pop();
  };

  /* Use for Alerta detail toolbars */
  const initAlertDetail: IAlert = {
    attributes: {},
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
  const [alertDetail, setAlertDetail] = React.useState<IAlert>(initAlertDetail);

  const [notes, setNotes] = React.useState([] as INote[]);

  useEffect(() => {
    // Init data
    getAlert(alertDetailId, setAlertDetail);
    getNotes(alertDetailId, setNotes);
  }, []);

  const handleWatchAlert = debounce((username: string, alertId: string) => {
    alertService.watchAlert(username, alertId)
      .then(() => getAlert(alertId, setAlertDetail))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleUnwatchAlert = debounce((username: string, alertId: string) => {
    alertService.unWatchAlert(username, alertId)
      .then(() => getAlert(alertId, setAlertDetail))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleAckAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, ackTimeout)
      .then(() => getAlert(alertId, setAlertDetail))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleShelveAlert = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text, shelveTimeout)
      .then(() => getAlert(alertId, setAlertDetail))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleTakeAction = debounce((alertId: string, action: string, text: string) => {
    alertService.takeAction(alertId, action, text)
      .then(() => getAlert(alertId, setAlertDetail))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleAddNote = debounce((alertId: string, text: string) => {
    alertService.addNote(alertId, text)
      .then(() => {
        getNotes(alertId, setNotes);
        getAlert(alertId, setAlertDetail);
      })
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const handleDeleteNote = debounce((alertId: string, noteId: string) => {
    alertService.deleteNote(alertId, noteId)
      .then(() => getNotes(alertId, setNotes))
      .catch(error => toast.error(`${error.response.statusText} (${error.response.status})`));
  }, 200, { leading: true, trailing: false });

  const isOpen = (status: string) => {
    return status === Status.open || status === Status.NORM;
  };

  const isAcked = (status: string) => {
    return status === Status.ack || status === Status.ACKED;
  };

  const isClosed = (status: string) => {
    return status === Status.closed;
  };

  const isWatched = (tags: string[], username: string) => {
    const tag = `watch:${username}`;
    return tags ? tags.indexOf(tag) > -1 : false;
  };

  const isShelved = (status: string) => {
    return status === Status.shelved || status === Status.SHLVD;
  };

  return (
    <>
      {alertDetail.id === '' ? (
        <div className={clsx('v-card v-card--flat v-sheet', theme)}>
          <div className={clsx('v-card v-card--flat v-sheet v-sheet--tile', theme)}>
            <nav className={clsx('v-toolbar v-toolbar--dense nav-style alerta-toolbars-details', theme)} data-booted="true">
              <div className="v-toolbar__content h-48">
                <IconButton
                  className={clsx('v-btn v-btn--icon', theme)}
                  color="default"
                  size="medium"
                  component="span"
                >
                  <ArrowBackIcon />
                </IconButton>
              </div>
            </nav>
            <div className={clsx('v-card v-card--flat v-sheet v-sheet-cus', theme)}>
              <div className="v-tabs" data-booted="true">
                <div className={clsx('v-tabs__bar', theme)}>
                  <div className="v-tabs__wrapper">
                    <div className="v-tabs__container v-tabs__container--grow height-unset">
                      <div className={classes.rootTabs}>
                        <Paper className={classes.rootTabs} square>
                          <Tabs
                            value={tabValue}
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
                              classes={{
                                wrapper: classes.iconLabelWrapper,
                                labelIcon: classes.labelContainer
                              }}
                            />
                            <Tab
                              label="&nbsp;History"
                              icon={<HistoryIcon />}
                              classes={{
                                wrapper: classes.iconLabelWrapper,
                                labelIcon: classes.labelContainer
                              }}
                            />
                            <Tab
                              label="&nbsp;Data"
                              icon={<AssessmentIcon />}
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
                    <div className="v-window-item">
                      <div className={clsx('v-card v-card--flat v-sheet', theme)}>
                        <div className="v-card__text">
                          <AlertDataCell label="Alert ID" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                          <AlertDataCell label="Last Receive Alert ID" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                          <AlertDataCell label="Create Time" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Receive Time" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="10%" />} />
                          <AlertDataCell label="Last Receive Time" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Service" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Environment" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Resource" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                          <AlertDataCell label="Event" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Correlate" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="20%" />} />
                          <AlertDataCell label="Group" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Severity" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                          <AlertDataCell label="Status" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Value" value={<Skeleton className={classes.rootSkeleton} animation="wave"  width="10%" />} />
                          <AlertDataCell label="Text" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Trend Indication" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                          <AlertDataCell label="Timeout" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="10%" />} />
                          <AlertDataCell label="Type" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Duplicate count" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Repeat" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="10%" />} />
                          <AlertDataCell label="Origin" value={<Skeleton className={classes.rootSkeleton} animation="wave" />} />
                          <AlertDataCell label="Tags" value={<Skeleton className={classes.rootSkeleton} animation="wave" width="30%" />} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
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
              isOpen={isOpen(alertDetail.status)}
              isClosed={isClosed(alertDetail.status)}
              isWatched={isWatched(alertDetail.tags, basicAuthUser)}
              isAcked={isAcked(alertDetail.status)}
              isShelved={isShelved(alertDetail.status)}
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
                          {notes.map(note => (
                            <AlertNote
                              key={note.id}
                              theme={theme}
                              type="info"
                              icon="info"
                              note={note}
                              onClick={() => handleDeleteNote(alertDetail.id, note.id)}
                            />
                          ))}
                          <div className="v-card__text">
                            <AlertDataCell label="Alert ID" value={alertDetail.id} clazz="pre-c" />
                            <AlertDataCell label="Last Receive Alert ID" value={alertDetail.lastReceiveId} clazz="pre-c" />
                            <AlertDataCellForTime
                              label="Create Time"
                              value={formatDateTime('longDate', alertDetail.createTime)}
                              timeAgo={getTimeAgo(alertDetail.createTime)}
                              tooltip={formatDateTime('tooltip', alertDetail.createTime)}
                            />
                            <AlertDataCellForTime
                              label="Receive Time"
                              value={formatDateTime('longDate', alertDetail.receiveTime)}
                              timeAgo={getTimeAgo(alertDetail.receiveTime)}
                              tooltip={formatDateTime('tooltip', alertDetail.receiveTime)}
                            />
                            <AlertDataCellForTime
                              label="Last Receive Time"
                              value={formatDateTime('longDate', alertDetail.lastReceiveTime)}
                              timeAgo={getTimeAgo(alertDetail.lastReceiveTime)}
                              tooltip={formatDateTime('tooltip', alertDetail.lastReceiveTime)}
                            />
                            <AlertDataCell label="Service" value={alertDetail.service && alertDetail.service.join(', ')} />
                            <AlertDataCell label="Environment" value={alertDetail.environment} />
                            <AlertDataCell label="Resource" value={alertDetail.resource} />
                            <AlertDataCell label="Event" value={alertDetail.event} />
                            <AlertDataCell label="Correlate" value={alertDetail.correlate && alertDetail.correlate.join(', ')} />
                            <AlertDataCell label="Group" value={alertDetail.group} />
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
                            <AlertDataCell label="Value" value={alertDetail.value} />
                            <AlertDataCell label="Text" value={alertDetail.text} />
                            <AlertDataCell label="Trend Indication" value={splitCaps(alertDetail.trendIndication)} clazz="label" />
                            <AlertDataCell label="Timeout" value={alertDetail.timeout} />
                            <AlertDataCell label="Type" value={splitCaps(alertDetail.type)} clazz="label" />
                            <AlertDataCell label="Duplicate count" value={alertDetail.duplicateCount} />
                            <AlertDataCell label="Repeat" value={capitalize(alertDetail.repeat)} clazz="label" />
                            <AlertDataCell label="Origin" value={alertDetail.origin} />
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
                                  <AlertDataCell key={key} label={splitCaps(key)} value={`${value}`} />
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
            <AlertaDetailActions
              theme={theme}
              basicAuthUser={basicAuthUser}
              alertDetail={alertDetail}
              isOpen={isOpen(alertDetail.status)}
              isClosed={isClosed(alertDetail.status)}
              isWatched={isWatched(alertDetail.tags, basicAuthUser)}
              isAcked={isAcked(alertDetail.status)}
              isShelved={isShelved(alertDetail.status)}
              handleWatchAlert={handleWatchAlert}
              handleUnwatchAlert={handleUnwatchAlert}
              handleDeleteAlertDetails={handleDeleteAlertDetails}
              handleAckAlert={handleAckAlert}
              handleShelveAlert={handleShelveAlert}
              handleTakeAction={handleTakeAction}
              handleAddNote={handleAddNote}
            />
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
  };
}
