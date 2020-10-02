import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { ThemeContext } from 'shared/contexts/ThemeContext';
import environmentService from 'services/api/environment.service';
import config from 'shared/config/config.json';
import { IEnvironment } from 'shared/models/model-data/environment.model';
import { THEME } from 'shared/constants/theme.constants';

interface IAlertaPanelHeaderProps {}

interface IAlertaPanelHeaderState {
  environments: IEnvironment[];
}

// Init state param request
const state = {
  filter: {
    status: config.filter.status
  }
};

function EnvironmentTabs(props: any) {
  // Theme
  const color = props.theme === THEME.DARK_MODE ? 'white' : 'black';
  const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      background: props.theme === THEME.DARK_MODE ? '#424242' : '#ffffff',
      color,
      boxShadow: 'unset'
    },
    accent: {
      backgroundColor: '#ffa726',
      borderColor: '#ffa726'
    }
  });
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const environments = () => {
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

  return (
    <div className={classes.root}>
      <Paper className={classes.root} square>
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
          {environments().map((env, index) => env &&
            <Tab label={`${ env } (${ environmentCounts()[env] || 0 })`} />
          )}
        </Tabs>
      </Paper>
    </div>
  );
}

export class AlertaPanelHeader extends Component<IAlertaPanelHeaderProps, IAlertaPanelHeaderState> {
  constructor(props: IAlertaPanelHeaderProps) {
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
    environmentService.getEnvironments({ state })
      .then(res => {
        if (res) {
          this.setState({ environments: res.environments });
        }
      });
  };

  render() {
    const theme = this.context;

    return (
      <div className={['v-tabs__bar', theme].join(' ')}>
        <div className="v-tabs__wrapper">
          <div className="v-tabs__container v-tabs__container--grow">
            {(this.state.environments && this.state.environments.length > 0) && <EnvironmentTabs theme={theme} environments={this.state.environments} />}
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
    );
  }
}
