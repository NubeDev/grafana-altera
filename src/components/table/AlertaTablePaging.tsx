import React, {Component} from 'react';
import TablePagination from '@material-ui/core/TablePagination';

import raw from './data/test-data.json';
import { IAlert } from 'shared/models/alert.model';

const rows: IAlert[] = raw.alerts;

interface IAlertaTablePagingProps {
};

function EnhancedTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 20, 50, 100, 200]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}

export class AlertaTablePaging extends Component<IAlertaTablePagingProps, any> {
  render() {
    return (
      <EnhancedTable />
      // <div className={['v-datatable v-table v-datatable--select-all', this.props.theme].join(' ')}>
      //   <div className="v-datatable__actions">
      //     <div className="v-datatable__actions__select">Rows per page:
      //       <div role="combobox" className={['v-input v-text-field v-select v-input--hide-details v-input--is-label-active v-input--is-dirty', this.props.theme].join(' ')}>
      //         <div className="v-input__control">
      //           <div className="v-input__slot">
      //             <div className="v-select__slot">
      //               <div className="v-select__selections">
      //                 <div className="v-select__selection v-select__selection--comma">20</div>
      //                 <input aria-label="Rows per page:" readOnly={true} type="text" aria-readonly="false"/>
      //               </div>
      //               <div className="v-input__append-inner">
      //                 <div className="v-input__icon v-input__icon--append">
      //                   <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>arrow_drop_down</i>
      //                 </div>
      //               </div>
      //             </div>
      //             <div className="v-menu"></div>
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //     <div className="v-datatable__actions__range-controls">
      //       <div className="v-datatable__actions__pagination">1-1 of 1</div>
      //       <button type="button" className={['v-btn v-btn--disabled v-btn--flat v-btn--icon', this.props.theme].join(' ')} aria-label="Previous page">
      //         <div className="v-btn__content">
      //           <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>chevron_left</i>
      //         </div>
      //       </button>
      //       <button type="button" className={['v-btn v-btn--disabled v-btn--flat v-btn--icon', this.props.theme].join(' ')} aria-label="Next page">
      //         <div className="v-btn__content">
      //           <i aria-hidden="true" className={['v-icon material-icons', this.props.theme].join(' ')}>chevron_right</i>
      //         </div>
      //       </button>
      //     </div>
      //   </div>
      // </div>
    )
  }
}
