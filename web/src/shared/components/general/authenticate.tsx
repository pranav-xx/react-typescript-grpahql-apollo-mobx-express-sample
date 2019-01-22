import React, { Component } from 'react';
import { observer, inject, IReactComponent } from 'mobx-react';
import { RootStore } from '../../store';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';


interface authenticateProps extends RouteComponentProps {
    rootStore: RootStore
}
export const authenticate = (WrappedComponent: any) => {
    return inject('rootStore')(observer(withRouter(({rootStore, location}: authenticateProps) => {
        if (!rootStore.loginStore.isLoggedIn) {
            rootStore.loginStore.setRedirectBackToLink(location.pathname);
            return <Redirect to="/login"/>
        }
        return <WrappedComponent/>
    })));
}
