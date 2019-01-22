import React, { Component} from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route  } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { rootStore } from './shared/store';
import { routes } from './routes';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';


const apolloClient = new ApolloClient({
  uri: ''
});

const styles = (theme: Theme) =>
    createStyles({
        '@global': {
            html: {
                height: '100%',
                boxSizing: 'border-box'
            },
            '*, *:before, *:after': {
                boxSizing: 'inherit'
            },
            body: {
                height: '100%',
                margin: 0,
                background: theme.palette.background.default,
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.fontSize,
                color: theme.palette.text.primary,

                // Helps fonts on OSX look more consistent with other systems
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',

                // Use momentum-based scrolling on iOS devices
                WebkitOverflowScrolling: 'touch'
            },
            '#root': {
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
            }
        },
        root: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        }
    });


export const App = withStyles(styles)(
  class extends Component<WithStyles<typeof styles>> {
    render() {
      const { classes } = this.props;
      return (
        <ApolloProvider client={apolloClient}>
          <Provider rootStore = {rootStore}>
            <Router>
              <div className={classes.root}>
                {
                  routes.map(route => <Route {...route} />)
                }
              </div>              
            </Router>
          </Provider>
        </ApolloProvider>
      );
    }
  }
);