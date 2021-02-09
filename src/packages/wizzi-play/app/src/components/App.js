/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\App.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SvgIcon from '@material-ui/core/SvgIcon';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import MonacoEditor from './MonacoEditor';
import Splitter from './mui/Splitter';
import SettingsDialog from './SettingsDialog';
import DiffDialog from './DiffDialog';
import SchemaElementDoc from './SchemaElementDoc';
import HtmlPreview from './previews/htmlPreview';
import SvgPreview from './previews/svgPreview';
import AstView from './previews/astView';
function GearIcon(props) {
    return  (
            <SvgIcon width='16' height='16' viewBox='0 0 120 120' {...props}>
                <path d="m124.92 52.2c-.436-.571-1-.911-1.711-1.019l-14.909-2.281c-.815-2.607-1.929-5.268-3.341-7.984.977-1.358 2.443-3.272 4.398-5.744 1.955-2.472 3.34-4.277 4.155-5.418.435-.598.651-1.222.651-1.874 0-.76-.189-1.357-.57-1.792-1.955-2.771-6.436-7.387-13.443-13.851-.65-.543-1.33-.814-2.035-.814-.815 0-1.467.244-1.956.732l-11.568 8.718c-2.228-1.141-4.672-2.146-7.333-3.02l-2.281-14.99c-.054-.706-.367-1.29-.937-1.752-.571-.462-1.235-.692-1.997-.692h-18.09c-1.575 0-2.553.76-2.933 2.281-.706 2.715-1.494 7.766-2.363 15.15-2.553.816-5.02 1.848-7.414 3.097l-11.243-8.718c-.706-.543-1.412-.814-2.118-.814-1.195 0-3.761 1.941-7.699 5.825-3.938 3.884-6.612 6.803-8.03 8.758-.489.706-.733 1.331-.733 1.874 0 .652.271 1.304.814 1.955 3.639 4.4 6.545 8.147 8.718 11.244-1.358 2.498-2.417 4.997-3.177 7.495l-15.15 2.281c-.597.109-1.113.462-1.548 1.06-.435.597-.652 1.222-.652 1.873v18.09c0 .707.217 1.344.652 1.914.435.571 1 .912 1.711 1.02l14.91 2.2c.76 2.661 1.873 5.349 3.34 8.06-.977 1.358-2.444 3.272-4.399 5.744-1.955 2.472-3.341 4.277-4.155 5.418-.435.599-.652 1.222-.652 1.874 0 .706.19 1.33.57 1.873 2.118 2.934 6.599 7.497 13.443 13.688.598.598 1.277.896 2.037.896.815 0 1.494-.244 2.037-.732l11.488-8.719c2.228 1.141 4.672 2.146 7.333 3.02l2.281 14.99c.055.706.367 1.29.937 1.752.57.463 1.236.692 1.996.692h18.09c1.577 0 2.554-.76 2.935-2.281.705-2.716 1.492-7.766 2.361-15.15 2.553-.815 5.03-1.848 7.414-3.097l11.244 8.8c.76.488 1.467.732 2.118.732 1.194 0 3.747-1.927 7.657-5.784 3.912-3.856 6.6-6.79 8.06-8.8.489-.543.734-1.167.734-1.873 0-.706-.271-1.387-.815-2.037-3.91-4.78-6.816-8.527-8.718-11.243 1.086-2.01 2.146-4.481 3.178-7.414l15.07-2.28c.651-.109 1.196-.463 1.63-1.061.434-.598.65-1.223.65-1.874v-18.09c.0001-.706-.215-1.343-.651-1.914m-47.17 25.541c-4.073 4.074-8.989 6.111-14.747 6.111-5.758 0-10.673-2.037-14.747-6.111-4.073-4.073-6.11-8.988-6.11-14.746 0-5.758 2.036-10.673 6.11-14.747 4.074-4.073 8.99-6.11 14.747-6.11 5.758 0 10.674 2.037 14.747 6.11 4.073 4.074 6.11 8.989 6.11 14.747 0 5.758-2.037 10.673-6.11 14.746">
                </path>
            
            </SvgIcon>
        )
    ;
}
const splitPaneStyle = {
    display: 'flex', 
    position: 'unset', 
    flex: '1 1 0%', 
    height: '100%', 
    width: '100%', 
    outline: 'none', 
    overflow: 'hidden', 
    userSelect: 'text', 
    flexDirection: 'row', 
    left: '0px', 
    right: '0px'
};
const styles = theme => (
    {
        pageWrapper: {
            width: '100%', 
            height: '100vh', 
            backgroundColor: '#1d1f20', 
            display: 'flex', 
            flexDirection: 'column'
        }, 
        toolbar: {
            borderBottom: '5px solid #343436', 
            boxShadow: '0 1px 1px black', 
            backgroundColor: '#020302', 
            height: '60px', 
            minHeight: '60px', 
            display: 'flex'
        }, 
        logoImg: {
            position: 'relative', 
            top: '50%', 
            left: '10px', 
            height: '20px', 
            marginTop: '-10px'
        }, 
        wizziTitleArea: {
            padding: '10px 15px 0 15px', 
            display: 'flex', 
            flexShrink: '1', 
            flexGrow: '1', 
            minWidth: '0'
        }, 
        selectActions: {
            display: 'flex', 
            justifyContent: 'flex-start', 
            flexShrink: '0', 
            flexGrow: '0', 
            margin: '8px 0 8px 0', 
            paddingRight: '30px'
        }, 
        primaryActions: {
            display: 'flex', 
            justifyContent: 'flex-end', 
            flexShrink: '0', 
            flexGrow: '0', 
            margin: '8px 0 8px 0'
        }, 
        button: {
            fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif', 
            '-webkit-appearance': 'none', 
            fontSize: '1rem', 
            textShadow: 'none', 
            lineHeight: '1', 
            display: 'inline-block', 
            outline: '0', 
            padding: '8px 12px', 
            margin: '0 10px 0 0', 
            position: 'relative', 
            borderRadius: '3px', 
            border: '3px solid transparent', 
            color: 'white', 
            cursor: 'pointer', 
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', 
            textDecoration: 'none !important', 
            textAlign: 'center', 
            fontWeight: 'normal !important'
        }, 
        buttonMedium: {
            background: '#343436', 
            color: 'white'
        }, 
        buttonSmall: {
            background: '#343436', 
            color: 'white'
        }, 
        miniButton: {
            fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif', 
            fontSize: '0.8rem', 
            padding: '2px 7px', 
            margin: '4px', 
            borderWidth: '1px'
        }, 
        buttonEditorSolid: {
            border: '3px solid #343436', 
            background: '#343436', 
            '&:hover': {
                background: '#454547'
            }
        }, 
        iconSvg: {
            width: '16px', 
            height: '16px', 
            verticalAlign: 'middle', 
            position: 'relative', 
            top: '-1px', 
            marginRight: '10px'
        }, 
        workarea: {
            flex: '1 auto', 
            display: 'flex'
        }, 
        editaside: {
            width: '30px', 
            backgroundColor: '#0d0a10', 
            flex: '0 1 auto', 
            height: 'calc(100vh - 118px)'
        }, 
        editbox: {
            flex: '1 auto', 
            display: 'flex'
        }, 
        editorbox: {
            margin: '.5vw .5vw', 
            flex: '1 auto', 
            display: 'flex', 
            flexDirection: 'column'
        }, 
        editorHead: {
            margin: '4px', 
            backgroundColor: '#0a0a0a', 
            height: '40px', 
            width: '100%', 
            display: 'flex', 
            justifyContent: 'flex-end'
        }, 
        editorHeadControls: {
            margin: '0 0 4px 15px', 
            flex: '1 auto'
        }, 
        editorHeadControl: {
            padding: '0 15px', 
            display: 'inline-block'
        }, 
        editorButton: {
            fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif', 
            fontSize: '1rem', 
            padding: '2px 6px', 
            margin: '4px 10px 0 10px', 
            height: '32px', 
            position: 'relative', 
            borderRadius: '2px', 
            color: 'white', 
            cursor: 'pointer', 
            whiteSpace: 'nowrap', 
            textOverflow: 'ellipsis', 
            textDecoration: 'none !important', 
            textAlign: 'center', 
            fontWeight: 'normal !important', 
            border: '1px solid #343436', 
            background: '#343436', 
            '&:hover': {
                background: '#454547'
            }
        }, 
        editorHeadText: {
            color: '#bbb', 
            fontFamily: '"Lato", "Lucida Grande", "Lucida Sans Unicode", Tahoma, Sans-Serif', 
            fontWeight: 'bold', 
            margin: '0', 
            fontSize: '1.3rem', 
            display: 'inline-block', 
            flex: '1 auto', 
            padding: '4px 6px', 
            verticalAlign: 'middle'
        }, 
        editor: {
            position: 'relative', 
            flex: '1 auto', 
            overflow: 'auto'
        }, 
        formControl: {
            margin: theme.spacing.unit, 
            minWidth: 120
        }, 
        avatar: {
            position: 'absolute', 
            margin: 'auto', 
            top: '0', 
            left: '0', 
            right: '0', 
            bottom: '0'
        }, 
        editorPane: {
            margin: '15px 10px', 
            overflow: 'auto'
        }, 
        footbar: {
            height: '60px', 
            display: 'flex', 
            flexDirection: 'column'
        }, 
        footbarCommands: {
            borderTop: '1px solid #3d3f20', 
            marginTop: '15px', 
            height: '40px'
        }, 
        resizer: {
            width: '18px', 
            height: 'calc(100vh - 118px)', 
            cursor: 'col-resize', 
            backgroundColor: '#343436', 
            '&:hover': {
                backgroundColor: '#565658', 
                transition: 'all 1s ease'
            }
        }
    });

class App extends React.Component {
    state = {
        openSettingsDialog: false, 
        openDiffDialog: false, 
        showPreview: false, 
        showSchemaDocs: true, 
        splitter1Sizes: {
            primary: 500, 
            secondary: 500
        }, 
        splitter2Sizes: {
            primary: 500, 
            secondary: 500
        }
    };
    handleSettingsClick = () => {
        this.setState({
            ...this.state, 
            openSettingsDialog: true
        });
    }
    handleWizzifiedDiffClick = () => {
        const {
            selectedSchema,
            wizzifiedSnippet,
            onWizzifiedDiffRequest
        } = this.props;
        onWizzifiedDiffRequest(selectedSchema, wizzifiedSnippet);
        this.setState({
            ...this.state, 
            openDiffDialog: true
        });
    }
    handlePreviewClick = () => {
        this.setState({
            ...this.state, 
            showPreview: !this.state.showPreview, 
            showSchemaDocs: this.state.showPreview
        });
    }
    handleSettingsCancel = () => {
        this.setState({
            ...this.state, 
            openSettingsDialog: false
        });
    }
    handleDiffCancel = () => {
        this.setState({
            ...this.state, 
            openDiffDialog: false
        });
    }
    handleAddFragment = (newFragment, templateName) => {
        const {
            onAddFragment
        } = this.props;
        onAddFragment(newFragment, templateName);
        this.handleSettingsCancel();
    }
    handleRenameFragment = (oldFragment, newFragment) => {
        const {
            onRenameFragment
        } = this.props;
        onRenameFragment(oldFragment, newFragment);
        this.handleSettingsCancel();
    }
    handleRemoveFragment = (oldFragment) => {
        const {
            onRemoveFragment
        } = this.props;
        onRemoveFragment(oldFragment);
        this.handleSettingsCancel();
    }
    handleAddTemplate = (newTemplate, templateName) => {
        const {
            onAddTemplate
        } = this.props;
        onAddTemplate(newTemplate, templateName);
        this.handleSettingsCancel();
    }
    handleRenameTemplate = (oldTemplate, newTemplate) => {
        const {
            onRenameTemplate
        } = this.props;
        onRenameTemplate(oldTemplate, newTemplate);
        this.handleSettingsCancel();
    }
    handleRemoveTemplate = (oldTemplate) => {
        const {
            onRemoveTemplate
        } = this.props;
        onRemoveTemplate(oldTemplate);
        this.handleSettingsCancel();
    }
    handleAddExample = (newExample, templateName) => {
        const {
            onAddExample
        } = this.props;
        onAddExample(newExample, templateName);
        this.handleSettingsCancel();
    }
    handleRenameExample = (oldExample, newExample) => {
        const {
            onRenameExample
        } = this.props;
        onRenameExample(oldExample, newExample);
        this.handleSettingsCancel();
    }
    handleRemoveExample = (oldExample) => {
        const {
            onRemoveExample
        } = this.props;
        onRemoveExample(oldExample);
        this.handleSettingsCancel();
    }
    handleAddSnippet = (newSnippet, templateName) => {
        const {
            onAddSnippet
        } = this.props;
        onAddSnippet(newSnippet, templateName);
        this.handleSettingsCancel();
    }
    handleRenameSnippet = (oldSnippet, newSnippet) => {
        const {
            onRenameSnippet
        } = this.props;
        onRenameSnippet(oldSnippet, newSnippet);
        this.handleSettingsCancel();
    }
    handleRemoveSnippet = (oldSnippet) => {
        const {
            onRemoveSnippet
        } = this.props;
        onRemoveSnippet(oldSnippet);
        this.handleSettingsCancel();
    }
    handleDocumentContentChanged = (documentContent) => {
        const {
            onDocumentContentChanged
        } = this.props;
        onDocumentContentChanged(documentContent);
    }
    handleCursorActivity = (cur, ittfContent) => {
        const {
            onIttfEditorCursorActivity
        } = this.props;
        console.log('handleCursorActivity', cur);
        this.setState({
            ...this.state, 
            cursor: cur
        });
        onIttfEditorCursorActivity(cur, ittfContent);
    }
    handleSelectIttfKind = (e) => {
        const {
            onSelectIttfKind
        } = this.props;
        onSelectIttfKind(e.target.value);
    }
    handleSelectDocument = (e) => {
        const {
            onSelectDocument
        } = this.props;
        onSelectDocument(e.target.value);
    }
    handleSplitter1Resize = (sizes) => {
        // log 'handleSplitter1Resize', sizes
        this.setState({
            splitter1Sizes: sizes
        });
    }
    handleSplitter2Resize = (sizes) => {
        // log 'handleSplitter2Resize', sizes
        this.setState({
            splitter2Sizes: sizes
        });
    }
    render() {
        const {
            classes,
            schemas,
            selectedIttfKind,
            selectedSchema,
            examples,
            selectedExample,
            fragments,
            selectedFragment,
            templates,
            selectedTemplate,
            snippets,
            selectedSnippet,
            ittfContent,
            codeContent,
            generatedArtifactText,
            wizzifiedSnippet,
            generationError,
            wizzifyError,
            onSelectSchema,
            isLoadingContent,
            isProcessingContent,
            hbIttfMTree,
            hbCodeAST,
            hbCursorNode,
            hbSchemaElementDoc,
            originalModel,
            modifiedModel
        } = this.props;
        const { openSettingsDialog, openDiffDialog, showSchemaDocs, showPreview } = this.state;
        const { splitter1Sizes, splitter2Sizes } = this.state;
        let documents, selectedDocument;
        if (selectedIttfKind === 'examples') {
            documents = examples;
            selectedDocument = selectedExample;
        }
        else if (selectedIttfKind === 'fragments') {
            documents = fragments;
            selectedDocument = selectedFragment;
        }
        else if (selectedIttfKind === 'templates') {
            documents = templates;
            selectedDocument = selectedTemplate;
        }
        else {
            documents = snippets;
            selectedDocument = selectedSnippet;
        }
        const documentContent = selectedIttfKind === 'snippets' ? codeContent : ittfContent;
        const processedContent = selectedIttfKind === 'snippets' ? wizzifiedSnippet : generatedArtifactText;
        const processError = selectedIttfKind === 'snippets' ? wizzifyError : generationError;
        // log 'hbCodeAST', hbCodeAST
        // log 'schemas', Object.keys(schemas)
        // log 'examples', examples
        // log 'templates', templates
        // log 'fragments', fragments
        // log 'snippets', snippets
        // log 'isLoadingContent, isProcessingContent', isLoadingContent, isProcessingContent
        const ittfHeadText = selectedIttfKind === 'snippets' ? selectedSchema  : selectedSchema + '.ittf';
        const generatedHeadText = selectedIttfKind === 'snippets' ? selectedSchema + '.ittf' : selectedSchema;
        const helpBoardHeadText = selectedIttfKind === 'snippets' ? selectedSchema + ' parsed AST' : '';
        const hasPreview = selectedIttfKind !== 'snippets' && ['html','svg'].indexOf(selectedSchema) > -1;
        var optionsIttf = {
            lineNumbers: true, 
            mode: 'yaml', 
            theme: 'twilight', 
            scrollbarStyle: "simple"
        };
        var optionsGenerated = {
            lineNumbers: true, 
            mode: 'javascript', 
            theme: 'twilight', 
            scrollbarStyle: "simple"
        };
        return  (
                <div className={classes.pageWrapper}>
                    <SettingsDialog selectedIttfKind={ selectedIttfKind } open={ openSettingsDialog } schema={ selectedSchema } documents={ documents } templates={ templates } onAddExample={ this.handleAddExample } onRenameExample={ this.handleRenameExample } onRemoveExample={ this.handleRemoveExample } onAddFragment={ this.handleAddFragment } onRenameFragment={ this.handleRenameFragment } onRemoveFragment={ this.handleRemoveFragment } onAddTemplate={ this.handleAddTemplate } onRenameTemplate={ this.handleRenameTemplate } onRemoveTemplate={ this.handleRemoveTemplate } onAddSnippet={ this.handleAddSnippet } onRenameSnippet={ this.handleRenameSnippet } onRemoveSnippet={ this.handleRemoveSnippet } onCancel={ this.handleSettingsCancel }>
                    </SettingsDialog>
                
                    <DiffDialog open={ openDiffDialog } originalModel={ originalModel } modifiedModel={ modifiedModel } onCancel={ this.handleDiffCancel }>
                    </DiffDialog>
                
                    <div className={classes.toolbar}>
                        <div className={classes.wizziTitleArea}>
                            <img className="logoImg" src="images/logo.svg" width="90" height="30">
                            </img>
                        
                        </div>
                    
                        <div className={classes.selectActions}>
                        </div>
                    
                        <div className={classes.primaryActions}>
                            <button className={ classnames(classes.button, classes.buttonEditorSolid) } id="edit-settings" onClick={ this.handleSettingsClick }>
                                <GearIcon className={classes.iconSvg}>
                                </GearIcon>
                            
                            Settings</button>
                        
                        </div>
                    
                    </div>
                
                    <div className={classes.workarea}>
                        <div className={classes.editaside}>
                        </div>
                    
                        <Splitter split="vertical" secondaryInitialSize={ 1000 } primaryMinSize={100} secondaryMinSize={100} onResize={ this.handleSplitter1Resize }>
                            <div className={classes.editorbox}>
                                <div className={classes.editorHead}>
                                    <button className={ classnames(classes.button, classes.buttonMedium, classes.miniButton)} onClick={ this.handleSettingsClick }>
                                        <GearIcon className={classes.iconSvg}>
                                        </GearIcon>
                                    
                                    </button>
                                
                                    <span className={classes.editorHeadText}>
                                    {ittfHeadText}
                                    </span>
                                
                                    <div className={classes.editorHeadControls}>
                                        <div className={classes.editorHeadControl}>
                                            <Select value={selectedIttfKind} onChange={this.handleSelectIttfKind}>
                                                <MenuItem value={'examples'} key={'examples'}>
                                                {'examples'}</MenuItem>
                                            
                                                <MenuItem value={'fragments'} key={'fragments'}>
                                                {'fragments'}</MenuItem>
                                            
                                                <MenuItem value={'snippets'} key={'snippets'}>
                                                {'snippets'}</MenuItem>
                                            
                                                <MenuItem value={'templates'} key={'templates'}>
                                                {'templates'}</MenuItem>
                                            
                                            </Select>
                                        
                                        </div>
                                    
                                        <div className={classes.editorHeadControl}>
                                            <Select value={selectedSchema} onChange={onSelectSchema}>
                                            {
                                                schemas && Object.keys(schemas).length > 0 && Object.keys(schemas).map((item) => {
                                                    return  (
                                                            <MenuItem value={item} key={item}>
                                                            {item}</MenuItem>
                                                        )
                                                    ;
                                                })
                                            }</Select>
                                        
                                        </div>
                                    
                                        <div className={classes.editorHeadControl}>
                                            <Select value={selectedDocument} onChange={this.handleSelectDocument}>
                                            {
                                                documents && documents.length > 0 && documents.map((item) => {
                                                    return  (
                                                            <MenuItem value={item.name} key={item.name}>
                                                            {item.name}</MenuItem>
                                                        )
                                                    ;
                                                })
                                            }</Select>
                                        
                                        </div>
                                    
                                    </div>
                                
                                </div>
                            
                            {
                                (isLoadingContent) &&  (
                                    <Avatar className={classes.avatar} src="images/loading_animation.gif">
                                    </Avatar>
                                )
                                
                            }{
                                !(isLoadingContent) &&  (
                                    <MonacoEditor className={classes.editor} value={ documentContent } width={ splitter1Sizes.primary } height={ splitter1Sizes.third } theme='vs-dark' onChange={ this.handleDocumentContentChanged } onCursorActivity={ this.handleCursorActivity } options={optionsIttf}>
                                    </MonacoEditor>
                                )
                                
                            }</div>
                        
                            <Splitter split="vertical" secondaryInitialSize={ 500 } primaryMinSize={100} secondaryMinSize={100} totalSize={ splitter1Sizes.secondary } onResize={ this.handleSplitter2Resize }>
                                <div className={classes.editorbox}>
                                    <div className={classes.editorHead}>
                                        <button className={ classnames(classes.button, classes.buttonMedium, classes.miniButton)}>
                                            <GearIcon className={classes.iconSvg}>
                                            </GearIcon>
                                        
                                        </button>
                                    
                                        <span className={classes.editorHeadText}>
                                        {generatedHeadText}
                                        </span>
                                    
                                    {
                                        (selectedIttfKind === 'snippets' && processedContent) &&  (
                                            <div className={classes.editorHeadControls}>
                                                <button className={ classnames(classes.editorButton) } onClick={ this.handleWizzifiedDiffClick }>
                                                Wizzified diff</button>
                                            
                                            </div>
                                        )
                                        
                                    }</div>
                                
                                {
                                    isProcessingContent &&  (
                                        <Avatar className={classes.avatar} src="images/loading_animation.gif">
                                        </Avatar>
                                    )
                                    
                                }{
                                    !(isProcessingContent) &&  (
                                        <MonacoEditor className={classes.editor} theme='vs-dark' width={ splitter2Sizes.primary } height={ splitter2Sizes.third } value={processError || processedContent} options={optionsGenerated}>
                                        </MonacoEditor>
                                    )
                                    
                                }</div>
                            
                                <div className={classes.editorbox}>
                                    <div className={classes.editorHead}>
                                        <button className={ classnames(classes.button, classes.buttonMedium, classes.miniButton)}>
                                            <GearIcon className={classes.iconSvg}>
                                            </GearIcon>
                                        
                                        </button>
                                    
                                        <span className={classes.editorHeadText}>
                                        {helpBoardHeadText}
                                        </span>
                                    
                                    {
                                        (hasPreview) &&  (
                                            <div className={classes.editorHeadControls}>
                                                <button className={ classnames(classes.editorButton) } onClick={ this.handlePreviewClick }>
                                                Preview</button>
                                            
                                            </div>
                                        )
                                        
                                    }</div>
                                
                                {
                                    (showSchemaDocs && hbSchemaElementDoc) &&  (
                                        <div className={classes.editorPane}>
                                            <SchemaElementDoc element={ hbSchemaElementDoc }>
                                            </SchemaElementDoc>
                                        
                                        </div>
                                    )
                                    
                                }{
                                    (showPreview && selectedSchema == 'html') &&  (
                                        <div className={classes.editorPane}>
                                            <HtmlPreview content={ generatedArtifactText }>
                                            </HtmlPreview>
                                        
                                        </div>
                                    )
                                    
                                }{
                                    (showPreview && selectedSchema == 'svg') &&  (
                                        <div className={classes.editorPane}>
                                            <SvgPreview content={ generatedArtifactText }>
                                            </SvgPreview>
                                        
                                        </div>
                                    )
                                    
                                }{
                                    (selectedIttfKind === 'snippets' && hbCodeAST ) &&  (
                                        <div className={classes.editorPane}>
                                            <AstView codeAST={ hbCodeAST } width={ splitter2Sizes.secondary } height={ splitter2Sizes.third }>
                                            </AstView>
                                        
                                        </div>
                                    )
                                    
                                }</div>
                            
                            </Splitter>
                        
                        </Splitter>
                    
                    </div>
                
                    <div className={classes.footbar}>
                        <div className={classes.footbarCommands}>
                        </div>
                    
                    </div>
                
                </div>
            )
        ;
    }
}

export default withStyles(styles)(App)
