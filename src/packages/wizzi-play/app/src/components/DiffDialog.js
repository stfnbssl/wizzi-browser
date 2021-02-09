/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\DiffDialog.js.ittf
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
import MonacoDiff from './MonacoDiff';
const styles = theme => (
    {});

class DiffDialog extends React.Component {
    handleClose = () => {
    }
    render() {
        const {
            open,
            originalModel,
            modifiedModel,
            onCancel
        } = this.props;
        return  (
                <div>
                    <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth={false}>
                        <DialogTitle id="form-dialog-title">
                        Diff<hr>
                            </hr>
                        
                        </DialogTitle>
                    
                        <DialogContent>
                            <MonacoDiff originalModel={originalModel} modifiedModel={modifiedModel} width={ 1100 } height={ 700 }>
                            </MonacoDiff>
                        
                            <DialogActions>
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

export default withStyles(styles)(DiffDialog)
