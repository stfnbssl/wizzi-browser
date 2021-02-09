/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\configureStore.dev.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

// configureStore is called by the app entry point ( index.js )

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// in the api middleware we can store global objects
// that give problems when stored in the redux state
// see https://stackoverflow.com/questions/37221872/storing-global-object-outside-of-redux-store-in-react-redux-app
// and https://github.com/reduxjs/redux-thunk
import extraArguments from '../middleware/extraArguments';
import { initialLoad } from './actions';
import rootReducer from './reducers';

var create = (preloadedState) => {
    
    // TODO Can these stay outside of create() and
    // avoid to initialize firebase at each call when executed server side?
    
    const middlewares = applyMiddleware(thunk.withExtraArgument(extraArguments), createLogger());
    
    var store = createStore(rootReducer, preloadedState, middlewares);
    
    return store;
};

export default function configureStore(initialState) {
    // Make sure to create a new store for every server-side request so that data
    // isn't shared between connections (which would be bad)
    if (!process.browser) {
        let store = create(initialState);
        store.dispatch(initialLoad());
        return store;
    }
    // Reuse store on the client-side
    if (!global.__INIT_REDUX_STORE__) {
        let store = create(initialState);
        store.dispatch(initialLoad());
        global.__INIT_REDUX_STORE__ = store;
    }
    return global.__INIT_REDUX_STORE__;
}
