/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\TemplateList.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Tooltip, IconButton, TextField, InputAdornment } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
const NO_CONFIRM = 0;
const REMOVE_CONFIRM = 1;
const RENAME_CONFIRM = 2;
const styles = theme => (
    {
        selected: {
            color: 'red'
        }
    });

class Template extends React.Component {
    state = {
        openRenameDelete: false, 
        confirmState: NO_CONFIRM, 
        newTemplate: '', 
        oldTemplate: '', 
        rendelTemplate: ''
    };
    handleNewTemplateChange = (event) => {
        this.setState({
            ...this.state, 
            newTemplate: event.target.value
        });
    }
    handleRenDelTemplateChange = (event) => {
        this.setState({
            ...this.state, 
            rendelTemplate: event.target.value
        });
    }
    handleAddTemplateDialog = (template) => {
        this.setState({
            ...this.state, 
            confirmState: ADD_CONFIRM, 
            openAddDelete: true, 
            rendelTemplate: template
        });
    }
    handleRemoveTemplateDialog = (template) => {
        this.setState({
            ...this.state, 
            confirmState: REMOVE_CONFIRM, 
            openRenameDelete: true, 
            rendelTemplate: template
        });
    }
    handleRenameTemplateDialog = (template) => {
        this.setState({
            ...this.state, 
            confirmState: RENAME_CONFIRM, 
            openRenameDelete: true, 
            oldTemplate: template, 
            rendelTemplate: template
        });
    }
    handleCloseRenameDelete = () => {
        this.setState({
            ...this.state, 
            confirmState: NO_CONFIRM, 
            openRenameDelete: false
        });
    }
    handleAddTemplate = () => {
        const {
            onAddTemplate
        } = this.props;
        if (this.state.newTemplate && this.state.newTemplate.length > 0) {
            onAddTemplate(this.state.newTemplate);
        }
    }
    handleRenameTemplate = () => {
        const {
            onRenameTemplate
        } = this.props;
        if (this.state.rendelTemplate && this.state.rendelTemplate.length > 0 && this.state.rendelTemplate !== this.state.oldTemplate) {
            onRenameTemplate(this.state.oldTemplate, this.state.rendelTemplate);
        }
    }
    handleRemoveTemplate = () => {
        const {
            onRemoveTemplate
        } = this.props;
        if (this.state.rendelTemplate && this.state.rendelTemplate.length > 0) {
            onRemoveTemplate(this.state.rendelTemplate);
        }
    }
    render() {
        const {
            classes,
            schema,
            templates
        } = this.props;
        // prop selectedName
        const { newTemplate, rendelTemplate, openRenameDelete, confirmState } = this.state;
        return  (
                <div>
                    <Dialog open={openRenameDelete} onClose={this.handleCloseRenameDelete}>
                        <DialogTitle>
                        {
                            confirmState == REMOVE_CONFIRM &&  (
                                <p>
                                Remove template: { rendelTemplate }
                                </p>
                            )
                            
                        }{
                            confirmState == RENAME_CONFIRM &&  (
                                <p>
                                Rename template: { rendelTemplate }
                                </p>
                            )
                            
                        }</DialogTitle>
                    
                        <DialogContent>
                        {
                            confirmState == RENAME_CONFIRM &&  (
                                <TextField autoFocus margin="dense" id="templateName" label={ 'new name' } type="textfield" fullWidth value={rendelTemplate} onChange={this.handleRenDelTemplateChange} InputProps={{
                                    endAdornment:  (
                                        <InputAdornment position="end">
                                        { schema + '.ittf' }</InputAdornment>
                                    )
                                    
                                }}>
                                </TextField>
                            )
                            
                        }<DialogActions>
                                <Button onClick={this.handleCloseRenameDelete} color="primary">
                                Cancel</Button>
                            
                            {
                                confirmState == RENAME_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRenameTemplate()} color="primary">
                                    Confirm rename</Button>
                                )
                                
                            }{
                                confirmState == REMOVE_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRemoveTemplate()} color="primary">
                                    Confirm remove</Button>
                                )
                                
                            }</DialogActions>
                        
                        </DialogContent>
                    
                    </Dialog>
                
                    <DialogTitle>
                    Add, rename or remove templates</DialogTitle>
                
                    <TextField autoFocus margin="dense" id="templateName" label={ 'new template' } type="textfield" fullWidth value={newTemplate} onChange={this.handleNewTemplateChange} InputProps={{
                        endAdornment:  (
                            <InputAdornment position="end">
                                <Tooltip title="Add new template" enterDelay={500}>
                                    <IconButton aria-label="Add" onClick={ this.handleAddTemplate }>
                                        <AddIcon>
                                        </AddIcon>
                                    
                                    </IconButton>
                                
                                </Tooltip>
                            
                            </InputAdornment>
                        )
                        
                    }}>
                    </TextField>
                
                    <List dense={true}>
                    {
                        templates.map((template) => {
                            return  (
                                    <ListItem key={template.name} disableGutters onClick={() =>
                                        this.handleRenameTemplateDialog(template.name)}>
                                        <ListItemText primary={schema + '/' + template.name }>
                                        </ListItemText>
                                    
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Rename template" enterDelay={500}>
                                                <IconButton aria-label="Update" onClick={() =>
                                                    this.handleRenameTemplateDialog(template.name)}>
                                                    <UpdateIcon>
                                                    </UpdateIcon>
                                                
                                                </IconButton>
                                            
                                            </Tooltip>
                                        
                                            <Tooltip title="Delete template" enterDelay={500}>
                                                <IconButton aria-label="Delete" onClick={() =>
                                                    this.handleRemoveTemplateDialog(template.name)}>
                                                    <DeleteIcon>
                                                    </DeleteIcon>
                                                
                                                </IconButton>
                                            
                                            </Tooltip>
                                        
                                        </ListItemSecondaryAction>
                                    
                                    </ListItem>
                                )
                            ;
                        })
                    }</List>
                
                </div>
            )
        ;
    }
}

export default withStyles(styles)(Template)
