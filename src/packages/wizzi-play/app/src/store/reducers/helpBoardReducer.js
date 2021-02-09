/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\helpBoardReducer.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

import { HB_UPDATE_ITTF_MTREE, HB_UPDATE_CODE_AST, HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY, SNIPPET_CONTENT_CHANGED, } from '../actions';
import { SELECT_SNIPPET_REQUEST, SELECT_SNIPPET_SUCCESS, SELECT_SNIPPET_FAILURE } from '../actions';
import { GENERATE_WIZZIFIED_REQUEST, GENERATE_WIZZIFIED_SUCCESS, GENERATE_WIZZIFIED_FAILURE } from '../actions';

const helpBoardInitialState = {
    ittfMTree: {}, 
    codeAST: {}, 
    cursorNode: {}, 
    originalModel: 'just some text\n\nHello World\n\nSome more text', 
    modifiedModel: 'just some Text\n\nHello World\n\nSome more changes'
};

function helpBoardReducer(state, action) {
    // log helpBoardReducer, state, action
    if (typeof state === 'undefined') {
        return helpBoardInitialState;
    }
    switch (action.type) {
        case HB_UPDATE_ITTF_MTREE: {
            // log 'HB_UPDATE_ITTF_MTREE', 'initial state:', state
            var temp = {
                ...state, 
                ittfMTree: action.ittfMTree
            };
            // log 'HB_UPDATE_ITTF_MTREE', 'final state:', temp
            return temp;
        }
        case HB_UPDATE_CODE_AST: {
            // log 'HB_UPDATE_CODE_AST', 'initial state:', state
            var temp = {
                ...state, 
                codeAST: action.codeAST
            };
            // log 'HB_UPDATE_CODE_AST', 'final state:', temp
            return temp;
        }
        case HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY: {
            // log 'HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY', 'initial state:', state
            var temp = {
                ...state, 
                cursor: action.cursor, 
                cursorNode: action.cursorNode, 
                schemaElementDoc: action.schemaElementDoc
            };
            // log 'HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY', 'final state:', temp
            return temp;
        }
        case SELECT_SNIPPET_SUCCESS: {
            // log 'SELECT_SNIPPET_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                originalModel: action.codeContent
            };
            // log 'SELECT_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case SNIPPET_CONTENT_CHANGED: {
            // log 'SNIPPET_CONTENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                originalModel: action.codeContent
            };
            // log 'SNIPPET_CONTENT_CHANGED', 'final state:', temp
            return temp;
        }
        case GENERATE_WIZZIFIED_SUCCESS: {
            // log 'GENERATE_WIZZIFIED_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                modifiedModel: action.generatedText
            };
            // log 'GENERATE_WIZZIFIED_SUCCESS', 'final state:', temp
            return temp;
        }
        case GENERATE_WIZZIFIED_FAILURE: {
            // log 'GENERATE_WIZZIFIED_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                modifiedModel: JSON.stringify(action.error, null, 2)
            };
            // log 'GENERATE_WIZZIFIED_FAILURE', 'final state:', temp
            return temp;
        }
        default: {
            return state;
        }
    }
}

export default helpBoardReducer;
