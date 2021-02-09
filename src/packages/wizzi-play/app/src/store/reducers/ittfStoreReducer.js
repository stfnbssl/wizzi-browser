/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\ittfStoreReducer.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

import { ITTF_CLOUD_UPDATE_REQUEST, ITTF_CLOUD_UPDATE_SUCCESS, ITTF_CLOUD_UPDATE_FAILURE } from '../actions';

const ittfStoreInitialState = {
    isCloudUpdating: false, 
    updateError: null, 
    updatedMessage: ''
};

function ittfStoreReducer(state, action) {
    // log ittfStoreReducer, state, action
    if (typeof state === 'undefined') {
        return ittfStoreInitialState;
    }
    switch (action.type) {
        case ITTF_CLOUD_UPDATE_REQUEST: {
            // log 'ITTF_CLOUD_UPDATE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isCloudUpdating: true, 
                updatedMessage: '', 
                updateError: null
            };
            // log 'ITTF_CLOUD_UPDATE_REQUEST', 'final state:', temp
            return temp;
        }
        case ITTF_CLOUD_UPDATE_SUCCESS: {
            // log 'ITTF_CLOUD_UPDATE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                isCloudUpdating: false, 
                updatedMessage: action.message, 
                updateError: null
            };
            // log 'ITTF_CLOUD_UPDATE_SUCCESS', 'final state:', temp
            return temp;
        }
        case ITTF_CLOUD_UPDATE_FAILURE: {
            // log 'ITTF_CLOUD_UPDATE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isCloudUpdating: false, 
                updateError: action.error
            };
            // log 'ITTF_CLOUD_UPDATE_FAILURE', 'final state:', temp
            return temp;
        }
        default: {
            return state;
        }
    }
}

export default ittfStoreReducer;
