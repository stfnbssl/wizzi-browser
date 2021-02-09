/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\MonacoDiff.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import * as monaco from 'monaco-editor';
function noop() {
}
const styles = theme => (
    {});

class MonacoDiff extends React.Component {
    componentDidMount() {
        this.initMonaco();
    }
    componentWillUnmount() {
        this.destroyMonaco();
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            originalModel,
            modifiedModel
        } = this.props;
        var obj_originalModel = monaco.editor.createModel(originalModel);
        var obj_modifiedModel = monaco.editor.createModel(modifiedModel);
        this.diffEditor.setModel({
            original: obj_originalModel, 
            modified: obj_modifiedModel
        });
    }
    initMonaco() {
        // called by -> did-mount
        // log 'initMonaco', this.containerElement
        const { originalModel, modifiedModel } = this.props;
        if (this.containerElement) {
            this.diffEditor = monaco.editor.createDiffEditor(this.containerElement, {
                enableSplitViewResizing: false, 
                renderSideBySide: true
            });
            var obj_originalModel = monaco.editor.createModel(originalModel);
            var obj_modifiedModel = monaco.editor.createModel(modifiedModel);
            this.diffEditor.setModel({
                original: obj_originalModel, 
                modified: obj_modifiedModel
            });
            /**
                STOP
                const navi = this.navi = monaco.editor.createDiffNavigator(this.diffEditor, {
                     resets the navigator state when the user selects something in the editor
                    followsCaret: true, 
                     jump from line to line
                    ignoreCharChanges: true
                });
                window.setInterval(function() {
                    navi.next();
                }, 2000)*/
        }
    }
    destroyMonaco() {
        // called by -> will-unmount
        /**
            TODO VIA???
            if (typeof this.diffEditor !== 'undefined') {
                this.diffEditor.dispose();
            }
            if (typeof this.navi !== 'undefined') {
                this.navi.dispose();
            }
        */
    }
    assignRef = (component) => {
        // log 'assignRef', component
        if (component) {
            this.containerElement = component;
        }
    }
    render() {
        const {
            width,
            height
        } = this.props;
        const fixedWidth = width.toString().indexOf('%') !== -1 ? width : `${width}px`;
        const fixedHeight = height.toString().indexOf('%') !== -1 ? height : `${height}px`;
        const style = {
            width: fixedWidth, 
            height: fixedHeight, 
            padding: '4px'
        };
        return  (
                <div className="react-monaco-editor-container" ref={this.assignRef} style={style}>
                </div>
            )
        ;
    }
}

MonacoDiff.propTypes = {
    width: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
    ,
    height: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
    ,
    originalModel: PropTypes.string.isRequired,
    modifiedModel: PropTypes.string.isRequired
}

MonacoDiff.defaultProps  = {
    width: '100%',
    height: '100%'
}

export default withStyles(styles)(MonacoDiff)
