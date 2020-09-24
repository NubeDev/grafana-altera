import React, { Component } from 'react';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, withStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';

import './Settings.scss';
import { ThemeContext } from 'shared/contexts/ThemeContext';
import { THEME } from 'shared/constants/theme.constants';

interface ISettingsProps { }

function SettingsForm(props: any) {

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
    <div className="settings">
      <div className="v-tabs px-1">
        <Container component="main" maxWidth="xs">
          <div className="settings-paper">
            <Typography className={[classes.typography, props.theme].join(' ')} component="h1" variant="h5">Settings</Typography>
            <form className="settings-form">
              <Grid container spacing={2}>
                <Grid item xs={12} className={props.theme}>
                  <CustomTextField
                    variant="outlined"
                    fullWidth
                    id="url"
                    label="URL"
                    name="url"
                  />
                </Grid>
                <Grid item xs={12} className={props.theme}>
                  <CustomTextField
                    variant="outlined"
                    fullWidth
                    name="port"
                    label="Port"
                    type="text"
                    id="port"
                  />
                </Grid>
                <Grid item xs={12} className={props.theme}>
                  <CustomTextField
                    variant="outlined"
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    id="username"
                  />
                </Grid>
                <Grid item xs={12} className={props.theme}>
                  <CustomTextField
                    variant="outlined"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                size="large"
              >
                Save
              </Button>
            </form>
          </div>
        </Container>
      </div>
    </div>
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
