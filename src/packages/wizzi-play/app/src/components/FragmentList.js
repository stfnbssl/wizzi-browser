/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\FragmentList.js.ittf
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

class Fragment extends React.Component {
    state = {
        openRenameDelete: false, 
        confirmState: NO_CONFIRM, 
        newFragment: '', 
        oldFragment: '', 
        rendelFragment: ''
    };
    handleNewFragmentChange = (event) => {
        this.setState({
            ...this.state, 
            newFragment: event.target.value
        });
    }
    handleRenDelFragmentChange = (event) => {
        this.setState({
            ...this.state, 
            rendelFragment: event.target.value
        });
    }
    handleAddFragmentDialog = (fragment) => {
        this.setState({
            ...this.state, 
            confirmState: ADD_CONFIRM, 
            openAddDelete: true, 
            rendelFragment: fragment
        });
    }
    handleRemoveFragmentDialog = (fragment) => {
        this.setState({
            ...this.state, 
            confirmState: REMOVE_CONFIRM, 
            openRenameDelete: true, 
            rendelFragment: fragment
        });
    }
    handleRenameFragmentDialog = (fragment) => {
        this.setState({
            ...this.state, 
            confirmState: RENAME_CONFIRM, 
            openRenameDelete: true, 
            oldFragment: fragment, 
            rendelFragment: fragment
        });
    }
    handleCloseRenameDelete = () => {
        this.setState({
            ...this.state, 
            confirmState: NO_CONFIRM, 
            openRenameDelete: false
        });
    }
    handleAddFragment = () => {
        const {
            onAddFragment
        } = this.props;
        if (this.state.newFragment && this.state.newFragment.length > 0) {
            onAddFragment(this.state.newFragment);
        }
    }
    handleRenameFragment = () => {
        const {
            onRenameFragment
        } = this.props;
        if (this.state.rendelFragment && this.state.rendelFragment.length > 0 && this.state.rendelFragment !== this.state.oldFragment) {
            onRenameFragment(this.state.oldFragment, this.state.rendelFragment);
        }
    }
    handleRemoveFragment = () => {
        const {
            onRemoveFragment
        } = this.props;
        if (this.state.rendelFragment && this.state.rendelFragment.length > 0) {
            onRemoveFragment(this.state.rendelFragment);
        }
    }
    render() {
        const {
            classes,
            schema,
            fragments
        } = this.props;
        // prop selectedName
        const { newFragment, rendelFragment, openRenameDelete, confirmState } = this.state;
        return  (
                <div>
                    <Dialog open={openRenameDelete} onClose={this.handleCloseRenameDelete}>
                        <DialogTitle>
                        {
                            confirmState == REMOVE_CONFIRM &&  (
                                <p>
                                Remove fragment: { rendelFragment }
                                </p>
                            )
                            
                        }{
                            confirmState == RENAME_CONFIRM &&  (
                                <p>
                                Rename fragment: { rendelFragment }
                                </p>
                            )
                            
                        }</DialogTitle>
                    
                        <DialogContent>
                        {
                            confirmState == RENAME_CONFIRM &&  (
                                <TextField autoFocus margin="dense" id="fragmentName" label={ 'new name' } type="textfield" fullWidth value={rendelFragment} onChange={this.handleRenDelFragmentChange} InputProps={{
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
                                        this.handleRenameFragment()} color="primary">
                                    Confirm rename</Button>
                                )
                                
                            }{
                                confirmState == REMOVE_CONFIRM &&  (
                                    <Button onClick={() =>
                                        this.handleRemoveFragment()} color="primary">
                                    Confirm remove</Button>
                                )
                                
                            }</DialogActions>
                        
                        </DialogContent>
                    
                    </Dialog>
                
                    <DialogTitle>
                    Add, rename or remove fragments</DialogTitle>
                
                    <TextField autoFocus margin="dense" id="fragmentName" label={ 'new fragment' } type="textfield" fullWidth value={newFragment} onChange={this.handleNewFragmentChange} InputProps={{
                        endAdornment:  (
                            <InputAdornment position="end">
                                <Tooltip title="Add new fragment" enterDelay={500}>
                                    <IconButton aria-label="Add" onClick={ this.handleAddFragment }>
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
                        fragments.map((fragment) => {
                            return  (
                                    <ListItem key={fragment.name} disableGutters onClick={() =>
                                        this.handleRenameFragmentDialog(fragment.name)}>
                                        <ListItemText primary={schema + '/' + fragment.name }>
                                        </ListItemText>
                                    
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Rename fragment" enterDelay={500}>
                                                <IconButton aria-label="Update" onClick={() =>
                                                    this.handleRenameFragmentDialog(fragment.name)}>
                                                    <UpdateIcon>
                                                    </UpdateIcon>
                                                
                                                </IconButton>
                                            
                                            </Tooltip>
                                        
                                            <Tooltip title="Delete fragment" enterDelay={500}>
                                                <IconButton aria-label="Delete" onClick={() =>
                                                    this.handleRemoveFragmentDialog(fragment.name)}>
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

export default withStyles(styles)(Fragment)
