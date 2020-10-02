import React, { PureComponent } from 'react';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './DataSource';
import { GenericOptions, GrafanaQuery } from './types';

type Props = QueryEditorProps<DataSource, GrafanaQuery, GenericOptions>;

export class QueryEditor extends PureComponent<Props> {

  render() {

    return (
      <div className="gf-form">
        <span>Query Editor</span>
      </div>
    );
  }
}
