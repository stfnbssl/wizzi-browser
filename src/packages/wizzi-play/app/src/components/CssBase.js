/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\CssBase.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
const styles = theme => (
    {
        '@global': {
            'html': {
                WebkitFontSmoothing: 'antialiased', 
                MozOsxFontSmoothing: 'grayscale', 
                boxSizing: 'border-box'
            }, 
            '*, *::before, *::after': {
                boxSizing: 'inherit', 
                margin: 0, 
                padding: 0
            }, 
            'body': {
                margin: 0, 
                backgroundColor: theme.palette.background.default, 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                paddingBottom: '40px', 
                '@media print': {
                    backgroundColor: theme.palette.common.white
                }
            }, 
            '.main-header': {
                background: '#0a0c12', 
                borderBottom: '1px solid #222', 
                display: 'flex', 
                alignItems: 'middle', 
                position: 'relative', 
                zIndex: '11', 
                height: '65px'
            }, 
            '.footer': {
                height: '60px', 
                lineHeight: '1', 
                position: 'fixed', 
                bottom: '0', 
                width: '100%', 
                padding: '0 5px', 
                display: 'flex', 
                alignItems: 'center', 
                whiteSpace: 'nowrap', 
                color: '#9396A4', 
                backgroundColor: '#1d1f20', 
                borderTop: '1px solid #3F414B', 
                zIndex: '10'
            }
        }
    });

class CssBase extends React.Component {
    render() {
        return this.props.children;
    }
}

CssBase.propTypes = {
    children: PropTypes.node,
    classes: PropTypes.object.isRequired
}

CssBase.defaultProps  = {
    children: null
}

export default withStyles(styles)(CssBase)
