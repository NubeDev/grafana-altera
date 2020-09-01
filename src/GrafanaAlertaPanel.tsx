import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';

import { Moment } from 'moment';

import { GrafanaAlertaOptions } from './types';

interface Props extends PanelProps<GrafanaAlertaOptions> { };

interface State {
  now: Moment;
};

export class GrafanaAlertaPanel extends PureComponent<Props, State> {

  render() {
    return (
      <div
        className="test"
      >
        hello world
      </div>
    );
  }
};
