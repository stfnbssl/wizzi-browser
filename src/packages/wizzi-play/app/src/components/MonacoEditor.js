/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\MonacoEditor.js.ittf
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

class MonacoEditor extends React.Component {
    constructor(props) {
        super(props);
        this.containerElement = null;
        this.__current_value = props.value;
    }
    componentDidMount() {
        this.initMonaco();
    }
    componentDidUpdate(prevProps, prevState) {
        const {
            value,
            language,
            theme,
            width,
            height
        } = this.props;
        if (value !== this.__current_value) {
            // Always refer to the latest value
            this.__current_value = value;
            // Consider the situation of rendering 1+ times before the editor mounted
            if (this.editor) {
                this.__prevent_trigger_change_event = true;
                this.editor.setValue(this.__current_value);
                this.__prevent_trigger_change_event = false;
            }
        }
        if (language !== prevProps.language) {
            monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
        }
        if (theme !== prevProps.theme) {
            monaco.editor.setTheme(this.props.theme);
        }
        if (this.editor && (width !== prevProps.width || height !== prevProps.height)) {
            this.editor.layout();
        }
    }
    componentWillUnmount() {
        this.destroyMonaco();
    }
    editorWillMount() {
        // called by -> did-mount -> initMonaco (before editor create)
        this.props.editorWillMount(monaco);
    }
    editorDidMount(editor) {
        // called by -> did-mount -> initMonaco (after editor create)
        this.props.editorDidMount(editor, monaco);
        editor.onDidChangeModelContent((e) => {
            const value = editor.getValue();
            // Always refer to the latest value
            this.__current_value = value;
            // Only invoking when user input changed
            if (!this.__prevent_trigger_change_event) {
                this.props.onChange(value, event);
            }
        });
    }
    initMonaco() {
        // called by -> did-mount
        // log 'initMonaco', this.containerElement
        const value = this.props.value !== null ? this.props.value : this.props.defaultValue;
        const { language, theme, options } = this.props;
        if (this.containerElement) {
            // Before initializing monaco editor
            this.editorWillMount();
            this.editor = monaco.editor.create(this.containerElement, {
                value, 
                language, 
                ...options
            });
            if (theme) {
                // log 'monaco.setTheme', theme
                monaco.editor.setTheme(theme);
            }
            // After initializing monaco editor
            this.editorDidMount(this.editor);
        }
    }
    destroyMonaco() {
        // called by -> will-unmount
        if (typeof this.editor !== 'undefined') {
            this.editor.dispose();
        }
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

MonacoEditor.propTypes = {
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
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    language: PropTypes.string,
    theme: PropTypes.string,
    options: PropTypes.object,
    editorDidMount: PropTypes.func,
    editorWillMount: PropTypes.func,
    onChange: PropTypes.func
}

MonacoEditor.defaultProps  = {
    width: '100%',
    height: '100%',
    value: null,
    defaultValue: '',
    language: 'javascript',
    theme: 'vs-dark',
    options: {},
    editorDidMount: noop,
    editorWillMount: noop,
    onChange: noop
}

export default withStyles(styles)(MonacoEditor)
