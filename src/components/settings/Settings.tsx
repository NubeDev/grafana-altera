import React, { Component } from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

import './Settings.scss';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';

interface ISettingsForm {
  url: string;
  username: string;
  password: string;
}

interface ISettingsProps { }

const SettingsForm = (props: any) => {
  const CustomTextField = props.theme === THEME.DARK_MODE ? withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#3f51b5',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#3f51b5',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#c1c1c1',
        },
        '&:hover fieldset': {
          borderColor: '#fff',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#3f51b5',
        },
      },
    },
  })(TextField) : (TextField);

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      button: {
        marginTop: theme.spacing(2)
      },
      typography: {
        marginBottom: theme.spacing(2)
      }
    })
  );
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        url: '',
        username: '',
        password: '',
      }}
      validate={(values) => {
        const errors: Partial<ISettingsForm> = {};
        if (!values.url) {
          errors.url = 'Your URL is required.';
        }
        if (!values.username) {
          errors.username = 'Your username is required.';
        }
        if (!values.password) {
          errors.password = 'Your password is required.';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          console.log(JSON.stringify(values, null, 2));
        }, 500);
      }}
    >
      {({ submitForm, isSubmitting, touched, errors }) => (
        <div className="settings">
          <div className="v-tabs px-1">
            <Container component="main" maxWidth="xs">
              <div className="settings-paper">
                <Typography className={[classes.typography, props.theme].join(' ')} component="h1" variant="h5">Settings</Typography>
                <Form className="settings-form">
                  <Grid container spacing={2}>
                    <Grid item xs={12} className={props.theme}>
                      <Field
                        component={CustomTextField}
                        id="url"
                        name="url"
                        label="URL"
                        type="text"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} className={props.theme}>
                      <Field
                        component={CustomTextField}
                        id="username"
                        name="username"
                        label="Username"
                        type="text"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={12} className={props.theme}>
                      <Field
                        component={CustomTextField}
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    className={classes.button}
                    startIcon={<SaveIcon />}
                    size="large"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Save
                  </Button>
                </Form>
              </div>
            </Container>
          </div>
        </div>
      )}
    </Formik>
  );
}

export class Settings extends Component<ISettingsProps, any> {
  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <SettingsForm theme={theme} />
    );
  }
}
