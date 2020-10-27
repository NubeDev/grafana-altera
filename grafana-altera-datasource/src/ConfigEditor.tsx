import React, { ComponentType } from 'react';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { DataSourceHttpSettings } from '@grafana/ui';

import { DataSourceOptions } from './types';
import { APP_CONFIG } from 'shared/config/config';

type Props = DataSourcePluginOptionsEditorProps<DataSourceOptions>;

export const ConfigEditor: ComponentType<Props> = ({ options, onOptionsChange }) => {
  return (
    <>
      <DataSourceHttpSettings
        defaultUrl={APP_CONFIG.DEFAULT_URL}
        dataSourceConfig={options}
        showAccessOptions={true}
        onChange={onOptionsChange}
      />
    </>
  );
};
