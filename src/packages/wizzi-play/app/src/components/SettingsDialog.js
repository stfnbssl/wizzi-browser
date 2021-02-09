/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\SettingsDialog.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ExampleList from './ExampleList';
import FragmentList from './FragmentList';
import TemplateList from './TemplateList';
import SnippetList from './SnippetList';
const styles = theme => (
    {});

class SettingsDialog extends React.Component {
    handleClose = () => {
    }
    render() {
        const {
            selectedIttfKind,
            open,
            schema,
            documents,
            templates,
            onAddExample,
            onRenameExample,
            onRemoveExample,
            onAddFragment,
            onRenameFragment,
            onRemoveFragment,
            onAddTemplate,
            onRenameTemplate,
            onRemoveTemplate,
            onAddSnippet,
            onRenameSnippet,
            onRemoveSnippet,
            onCancel
        } = this.props;
        return  (
                <div>
                    <Dialog open={open} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">
                        Schema {schema} settings<hr>
                            </hr>
                        
                        </DialogTitle>
                    
                        <DialogContent>
                        {
                            selectedIttfKind === 'examples' &&  (
                                <ExampleList examples={documents} templates={templates} schema={schema} onAddExample={ onAddExample } onRenameExample={ onRenameExample } onRemoveExample={ onRemoveExample }>
                                </ExampleList>
                            )
                            
                        }{
                            selectedIttfKind === 'fragments' &&  (
                                <FragmentList fragments={documents} schema={schema} onAddFragment={ onAddFragment } onRenameFragment={ onRenameFragment } onRemoveFragment={ onRemoveFragment }>
                                </FragmentList>
                            )
                            
                        }{
                            selectedIttfKind === 'templates' &&  (
                                <TemplateList templates={documents} schema={schema} onAddTemplate={ onAddTemplate } onRenameTemplate={ onRenameTemplate } onRemoveTemplate={ onRemoveTemplate }>
                                </TemplateList>
                            )
                            
                        }{
                            selectedIttfKind === 'snippets' &&  (
                                <SnippetList snippets={documents} schema={schema} onAddSnippet={ onAddSnippet } onRenameSnippet={ onRenameSnippet } onRemoveSnippet={ onRemoveSnippet }>
                                </SnippetList>
                            )
                            
                        }<DialogActions>
                                <Button onClick={ onCancel } color="primary">
                                Cancel</Button>
                            
                            </DialogActions>
                        
                        </DialogContent>
                    
                    </Dialog>
                
                </div>
            )
        ;
    }
}

export default withStyles(styles)(SettingsDialog)
