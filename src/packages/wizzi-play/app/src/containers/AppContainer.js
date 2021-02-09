/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\containers\AppContainer.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { selectSchema, selectDocument, selectIttfKind, changeDocumentContent, ittfEditorCursorActivity, wizzifiedDiffRequest, addExampleWithTemplate, renameExample, removeExample, addFragment, renameFragment, removeFragment, addTemplate, renameTemplate, removeTemplate, addSnippet, renameSnippet, removeSnippet } from '../store/actions';
import App from '../components/App';

class AppContainer extends React.Component {
    componentDidMount() {
        const {
            selectedSchema,
            dispatchSelectSchema
        } = this.props;
        console.log('appContainer.DidMount.selectedSchema', selectedSchema);
        console.log('dispatchSelectSchema supressed');
        /**
            if (selectedSchema && selectedSchema.length > 0) {
                dispatchSelectSchema(selectedSchema);
            }
        */
    }
    handleSelectIttfKind = (selectedIttfKind) => {
        const {
            dispatchSelectIttfKind
        } = this.props;
        // log 'dispatchSelectIttfKind', selectedIttfKind
        dispatchSelectIttfKind(selectedIttfKind);
    }
    handleSelectSchema = (e) => {
        const {
            dispatchSelectSchema
        } = this.props;
        console.log('handleSelectSchema', e.target.value);
        dispatchSelectSchema(e.target.value);
    }
    handleSelectDocument = (documentName) => {
        const {
            dispatchSelectDocument
        } = this.props;
        dispatchSelectDocument(documentName);
    }
    handleDocumentContentChanged = (value) => {
        const {
            dispatchChangeDocumentContent
        } = this.props;
        dispatchChangeDocumentContent(value);
    }
    handleIttfEditorCursorActivity = (cursor, documentContent) => {
        const {
            dispatchIttfEditorCursorActivity
        } = this.props;
        dispatchIttfEditorCursorActivity(cursor, documentContent);
    }
    handleWizzifiedDiffRequest = (schemaName, wizzifiedSnippet) => {
        const {
            dispatchWizzifiedDiffRequest
        } = this.props;
        dispatchWizzifiedDiffRequest(schemaName, wizzifiedSnippet);
    }
    handleAddFragment = (fragmentName) => {
        const {
            selectedSchema,
            dispatchAddFragment
        } = this.props;
        dispatchAddFragment(selectedSchema, fragmentName);
    }
    handleRenameFragment = (oldFragment, newFragment) => {
        const {
            selectedSchema,
            dispatchRenameFragment
        } = this.props;
        dispatchRenameFragment(selectedSchema, oldFragment, newFragment);
    }
    handleRemoveFragment = (fragmentName) => {
        const {
            selectedSchema,
            dispatchRemoveFragment
        } = this.props;
        dispatchRemoveFragment(selectedSchema, fragmentName);
    }
    handleAddTemplate = (templateName) => {
        const {
            selectedSchema,
            dispatchAddTemplate
        } = this.props;
        dispatchAddTemplate(selectedSchema, templateName);
    }
    handleRenameTemplate = (oldTemplate, newTemplate) => {
        const {
            selectedSchema,
            dispatchRenameTemplate
        } = this.props;
        dispatchRenameTemplate(selectedSchema, oldTemplate, newTemplate);
    }
    handleRemoveTemplate = (templateName) => {
        const {
            selectedSchema,
            dispatchRemoveTemplate
        } = this.props;
        dispatchRemoveTemplate(selectedSchema, templateName);
    }
    handleAddExample = (exampleName, templateName) => {
        const {
            selectedSchema,
            dispatchAddExample
        } = this.props;
        dispatchAddExample(selectedSchema, exampleName, templateName);
    }
    handleRenameExample = (oldExample, newExample) => {
        const {
            selectedSchema,
            dispatchRenameExample
        } = this.props;
        dispatchRenameExample(selectedSchema, oldExample, newExample);
    }
    handleRemoveExample = (exampleName) => {
        const {
            selectedSchema,
            dispatchRemoveExample
        } = this.props;
        dispatchRemoveExample(selectedSchema, exampleName);
    }
    handleAddSnippet = (snippetName) => {
        const {
            selectedSchema,
            dispatchAddSnippet
        } = this.props;
        dispatchAddSnippet(selectedSchema, snippetName);
    }
    handleRenameSnippet = (oldSnippet, newSnippet) => {
        const {
            selectedSchema,
            dispatchRenameSnippet
        } = this.props;
        dispatchRenameSnippet(selectedSchema, oldSnippet, newSnippet);
    }
    handleRemoveSnippet = (snippetName) => {
        const {
            selectedSchema,
            dispatchRemoveSnippet
        } = this.props;
        dispatchRemoveSnippet(selectedSchema, snippetName);
    }
    render() {
        const {
            schemas,
            selectedSchema,
            selectedIttfKind,
            filteredExamples,
            selectedExample,
            filteredFragments,
            selectedFragment,
            filteredTemplates,
            selectedTemplate,
            filteredSnippets,
            selectedSnippet,
            ittfContent,
            codeContent,
            generatedArtifactText,
            hbIttfMTree,
            hbCodeAST,
            hbCursorNode,
            wizzifiedSnippet,
            hbSchemaElementDoc,
            generationError,
            wizzifyError,
            isLoadingContent,
            isProcessingContent,
            originalModel,
            modifiedModel
        } = this.props;
        return  (
                <App schemas={schemas} selectedIttfKind={selectedIttfKind} selectedSchema={selectedSchema} ittfContent={ittfContent} codeContent={codeContent} generatedArtifactText={generatedArtifactText} wizzifiedSnippet={wizzifiedSnippet} hbIttfMTree={hbIttfMTree} hbCodeAST={hbCodeAST} hbCursorNode={hbCursorNode} hbSchemaElementDoc={hbSchemaElementDoc} generationError={generationError} wizzifyError={wizzifyError} isLoadingContent={isLoadingContent} isProcessingContent={isProcessingContent} originalModel={ originalModel } modifiedModel={ modifiedModel } onSelectIttfKind={this.handleSelectIttfKind} onSelectSchema={this.handleSelectSchema} onSelectDocument={this.handleSelectDocument} onDocumentContentChanged={this.handleDocumentContentChanged} onIttfEditorCursorActivity={this.handleIttfEditorCursorActivity} onWizzifiedDiffRequest={this.handleWizzifiedDiffRequest} examples={ filteredExamples } selectedExample={ selectedExample } onAddExample={ this.handleAddExample } onRenameExample={ this.handleRenameExample } onRemoveExample={ this.handleRemoveExample } fragments={ filteredFragments } selectedFragment={ selectedFragment } onAddFragment={ this.handleAddFragment } onRenameFragment={ this.handleRenameFragment } onRemoveFragment={ this.handleRemoveFragment } templates={ filteredTemplates } selectedTemplate={ selectedTemplate } onAddTemplate={ this.handleAddTemplate } onRenameTemplate={ this.handleRenameTemplate } onRemoveTemplate={ this.handleRemoveTemplate } snippets={ filteredSnippets } selectedSnippet={ selectedSnippet } onAddSnippet={ this.handleAddSnippet } onRenameSnippet={ this.handleRenameSnippet } onRemoveSnippet={ this.handleRemoveSnippet }>
                </App>
            )
        ;
    }
    }
const AppStyled = AppContainer;
const AppContexted = AppStyled;
const mapDispatchToProps = (dispatch) => {
    return {
            dispatch: dispatch, 
            dispatchSelectIttfKind: (selectedIttfKind) => {
                console.log('dispatchSelectIttfKind', selectedIttfKind);
                dispatch(selectIttfKind(selectedIttfKind));
            }, 
            dispatchSelectSchema: (schema) => {
                console.log('dispatchSelectSchema', schema);
                dispatch(selectSchema(schema));
            }, 
            dispatchSelectDocument: (documentName) => {
                console.log('dispatchSelectDocument', documentName);
                dispatch(selectDocument(documentName));
            }, 
            dispatchChangeDocumentContent: (documentContent) => {
                console.log('dispatchChangeDocumentContent', documentContent);
                dispatch(changeDocumentContent(documentContent));
            }, 
            dispatchIttfEditorCursorActivity: (cursor, documentContent) => {
                // log 'dispatchIttfEditorCursorActivity', cursor
                dispatch(ittfEditorCursorActivity(cursor, documentContent));
            }, 
            dispatchWizzifiedDiffRequest: (schemaName, wizzified) => {
                // log 'dispatchWizzifiedDiffRequest', schemaName
                dispatch(wizzifiedDiffRequest(schemaName, wizzified));
            }, 
            dispatchAddExample: (schemaName, exampleName, templateName) => {
                console.log('dispatchAddExample', schemaName, exampleName);
                dispatch(addExampleWithTemplate(schemaName, exampleName, templateName));
            }, 
            dispatchRenameExample: (schemaName, oldExample, newExample) => {
                console.log('dispatchRenameExample', oldExample, newExample);
                dispatch(renameExample(schemaName, oldExample, newExample));
            }, 
            dispatchRemoveExample: (schemaName, exampleName) => {
                console.log('dispatchRemoveExample', schemaName, exampleName);
                dispatch(removeExample(schemaName, exampleName));
            }, 
            dispatchAddFragment: (schemaName, fragmentName) => {
                console.log('dispatchAddFragment', schemaName, fragmentName);
                dispatch(addFragment(schemaName, fragmentName));
            }, 
            dispatchRenameFragment: (schemaName, oldFragment, newFragment) => {
                console.log('dispatchRenameFragment', oldFragment, newFragment);
                dispatch(renameFragment(schemaName, oldFragment, newFragment));
            }, 
            dispatchRemoveFragment: (schemaName, fragmentName) => {
                console.log('dispatchRemoveFragment', schemaName, fragmentName);
                dispatch(removeFragment(schemaName, fragmentName));
            }, 
            dispatchAddTemplate: (schemaName, templateName) => {
                console.log('dispatchAddTemplate', schemaName, templateName);
                dispatch(addTemplate(schemaName, templateName));
            }, 
            dispatchRenameTemplate: (schemaName, oldTemplate, newTemplate) => {
                console.log('dispatchRenameTemplate', oldTemplate, newTemplate);
                dispatch(renameTemplate(schemaName, oldTemplate, newTemplate));
            }, 
            dispatchRemoveTemplate: (schemaName, templateName) => {
                console.log('dispatchRemoveTemplate', schemaName, templateName);
                dispatch(removeTemplate(schemaName, templateName));
            }, 
            dispatchAddSnippet: (schemaName, snippetName) => {
                console.log('dispatchAddSnippet', schemaName, snippetName);
                dispatch(addSnippet(schemaName, snippetName));
            }, 
            dispatchRenameSnippet: (schemaName, oldSnippet, newSnippet) => {
                console.log('dispatchRenameSnippet', oldSnippet, newSnippet);
                dispatch(renameSnippet(schemaName, oldSnippet, newSnippet));
            }, 
            dispatchRemoveSnippet: (schemaName, snippetName) => {
                console.log('dispatchRemoveSnippet', schemaName, snippetName);
                dispatch(removeSnippet(schemaName, snippetName));
            }
        };
};

const mapStateToProps = (state) => {
    return {
            schemas: state.schema.schemas, 
            selectedIttfKind: state.schema.selectedIttfKind, 
            selectedSchema: state.schema.selectedSchema, 
            filteredExamples: state.schema.filteredExamples, 
            selectedExample: state.schema.selectedExample, 
            filteredFragments: state.schema.filteredFragments, 
            selectedFragment: state.schema.selectedFragment, 
            filteredTemplates: state.schema.filteredTemplates, 
            selectedTemplate: state.schema.selectedTemplate, 
            filteredSnippets: state.schema.filteredSnippets, 
            selectedSnippet: state.schema.selectedSnippet, 
            ittfContent: state.schema.ittfContent, 
            codeContent: state.schema.codeContent, 
            generatedArtifactText: state.artifact.generatedText, 
            generationError: ( state.artifact.generateError ? JSON.stringify(state.artifact.generateError, null, 2) : null ), 
            isLoadingContent: state.schema.isLoadingContent, 
            isProcessingContent: state.artifact.isGenerating || state.snippet.isWizzifying, 
            wizzifiedSnippet: state.snippet.wizzifiedSnippet, 
            wizzifyError: ( state.snippet.wizzifyError ? state.snippet.wizzifyError.message : '' ), 
            hbIttfMTree: state.helpBoard.ittfMTree, 
            hbCodeAST: state.helpBoard.codeAST, 
            hbCursorNode: state.helpBoard.cursorNode, 
            hbSchemaElementDoc: state.helpBoard.schemaElementDoc, 
            originalModel: state.helpBoard.originalModel, 
            modifiedModel: state.helpBoard.modifiedModel
        };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    return Object.assign({}, ownProps, stateProps, dispatchProps, {});
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(AppContexted)
