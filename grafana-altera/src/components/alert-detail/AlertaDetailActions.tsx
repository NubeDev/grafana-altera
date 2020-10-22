import React, { Component } from 'react';
import clsx from 'clsx';
import { DebouncedFunc } from 'lodash';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import * as Yup from 'yup';

import { IAlert } from 'shared/models/model-data/alert.model';
import { THEME } from 'shared/constants/theme.constants';

interface IAlertaDetailActionsProps {
  theme: any;
  isWatched?: boolean;
  isAcked?: boolean;
  isShelved?: boolean;
  isOpen?: boolean;
  isClosed?: boolean;
  basicAuthUser: string;
  alertDetail: IAlert;
  handleDeleteAlertDetails: DebouncedFunc<(alertId: string) => void>;
  handleWatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleUnwatchAlert: DebouncedFunc<(username: string, alertId: string) => void>;
  handleAckAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleShelveAlert: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleTakeAction: DebouncedFunc<(alertId: string, action: string, text: string) => void>;
  handleAddNote: DebouncedFunc<(alertId: string, text: string) => void>;
}

interface IButtonProps {
  show?: boolean;
  disabled?: boolean;
  type: any;
  classBtn: any;
  classIcon: any;
  label?: any;
  icon: any;
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

function Button(props: IButtonProps) {
  const { show, disabled, type, classBtn, classIcon, label, icon, onClick } = props;

  return (
    <>
      {show ? (
        disabled ? (
          <button type={type} className={clsx(classBtn, 'v-btn--disabled')} disabled={disabled}>
            <div className="v-btn__content">
              <i aria-hidden="true" className={classIcon}>{icon}</i>{label ? `\u00A0${label}` : ''}
            </div>
          </button>
        ) : (
          <button type={type} className={classBtn} onClick={onClick}>
            <div className="v-btn__content">
              <i aria-hidden="true" className={classIcon}>{icon}</i>{label ? `\u00A0${label}` : ''}
            </div>
          </button>
        )
      ) : (
        ''
      )}
    </>
  );
}

function AlertActionsButton(props: IAlertaDetailActionsProps) {
  const {
    theme,
    isWatched, isAcked, isShelved, isOpen, isClosed,
    basicAuthUser, alertDetail,
    handleDeleteAlertDetails,
    handleWatchAlert, handleUnwatchAlert, handleAckAlert, handleShelveAlert, handleTakeAction, handleAddNote
  } = props;

  const [showForm, setShowForm] = React.useState(false);

  const handleClose = () => {
    setShowForm(false);
  };

  return (
    <div>
      {showForm === true ? (
        <div className="container pa-1 fluid">
          <div className="layout">
            <div className="flex">
              <Formik
                initialValues={{
                  note: ''
                }}
                validationSchema={Yup.object().shape({
                  note: Yup.string()
                    .required('Text is required')
                    .max(200, 'Text must be less than 200 characters')
                })}
                onSubmit={(values, { setSubmitting }) => {
                  setTimeout(() => {
                    setSubmitting(false);
                    handleAddNote(alertDetail.id, values.note);
                    handleClose();
                  }, 200);
                }}
              >
                {({ values, submitForm, isSubmitting, touched, errors, handleBlur, handleChange }) => (
                  <Form className="v-form">
                    <div className={clsx('v-card v-sheet', theme)}>
                      <div className="v-card__text">
                        <Field
                          component={TextField}
                          id="note"
                          name="note"
                          label="Add note"
                          type="text"
                          fullWidth
                          value={values.note}
                          InputProps={{
                            autoComplete: "off"
                          }}
                          helperText={
                            errors.note && touched.note ? errors.note : ''
                          }
                          error={
                            errors.note && touched.note ? true : false
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div className="v-text-field__details">
                          <div className={clsx('v-messages', theme)}>
                            <div className="v-messages__wrapper" />
                          </div>
                          <div className={clsx('v-counter', theme)}>{values.note.length} / 200</div>
                        </div>
                      </div>
                      <div className="v-card__actions">
                        <Button
                          show={true}
                          disabled={!isAcked && !isClosed}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'green')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Open"
                          icon="refresh"
                          onClick={() => {
                            handleTakeAction(alertDetail.id, 'open', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={!isAcked}
                          disabled={!isOpen}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'blue darken-2')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Ack"
                          icon="check_circle_outline"
                          onClick={() => {
                            handleAckAlert(alertDetail.id, 'ack', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={isAcked}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'blue darken-2')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Unack"
                          icon="check_circle_outline"
                          onClick={() => {
                            handleTakeAction(alertDetail.id, 'unack', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={!isShelved}
                          disabled={!isOpen && !isAcked}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'blue')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Shelve"
                          icon="schedule"
                          onClick={() => {
                            handleShelveAlert(alertDetail.id, 'shelve', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={isShelved}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'blue')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Unshelve"
                          icon="schedule"
                          onClick={() => {
                            handleTakeAction(alertDetail.id, 'unshelve', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={true}
                          disabled={isClosed}
                          type="button"
                          classBtn={clsx('white--text v-btn', theme, 'orange')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Close"
                          icon="highlight_off"
                          onClick={() => {
                            handleTakeAction(alertDetail.id, 'close', '');
                            handleClose();
                          }}
                        />
                        <Button
                          show={true}
                          type="submit"
                          classBtn={clsx(theme === THEME.DARK_MODE ? 'black--text' : '', 'v-btn', theme, 'white')}
                          classIcon={clsx('v-icon material-icons', theme)}
                          label="Add note"
                          icon="note_add"
                          disabled={isSubmitting}
                          onClick={submitForm}
                        />
                        <div className="spacer" />
                        <Button
                          show={true}
                          type="button"
                          classBtn={clsx('v-btn v-btn--icon', theme)}
                          classIcon={clsx('v-icon material-icons', theme, 'grey--text text--darken-1')}
                          icon="delete"
                          onClick={handleClose}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      ) : (
        <div className="container pa-1 fluid">
          <div className="layout">
            <div className="flex">
              <Button
                show={!isWatched}
                type="button"
                classBtn={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}
                classIcon={clsx('v-icon material-icons', theme)}
                label="Watch"
                icon="visibility"
                onClick={() => handleWatchAlert(basicAuthUser, alertDetail.id)}
              />
              <Button
                show={isWatched}
                type="button"
                classBtn={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}
                classIcon={clsx('v-icon material-icons', theme)}
                label="Unwatch"
                icon="visibility_off"
                onClick={() => handleUnwatchAlert(basicAuthUser, alertDetail.id)}
              />
              <Button
                show={!showForm}
                type="button"
                classBtn={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}
                classIcon={clsx('v-icon material-icons', theme)}
                label="Add note"
                icon="note_add"
                onClick={() => setShowForm(true)}
              />
              <Button
                show={true}
                type="button"
                classBtn={clsx('v-btn v-btn--outline v-btn--depressed', theme, 'grey--text text--darken-2')}
                classIcon={clsx('v-icon material-icons', theme)}
                label="Delete"
                icon="delete_forever"
                onClick={() => handleDeleteAlertDetails(alertDetail.id)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export class AlertaDetailActions extends Component<IAlertaDetailActionsProps> {
  constructor(props: IAlertaDetailActionsProps) {
    super(props);
  }

  render() {
    const { 
      theme, 
      isWatched, isAcked, isShelved, isOpen, isClosed, 
      basicAuthUser, alertDetail,
      handleDeleteAlertDetails,
      handleWatchAlert, handleUnwatchAlert, handleAckAlert, handleShelveAlert, handleTakeAction, handleAddNote
     } = this.props;

    return (
      <AlertActionsButton
        theme={theme}
        isWatched={isWatched}
        isAcked={isAcked}
        isShelved={isShelved}
        isOpen={isOpen}
        isClosed={isClosed}
        basicAuthUser={basicAuthUser}
        alertDetail={alertDetail}
        handleDeleteAlertDetails={handleDeleteAlertDetails}
        handleWatchAlert={handleWatchAlert}
        handleUnwatchAlert={handleUnwatchAlert}
        handleAckAlert={handleAckAlert}
        handleShelveAlert={handleShelveAlert}
        handleTakeAction={handleTakeAction}
        handleAddNote={handleAddNote}
      />
    );
  }
}
