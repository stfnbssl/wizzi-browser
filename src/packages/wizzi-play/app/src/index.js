/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\index.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { render } from 'react-dom';
import MuiThemeContainer from './containers/MuiThemeContainer';
// preloadedState param not used
// export const store = configureStore(preloadedState)
export const store = configureStore();
const rootEl = document.querySelector('#app');
render(
    <Provider store={store}>
        <MuiThemeContainer>
        </MuiThemeContainer>
    
    </Provider>
, rootEl);
