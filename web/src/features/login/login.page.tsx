import React, { Component, useState, SyntheticEvent } from 'react';
import { inject, observer } from 'mobx-react';
import { FullHeightVerticalContainer, CenteredContainer, PaperSheet, Header } from '../../shared/components/general';
import { TextField, FormControl, FormHelperText, Typography, Button, withStyles, Theme, createStyles } from '@material-ui/core';
import { RootStore } from '../../shared/store';
import { User } from '../../shared/domain/user';
import { Redirect } from 'react-router';

const styles = (theme: Theme) => createStyles({
    loginContainer: {
        minHeight: '250px',
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    actionButtons: {
        paddingTop: theme.spacing.unit * 2
    }
});

@inject('rootStore')
@observer
class LoginPageBase extends Component<{rootStore: RootStore, classes: any }> {
    handleInputFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        this.props.rootStore.loginStore.loginForm.setFieldValue(target.id, target.value);
    }
    login = () => {
        this.props.rootStore.loginStore.login();
    }
    render() {
        const { rootStore: { loginStore }, classes } = this.props;
        return loginStore.redirectBackPath && loginStore.isLoggedIn
            ? <Redirect to={loginStore.redirectBackPath}/> 
            :(
                <FullHeightVerticalContainer>
                    <Header/>
                    <CenteredContainer>
                        <PaperSheet>
                            <div className={classes.loginContainer}>
                                <Typography variant="h6">
                                    Login
                                </Typography>
                                <form>
                                    <FormControl fullWidth>
                                    <TextField
                                        id="username"
                                        label="Username"
                                        value={loginStore.loginForm.formValues['username']}
                                        onChange={this.handleInputFieldChange}
                                        margin="normal"
                                        error={loginStore.loginForm.getFieldErrors('username').length > 0}
                                    />
                                    {
                                        loginStore.loginForm.getFieldErrors('username')
                                            .map(errorMessage => <Typography color="error" variant="caption">{errorMessage}</Typography>)
                                    }
                                    </FormControl>
                                    <FormControl fullWidth>
                                        <TextField
                                            id="password"
                                            label="Password"
                                            type="password"
                                            value={loginStore.loginForm.formValues['password']}
                                            onChange={this.handleInputFieldChange}
                                            margin="normal"
                                            error={loginStore.loginForm.getFieldErrors('password').length > 0}
                                        />
                                        {
                                            loginStore.loginForm.getFieldErrors('password')
                                                .map(errorMessage => <Typography color="error" variant="caption">{errorMessage}</Typography>)
                                        }
                                    </FormControl>
                                    <div className={classes.actionButtons}>
                                        <Button variant="contained" color="primary" disabled = {loginStore.loading} onClick={this.login}>
                                            {
                                                loginStore.loading ? 'loading...' : 'Login'
                                            }
                                        </Button>
                                        <Typography color="error" variant="body1">{loginStore.loginError}</Typography>
                                    </div>
                                </form>
                            </div>
                        </PaperSheet>
                    </CenteredContainer>
                </FullHeightVerticalContainer>

            );
    }
};

export const LoginPage = withStyles(styles)(LoginPageBase);