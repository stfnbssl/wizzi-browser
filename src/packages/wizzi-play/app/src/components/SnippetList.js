/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\SnippetList.js.ittf
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

class SnippetList extends React.Component {
    state = {
        openRenameDelete: false, 
        confirmState: NO_CONFIRM, 
        newSnippet: '', 
        oldSnippet: '', 
        rendelSnippet: ''
    };
    handleNewSnippetChange = (event) => {
        this.setState({
            ...this.state, 
            newSnippet: event.target.value
        });
    }
    handleRenDelSnippetChange = (event) => {
        this.setState({
            ...this.state, 
            rendelSnippet: event.target.value
        });
    }
    handleRemoveSnippetDialog = (snippet) => {
        this.setState({
            ...this.state, 
            confirmState: REMOVE_CONFIRM, 
            openRenameDelete: true, 
            rendelSnippet: snippet
        });
    }
    handleRenameSnippetDialog = (snippet) => {
        this.setState({
            ...this.state, 
            confirmState: RENAME_CONFIRM, 
            openRenameDelete: true, 
            oldSnippet: snippet, 
            rendelSnippet: snippet
        });
    }
    handleCloseRenameDelete = () => {
        this.setState({
            ...this.state, 
            confirmState: NO_CONFIRM, 
            openRenameDelete: false
        });
    }
    handleAddSnippet = () => {
        const {
            onAddSnippet
        } = this.props;
        if (this.state.newSnippet && this.state.newSnippet.length > 0) {
            onAddSnippet(this.state.newSnippet);
        }
    }
    handleRenameSnippet = () => {
        const {
            onRenameSnippet
        } = this.props;
        if (this.state.rendelSnippet && this.state.rendelSnippet.length > 0 && this.state.rendelSnippet !== this.state.oldSnippet) {
            onRenameSnippet(this.state.oldSnippet, this.state.rendelSnippet);
        }
    }
    handleRemoveSnippet = () => {
        const {
            onRemoveSnippet
        } = this.props;
        if (this.state.rendelSnippet && this.state.rendelSnippet.length > 0) {
            onRemoveSnippet(this.state.rendelSnippet);
        }
    }
    render() {
        const {
            classes,
            schema,
            snippets
        } = this.props;
        // prop selectedName
        const { newSnippet, rendelSnippet, openRenameDelete, confirmState } = this.state;
        return  (
                <div>
                    <Dialog open={openRenameDelete} onClose={this.handleCloseRenameDelete}>
                        <DialogTitle>
                        {
                            confirmState == REMOVE_CONFIRM &&  (
                                <p>
                                Remove snippet: { rendelSnippet }
                                </p>
                            )
                            
                        }{
                            confirmState == RENAME_CONFIRM &&  (
                                <p>
                                Rename snippet: { rendelSnippet }
                                </p>
                            )
                            
                        }</DialogTitle>
                    
                        <DialogContent>
                        {
                            confirmState == RENAME_CONFIRM &&  (
                                <TextField autoFocus margin="dense" id="snippetName" label={ 'new name' } type="textfield" fullWidth value={rendelSnippet} onChange={this.handleRenDelSnippetChange} InputProps={{
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
                                        this.handleRenameSnippet()} color="primary">
                                    Confirm rename</Button>
                                )
                                
                            }{
                                confirmState == REMOVE_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRemoveSnippet()} color="primary">
                                    Confirm remove</Button>
                                )
                                
                            }</DialogActions>
                        
                        </DialogContent>
                    
                    </Dialog>
                
                    <DialogTitle>
                    Add, rename or remove snippets</DialogTitle>
                
                    <TextField autoFocus margin="dense" id="snippetName" label={ 'new snippet' } type="textfield" fullWidth value={newSnippet} onChange={this.handleNewSnippetChange} InputProps={{
                        endAdornment:  (
                            <InputAdornment position="end">
                                <Tooltip title="Add new snippet" enterDelay={500}>
                                    <IconButton aria-label="Add" onClick={ this.handleAddSnippet }>
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
                        snippets.map((snippet) => {
                            return  (
                                    <ListItem key={snippet.name} disableGutters onClick={() =>
                                        this.handleRenameSnippetDialog(snippet.name)}>
                                        <ListItemText primary={schema + '/' + snippet.name }>
                                        </ListItemText>
                                    
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Rename snippet" enterDelay={500}>
                                                <IconButton aria-label="Update" onClick={() =>
                                                    this.handleRenameSnippetDialog(example.name)}>
                                                    <UpdateIcon>
                                                    </UpdateIcon>
                                                
                                                </IconButton>
                                            
                                            </Tooltip>
                                        
                                            <Tooltip title="Delete snippet" enterDelay={500}>
                                                <IconButton aria-label="Delete" onClick={() =>
                                                    this.handleRemoveSnippetDialog(snippet.name)}>
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

export default withStyles(styles)(SnippetList)
