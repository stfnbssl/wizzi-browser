/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\actions\index.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import { FIRESTORE_REQUEST } from '../../config/firestore.config';

const timers = {};



// app
const LOAD_APP = 'LOAD_APP';
const LOAD_APP_REQUEST = 'LOAD_APP_REQUEST';
const LOAD_APP_SUCCESS = 'LOAD_APP_SUCCESS';
const LOAD_APP_FAILURE = 'LOAD_APP_FAILURE';

// Redux entry point
// Must be called once, at application start.
function initialLoad(user, options) {
    return function(dispatch, getState, extraArgument) {
            console.log('actions.initialLoad.extraArgument', extraArgument);
            extraArgument.WizziStore.createInstance(user, options, function(err, wizziStore) {
                if (err) {
                    console.log('err', err);
                    throw new Error(JSON.stringify(err, null, 2));
                }
                dispatch(requestAppLoad());
                wizziStore.getInitialData(function(err, initialData) {
                    console.log('*** store.actions.app.initialLoad.getSchemas', initialData);
                    if (err) {
                        return dispatch(failAppLoad(err));
                    }
                    dispatch(completeAppLoad(initialData));
                    dispatch(selectSchema(getState().schema.selectedSchema));
                });
            });
        };
}
const requestAppLoad = () => {
    console.log('store.actions.app.requestAppLoad');
    return {
            type: LOAD_APP_REQUEST
        };
};
const failAppLoad = (error) => {
    console.log('store.actions.app.failAppLoad');
    return {
            type: LOAD_APP_FAILURE, 
            error: error
        };
};
const completeAppLoad = (initialData) => {
    console.log('store.actions.app.completeAppLoad');
    return {
            type: LOAD_APP_SUCCESS, 
            initialData: initialData
        };
};

const SCHEMA_SELECTION = 'SCHEMA_SELECTION';
const SCHEMA_RETRIEVAL = 'SCHEMA_RETRIEVAL';
const SELECT_ITTF_KIND = 'SELECT_ITTF_KIND';
const EXAMPLE_CONTENT_CHANGED = 'EXAMPLE_CONTENT_CHANGED';
const FRAGMENT_CONTENT_CHANGED = 'FRAGMENT_CONTENT_CHANGED';
const TEMPLATE_CONTENT_CHANGED = 'TEMPLATE_CONTENT_CHANGED';
const SNIPPET_CONTENT_CHANGED = 'SNIPPET_CONTENT_CHANGED';

// example
const SELECT_EXAMPLE = 'SELECT_EXAMPLE';
const SELECT_EXAMPLE_REQUEST = 'SELECT_EXAMPLE_REQUEST';
const SELECT_EXAMPLE_SUCCESS = 'SELECT_EXAMPLE_SUCCESS';
const SELECT_EXAMPLE_FAILURE = 'SELECT_EXAMPLE_FAILURE';

// example
const ADD_EXAMPLE = 'ADD_EXAMPLE';
const ADD_EXAMPLE_REQUEST = 'ADD_EXAMPLE_REQUEST';
const ADD_EXAMPLE_SUCCESS = 'ADD_EXAMPLE_SUCCESS';
const ADD_EXAMPLE_FAILURE = 'ADD_EXAMPLE_FAILURE';

// example
const RENAME_EXAMPLE = 'RENAME_EXAMPLE';
const RENAME_EXAMPLE_REQUEST = 'RENAME_EXAMPLE_REQUEST';
const RENAME_EXAMPLE_SUCCESS = 'RENAME_EXAMPLE_SUCCESS';
const RENAME_EXAMPLE_FAILURE = 'RENAME_EXAMPLE_FAILURE';

// example
const REMOVE_EXAMPLE = 'REMOVE_EXAMPLE';
const REMOVE_EXAMPLE_REQUEST = 'REMOVE_EXAMPLE_REQUEST';
const REMOVE_EXAMPLE_SUCCESS = 'REMOVE_EXAMPLE_SUCCESS';
const REMOVE_EXAMPLE_FAILURE = 'REMOVE_EXAMPLE_FAILURE';

// fragment
const SELECT_FRAGMENT = 'SELECT_FRAGMENT';
const SELECT_FRAGMENT_REQUEST = 'SELECT_FRAGMENT_REQUEST';
const SELECT_FRAGMENT_SUCCESS = 'SELECT_FRAGMENT_SUCCESS';
const SELECT_FRAGMENT_FAILURE = 'SELECT_FRAGMENT_FAILURE';

// fragment
const ADD_FRAGMENT = 'ADD_FRAGMENT';
const ADD_FRAGMENT_REQUEST = 'ADD_FRAGMENT_REQUEST';
const ADD_FRAGMENT_SUCCESS = 'ADD_FRAGMENT_SUCCESS';
const ADD_FRAGMENT_FAILURE = 'ADD_FRAGMENT_FAILURE';

// fragment
const RENAME_FRAGMENT = 'RENAME_FRAGMENT';
const RENAME_FRAGMENT_REQUEST = 'RENAME_FRAGMENT_REQUEST';
const RENAME_FRAGMENT_SUCCESS = 'RENAME_FRAGMENT_SUCCESS';
const RENAME_FRAGMENT_FAILURE = 'RENAME_FRAGMENT_FAILURE';

// fragment
const REMOVE_FRAGMENT = 'REMOVE_FRAGMENT';
const REMOVE_FRAGMENT_REQUEST = 'REMOVE_FRAGMENT_REQUEST';
const REMOVE_FRAGMENT_SUCCESS = 'REMOVE_FRAGMENT_SUCCESS';
const REMOVE_FRAGMENT_FAILURE = 'REMOVE_FRAGMENT_FAILURE';

// snippet
const SELECT_SNIPPET = 'SELECT_SNIPPET';
const SELECT_SNIPPET_REQUEST = 'SELECT_SNIPPET_REQUEST';
const SELECT_SNIPPET_SUCCESS = 'SELECT_SNIPPET_SUCCESS';
const SELECT_SNIPPET_FAILURE = 'SELECT_SNIPPET_FAILURE';

// snippet
const ADD_SNIPPET = 'ADD_SNIPPET';
const ADD_SNIPPET_REQUEST = 'ADD_SNIPPET_REQUEST';
const ADD_SNIPPET_SUCCESS = 'ADD_SNIPPET_SUCCESS';
const ADD_SNIPPET_FAILURE = 'ADD_SNIPPET_FAILURE';

// snippet
const RENAME_SNIPPET = 'RENAME_SNIPPET';
const RENAME_SNIPPET_REQUEST = 'RENAME_SNIPPET_REQUEST';
const RENAME_SNIPPET_SUCCESS = 'RENAME_SNIPPET_SUCCESS';
const RENAME_SNIPPET_FAILURE = 'RENAME_SNIPPET_FAILURE';

// snippet
const REMOVE_SNIPPET = 'REMOVE_SNIPPET';
const REMOVE_SNIPPET_REQUEST = 'REMOVE_SNIPPET_REQUEST';
const REMOVE_SNIPPET_SUCCESS = 'REMOVE_SNIPPET_SUCCESS';
const REMOVE_SNIPPET_FAILURE = 'REMOVE_SNIPPET_FAILURE';

// template
const SELECT_TEMPLATE = 'SELECT_TEMPLATE';
const SELECT_TEMPLATE_REQUEST = 'SELECT_TEMPLATE_REQUEST';
const SELECT_TEMPLATE_SUCCESS = 'SELECT_TEMPLATE_SUCCESS';
const SELECT_TEMPLATE_FAILURE = 'SELECT_TEMPLATE_FAILURE';

// template
const ADD_TEMPLATE = 'ADD_TEMPLATE';
const ADD_TEMPLATE_REQUEST = 'ADD_TEMPLATE_REQUEST';
const ADD_TEMPLATE_SUCCESS = 'ADD_TEMPLATE_SUCCESS';
const ADD_TEMPLATE_FAILURE = 'ADD_TEMPLATE_FAILURE';

// template
const RENAME_TEMPLATE = 'RENAME_TEMPLATE';
const RENAME_TEMPLATE_REQUEST = 'RENAME_TEMPLATE_REQUEST';
const RENAME_TEMPLATE_SUCCESS = 'RENAME_TEMPLATE_SUCCESS';
const RENAME_TEMPLATE_FAILURE = 'RENAME_TEMPLATE_FAILURE';

// template
const REMOVE_TEMPLATE = 'REMOVE_TEMPLATE';
const REMOVE_TEMPLATE_REQUEST = 'REMOVE_TEMPLATE_REQUEST';
const REMOVE_TEMPLATE_SUCCESS = 'REMOVE_TEMPLATE_SUCCESS';
const REMOVE_TEMPLATE_FAILURE = 'REMOVE_TEMPLATE_FAILURE';

const selectIttfKind = (selectedIttfKind) => (dispatch, getState, extraArgument) => {
        dispatch(completeSelectIttfKind(selectedIttfKind));
        if (selectedIttfKind === 'examples') {
            dispatch(selectExample(null));
        }
        else if (selectedIttfKind === 'snippets') {
            dispatch(selectSnippet(null));
        }
        else if (selectedIttfKind === 'fragments') {
            dispatch(selectFragment(null));
        }
        else {
            dispatch(selectTemplate(null));
        }
    }
;
const completeSelectIttfKind = (selectedIttfKind) => {
    return {
            type: SELECT_ITTF_KIND, 
            selectedIttfKind: selectedIttfKind
        };
};
const selectSchema = (schemaName, exampleName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.schema.selectSchema', schemaName, exampleName);
            const schemaState = getState().schema;
            console.log('store.actions.schema.selectSchema.schemaState', schemaState);
            const schemaObject = schemaState.schemas[schemaName];
            console.log('store.actions.schema.selectSchema.schemaObject', schemaObject);
            if (!(schemaObject && schemaObject.retrieved)) {
                return dispatch(retrieveSchema(schemaName, exampleName));
            }
            dispatch(completeSelectSchema(schemaName));
            if (schemaState.selectedIttfKind === 'examples') {
                if (!exampleName || exampleName.length < 1) {
                    const exampleObject = schemaObject.examples && schemaObject.examples.length > 0 ? schemaObject.examples[0] : null;
                    exampleName = exampleObject ? (exampleObject.name || 'default') : 'default';
                }
                console.log('*** store.actions.schema.selectSchema before selectExample dispatch', schemaName, exampleName);
                dispatch(selectExample(exampleName));
            }
            else if (schemaState.selectedIttfKind === 'snippets') {
                var snippetName = exampleName;
                if (!snippetName || snippetName.length < 1) {
                    const snippetObject = schemaObject.snippets && schemaObject.snippets.length > 0 ? schemaObject.snippets[0] : null;
                    snippetName = snippetObject ? (snippetObject.name || 'default') : 'default';
                }
                console.log('*** store.actions.schema.selectSchema before selectSnippet dispatch', schemaName, snippetName);
                dispatch(selectSnippet(snippetName));
            }
            else if (schemaState.selectedIttfKind === 'fragments') {
                var fragmentName = exampleName;
                if (!fragmentName || fragmentName.length < 1) {
                    const fragmentObject = schemaObject.fragments && schemaObject.fragments.length > 0 ? schemaObject.fragments[0] : null;
                    fragmentName = fragmentObject ? (fragmentObject.name || 'default') : 'default';
                }
                console.log('*** store.actions.schema.selectSchema before selectFragment dispatch', schemaName, fragmentName);
                dispatch(selectFragment(fragmentName));
            }
            else {
                var templateName = exampleName;
                if (!templateName || templateName.length < 1) {
                    const templateObject = schemaObject.templates && schemaObject.templates.length > 0 ? schemaObject.templates[0] : null;
                    templateName = templateObject ? (templateObject.name || 'default') : 'default';
                }
                console.log('*** store.actions.schema.selectSchema before selectTemplate dispatch', schemaName, templateName);
                dispatch(selectTemplate(templateName));
            }
        };
};
const completeSelectSchema = (schemaName) => {
    return {
            type: SCHEMA_SELECTION, 
            schema: schemaName
        };
};
// thunk.withExtraArgument
const retrieveSchema = (schemaName, exampleName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.retrieveSchema', schemaName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            wizziStore.retrieveSchema(schemaName, (err) => {
                if (err) {
                    return dispatch(fatalSchemaError(schemaName));
                }
                dispatch(selectSchema(schemaName, exampleName));
            });
        };
};
const selectDocument = (documentName) => {
    return (dispatch, getState, extraArgument) => {
            const schemaState = getState().schema;
            console.log('*** store.actions.schema.selectDocument', documentName, schemaState);
            if (schemaState.selectedIttfKind === 'examples') {
                dispatch(selectExample(documentName));
            }
            else if (schemaState.selectedIttfKind === 'snippets') {
                dispatch(selectSnippet(documentName));
            }
            else if (schemaState.selectedIttfKind === 'fragments') {
                dispatch(selectFragment(documentName));
            }
            else {
                dispatch(selectTemplate(documentName));
            }
        };
};
const changeDocumentContent = (content) => {
    // Called by Editor
    return (dispatch, getState, extraArgument) => {
            const schemaState = getState().schema;
            console.log('*** store.actions.schema.changeDocumentContent', schemaState);
            if (schemaState.selectedIttfKind === "examples") {
                dispatch(changeExampleDocument(schemaState.selectedSchema, schemaState.selectedExample, content));
            }
            else if (schemaState.selectedIttfKind === "snippets") {
                dispatch(changeSnippetDocument(schemaState.selectedSchema, schemaState.selectedSnippet, content));
            }
            else if (schemaState.selectedIttfKind === "fragments") {
                dispatch(changeFragmentDocument(schemaState.selectedSchema, schemaState.selectedFragment, content));
            }
            else {
                dispatch(changeTemplateDocument(schemaState.selectedSchema, schemaState.selectedTemplate, content));
            }
        };
};
// thunk.withExtraArgument
const selectExample = (exampleName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.selectExample', exampleName);
            const schemaState = getState().schema;
            const schemaObject = schemaState.schemas[schemaState.selectedSchema];
            if (exampleName == null) {
                console.log('-1> selectedIttfKind has been changed, look for previous example');
                if (schemaState.selectedExample && schemaState.selectedExample.length > 0) {
                    exampleName = schemaState.selectedExample;
                    console.log('found previous ', exampleName);
                }
                else {
                    if (schemaState.filteredExamples.length > 0) {
                        exampleName = schemaState.filteredExamples[0].name;
                        console.log('-1> selected first of schema ', exampleName);
                    }
                    else {
                        console.log('-1> fall back to default ', exampleName);
                        fragmentName = 'default';
                    }
                }
            }
            dispatch(requestSelectExample());
            const wizziStore = extraArgument.WizziStore.getInstance();
            wizziStore.getExample(schemaState.selectedSchema, exampleName, function(err, exampleItem) {
                // log '*** store.actions.schema.selectExample. getExample err, exampleItem', err, exampleItem
                // return
                if (err) {
                    console.log('*** store.actions.schema.selectExample. getExample err', err);
                    // TODO manage exception
                    throw err;
                }
                if (exampleItem == null) {
                    var exampleObject;
                    // TODO simply add a new fragment, no data in exampleObject.ittf
                    if (schemaObject.examples) {
                        schemaObject.examples.map((item) => {
                            if (item.name == exampleName) {
                                exampleObject = item;
                            }
                        });
                    }
                    if (exampleObject && exampleObject.ittf) {
                        throw new Error("Unexpected in store.actions.schema.selectExample");
                        const ittf = exampleObject.ittf.join('\n');
                        dispatch(completeSelectExample(exampleName, ittf));
                        dispatch(updateIttfMTree(ittf));
                        dispatch(changeExampleDocument(schemaState.selectedSchema, exampleName, ittf));
                    }
                    else {
                        dispatch(addExample(schemaState.selectedSchema, exampleName));
                    }
                }
                else {
                    console.log('*** store.actions.schema.selectExample. retrieved exampleItem.data.content', exampleItem.data.content);
                    dispatch(completeSelectExample(exampleName, exampleItem.data.content));
                    dispatch(updateIttfMTree(exampleItem.data.content));
                    dispatch(generateArtifact(schemaState.selectedSchema, 'examples', exampleName));
                }
            });
        };
};
// thunk.withExtraArgument
const addExampleWithTemplate = (schemaName, exampleName, templateName) => {
    return (dispatch, getState, extraArgument) => {
            const wizziStore = extraArgument.WizziStore.getInstance();
            if (templateName && templateName.length > 0) {
                wizziStore.getTemplate(schemaName, templateName, function(err, templateObject) {
                    if (err) {
                        dispatch(addExample(schemaName, exampleName, wizziStore.getDefaultTemplate(schemaName)));
                    }
                    else {
                        if (templateObject) {
                            dispatch(addExample(schemaName, exampleName, templateObject.data.content));
                        }
                        else {
                            dispatch(addExample(schemaName, exampleName, wizziStore.getDefaultTemplate(schemaName)));
                        }
                    }
                });
            }
            else {
                dispatch(addExample(schemaName, exampleName, wizziStore.getDefaultTemplate(schemaName)));
            }
        };
};
// thunk.withExtraArgument
const selectSnippet = (snippetName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.selectSnippet', snippetName);
            const schemaState = getState().schema;
            const schemaObject = schemaState.schemas[schemaState.selectedSchema];
            if (snippetName == null) {
                console.log('selectSnippet. selectedIttfKind has been changed, look for previous example');
                if (schemaState.selectedSnippet && schemaState.selectedSnippet.length > 0) {
                    snippetName = schemaState.selectedSnippet;
                }
                else {
                    if (schemaState.filteredSnippets.length > 0) {
                        snippetName = schemaState.filteredSnippets[0].name;
                    }
                    else {
                        snippetName = 'default';
                    }
                }
            }
            dispatch(requestSelectSnippet());
            const wizziStore = extraArgument.WizziStore.getInstance();
            console.log('selectSnippet.getSnippet', schemaState.selectedSchema, snippetName);
            wizziStore.getSnippet(schemaState.selectedSchema, snippetName, function(err, snippetItem) {
                console.log('*** store.actions.schema.selectSnippet. retrieve err, snippetItem', err, snippetItem);
                if (err) {
                    console.log('*** store.actions.schema.selectSnippet. retrieve err', err);
                    // TODO manage exception
                    throw err;
                }
                if (typeof snippetItem === 'undefined' || snippetItem == null) {
                    // TODO simply add a new snippet, no data in snippetObject.ittf
                    var snippetObject;
                    if (schemaObject.snippets) {
                        schemaObject.snippets.map((item) => {
                            if (item.name == snippetName) {
                                snippetObject = item;
                            }
                        });
                    }
                    if (snippetObject && snippetObject.ittf) {
                        throw new Error("Unexpected in store.actions.schema.selectSnippet");
                        const ittf = snippetObject.ittf.join('\n');
                        dispatch(completeSelectSnippet(snippetName, ittf));
                        dispatch(updateIttfMTree(ittf));
                        dispatch(changeIttfSnippet(schemaState.selectedSchema, snippetName, ittf));
                    }
                    else {
                        dispatch(addSnippet(schemaState.selectedSchema, snippetName));
                    }
                }
                else {
                    console.log('*** store.actions.schema.selectSnippet. snippetName, content', snippetName, snippetItem);
                    dispatch(completeSelectSnippet(snippetName, snippetItem.data.content));
                    dispatch(updateCodeAST(schemaState.selectedSchema, snippetItem.data.content));
                    dispatch(wizzifySnippet(schemaState.selectedSchema, snippetName, snippetItem.data.content));
                }
            });
        };
};
const requestSelectExample = (exampleName) => {
    return {
            type: SELECT_EXAMPLE_REQUEST, 
            example: exampleName
        };
};
const completeSelectExample = (exampleName, ittfContent) => {
    return {
            type: SELECT_EXAMPLE_SUCCESS, 
            example: exampleName, 
            ittfContent: ittfContent
        };
};
// thunk.withExtraArgument
const changeExampleDocument = (schemaName, exampleName, ittfContent) => {
    return (dispatch, getState, extraArgument) => {
            dispatch(updateStoredDocument(schemaName, exampleName, ittfContent, {
                isExample: true
            }));
            dispatch(updateIttfMTree(ittfContent));
            const schemaState = getState().schema;
            if (schemaState.selectedExample && schemaState.selectedExample.length > 0) {
                dispatch(scheduleGenerateArtifact(schemaName, 'examples', schemaState.selectedExample));
            }
        };
};
const changeExampleContent = (ittfContent) => {
    return {
            type: EXAMPLE_CONTENT_CHANGED, 
            ittfContent: ittfContent
        };
};
// thunk.withExtraArgument
const selectFragment = (fragmentName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.selectFragment', fragmentName);
            const schemaState = getState().schema;
            const schemaObject = schemaState.schemas[schemaState.selectedSchema];
            if (fragmentName == null) {
                console.log('selectFragment. selectedIttfKind has been changed, look for previous');
                if (schemaState.selectedFragment && schemaState.selectedFragment.length > 0) {
                    fragmentName = schemaState.selectedFragment;
                }
                else {
                    if (schemaState.filteredFragments.length > 0) {
                        fragmentName = schemaState.filteredFragments[0].name;
                    }
                    else {
                        fragmentName = 'default';
                    }
                }
            }
            dispatch(requestSelectFragment());
            const wizziStore = extraArgument.WizziStore.getInstance();
            wizziStore.getFragment(schemaState.selectedSchema, fragmentName, function(err, fragment) {
                console.log('*** store.actions.schema.selectFragment. retrieve err, fragment', err, fragment);
                if (err) {
                    console.log('*** store.actions.schema.selectFragment. retrieve err', err);
                    // TODO manage exception
                    throw err;
                }
                if (!fragment) {
                    // TODO simply add a new fragment, no data in documentObject.ittf
                    var documentObject;
                    if (schemaObject.fragments) {
                        schemaObject.fragments.map((item) => {
                            if (item.name == fragmentName) {
                                documentObject = item;
                            }
                        });
                    }
                    if (documentObject && documentObject.data) {
                        const ittf = documentObject.data.content;
                        dispatch(completeSelectFragment(fragmentName, ittf));
                        dispatch(updateIttfMTree(ittf));
                        dispatch(changeFragmentDocument(schemaState.selectedSchema, fragmentName, ittf));
                    }
                    else {
                        dispatch(addFragment(schemaState.selectedSchema, fragmentName));
                    }
                }
                else {
                    console.log('*** store.actions.schema.selectFragment. fragmentName, content', fragmentName, fragment);
                    dispatch(completeSelectFragment(fragmentName, fragment.data.content));
                    dispatch(updateIttfMTree(fragment.data.content));
                }
            });
        };
};
const requestSelectFragment = (fragmentName) => {
    return {
            type: SELECT_FRAGMENT_REQUEST, 
            fragment: fragmentName
        };
};
const completeSelectFragment = (fragmentName, ittfContent) => {
    return {
            type: SELECT_FRAGMENT_SUCCESS, 
            fragment: fragmentName, 
            ittfContent: ittfContent
        };
};
// thunk.withExtraArgument
const changeFragmentDocument = (schemaName, fragmentName, ittfContent) => {
    return (dispatch, getState, extraArgument) =>
            dispatch(updateStoredDocument(schemaName, fragmentName, ittfContent, {
                isFragment: true
            }));
};
const changeFragmentContent = (ittfContent) => {
    return {
            type: FRAGMENT_CONTENT_CHANGED, 
            ittfContent: ittfContent
        };
};
const requestSelectSnippet = (snippetName) => {
    return {
            type: SELECT_SNIPPET_REQUEST, 
            snippet: snippetName
        };
};
const completeSelectSnippet = (snippetName, codeContent) => {
    return {
            type: SELECT_SNIPPET_SUCCESS, 
            snippet: snippetName, 
            codeContent: codeContent
        };
};
// thunk.withExtraArgument
const changeSnippetDocument = (schemaName, snippetName, codeContent) => {
    return (dispatch, getState, extraArgument) => {
            dispatch(updateStoredDocument(schemaName, snippetName, codeContent, {
                isSnippet: true
            }));
            dispatch(updateCodeAST(schemaName, codeContent));
            const schemaState = getState().schema;
            if (schemaState.selectedSnippet && schemaState.selectedSnippet.length > 0) {
                dispatch(scheduleWizzifySnippet(schemaName, schemaState.selectedSnippet, codeContent));
            }
        };
};
const changeSnippetContent = (codeContent) => {
    return {
            type: SNIPPET_CONTENT_CHANGED, 
            codeContent: codeContent
        };
};
// thunk.withExtraArgument
const selectTemplate = (templateName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.selectTemplate', templateName);
            const schemaState = getState().schema;
            const schemaObject = schemaState.schemas[schemaState.selectedSchema];
            if (templateName == null) {
                console.log('selectTemplate. selectedIttfKind has been changed, look for previous');
                if (schemaState.selectedTemplate && schemaState.selectedTemplate.length > 0) {
                    templateName = schemaState.selectedTemplate;
                }
                else {
                    if (schemaState.filteredTemplates.length > 0) {
                        templateName = schemaState.filteredTemplates[0].name;
                    }
                    else {
                        templateName = 'default';
                    }
                }
            }
            dispatch(requestSelectTemplate());
            const wizziStore = extraArgument.WizziStore.getInstance();
            wizziStore.getTemplate(schemaState.selectedSchema, templateName, function(err, template) {
                console.log('*** store.actions.schema.selectTemplate. retrieve err, template', err, template);
                if (err) {
                    console.log('*** store.actions.schema.selectTemplate. retrieve err', err);
                    // TODO manage exception
                    throw err;
                }
                if (!template) {
                    // TODO simply add a new template, no data in documentObject.ittf
                    var documentObject;
                    if (schemaObject.templates) {
                        schemaObject.templates.map((item) => {
                            if (item.name == templateName) {
                                documentObject = item;
                            }
                        });
                    }
                    if (documentObject && documentObject.data) {
                        const ittf = documentObject.data.content;
                        dispatch(completeSelectTemplate(templateName, ittf));
                        dispatch(updateIttfMTree(ittf));
                        dispatch(changeTemplateDocument(schemaState.selectedSchema, templateName, ittf));
                    }
                    else {
                        dispatch(addTemplate(schemaState.selectedSchema, templateName));
                    }
                }
                else {
                    console.log('*** store.actions.schema.selectTemplate. templateName, content', templateName, template);
                    dispatch(completeSelectTemplate(templateName, template.data.content));
                    dispatch(updateIttfMTree(template.data.content));
                    dispatch(generateArtifact(schemaState.selectedSchema, 'templates', templateName));
                }
            });
        };
};
const requestSelectTemplate = (templateName) => {
    return {
            type: SELECT_TEMPLATE_REQUEST, 
            template: templateName
        };
};
const completeSelectTemplate = (templateName, ittfContent) => {
    return {
            type: SELECT_TEMPLATE_SUCCESS, 
            template: templateName, 
            ittfContent: ittfContent
        };
};
// thunk.withExtraArgument
const changeTemplateDocument = (schemaName, templateName, ittfContent) => {
    return (dispatch, getState, extraArgument) => {
            dispatch(updateStoredDocument(schemaName, templateName, ittfContent, {
                isTemplate: true
            }));
            dispatch(updateIttfMTree(ittfContent));
            const schemaState = getState().schema;
            if (schemaState.selectedTemplate && schemaState.selectedTemplate.length > 0) {
                dispatch(scheduleGenerateArtifact(schemaName, 'templates', schemaState.selectedTemplate));
            }
        };
};
const changeTemplateContent = (ittfContent) => {
    return {
            type: TEMPLATE_CONTENT_CHANGED, 
            ittfContent: ittfContent
        };
};
const addExample = (schemaName, exampleName, templateContent) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.schema.addExample.request', schemaName, exampleName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestExampleAdd());
            const documentName = getDocumentName(schemaName, exampleName, 'Example');
            const content = templateContent;
            wizziStore.setExample(schemaName, documentName, content, function(err, result) {
                if (err) {
                    console.log('store.actions.schema.addExample.fail', schemaName, exampleName, err);
                    return failExampleAdd(err);
                }
                console.log('store.actions.schema.addExample.success', schemaName, exampleName, result);
                dispatch(completeExampleAdd(schemaName, documentName, result.schemas));
                dispatch(selectSchema(schemaName, documentName));
            });
        };
};
const requestExampleAdd = () => {
    console.log('store.actions.schema.requestExampleAdd');
    return {
            type: ADD_EXAMPLE_REQUEST
        };
};
const failExampleAdd = (error) => {
    console.log('store.actions.schema.failExampleAdd');
    return {
            type: ADD_EXAMPLE_FAILURE, 
            error: error
        };
};
const completeExampleAdd = (schemaName, exampleName, schemas) => {
    console.log('store.actions.schema.completeExampleAdd', 'schemas', schemas);
    return {
            type: ADD_EXAMPLE_SUCCESS, 
            schema: schemaName, 
            example: exampleName, 
            schemas: schemas
        };
};
const renameExample = (schemaName, oldExample, newExample) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.renameExample.request', schemaName, oldExample, newExample);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestExampleRename());
            const oldDocumentName = getDocumentName(schemaName, oldExample);
            const newDocumentName = getDocumentName(schemaName, newExample);
            // Updates the Examples array in the meta-schema document
            wizziStore.renameExample(schemaName, oldDocumentName, newDocumentName, function(err, renameExampleResult) {
                if (err) {
                    console.log('*** store.actions.schema.renameExample.fail', schemaName, oldExample, newExample, err);
                    return failExampleRename(err);
                }
                console.log('*** store.actions.schema.addExample.success', schemaName, oldExample, newExample, renameExampleResult);
                dispatch(completeExampleRename(schemaName, oldDocumentName, newDocumentName, renameExampleResult.schemas));
                dispatch(selectSchema(schemaName, newDocumentName));
            });
        };
};
const requestExampleRename = () => {
    console.log('store.actions.schema.requestExampleRename');
    return {
            type: RENAME_EXAMPLE_REQUEST
        };
};
const failExampleRename = (error) => {
    console.log('store.actions.schema.failExampleRename');
    return {
            type: RENAME_EXAMPLE_FAILURE, 
            error: error
        };
};
const completeExampleRename = (schemaName, oldExample, newExample, schemas) => {
    console.log('store.actions.schema.completeExampleRename', 'schemas', schemas);
    return {
            type: RENAME_EXAMPLE_SUCCESS, 
            schema: schemaName, 
            oldExample: oldExample, 
            newExample: newExample, 
            schemas: schemas
        };
};
const removeExample = (schemaName, exampleName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.removeExample.request', schemaName, exampleName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestExampleRemove());
            const documentName = getDocumentName(schemaName, exampleName);
            // Updates the Examples array in the meta-schema document
            wizziStore.removeExample(schemaName, documentName, function(err, removeResult) {
                if (err) {
                    console.log('*** store.actions.schema.removeExample.fail', schemaName, exampleName, err);
                    return failExampleRemove(err);
                }
                dispatch(completeExampleRemove(schemaName, documentName, removeResult.schemas));
                const schemaState = getState().schema;
                if (schemaState.selectedSchema == schemaName && schemaState.selectedExample != exampleName) {
                    dispatch(selectSchema(schemaName, schemaState.selectedExample));
                    return ;
                }
                const schemaObject = schemaState.schemas[schemaName];
                const exampleObject = schemaObject.examples.length > 0 ? schemaObject.examples[0] : null;
                const gotoExample = exampleObject ? exampleObject.name : getDocumentName(schemaName, 'default');
                dispatch(selectSchema(schemaName, gotoExample));
            });
        };
};
const requestExampleRemove = () => {
    console.log('store.actions.schema.requestExampleRemove');
    return {
            type: REMOVE_EXAMPLE_REQUEST
        };
};
const failExampleRemove = (error) => {
    console.log('store.actions.schema.failExampleRemove');
    return {
            type: REMOVE_EXAMPLE_FAILURE, 
            error: error
        };
};
const completeExampleRemove = (schemaName, exampleName, schemas) => {
    console.log('store.actions.schema.completeExampleRemove', 'schemas', schemas);
    return {
            type: REMOVE_EXAMPLE_SUCCESS, 
            schema: schemaName, 
            example: exampleName, 
            schemas: schemas
        };
};
const addFragment = (schemaName, fragmentName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.schema.addFragment.request', schemaName, fragmentName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestFragmentAdd());
            const documentName = getDocumentName(schemaName, fragmentName, 'Fragment');
            const content = (schemaName === 'js' ? 'module' : schemaName) + ' ' + fragmentName;
            wizziStore.setFragment(schemaName, documentName, content, function(err, result) {
                if (err) {
                    console.log('store.actions.schema.addFragment.fail', schemaName, fragmentName, err);
                    return failFragmentAdd(err);
                }
                console.log('store.actions.schema.addFragment.success', schemaName, fragmentName, result);
                dispatch(completeFragmentAdd(schemaName, documentName, result.schemas));
                dispatch(selectSchema(schemaName, documentName));
            });
        };
};
const requestFragmentAdd = () => {
    console.log('store.actions.schema.requestFragmentAdd');
    return {
            type: ADD_FRAGMENT_REQUEST
        };
};
const failFragmentAdd = (error) => {
    console.log('store.actions.schema.failFragmentAdd');
    return {
            type: ADD_FRAGMENT_FAILURE, 
            error: error
        };
};
const completeFragmentAdd = (schemaName, fragmentName, schemas) => {
    console.log('store.actions.schema.completeFragmentAdd', 'schemas', schemas);
    return {
            type: ADD_FRAGMENT_SUCCESS, 
            schema: schemaName, 
            fragment: fragmentName, 
            schemas: schemas
        };
};
const renameFragment = (schemaName, oldFragment, newFragment) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.renameFragment.request', schemaName, oldFragment, newFragment);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestFragmentRename());
            const oldDocumentName = getDocumentName(schemaName, oldFragment);
            const newDocumentName = getDocumentName(schemaName, newFragment);
            // Updates the Fragments array in the meta-schema document
            wizziStore.renameFragment(schemaName, oldDocumentName, newDocumentName, function(err, renameFragmentResult) {
                if (err) {
                    console.log('*** store.actions.schema.renameFragment.fail', schemaName, oldFragment, newFragment, err);
                    return failFragmentRename(err);
                }
                console.log('*** store.actions.schema.addFragment.success', schemaName, oldFragment, newFragment, renameFragmentResult);
                dispatch(completeFragmentRename(schemaName, oldDocumentName, newDocumentName, renameFragmentResult.schemas));
                dispatch(selectSchema(schemaName, newDocumentName));
            });
        };
};
const requestFragmentRename = () => {
    console.log('store.actions.schema.requestFragmentRename');
    return {
            type: RENAME_FRAGMENT_REQUEST
        };
};
const failFragmentRename = (error) => {
    console.log('store.actions.schema.failFragmentRename');
    return {
            type: RENAME_FRAGMENT_FAILURE, 
            error: error
        };
};
const completeFragmentRename = (schemaName, oldFragment, newFragment, schemas) => {
    console.log('store.actions.schema.completeFragmentRename', 'schemas', schemas);
    return {
            type: RENAME_FRAGMENT_SUCCESS, 
            schema: schemaName, 
            oldFragment: oldFragment, 
            newFragment: newFragment, 
            schemas: schemas
        };
};
const removeFragment = (schemaName, fragmentName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.removeFragment.request', schemaName, fragmentName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestFragmentRemove());
            const documentName = getDocumentName(schemaName, fragmentName);
            // Updates the Fragments array in the meta-schema document
            wizziStore.removeFragment(schemaName, documentName, function(err, removeResult) {
                if (err) {
                    console.log('*** store.actions.schema.removeFragment.fail', schemaName, fragmentName, err);
                    return failFragmentRemove(err);
                }
                dispatch(completeFragmentRemove(schemaName, documentName, removeResult.schemas));
                const schemaState = getState().schema;
                if (schemaState.selectedSchema == schemaName && schemaState.selectedFragment != fragmentName) {
                    dispatch(selectSchema(schemaName, schemaState.selectedFragment));
                    return ;
                }
                const schemaObject = schemaState.schemas[schemaName];
                const fragmentObject = schemaObject.fragments.length > 0 ? schemaObject.fragments[0] : null;
                const gotoFragment = fragmentObject ? fragmentObject.name : getDocumentName(schemaName, 'default');
                dispatch(selectSchema(schemaName, gotoFragment));
            });
        };
};
const requestFragmentRemove = () => {
    console.log('store.actions.schema.requestFragmentRemove');
    return {
            type: REMOVE_FRAGMENT_REQUEST
        };
};
const failFragmentRemove = (error) => {
    console.log('store.actions.schema.failFragmentRemove');
    return {
            type: REMOVE_FRAGMENT_FAILURE, 
            error: error
        };
};
const completeFragmentRemove = (schemaName, fragmentName, schemas) => {
    console.log('store.actions.schema.completeFragmentRemove', 'schemas', schemas);
    return {
            type: REMOVE_FRAGMENT_SUCCESS, 
            schema: schemaName, 
            fragment: fragmentName, 
            schemas: schemas
        };
};
const addSnippet = (schemaName, snippetName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.schema.addSnippet.request', schemaName, snippetName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestSnippetAdd());
            const documentName = getDocumentName(schemaName, snippetName, 'Snippet');
            const content = '';
            wizziStore.setSnippet(schemaName, documentName, content, function(err, result) {
                if (err) {
                    console.log('store.actions.schema.addSnippet.fail', schemaName, snippetName, err);
                    return failSnippetAdd(err);
                }
                console.log('store.actions.schema.addSnippet.success', schemaName, snippetName, result);
                dispatch(completeSnippetAdd(schemaName, documentName, result.schemas));
                dispatch(selectSchema(schemaName, documentName));
            });
        };
};
const requestSnippetAdd = () => {
    console.log('store.actions.schema.requestSnippetAdd');
    return {
            type: ADD_SNIPPET_REQUEST
        };
};
const failSnippetAdd = (error) => {
    console.log('store.actions.schema.failSnippetAdd');
    return {
            type: ADD_SNIPPET_FAILURE, 
            error: error
        };
};
const completeSnippetAdd = (schemaName, snippetName, schemas) => {
    console.log('store.actions.schema.completeSnippetAdd', 'schemas', schemas);
    return {
            type: ADD_SNIPPET_SUCCESS, 
            schema: schemaName, 
            snippet: snippetName, 
            schemas: schemas
        };
};
const renameSnippet = (schemaName, oldSnippet, newSnippet) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.renameSnippet.request', schemaName, oldSnippet, newSnippet);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestSnippetRename());
            const oldDocumentName = getDocumentName(schemaName, oldSnippet);
            const newDocumentName = getDocumentName(schemaName, newSnippet);
            // Updates the Snippets array in the meta-schema document
            wizziStore.renameSnippet(schemaName, oldDocumentName, newDocumentName, function(err, renameSnippetResult) {
                if (err) {
                    console.log('*** store.actions.schema.renameSnippet.fail', schemaName, oldSnippet, newSnippet, err);
                    return failSnippetRename(err);
                }
                console.log('*** store.actions.schema.addSnippet.success', schemaName, oldSnippet, newSnippet, renameSnippetResult);
                dispatch(completeSnippetRename(schemaName, oldDocumentName, newDocumentName, renameSnippetResult.schemas));
                dispatch(selectSchema(schemaName, newDocumentName));
            });
        };
};
const requestSnippetRename = () => {
    console.log('store.actions.schema.requestSnippetRename');
    return {
            type: RENAME_SNIPPET_REQUEST
        };
};
const failSnippetRename = (error) => {
    console.log('store.actions.schema.failSnippetRename');
    return {
            type: RENAME_SNIPPET_FAILURE, 
            error: error
        };
};
const completeSnippetRename = (schemaName, oldSnippet, newSnippet, schemas) => {
    console.log('store.actions.schema.completeSnippetRename', 'schemas', schemas);
    return {
            type: RENAME_SNIPPET_SUCCESS, 
            schema: schemaName, 
            oldSnippet: oldSnippet, 
            newSnippet: newSnippet, 
            schemas: schemas
        };
};
const removeSnippet = (schemaName, snippetName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.removeSnippet.request', schemaName, snippetName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestSnippetRemove());
            const documentName = getDocumentName(schemaName, snippetName);
            // Updates the Snippets array in the meta-schema document
            wizziStore.removeSnippet(schemaName, documentName, function(err, removeResult) {
                if (err) {
                    console.log('*** store.actions.schema.removeSnippet.fail', schemaName, snippetName, err);
                    return failSnippetRemove(err);
                }
                dispatch(completeSnippetRemove(schemaName, documentName, removeResult.schemas));
                const schemaState = getState().schema;
                if (schemaState.selectedSchema == schemaName && schemaState.selectedSnippet != snippetName) {
                    dispatch(selectSchema(schemaName, schemaState.selectedSnippet));
                    return ;
                }
                const schemaObject = schemaState.schemas[schemaName];
                const snippetObject = schemaObject.snippets.length > 0 ? schemaObject.snippets[0] : null;
                const gotoSnippet = snippetObject ? snippetObject.name : getDocumentName(schemaName, 'default');
                dispatch(selectSchema(schemaName, gotoSnippet));
            });
        };
};
const requestSnippetRemove = () => {
    console.log('store.actions.schema.requestSnippetRemove');
    return {
            type: REMOVE_SNIPPET_REQUEST
        };
};
const failSnippetRemove = (error) => {
    console.log('store.actions.schema.failSnippetRemove');
    return {
            type: REMOVE_SNIPPET_FAILURE, 
            error: error
        };
};
const completeSnippetRemove = (schemaName, snippetName, schemas) => {
    console.log('store.actions.schema.completeSnippetRemove', 'schemas', schemas);
    return {
            type: REMOVE_SNIPPET_SUCCESS, 
            schema: schemaName, 
            snippet: snippetName, 
            schemas: schemas
        };
};
const addTemplate = (schemaName, templateName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.schema.addTemplate.request', schemaName, templateName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestTemplateAdd());
            const documentName = getDocumentName(schemaName, templateName, 'Template');
            const content = (schemaName === 'js' ? 'module' : schemaName) + ' ' + templateName;
            wizziStore.setTemplate(schemaName, documentName, content, function(err, result) {
                if (err) {
                    console.log('store.actions.schema.addTemplate.fail', schemaName, templateName, err);
                    return failTemplateAdd(err);
                }
                console.log('store.actions.schema.addTemplate.success', schemaName, templateName, result);
                dispatch(completeTemplateAdd(schemaName, documentName, result.schemas));
                dispatch(selectSchema(schemaName, documentName));
            });
        };
};
const requestTemplateAdd = () => {
    console.log('store.actions.schema.requestTemplateAdd');
    return {
            type: ADD_TEMPLATE_REQUEST
        };
};
const failTemplateAdd = (error) => {
    console.log('store.actions.schema.failTemplateAdd');
    return {
            type: ADD_TEMPLATE_FAILURE, 
            error: error
        };
};
const completeTemplateAdd = (schemaName, templateName, schemas) => {
    console.log('store.actions.schema.completeTemplateAdd', 'schemas', schemas);
    return {
            type: ADD_TEMPLATE_SUCCESS, 
            schema: schemaName, 
            template: templateName, 
            schemas: schemas
        };
};
const renameTemplate = (schemaName, oldTemplate, newTemplate) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.renameTemplate.request', schemaName, oldTemplate, newTemplate);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestTemplateRename());
            const oldDocumentName = getDocumentName(schemaName, oldTemplate);
            const newDocumentName = getDocumentName(schemaName, newTemplate);
            // Updates the Templates array in the meta-schema document
            wizziStore.renameTemplate(schemaName, oldDocumentName, newDocumentName, function(err, renameTemplateResult) {
                if (err) {
                    console.log('*** store.actions.schema.renameTemplate.fail', schemaName, oldTemplate, newTemplate, err);
                    return failTemplateRename(err);
                }
                console.log('*** store.actions.schema.addTemplate.success', schemaName, oldTemplate, newTemplate, renameTemplateResult);
                dispatch(completeTemplateRename(schemaName, oldDocumentName, newDocumentName, renameTemplateResult.schemas));
                dispatch(selectSchema(schemaName, newDocumentName));
            });
        };
};
const requestTemplateRename = () => {
    console.log('store.actions.schema.requestTemplateRename');
    return {
            type: RENAME_TEMPLATE_REQUEST
        };
};
const failTemplateRename = (error) => {
    console.log('store.actions.schema.failTemplateRename');
    return {
            type: RENAME_TEMPLATE_FAILURE, 
            error: error
        };
};
const completeTemplateRename = (schemaName, oldTemplate, newTemplate, schemas) => {
    console.log('store.actions.schema.completeTemplateRename', 'schemas', schemas);
    return {
            type: RENAME_TEMPLATE_SUCCESS, 
            schema: schemaName, 
            oldTemplate: oldTemplate, 
            newTemplate: newTemplate, 
            schemas: schemas
        };
};
const removeTemplate = (schemaName, templateName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.schema.removeTemplate.request', schemaName, templateName);
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestTemplateRemove());
            const documentName = getDocumentName(schemaName, templateName);
            // Updates the Templates array in the meta-schema document
            wizziStore.removeTemplate(schemaName, documentName, function(err, removeResult) {
                if (err) {
                    console.log('*** store.actions.schema.removeTemplate.fail', schemaName, templateName, err);
                    return failTemplateRemove(err);
                }
                dispatch(completeTemplateRemove(schemaName, documentName, removeResult.schemas));
                const schemaState = getState().schema;
                if (schemaState.selectedSchema == schemaName && schemaState.selectedTemplate != templateName) {
                    dispatch(selectSchema(schemaName, schemaState.selectedTemplate));
                    return ;
                }
                const schemaObject = schemaState.schemas[schemaName];
                const templateObject = schemaObject.templates.length > 0 ? schemaObject.templates[0] : null;
                const gotoTemplate = templateObject ? templateObject.name : getDocumentName(schemaName, 'default');
                dispatch(selectSchema(schemaName, gotoTemplate));
            });
        };
};
const requestTemplateRemove = () => {
    console.log('store.actions.schema.requestTemplateRemove');
    return {
            type: REMOVE_TEMPLATE_REQUEST
        };
};
const failTemplateRemove = (error) => {
    console.log('store.actions.schema.failTemplateRemove');
    return {
            type: REMOVE_TEMPLATE_FAILURE, 
            error: error
        };
};
const completeTemplateRemove = (schemaName, templateName, schemas) => {
    console.log('store.actions.schema.completeTemplateRemove', 'schemas', schemas);
    return {
            type: REMOVE_TEMPLATE_SUCCESS, 
            schema: schemaName, 
            template: templateName, 
            schemas: schemas
        };
};

// thunk.withExtraArgument
const updateStoredDocument = (schemaName, documentName, content, options) => {
    // defaults
    options = options || {};
    if (typeof options.cloudUpdate === 'undefined') {
        options.cloudUpdate = true;
    }
    return (dispatch, getState, extraArgument) => {
            const wizziStore = extraArgument.WizziStore.getInstance();
            if (options.isFragment) {
                wizziStore.setFragment(schemaName, documentName, content, function(err, result) {
                    dispatch(changeFragmentContent(content));
                });
            }
            else if (options.isSnippet) {
                wizziStore.setSnippet(schemaName, documentName, content, function(err, result) {
                    dispatch(changeSnippetContent(content));
                });
            }
            else if (options.isTemplate) {
                wizziStore.setTemplate(schemaName, documentName, content, function(err, result) {
                    dispatch(changeTemplateContent(content));
                });
            }
            else {
                wizziStore.setExample(schemaName, documentName, content, function(err, result) {
                    dispatch(changeExampleContent(content));
                });
            }
        };
};


// artifact
const GENERATE_ARTIFACT = 'GENERATE_ARTIFACT';
const GENERATE_ARTIFACT_REQUEST = 'GENERATE_ARTIFACT_REQUEST';
const GENERATE_ARTIFACT_SUCCESS = 'GENERATE_ARTIFACT_SUCCESS';
const GENERATE_ARTIFACT_FAILURE = 'GENERATE_ARTIFACT_FAILURE';

// thunk.withExtraArgument
const scheduleGenerateArtifact = (schemaName, ittfKind, documentName) => {
    return (dispatch, getState, extraArgument) => {
            if (timers['generateArtifact']) {
                clearTimeout(timers['generateArtifact']);
                console.log('store.actions.scheduleGenerateArtifact. Cleared previous schedule.', new Date());
            }
            timers['generateArtifact'] = setTimeout(function() {
                dispatch(generateArtifact(schemaName, ittfKind, documentName));
                console.log('store.actions.scheduleGenerateArtifact. dispatched.', new Date());
            }, 2 * 1000);
        };
};
// thunk.withExtraArgument
const generateArtifact = (schemaName, ittfKind, documentName) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.artifact.generateArtifact');
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestArtifactGeneration(schemaName, ittfKind, documentName));
            wizziStore.generateArtifactAction(schemaName, ittfKind, documentName, function(err, generatedArtifact) {
                if (err) {
                    return dispatch(failArtifactGeneration(schemaName, ittfKind, documentName, err));
                }
                dispatch(completeArtifactGeneration(schemaName, ittfKind, documentName, generatedArtifact));
            });
        };
};
const requestArtifactGeneration = (schemaName, ittfKind, documentName) => {
    return {
            type: GENERATE_ARTIFACT_REQUEST, 
            schemaName: schemaName, 
            ittfKind: ittfKind, 
            documentName: documentName
        };
};
const failArtifactGeneration = (schemaName, ittfKind, documentName, error) => {
    return {
            type: GENERATE_ARTIFACT_FAILURE, 
            schemaName: schemaName, 
            ittfKind: ittfKind, 
            documentName: documentName, 
            error: error
        };
};
const completeArtifactGeneration = (schemaName, ittfKind, documentName, text) => {
    return {
            type: GENERATE_ARTIFACT_SUCCESS, 
            schemaName: schemaName, 
            ittfKind: ittfKind, 
            documentName: documentName, 
            text: text
        };
};


// snippet
const WIZZIFY_SNIPPET = 'WIZZIFY_SNIPPET';
const WIZZIFY_SNIPPET_REQUEST = 'WIZZIFY_SNIPPET_REQUEST';
const WIZZIFY_SNIPPET_SUCCESS = 'WIZZIFY_SNIPPET_SUCCESS';
const WIZZIFY_SNIPPET_FAILURE = 'WIZZIFY_SNIPPET_FAILURE';

// wizzified
const GENERATE_WIZZIFIED = 'GENERATE_WIZZIFIED';
const GENERATE_WIZZIFIED_REQUEST = 'GENERATE_WIZZIFIED_REQUEST';
const GENERATE_WIZZIFIED_SUCCESS = 'GENERATE_WIZZIFIED_SUCCESS';
const GENERATE_WIZZIFIED_FAILURE = 'GENERATE_WIZZIFIED_FAILURE';

// thunk.withExtraArgument
const scheduleWizzifySnippet = (schemaName, snippetName, codeContent) => {
    return (dispatch, getState, extraArgument) => {
            if (timers['wizzifySnippet']) {
                clearTimeout(timers['wizzifySnippet']);
                console.log('store.actions.scheduleGenerateSnippet. Cleared previous schedule.', new Date());
            }
            timers['wizzifySnippet'] = setTimeout(function() {
                dispatch(wizzifySnippet(schemaName, snippetName, codeContent));
                console.log('store.actions.scheduleGenerateSnippet. dispatched.', new Date());
            }, 2 * 1000);
        };
};
// thunk.withExtraArgument
const wizzifySnippet = (schemaName, snippetName, codeContent) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.snippet.wizzifySnippet');
            const wizziStore = extraArgument.WizziStore.getInstance();
            dispatch(requestSnippetWizzification(schemaName, snippetName));
            wizziStore.wizzifySnippet(schemaName, codeContent, function(err, wizzifiedSnippet) {
                if (err) {
                    return dispatch(failSnippetWizzification(schemaName, snippetName, err));
                }
                dispatch(completeSnippetWizzification(schemaName, snippetName, wizzifiedSnippet));
            });
        };
};
const requestSnippetWizzification = (schemaName, snippetName) => {
    return {
            type: WIZZIFY_SNIPPET_REQUEST, 
            schemaName: schemaName, 
            snippetName: snippetName
        };
};
const failSnippetWizzification = (schemaName, snippetName, error) => {
    return {
            type: WIZZIFY_SNIPPET_FAILURE, 
            schemaName: schemaName, 
            snippetName: snippetName, 
            error: error
        };
};
const completeSnippetWizzification = (schemaName, snippetName, wizzifiedSnippet) => {
    return {
            type: WIZZIFY_SNIPPET_SUCCESS, 
            schemaName: schemaName, 
            snippetName: snippetName, 
            wizzifiedSnippet: wizzifiedSnippet
        };
};
const wizzifiedDiffRequest = (schemaName, wizzifiedSnippet) => {
    return (dispatch, getState, extraArgument) => {
            console.log('*** store.actions.snippet.wizzifiedDiffRequest');
            const wizziStore = extraArgument.WizziStore.getInstance();
            wizziStore.simpleGenerate(schemaName, wizzifiedSnippet, function(err, generatedText) {
                if (err) {
                    return dispatch(failWizzifiedGeneration(err));
                }
                dispatch(completeWizzifiedGeneration(wizzifiedSnippet, generatedText));
            });
        };
};
const failWizzifiedGeneration = (error) => {
    return {
            type: GENERATE_WIZZIFIED_FAILURE, 
            error: error
        };
};
const completeWizzifiedGeneration = (wizzifiedSnippet, generatedText) => {
    return {
            type: GENERATE_WIZZIFIED_SUCCESS, 
            wizzifiedSnippet: wizzifiedSnippet, 
            generatedText: generatedText
        };
};

const HB_UPDATE_ITTF_MTREE = 'HB_UPDATE_ITTF_MTREE';
const HB_UPDATE_CODE_AST = 'HB_UPDATE_CODE_AST';
const HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY = 'HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY';

// thunk.withExtraArgument
const updateIttfMTree = (ittfContent) => {
    return (dispatch, getState, extraArgument) => {
            var ittfMTree = {};
            if (ittfContent && ittfContent.length > 0) {
                const wizziStore = extraArgument.WizziStore.getInstance();
                wizziStore.toIttfTreeEx(ittfContent, function(err, ittfMTree) {
                    if (err) {
                        return callback(err);
                    }
                    dispatch(completeHbUpdateIttfMTree(ittfMTree));
                });
            }
            else {
                dispatch(completeHbUpdateIttfMTree(ittfMTree));
            }
        };
};

const completeHbUpdateIttfMTree = (ittfMTree) => {
    console.log('store.actions.completeUpdateIttfMTree', ittfMTree);
    return {
            type: HB_UPDATE_ITTF_MTREE, 
            ittfMTree: ittfMTree
        };
};
const ittfEditorCursorActivity = (cursor) => {
    console.log('store.actions.ittfEditorCursorActivity', cursor);
    return (dispatch, getState, extraArgument) => {
            var mTree = getState().helpBoard.ittfMTree,
                mTreeNode,
                schemaElementDoc = null;
            if (mTree && mTree.findByRow) {
                mTreeNode = mTree.findByRow(cursor.line + 1);
                console.log('wizzi-studio.store.helpBoard.mTreeNode', mTreeNode);
                if (mTreeNode) {
                    const wizziStore = extraArgument.WizziStore.getInstance();
                    schemaElementDoc = wizziStore.getSchemaElementDoc(mTreeNode);
                }
            }
            dispatch(completeIttfEditorCursorActivity(cursor, mTreeNode, schemaElementDoc));
        };
};
const completeIttfEditorCursorActivity = (cursor, cursorNode, schemaElementDoc) => {
    return {
            type: HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY, 
            cursor: cursor, 
            cursorNode: cursorNode, 
            schemaElementDoc: schemaElementDoc
        };
};

// thunk.withExtraArgument
const updateCodeAST = (schemaName, codeContent) => {
    return (dispatch, getState, extraArgument) => {
            console.log('store.actions.updateCodeAST', schemaName, codeContent);
            var codeAST = {};
            if (codeContent && codeContent.length > 0) {
                const wizziStore = extraArgument.WizziStore.getInstance();
                wizziStore.getCodeAST(schemaName, codeContent, function(err, codeAST) {
                    console.log('store.actions.updateCodeAST.err.codeAST', err, codeAST);
                    if (err) {
                        dispatch(completeHbUpdateCodeAST(JSON.stringify(err, null, 4)));
                    }
                    else {
                        dispatch(completeHbUpdateCodeAST(codeAST));
                    }
                });
            }
        };
};

const completeHbUpdateCodeAST = (codeAST) => {
    console.log('store.actions.completeHbUpdateCodeAST', codeAST);
    return {
            type: HB_UPDATE_CODE_AST, 
            codeAST: codeAST
        };
};
function getDocumentName(schemaName, name, entity) {
    var suffix = entity === 'Snippet' ? '.' + schemaName : '.' + schemaName +'.ittf';
    if (name.length > schemaName.length + 1 && name.indexOf(suffix, name.length - suffix.length) !== -1) {
        return name;
    }
    else {
        return name + suffix;
    }
}

module.exports = {
    LOAD_APP: LOAD_APP,
    LOAD_APP_REQUEST: LOAD_APP_REQUEST,
    LOAD_APP_SUCCESS: LOAD_APP_SUCCESS,
    LOAD_APP_FAILURE: LOAD_APP_FAILURE,
    requestAppLoad: requestAppLoad,
    failAppLoad: failAppLoad,
    completeAppLoad: completeAppLoad,
    SCHEMA_SELECTION: SCHEMA_SELECTION,
    SCHEMA_RETRIEVAL: SCHEMA_RETRIEVAL,
    SELECT_ITTF_KIND: SELECT_ITTF_KIND,
    EXAMPLE_CONTENT_CHANGED: EXAMPLE_CONTENT_CHANGED,
    FRAGMENT_CONTENT_CHANGED: FRAGMENT_CONTENT_CHANGED,
    TEMPLATE_CONTENT_CHANGED: TEMPLATE_CONTENT_CHANGED,
    SNIPPET_CONTENT_CHANGED: SNIPPET_CONTENT_CHANGED,
    SELECT_EXAMPLE: SELECT_EXAMPLE,
    SELECT_EXAMPLE_REQUEST: SELECT_EXAMPLE_REQUEST,
    SELECT_EXAMPLE_SUCCESS: SELECT_EXAMPLE_SUCCESS,
    SELECT_EXAMPLE_FAILURE: SELECT_EXAMPLE_FAILURE,
    ADD_EXAMPLE: ADD_EXAMPLE,
    ADD_EXAMPLE_REQUEST: ADD_EXAMPLE_REQUEST,
    ADD_EXAMPLE_SUCCESS: ADD_EXAMPLE_SUCCESS,
    ADD_EXAMPLE_FAILURE: ADD_EXAMPLE_FAILURE,
    RENAME_EXAMPLE: RENAME_EXAMPLE,
    RENAME_EXAMPLE_REQUEST: RENAME_EXAMPLE_REQUEST,
    RENAME_EXAMPLE_SUCCESS: RENAME_EXAMPLE_SUCCESS,
    RENAME_EXAMPLE_FAILURE: RENAME_EXAMPLE_FAILURE,
    REMOVE_EXAMPLE: REMOVE_EXAMPLE,
    REMOVE_EXAMPLE_REQUEST: REMOVE_EXAMPLE_REQUEST,
    REMOVE_EXAMPLE_SUCCESS: REMOVE_EXAMPLE_SUCCESS,
    REMOVE_EXAMPLE_FAILURE: REMOVE_EXAMPLE_FAILURE,
    SELECT_FRAGMENT: SELECT_FRAGMENT,
    SELECT_FRAGMENT_REQUEST: SELECT_FRAGMENT_REQUEST,
    SELECT_FRAGMENT_SUCCESS: SELECT_FRAGMENT_SUCCESS,
    SELECT_FRAGMENT_FAILURE: SELECT_FRAGMENT_FAILURE,
    ADD_FRAGMENT: ADD_FRAGMENT,
    ADD_FRAGMENT_REQUEST: ADD_FRAGMENT_REQUEST,
    ADD_FRAGMENT_SUCCESS: ADD_FRAGMENT_SUCCESS,
    ADD_FRAGMENT_FAILURE: ADD_FRAGMENT_FAILURE,
    RENAME_FRAGMENT: RENAME_FRAGMENT,
    RENAME_FRAGMENT_REQUEST: RENAME_FRAGMENT_REQUEST,
    RENAME_FRAGMENT_SUCCESS: RENAME_FRAGMENT_SUCCESS,
    RENAME_FRAGMENT_FAILURE: RENAME_FRAGMENT_FAILURE,
    REMOVE_FRAGMENT: REMOVE_FRAGMENT,
    REMOVE_FRAGMENT_REQUEST: REMOVE_FRAGMENT_REQUEST,
    REMOVE_FRAGMENT_SUCCESS: REMOVE_FRAGMENT_SUCCESS,
    REMOVE_FRAGMENT_FAILURE: REMOVE_FRAGMENT_FAILURE,
    SELECT_SNIPPET: SELECT_SNIPPET,
    SELECT_SNIPPET_REQUEST: SELECT_SNIPPET_REQUEST,
    SELECT_SNIPPET_SUCCESS: SELECT_SNIPPET_SUCCESS,
    SELECT_SNIPPET_FAILURE: SELECT_SNIPPET_FAILURE,
    ADD_SNIPPET: ADD_SNIPPET,
    ADD_SNIPPET_REQUEST: ADD_SNIPPET_REQUEST,
    ADD_SNIPPET_SUCCESS: ADD_SNIPPET_SUCCESS,
    ADD_SNIPPET_FAILURE: ADD_SNIPPET_FAILURE,
    RENAME_SNIPPET: RENAME_SNIPPET,
    RENAME_SNIPPET_REQUEST: RENAME_SNIPPET_REQUEST,
    RENAME_SNIPPET_SUCCESS: RENAME_SNIPPET_SUCCESS,
    RENAME_SNIPPET_FAILURE: RENAME_SNIPPET_FAILURE,
    REMOVE_SNIPPET: REMOVE_SNIPPET,
    REMOVE_SNIPPET_REQUEST: REMOVE_SNIPPET_REQUEST,
    REMOVE_SNIPPET_SUCCESS: REMOVE_SNIPPET_SUCCESS,
    REMOVE_SNIPPET_FAILURE: REMOVE_SNIPPET_FAILURE,
    SELECT_TEMPLATE: SELECT_TEMPLATE,
    SELECT_TEMPLATE_REQUEST: SELECT_TEMPLATE_REQUEST,
    SELECT_TEMPLATE_SUCCESS: SELECT_TEMPLATE_SUCCESS,
    SELECT_TEMPLATE_FAILURE: SELECT_TEMPLATE_FAILURE,
    ADD_TEMPLATE: ADD_TEMPLATE,
    ADD_TEMPLATE_REQUEST: ADD_TEMPLATE_REQUEST,
    ADD_TEMPLATE_SUCCESS: ADD_TEMPLATE_SUCCESS,
    ADD_TEMPLATE_FAILURE: ADD_TEMPLATE_FAILURE,
    RENAME_TEMPLATE: RENAME_TEMPLATE,
    RENAME_TEMPLATE_REQUEST: RENAME_TEMPLATE_REQUEST,
    RENAME_TEMPLATE_SUCCESS: RENAME_TEMPLATE_SUCCESS,
    RENAME_TEMPLATE_FAILURE: RENAME_TEMPLATE_FAILURE,
    REMOVE_TEMPLATE: REMOVE_TEMPLATE,
    REMOVE_TEMPLATE_REQUEST: REMOVE_TEMPLATE_REQUEST,
    REMOVE_TEMPLATE_SUCCESS: REMOVE_TEMPLATE_SUCCESS,
    REMOVE_TEMPLATE_FAILURE: REMOVE_TEMPLATE_FAILURE,
    selectIttfKind: selectIttfKind,
    completeSelectIttfKind: completeSelectIttfKind,
    selectSchema: selectSchema,
    completeSelectSchema: completeSelectSchema,
    retrieveSchema: retrieveSchema,
    selectDocument: selectDocument,
    changeDocumentContent: changeDocumentContent,
    selectExample: selectExample,
    addExampleWithTemplate: addExampleWithTemplate,
    selectSnippet: selectSnippet,
    requestSelectExample: requestSelectExample,
    completeSelectExample: completeSelectExample,
    changeExampleDocument: changeExampleDocument,
    changeExampleContent: changeExampleContent,
    selectFragment: selectFragment,
    requestSelectFragment: requestSelectFragment,
    completeSelectFragment: completeSelectFragment,
    changeFragmentDocument: changeFragmentDocument,
    changeFragmentContent: changeFragmentContent,
    requestSelectSnippet: requestSelectSnippet,
    completeSelectSnippet: completeSelectSnippet,
    changeSnippetDocument: changeSnippetDocument,
    changeSnippetContent: changeSnippetContent,
    selectTemplate: selectTemplate,
    requestSelectTemplate: requestSelectTemplate,
    completeSelectTemplate: completeSelectTemplate,
    changeTemplateDocument: changeTemplateDocument,
    changeTemplateContent: changeTemplateContent,
    addExample: addExample,
    requestExampleAdd: requestExampleAdd,
    failExampleAdd: failExampleAdd,
    completeExampleAdd: completeExampleAdd,
    renameExample: renameExample,
    requestExampleRename: requestExampleRename,
    failExampleRename: failExampleRename,
    completeExampleRename: completeExampleRename,
    removeExample: removeExample,
    requestExampleRemove: requestExampleRemove,
    failExampleRemove: failExampleRemove,
    completeExampleRemove: completeExampleRemove,
    addFragment: addFragment,
    requestFragmentAdd: requestFragmentAdd,
    failFragmentAdd: failFragmentAdd,
    completeFragmentAdd: completeFragmentAdd,
    renameFragment: renameFragment,
    requestFragmentRename: requestFragmentRename,
    failFragmentRename: failFragmentRename,
    completeFragmentRename: completeFragmentRename,
    removeFragment: removeFragment,
    requestFragmentRemove: requestFragmentRemove,
    failFragmentRemove: failFragmentRemove,
    completeFragmentRemove: completeFragmentRemove,
    addSnippet: addSnippet,
    requestSnippetAdd: requestSnippetAdd,
    failSnippetAdd: failSnippetAdd,
    completeSnippetAdd: completeSnippetAdd,
    renameSnippet: renameSnippet,
    requestSnippetRename: requestSnippetRename,
    failSnippetRename: failSnippetRename,
    completeSnippetRename: completeSnippetRename,
    removeSnippet: removeSnippet,
    requestSnippetRemove: requestSnippetRemove,
    failSnippetRemove: failSnippetRemove,
    completeSnippetRemove: completeSnippetRemove,
    addTemplate: addTemplate,
    requestTemplateAdd: requestTemplateAdd,
    failTemplateAdd: failTemplateAdd,
    completeTemplateAdd: completeTemplateAdd,
    renameTemplate: renameTemplate,
    requestTemplateRename: requestTemplateRename,
    failTemplateRename: failTemplateRename,
    completeTemplateRename: completeTemplateRename,
    removeTemplate: removeTemplate,
    requestTemplateRemove: requestTemplateRemove,
    failTemplateRemove: failTemplateRemove,
    completeTemplateRemove: completeTemplateRemove,
    updateStoredDocument: updateStoredDocument,
    GENERATE_ARTIFACT: GENERATE_ARTIFACT,
    GENERATE_ARTIFACT_REQUEST: GENERATE_ARTIFACT_REQUEST,
    GENERATE_ARTIFACT_SUCCESS: GENERATE_ARTIFACT_SUCCESS,
    GENERATE_ARTIFACT_FAILURE: GENERATE_ARTIFACT_FAILURE,
    scheduleGenerateArtifact: scheduleGenerateArtifact,
    generateArtifact: generateArtifact,
    requestArtifactGeneration: requestArtifactGeneration,
    failArtifactGeneration: failArtifactGeneration,
    completeArtifactGeneration: completeArtifactGeneration,
    WIZZIFY_SNIPPET: WIZZIFY_SNIPPET,
    WIZZIFY_SNIPPET_REQUEST: WIZZIFY_SNIPPET_REQUEST,
    WIZZIFY_SNIPPET_SUCCESS: WIZZIFY_SNIPPET_SUCCESS,
    WIZZIFY_SNIPPET_FAILURE: WIZZIFY_SNIPPET_FAILURE,
    GENERATE_WIZZIFIED: GENERATE_WIZZIFIED,
    GENERATE_WIZZIFIED_REQUEST: GENERATE_WIZZIFIED_REQUEST,
    GENERATE_WIZZIFIED_SUCCESS: GENERATE_WIZZIFIED_SUCCESS,
    GENERATE_WIZZIFIED_FAILURE: GENERATE_WIZZIFIED_FAILURE,
    scheduleWizzifySnippet: scheduleWizzifySnippet,
    wizzifySnippet: wizzifySnippet,
    requestSnippetWizzification: requestSnippetWizzification,
    failSnippetWizzification: failSnippetWizzification,
    completeSnippetWizzification: completeSnippetWizzification,
    wizzifiedDiffRequest: wizzifiedDiffRequest,
    failWizzifiedGeneration: failWizzifiedGeneration,
    completeWizzifiedGeneration: completeWizzifiedGeneration,
    HB_UPDATE_ITTF_MTREE: HB_UPDATE_ITTF_MTREE,
    HB_UPDATE_CODE_AST: HB_UPDATE_CODE_AST,
    HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY: HB_DOCUMENT_EDITOR_CURSOR_ACTIVITY,
    updateIttfMTree: updateIttfMTree,
    completeHbUpdateIttfMTree: completeHbUpdateIttfMTree,
    ittfEditorCursorActivity: ittfEditorCursorActivity,
    completeIttfEditorCursorActivity: completeIttfEditorCursorActivity,
    updateCodeAST: updateCodeAST,
    completeHbUpdateCodeAST: completeHbUpdateCodeAST,
    initialLoad: initialLoad
};
