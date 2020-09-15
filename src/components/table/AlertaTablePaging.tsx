import React, { Component } from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';

import { IAlertResponse } from 'shared/models/model-responses/alert-response';
import { ThemeContext } from 'shared/config/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';

interface IAlertaTablePagingProps {
  alertResponse: IAlertResponse;
};

function EnhancedTable(props: any) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const color = props.theme === THEME.DARK_MODE ? 'white' : 'black';
  const useStyles = makeStyles({
    root: {
      color
    },
    selectIcon: {
      color
    }
  });

  const classes = useStyles();

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
      component="div"
      count={props.alerts.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
      className={classes.root}
      classes={{
        selectIcon: classes.selectIcon
      }}
    />
  );
}

export class AlertaTablePaging extends Component<IAlertaTablePagingProps, any> {

  static contextType = ThemeContext;

  render() {
    let theme = this.context;

    return (
      <div className={['v-datatable v-table v-datatable--select-all', theme].join(' ')}>
        <EnhancedTable alerts={this.props.alertResponse.alerts} theme={theme} />
      </div>
    )
  }
}
