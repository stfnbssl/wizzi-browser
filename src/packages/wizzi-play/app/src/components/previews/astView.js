/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\previews\astView.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ReactJson from 'react-json-view';
import MonacoEditor from '../MonacoEditor';
var styles = {
    overflow: 'auto'
};
class AstView extends React.Component {
    render() {
        const {
            codeAST,
            width,
            height
        } = this.props;
        console.log('AstView.render.codeAST', codeAST);
        var astString;
        try {
            astString = JSON.stringify(codeAST, null, 2);
        } 
        catch (ex) {
            astString = 'Cannot stringify AST. Error: ' + (ex && ex.message);
        } 
        return  (
                <div style={styles}>
                    <MonacoEditor value={ astString } width={ width } height={ height } theme='vs-dark'>
                    </MonacoEditor>
                
                </div>
            )
        ;
    }
}

export default withStyles(styles)(AstView)
