/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\reducers\schemaReducer.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';

import { LOAD_APP_REQUEST, LOAD_APP_SUCCESS, LOAD_APP_FAILURE } from '../actions';
import { SCHEMA_SELECTION, EXAMPLE_CONTENT_CHANGED, FRAGMENT_CONTENT_CHANGED, TEMPLATE_CONTENT_CHANGED, SNIPPET_CONTENT_CHANGED, SELECT_ITTF_KIND } from '../actions';
import { SELECT_EXAMPLE_REQUEST, SELECT_EXAMPLE_SUCCESS, SELECT_EXAMPLE_FAILURE } from '../actions';
import { ADD_EXAMPLE_REQUEST, ADD_EXAMPLE_SUCCESS, ADD_EXAMPLE_FAILURE } from '../actions';
import { RENAME_EXAMPLE_REQUEST, RENAME_EXAMPLE_SUCCESS, RENAME_EXAMPLE_FAILURE } from '../actions';
import { REMOVE_EXAMPLE_REQUEST, REMOVE_EXAMPLE_SUCCESS, REMOVE_EXAMPLE_FAILURE } from '../actions';
import { SELECT_FRAGMENT_REQUEST, SELECT_FRAGMENT_SUCCESS, SELECT_FRAGMENT_FAILURE } from '../actions';
import { ADD_FRAGMENT_REQUEST, ADD_FRAGMENT_SUCCESS, ADD_FRAGMENT_FAILURE } from '../actions';
import { RENAME_FRAGMENT_REQUEST, RENAME_FRAGMENT_SUCCESS, RENAME_FRAGMENT_FAILURE } from '../actions';
import { REMOVE_FRAGMENT_REQUEST, REMOVE_FRAGMENT_SUCCESS, REMOVE_FRAGMENT_FAILURE } from '../actions';
import { SELECT_TEMPLATE_REQUEST, SELECT_TEMPLATE_SUCCESS, SELECT_TEMPLATE_FAILURE } from '../actions';
import { ADD_TEMPLATE_REQUEST, ADD_TEMPLATE_SUCCESS, ADD_TEMPLATE_FAILURE } from '../actions';
import { RENAME_TEMPLATE_REQUEST, RENAME_TEMPLATE_SUCCESS, RENAME_TEMPLATE_FAILURE } from '../actions';
import { REMOVE_TEMPLATE_REQUEST, REMOVE_TEMPLATE_SUCCESS, REMOVE_TEMPLATE_FAILURE } from '../actions';
import { SELECT_SNIPPET_REQUEST, SELECT_SNIPPET_SUCCESS, SELECT_SNIPPET_FAILURE } from '../actions';
import { ADD_SNIPPET_REQUEST, ADD_SNIPPET_SUCCESS, ADD_SNIPPET_FAILURE } from '../actions';
import { RENAME_SNIPPET_REQUEST, RENAME_SNIPPET_SUCCESS, RENAME_SNIPPET_FAILURE } from '../actions';
import { REMOVE_SNIPPET_REQUEST, REMOVE_SNIPPET_SUCCESS, REMOVE_SNIPPET_FAILURE } from '../actions';
import LocalStorage from './localStorage';
var ls = new LocalStorage('play');

const schemaInitialState = {
    schemas: {
        js: {
            examples: [
                
            ], 
            fragments: [
                
            ], 
            snippets: [
                
            ], 
            templates: [
                
            ]
        }
    }, 
    selectedIttfKind: ls.get('selectedIttfKind', 'examples', true), 
    selectedSchema: ls.get('selectedSchema', 'js', true), 
    filteredExamples: [], 
    filteredFragments: [], 
    filteredSnippets: [], 
    filteredTemplates: [], 
    isLoadingContent: false, 
    selectedExample: ls.get('selectedExample', '', true), 
    selectedFragment: ls.get('selectedFragment', '', true), 
    selectedSnippet: ls.get('selectedSnippet', '', true), 
    selectedTemplate: ls.get('selectedTemplate', '', true), 
    ittfContent: '', 
    codeContent: ''
};

function schemaReducer(state, action) {
    // log schemaReducer, state, action
    if (typeof state === 'undefined') {
        return schemaInitialState;
    }
    switch (action.type) {
        case LOAD_APP_SUCCESS: {
            // log 'LOAD_APP_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.initialData.schemas
            };
            // log 'LOAD_APP_SUCCESS', 'final state:', temp
            return temp;
        }
        case SCHEMA_SELECTION: {
            // log 'SCHEMA_SELECTION', 'initial state:', state
            ls.set('selectedSchema', action.schema);
            var selectedIttfKind = ls.get(action.schema + '_selectedIttfKind', 'examples', true);
            var exampleObject, fragmentObject, snippetObject, templateObject;
            const s = state.schemas[action.schema];
            if (s) {
                if (s.examples && s.examples.length > 0) {
                    exampleObject = s.examples[0];
                }
                else {
                    s.examples = [];
                }
                if (s.fragments && s.fragments.length > 0) {
                    fragmentObject = s.fragments[0];
                }
                else {
                    s.fragments = [];
                }
                if (s.snippets && s.snippets.length > 0) {
                    snippetObject = s.snippets[0];
                }
                else {
                    s.snippets = [];
                }
                if (s.templates && s.templates.length > 0) {
                    templateObject = s.templates[0];
                }
                else {
                    s.templates = [];
                }
            }
            var temp = {
                ...state, 
                selectedSchema: action.schema, 
                selectedIttfKind: selectedIttfKind, 
                filteredExamples: s ? s.examples : [], 
                selectedExample: exampleObject ? exampleObject.name : 'default', 
                filteredFragments: s ? s.fragments : [], 
                selectedFragment: fragmentObject ? fragmentObject.name : 'default', 
                filteredSnippets: s ? s.snippets : [], 
                selectedSnippet: snippetObject ? snippetObject.name : 'default', 
                filteredTemplates: s ? s.templates : [], 
                selectedTemplate: templateObject ? templateObject.name : 'default', 
                ittfContent: ''
            };
            // log 'SCHEMA_SELECTION', 'final state:', temp
            return temp;
        }
        case SELECT_ITTF_KIND: {
            // log 'SELECT_ITTF_KIND', 'initial state:', state
            ls.set('selectedIttfKind', action.selectedIttfKind);
            ls.set(state.selectedSchema + '_selectedIttfKind', action.selectedIttfKind);
            var temp = {
                ...state, 
                selectedIttfKind: action.selectedIttfKind
            };
            // log 'SELECT_ITTF_KIND', 'final state:', temp
            return temp;
        }
        case SELECT_EXAMPLE_REQUEST: {
            // log 'SELECT_EXAMPLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoadingContent: true
            };
            // log 'SELECT_EXAMPLE_REQUEST', 'final state:', temp
            return temp;
        }
        case SELECT_EXAMPLE_SUCCESS: {
            // log 'SELECT_EXAMPLE_SUCCESS', 'initial state:', state
            ls.set('selectedExample', action.example);
            var temp = {
                ...state, 
                selectedExample: action.example, 
                ittfContent: action.ittfContent, 
                isLoadingContent: false
            };
            // log 'SELECT_EXAMPLE_SUCCESS', 'final state:', temp
            return temp;
        }
        case EXAMPLE_CONTENT_CHANGED: {
            // log 'EXAMPLE_CONTENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                ittfContent: action.ittfContent
            };
            // log 'EXAMPLE_CONTENT_CHANGED', 'final state:', temp
            return temp;
        }
        case SELECT_FRAGMENT_REQUEST: {
            // log 'SELECT_FRAGMENT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoadingContent: true
            };
            // log 'SELECT_FRAGMENT_REQUEST', 'final state:', temp
            return temp;
        }
        case SELECT_FRAGMENT_SUCCESS: {
            // log 'SELECT_FRAGMENT_SUCCESS', 'initial state:', state
            ls.set('selectedFragment', action.fragment);
            var temp = {
                ...state, 
                selectedFragment: action.fragment, 
                ittfContent: action.ittfContent, 
                isLoadingContent: false
            };
            // log 'SELECT_FRAGMENT_SUCCESS', 'final state:', temp
            return temp;
        }
        case FRAGMENT_CONTENT_CHANGED: {
            // log 'FRAGMENT_CONTENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                ittfContent: action.ittfContent
            };
            // log 'FRAGMENT_CONTENT_CHANGED', 'final state:', temp
            return temp;
        }
        case SELECT_TEMPLATE_REQUEST: {
            // log 'SELECT_TEMPLATE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoadingContent: true
            };
            // log 'SELECT_TEMPLATE_REQUEST', 'final state:', temp
            return temp;
        }
        case SELECT_TEMPLATE_SUCCESS: {
            // log 'SELECT_TEMPLATE_SUCCESS', 'initial state:', state
            ls.set('selectedTemplate', action.template);
            var temp = {
                ...state, 
                selectedTemplate: action.template, 
                ittfContent: action.ittfContent, 
                isLoadingContent: false
            };
            // log 'SELECT_TEMPLATE_SUCCESS', 'final state:', temp
            return temp;
        }
        case TEMPLATE_CONTENT_CHANGED: {
            // log 'TEMPLATE_CONTENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                ittfContent: action.ittfContent
            };
            // log 'TEMPLATE_CONTENT_CHANGED', 'final state:', temp
            return temp;
        }
        case SELECT_SNIPPET_REQUEST: {
            // log 'SELECT_SNIPPET_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isLoadingContent: true
            };
            // log 'SELECT_SNIPPET_REQUEST', 'final state:', temp
            return temp;
        }
        case SELECT_SNIPPET_SUCCESS: {
            // log 'SELECT_SNIPPET_SUCCESS', 'initial state:', state
            ls.set('selectedSnippet', action.snippet);
            var temp = {
                ...state, 
                selectedSnippet: action.snippet, 
                codeContent: action.codeContent, 
                isLoadingContent: false
            };
            // log 'SELECT_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case SNIPPET_CONTENT_CHANGED: {
            // log 'SNIPPET_CONTENT_CHANGED', 'initial state:', state
            var temp = {
                ...state, 
                codeContent: action.codeContent
            };
            // log 'SNIPPET_CONTENT_CHANGED', 'final state:', temp
            return temp;
        }
        case ADD_EXAMPLE_REQUEST: {
            // log 'ADD_EXAMPLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: true
            };
            // log 'ADD_EXAMPLE_REQUEST', 'final state:', temp
            return temp;
        }
        case ADD_EXAMPLE_FAILURE: {
            // log 'ADD_EXAMPLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: false
            };
            // log 'ADD_EXAMPLE_FAILURE', 'final state:', temp
            return temp;
        }
        case ADD_EXAMPLE_SUCCESS: {
            // log 'ADD_EXAMPLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingExamples: false
            };
            // log 'ADD_EXAMPLE_SUCCESS', 'final state:', temp
            return temp;
        }
        case RENAME_EXAMPLE_REQUEST: {
            // log 'RENAME_EXAMPLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: true
            };
            // log 'RENAME_EXAMPLE_REQUEST', 'final state:', temp
            return temp;
        }
        case RENAME_EXAMPLE_FAILURE: {
            // log 'RENAME_EXAMPLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: false
            };
            // log 'RENAME_EXAMPLE_FAILURE', 'final state:', temp
            return temp;
        }
        case RENAME_EXAMPLE_SUCCESS: {
            // log 'RENAME_EXAMPLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingExamples: false
            };
            // log 'RENAME_EXAMPLE_SUCCESS', 'final state:', temp
            return temp;
        }
        case REMOVE_EXAMPLE_REQUEST: {
            // log 'REMOVE_EXAMPLE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: true
            };
            // log 'REMOVE_EXAMPLE_REQUEST', 'final state:', temp
            return temp;
        }
        case REMOVE_EXAMPLE_FAILURE: {
            // log 'REMOVE_EXAMPLE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingExamples: false
            };
            // log 'REMOVE_EXAMPLE_FAILURE', 'final state:', temp
            return temp;
        }
        case REMOVE_EXAMPLE_SUCCESS: {
            // log 'REMOVE_EXAMPLE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingExamples: false
            };
            // log 'REMOVE_EXAMPLE_SUCCESS', 'final state:', temp
            return temp;
        }
        case ADD_FRAGMENT_REQUEST: {
            // log 'ADD_FRAGMENT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: true
            };
            // log 'ADD_FRAGMENT_REQUEST', 'final state:', temp
            return temp;
        }
        case ADD_FRAGMENT_FAILURE: {
            // log 'ADD_FRAGMENT_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: false
            };
            // log 'ADD_FRAGMENT_FAILURE', 'final state:', temp
            return temp;
        }
        case ADD_FRAGMENT_SUCCESS: {
            // log 'ADD_FRAGMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingFragments: false
            };
            // log 'ADD_FRAGMENT_SUCCESS', 'final state:', temp
            return temp;
        }
        case RENAME_FRAGMENT_REQUEST: {
            // log 'RENAME_FRAGMENT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: true
            };
            // log 'RENAME_FRAGMENT_REQUEST', 'final state:', temp
            return temp;
        }
        case RENAME_FRAGMENT_FAILURE: {
            // log 'RENAME_FRAGMENT_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: false
            };
            // log 'RENAME_FRAGMENT_FAILURE', 'final state:', temp
            return temp;
        }
        case RENAME_FRAGMENT_SUCCESS: {
            // log 'RENAME_FRAGMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingFragments: false
            };
            // log 'RENAME_FRAGMENT_SUCCESS', 'final state:', temp
            return temp;
        }
        case REMOVE_FRAGMENT_REQUEST: {
            // log 'REMOVE_FRAGMENT_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: true
            };
            // log 'REMOVE_FRAGMENT_REQUEST', 'final state:', temp
            return temp;
        }
        case REMOVE_FRAGMENT_FAILURE: {
            // log 'REMOVE_FRAGMENT_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingFragments: false
            };
            // log 'REMOVE_FRAGMENT_FAILURE', 'final state:', temp
            return temp;
        }
        case REMOVE_FRAGMENT_SUCCESS: {
            // log 'REMOVE_FRAGMENT_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingFragments: false
            };
            // log 'REMOVE_FRAGMENT_SUCCESS', 'final state:', temp
            return temp;
        }
        case ADD_SNIPPET_REQUEST: {
            // log 'ADD_SNIPPET_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: true
            };
            // log 'ADD_SNIPPET_REQUEST', 'final state:', temp
            return temp;
        }
        case ADD_SNIPPET_FAILURE: {
            // log 'ADD_SNIPPET_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: false
            };
            // log 'ADD_SNIPPET_FAILURE', 'final state:', temp
            return temp;
        }
        case ADD_SNIPPET_SUCCESS: {
            // log 'ADD_SNIPPET_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingSnippets: false
            };
            // log 'ADD_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case RENAME_SNIPPET_REQUEST: {
            // log 'RENAME_SNIPPET_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: true
            };
            // log 'RENAME_SNIPPET_REQUEST', 'final state:', temp
            return temp;
        }
        case RENAME_SNIPPET_FAILURE: {
            // log 'RENAME_SNIPPET_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: false
            };
            // log 'RENAME_SNIPPET_FAILURE', 'final state:', temp
            return temp;
        }
        case RENAME_SNIPPET_SUCCESS: {
            // log 'RENAME_SNIPPET_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingSnippets: false
            };
            // log 'RENAME_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case REMOVE_SNIPPET_REQUEST: {
            // log 'REMOVE_SNIPPET_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: true
            };
            // log 'REMOVE_SNIPPET_REQUEST', 'final state:', temp
            return temp;
        }
        case REMOVE_SNIPPET_FAILURE: {
            // log 'REMOVE_SNIPPET_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingSnippets: false
            };
            // log 'REMOVE_SNIPPET_FAILURE', 'final state:', temp
            return temp;
        }
        case REMOVE_SNIPPET_SUCCESS: {
            // log 'REMOVE_SNIPPET_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingSnippets: false
            };
            // log 'REMOVE_SNIPPET_SUCCESS', 'final state:', temp
            return temp;
        }
        case ADD_TEMPLATE_REQUEST: {
            // log 'ADD_TEMPLATE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: true
            };
            // log 'ADD_TEMPLATE_REQUEST', 'final state:', temp
            return temp;
        }
        case ADD_TEMPLATE_FAILURE: {
            // log 'ADD_TEMPLATE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: false
            };
            // log 'ADD_TEMPLATE_FAILURE', 'final state:', temp
            return temp;
        }
        case ADD_TEMPLATE_SUCCESS: {
            // log 'ADD_TEMPLATE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingTemplates: false
            };
            // log 'ADD_TEMPLATE_SUCCESS', 'final state:', temp
            return temp;
        }
        case RENAME_TEMPLATE_REQUEST: {
            // log 'RENAME_TEMPLATE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: true
            };
            // log 'RENAME_TEMPLATE_REQUEST', 'final state:', temp
            return temp;
        }
        case RENAME_TEMPLATE_FAILURE: {
            // log 'RENAME_TEMPLATE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: false
            };
            // log 'RENAME_TEMPLATE_FAILURE', 'final state:', temp
            return temp;
        }
        case RENAME_TEMPLATE_SUCCESS: {
            // log 'RENAME_TEMPLATE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingTemplates: false
            };
            // log 'RENAME_TEMPLATE_SUCCESS', 'final state:', temp
            return temp;
        }
        case REMOVE_TEMPLATE_REQUEST: {
            // log 'REMOVE_TEMPLATE_REQUEST', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: true
            };
            // log 'REMOVE_TEMPLATE_REQUEST', 'final state:', temp
            return temp;
        }
        case REMOVE_TEMPLATE_FAILURE: {
            // log 'REMOVE_TEMPLATE_FAILURE', 'initial state:', state
            var temp = {
                ...state, 
                isUpdatingTemplates: false
            };
            // log 'REMOVE_TEMPLATE_FAILURE', 'final state:', temp
            return temp;
        }
        case REMOVE_TEMPLATE_SUCCESS: {
            // log 'REMOVE_TEMPLATE_SUCCESS', 'initial state:', state
            var temp = {
                ...state, 
                schemas: action.schemas, 
                isUpdatingTemplates: false
            };
            // log 'REMOVE_TEMPLATE_SUCCESS', 'final state:', temp
            return temp;
        }
        default: {
            return state;
        }
    }
}

export default schemaReducer;
