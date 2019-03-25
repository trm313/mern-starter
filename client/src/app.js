import React from 'react';
import ReactDOM from 'react-dom';

// Google's MuiThemeProvider
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Routes
import { browserHistory, Router } from 'react-router';
import routes from './routes.js';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// Remote tap delay, essential for MaterialUI to work properly (temporary)
injectTapEventPlugin();

ReactDOM.render((
    <Provider store={createStoreWithMiddleware(reducers)}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    </Provider>
    ),
    document.getElementById('react-app'));