/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\snippetReducer.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

import { WIZZIFY_SNIPPET_REQUEST, WIZZIFY_SNIPPET_SUCCESS, WIZZIFY_SNIPPET_FAILURE } from '../actions';

const snippetInitialState = {
    isWizzifying: false, 
    wizzifyError: null, 
    wizzifiedSnippet: ''
};

function snippetReducer(state, action) {
    // log snippetReducer, state, action
    if (typeof state === 'undefined') {
        return snippetInitialState;
    }
    switch (action.type) {
        case WIZZIFY_SNIPPET_REQUEST: {
            // log 'WIZZIFY_SNIPPET_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isWizzifying: true, 
                wizzifyError: null
            };
            // log 'WIZZIFY_SNIPPET_REQUEST', 'final state:', temp
            return temp;
        }
        case WIZZIFY_SNIPPET_SUCCESS: {
            // log 'WIZZIFY_SNIPPET_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                wizzifiedSnippet: action.wizzifiedSnippet, 
                isWizzifying: false, 
                wizzifyError: null
            };
            // log 'WIZZIFY_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case WIZZIFY_SNIPPET_FAILURE: {
            // log 'WIZZIFY_SNIPPET_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                wizzifiedSnippet: '', 
                isWizzifying: false, 
                wizzifyError: action.error
            };
            // log 'WIZZIFY_SNIPPET_FAILURE', 'final state:', temp
            return temp;
        }
        default: {
            return state;
        }
    }
}

export default snippetReducer;
