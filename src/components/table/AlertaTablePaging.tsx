import React, {Component} from 'react';

export class AlertaTablePaging extends Component<any, any> {
  render() {
    return (
      <div className="v-datatable v-table v-datatable--select-all theme--light">
        <div className="v-datatable__actions">
          <div className="v-datatable__actions__select">Rows per page:
            <div role="combobox"
                 className="v-input v-text-field v-select v-input--hide-details v-input--is-label-active v-input--is-dirty theme--light">
              <div className="v-input__control">
                <div className="v-input__slot">
                  <div className="v-select__slot">
                    <div className="v-select__selections">
                      <div className="v-select__selection v-select__selection--comma">20</div>
                      <input aria-label="Rows per page:" readOnly={true} type="text" aria-readonly="false"/>
                    </div>
                    <div className="v-input__append-inner">
                      <div className="v-input__icon v-input__icon--append">
                        <i aria-hidden="true"
                           className="v-icon material-icons theme--light">arrow_drop_down</i>
                      </div>
                    </div>
                  </div>
                  <div className="v-menu"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="v-datatable__actions__range-controls">
            <div className="v-datatable__actions__pagination">1-1 of 1</div>
            <button type="button" className="v-btn v-btn--disabled v-btn--flat v-btn--icon theme--light"
                    aria-label="Previous page">
              <div className="v-btn__content">
                <i aria-hidden="true" className="v-icon material-icons theme--light">chevron_left</i>
              </div>
            </button>
            <button type="button" className="v-btn v-btn--disabled v-btn--flat v-btn--icon theme--light"
                    aria-label="Next page">
              <div className="v-btn__content">
                <i aria-hidden="true" className="v-icon material-icons theme--light">chevron_right</i>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }
}
