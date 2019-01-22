import React, { Component } from 'react';
import { AppBar, Typography, createStyles, Theme, withStyles, WithStyles, Button } from '@material-ui/core';
import { PaddedContainer } from './layout';
import { RootStore } from '../../store';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';

const styles = (theme: Theme) => createStyles({
    grow: {
        flexGrow: 1
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row'
    },
    linksContainer: {
        margin: theme.spacing.unit * 2,
        display: 'flex'
    }
});
interface HeaderProps extends WithStyles<typeof styles> {
    rootStore?: RootStore
}
export const Header = withStyles(styles)(inject('rootStore')(observer(({rootStore, classes}: HeaderProps) => (
    <AppBar position="static" className={classes.appBar}>
        <PaddedContainer>
            <Typography variant="h5" color="inherit" >
                Metallica
            </Typography>
        </PaddedContainer>
        <div className={classes.grow}></div>
        {
            rootStore && rootStore.loginStore.isLoggedIn && (
                <div className={classes.linksContainer}>
                    <Button component={(props: {}) => <Link to="/trade" {...props} />} color="inherit">Trades</Button>
                    <Button component={(props: {}) => <Link to="/trade" {...props} />} color="inherit">Transfers</Button>
                    <Button component={(props: {}) => <Link to="/trade" {...props} />} color="inherit">Transports</Button>
                </div>
            )
        }
    </AppBar>
))));