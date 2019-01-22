import React, { Component } from 'react';
import { createStyles, withStyles, WithStyles, Theme, Paper, Button } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    centeredContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.unit
    },
    fullHeightVerticalContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column'
    },
    horizontalContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    defaultGutters: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
    },
    defaultMargins: {
        margin: theme.spacing.unit,
        marginBottom: 0
    }
});

interface ContainerProps extends WithStyles<typeof styles> {
    children: any,
}

interface ContainerPropsWithAdditionalProps extends ContainerProps {
    otherClasses? : Array<string>
}
export const CenteredContainer = withStyles(styles)(({ children, classes }: ContainerProps) => {
    return <div className={classes.centeredContainer}>{ children }</div>
});

export const FullHeightVerticalContainer = withStyles(styles)(({ children, classes }: ContainerProps) => {
    return <div className={classes.fullHeightVerticalContainer}>{ children }</div>
});

export const HorizontalContainer = withStyles(styles)(({ children, classes }: ContainerProps) => {
    return <div className={classes.horizontalContainer}>{ children }</div>
});

export const WithDefaultGutters = (WrappedComponent: React.ComponentType<any>) => {
    return withStyles(styles)(({ children, classes }: ContainerProps) => {
        return (
            <WrappedComponent classes={{ root: classes.defaultGutters}}>
                {children}
            </WrappedComponent>
        );
    })
};

export const PaperSheet = WithDefaultGutters(Paper);

export const PaddedContainer = withStyles(styles)(({ children, classes, otherClasses }: ContainerPropsWithAdditionalProps) => {
    const otherClassNames = otherClasses ? otherClasses : [];
    const classNames = [classes.defaultGutters, ...otherClassNames];
    return <div className={classNames.join(' ')}>{ children }</div>
});

export const ContainerWithDefaultMargins = withStyles(styles)(({ children, classes, otherClasses }: ContainerPropsWithAdditionalProps) => {
    const otherClassNames = otherClasses ? otherClasses : [];
    const classNames = [classes.defaultMargins, ...otherClassNames];
    return <div className={classNames.join(' ')}>{ children }</div>
});