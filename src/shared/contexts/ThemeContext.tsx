import React from 'react';

import { THEME } from 'shared/constants/theme.constants';

export const ThemeContext = React.createContext(
  THEME.DARK_MODE // default value
);
