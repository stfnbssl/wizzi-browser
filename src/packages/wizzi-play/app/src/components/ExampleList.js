/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\ExampleList.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, List, ListItem, ListItemText, ListItemSecondaryAction, Tooltip, IconButton, TextField, InputAdornment , Select, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
const NO_CONFIRM = 0;
const REMOVE_CONFIRM = 1;
const RENAME_CONFIRM = 2;
const ADD_CONFIRM = 3;
const styles = theme => (
    {
        selected: {
            color: 'red'
        }
    });

class ExampleList extends React.Component {
    state = {
        openAddRenameDelete: false, 
        confirmState: NO_CONFIRM, 
        newExample: '', 
        oldExample: '', 
        rendelExample: '', 
        selectedTemplate: '-- None'
    };
    handleNewExampleChange = (event) => {
        this.setState({
            ...this.state, 
            newExample: event.target.value
        });
    }
    handleRenDelExampleChange = (event) => {
        this.setState({
            ...this.state, 
            rendelExample: event.target.value
        });
    }
    handleAddExampleDialog = (example) => {
        this.setState({
            ...this.state, 
            confirmState: ADD_CONFIRM, 
            openAddRenameDelete: true, 
            rendelExample: this.state.newExample
        });
    }
    handleSelectTemplate = (e) => {
        this.setState({
            ...this.state, 
            selectedTemplate: e.target.value
        });
    }
    handleRemoveExampleDialog = (example) => {
        this.setState({
            ...this.state, 
            confirmState: REMOVE_CONFIRM, 
            openAddRenameDelete: true, 
            rendelExample: example
        });
    }
    handleRenameExampleDialog = (example) => {
        this.setState({
            ...this.state, 
            confirmState: RENAME_CONFIRM, 
            openAddRenameDelete: true, 
            oldExample: example, 
            rendelExample: example
        });
    }
    handleCloseAddRenameDelete = () => {
        this.setState({
            ...this.state, 
            confirmState: NO_CONFIRM, 
            openAddRenameDelete: false
        });
    }
    handleAddExample = () => {
        const {
            onAddExample
        } = this.props;
        if (this.state.newExample && this.state.newExample.length > 0) {
            var templateName = this.state.selectedTemplate === '-- None' ? '' : this.state.selectedTemplate;
            onAddExample(this.state.newExample, templateName);
        }
    }
    handleRenameExample = () => {
        const {
            onRenameExample
        } = this.props;
        if (this.state.rendelExample && this.state.rendelExample.length > 0 && this.state.rendelExample !== this.state.oldExample) {
            onRenameExample(this.state.oldExample, this.state.rendelExample);
        }
    }
    handleRemoveExample = () => {
        const {
            onRemoveExample
        } = this.props;
        if (this.state.rendelExample && this.state.rendelExample.length > 0) {
            onRemoveExample(this.state.rendelExample);
        }
    }
    render() {
        const {
            classes,
            schema,
            examples,
            templates
        } = this.props;
        // prop selectedName
        const { newExample, selectedTemplate, rendelExample, openAddRenameDelete, confirmState } = this.state;
        const templatesForSelect = [{ name: '-- None'}].concat(templates);
        return  (
                <div>
                    <Dialog open={openAddRenameDelete} onClose={this.handleCloseAddRenameDelete}>
                        <DialogTitle>
                        {
                            confirmState == ADD_CONFIRM &&  (
                                <p>
                                Create example: { rendelExample }
                                </p>
                            )
                            
                        }{
                            confirmState == REMOVE_CONFIRM &&  (
                                <p>
                                Remove example: { rendelExample }
                                </p>
                            )
                            
                        }{
                            confirmState == RENAME_CONFIRM &&  (
                                <p>
                                Rename example: { rendelExample }
                                </p>
                            )
                            
                        }</DialogTitle>
                    
                        <DialogContent>
                        {
                            confirmState == ADD_CONFIRM &&  (
                                <div>
                                    <p>
                                    Select template
                                    </p>
                                
                                    <Select value={ selectedTemplate } onChange={this.handleSelectTemplate}>
                                    {
                                        templatesForSelect.map((item) => {
                                            return  (
                                                    <MenuItem value={item.name} key={item.name}>
                                                    {item.name}</MenuItem>
                                                )
                                            ;
                                        })
                                    }</Select>
                                
                                </div>
                            )
                            
                        }{
                            confirmState == RENAME_CONFIRM &&  (
                                <TextField autoFocus margin="dense" id="exampleName" label={ 'new name' } type="textfield" fullWidth value={rendelExample} onChange={this.handleRenDelExampleChange} InputProps={{
                                    endAdornment:  (
                                        <InputAdornment position="end">
                                        { schema + '.ittf' }</InputAdornment>
                                    )
                                    
                                }}>
                                </TextField>
                            )
                            
                        }<DialogActions>
                                <Button onClick={this.handleCloseAddRenameDelete} color="primary">
                                Cancel</Button>
                            
                            {
                                confirmState == ADD_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleAddExample()} color="primary">
                                    Confirm create</Button>
                                )
                                
                            }{
                                confirmState == RENAME_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRenameExample()} color="primary">
                                    Confirm rename</Button>
                                )
                                
                            }{
                                confirmState == REMOVE_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRemoveExample()} color="primary">
                                    Confirm remove</Button>
                                )
                                
                            }</DialogActions>
                        
                        </DialogContent>
                    
                    </Dialog>
                
                    <DialogTitle>
                    Add, rename or remove examples</DialogTitle>
                
                    <TextField autoFocus margin="dense" id="exampleName" label={ 'new example' } type="textfield" fullWidth value={newExample} onChange={this.handleNewExampleChange} InputProps={{
                        endAdornment:  (
                            <InputAdornment position="end">
                                <Tooltip title="Add new example" enterDelay={500}>
                                    <IconButton aria-label="Add" onClick={() =>
                                        this.handleAddExampleDialog()}>
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
                        examples.map((example) => {
                            return  (
                                    <ListItem key={example.name} disableGutters onClick={() =>
                                        this.handleRenameExampleDialog(example.name)}>
                                        <ListItemText primary={schema + '/' + example.name }>
                                        </ListItemText>
                                    
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Rename example" enterDelay={500}>
                                                <IconButton aria-label="Update" onClick={() =>
                                                    this.handleRenameExampleDialog(example.name)}>
                                                    <UpdateIcon>
                                                    </UpdateIcon>
                                                
                                                </IconButton>
                                            
                                            </Tooltip>
                                        
                                            <Tooltip title="Delete example" enterDelay={500}>
                                                <IconButton aria-label="Delete" onClick={() =>
                                                    this.handleRemoveExampleDialog(example.name)}>
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

export default withStyles(styles)(ExampleList)
