/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\_old_mui\Splitter.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../withRoot';
function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            window.getSelection().empty()
        }
        else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges()
        }
    }
    else if (document.selection) {
        document.selection.empty();
    }
}

const DEFAULT_SPLITTER_SIZE = 4;

class Pane extends React.Component {
    render() {
        const size = this.props.size || 0;
        const { percentage, primary, split, children } = this.props;
        const unit = percentage ? '%' : 'px';
        let classes = 'layout-pane';
        const style = {};
        if (!primary) {
            if (split === 'horizontal') {
                style.height = size + unit;
            }
            else {
                style.width = size + unit;
            }
        }
        else {
            classes += ' layout-pane-primary';
        }
        return  (
                <div className={classes} style={style}>
                {children}</div>
            )
        ;
    }
}

Pane.propTypes = {
    split: PropTypes.string,
    primary: PropTypes.bool,
    size: PropTypes.number,
    percentage: PropTypes.bool,
    children: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.node
    ])
    
}

Pane.defaultProps  = {
    split: 'vertical',
    primary: false,
    size: 0,
    percentage: false,
    children: []
}

const styles = theme => (
    {
        'splitter-layout': {
            display: 'flex', 
            flexDirection: 'row', 
            width: '100%', 
            height: 'calc(100% + 10px)', 
            overflow: 'hidden', 
            '& .layout-pane': {
                position: "relative", 
                flex: "0 0 auto", 
                overflow: "auto", 
                '&.layout-pane-primary': {
                    flex: '1 1 auto'
                }
            }, 
            '& > .layout-splitter': {
                flex: '0 0 auto', 
                width: '18px', 
                height: 'calc(100% - 10px)', 
                cursor: 'col-resize', 
                backgroundColor: '#343436', 
                '&:hover': {
                    backgroundColor: '#565658'
                }
            }, 
            '& .layout-changing': {
                cursor: 'col-resize', 
                '& > .layout-splitter': {
                    backgroundColor: '#aaa'
                }
            }, 
            '& .splitter-layout-vertical': {
                flexDirection: 'column', 
                '&.layout-changing': {
                    cursor: 'row-resize'
                }, 
                '& > .layout-splitter': {
                    width: '100%', 
                    height: '4px', 
                    cursor: 'row-resize'
                }
            }
        }
    });

class Splitter extends React.Component {
    constructor(props) {
        super(props);
         (
            <base>
            props
            </base>
        )
        this.handleResize = this.handleResize.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleSplitterMouseDown = this.handleSplitterMouseDown.bind(this);
        this.state = {
            secondaryPaneSize: 0, 
            resizing: false
        };
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', this.handleMouseMove);
        var secondaryPaneSize;
        if (typeof (this.props.secondaryInitialSize) !== 'undefined') {
            secondaryPaneSize = this.props.secondaryInitialSize;
        }
        else {
            var containerRect = this.container.getBoundingClientRect();
            var splitterRect;
            if (this.splitter) {
                splitterRect = this.splitter.getBoundingClientRect();
            }
            else {
                splitterRect = {
                    width: DEFAULT_SPLITTER_SIZE, 
                    height: DEFAULT_SPLITTER_SIZE
                };
            }
            secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: containerRect.left + ((containerRect.width - splitterRect.width) / 2), 
                top: containerRect.top + ((containerRect.height - splitterRect.height) / 2)
            }, false);
        }
        this.setState({
            secondaryPaneSize: secondaryPaneSize
        });
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
    getSecondaryPaneSize(containerRect, splitterRect, clientPosition, offsetMouse) {
        var totalSize;
        var splitterSize;
        var offset;
        if (this.props.split === 'horizontal') {
            totalSize = containerRect.height;
            splitterSize = splitterRect.height;
            offset = clientPosition.top - containerRect.top;
        }
        else {
            totalSize = containerRect.width;
            splitterSize = splitterRect.width;
            offset = clientPosition.left - containerRect.left;
        }
        if (offsetMouse) {
            offset -= splitterSize / 2;
        }
        if (offset < 0) {
            offset = 0;
        }
        else if (offset > totalSize - splitterSize) {
            offset = totalSize - splitterSize;
        }
        var secondaryPaneSize;
        if (this.props.primaryIndex === 1) {
            secondaryPaneSize = offset;
        }
        else {
            secondaryPaneSize = totalSize - splitterSize - offset;
        }
        var primaryPaneSize = totalSize - splitterSize - secondaryPaneSize;
        if (this.props.percentage) {
            secondaryPaneSize = secondaryPaneSize * 100 / totalSize;
            primaryPaneSize = primaryPaneSize * 100 / totalSize;
            splitterSize = splitterSize * 100 / totalSize;
            totalSize = 100;
        }
        if (primaryPaneSize < this.props.primaryMinSize) {
            secondaryPaneSize = Math.max(secondaryPaneSize - this.props.primaryMinSize - primaryPaneSize, 0);
        }
        else if (secondaryPaneSize < this.props.secondaryMinSize) {
            secondaryPaneSize = Math.min(totalSize - splitterSize - this.props.primaryMinSize, this.props.secondaryMinSize);
        }
        return secondaryPaneSize;
    }
    handleResize = () => {
        if (this.splitter && !this.props.percentage) {
            const containerRect = this.container.getBoundingClientRect();
            const splitterRect = this.splitter.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: splitterRect.left, 
                top: splitterRect.top
            }, false);
            this.setState({
                secondaryPaneSize
            });
        }
    }
    handleMouseMove = (e) => {
        if (this.state.resizing) {
            const containerRect = this.container.getBoundingClientRect();
            const splitterRect = this.splitter.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: e.clientX, 
                top: e.clientY
            }, true);
            clearSelection();
            this.setState({
                secondaryPaneSize
            });
        }
    }
    handleSplitterMouseDown = () => {
        // log 'handleSplitterMouseDown'
        clearSelection();
        this.setState({
            resizing: true
        });
    }
    handleMouseUp = () => {
        this.setState({
            resizing: false
        });
    }
    render() {
        const classes = this.props.classes;
        // log 'Splitter.render.classes', classes
        let containerClasses = [classes['splitter-layout']];
        if (this.props.customClassName) {
            containerClasses.push(this.props.customClassName);
        }
        if (this.props.split === 'horizontal') {
            containerClasses.push('splitter-layout-vertical');
        }
        if (this.state.resizing) {
            containerClasses.push('layout-changing');
        }
        const children = React.Children.toArray(this.props.children).slice(0, 2);
        if (children.length === 0) {
            children.push(
                <div>
                </div>
            );
        }
        const wrappedChildren = [];
        const primaryIndex = (this.props.primaryIndex !== 0 && this.props.primaryIndex !== 1) ? 0 : this.props.primaryIndex;
        for (let i = 0; i < children.length; ++i) {
            let primary = true;
            let size = null;
            if (children.length > 1 && i !== primaryIndex) {
                primary = false;
                size = this.state.secondaryPaneSize;
            }
            wrappedChildren.push(
                <Pane split={this.props.split} percentage={this.props.percentage} primary={primary} size={size}>
                {children[i]}</Pane>
            );
        }
        return  (
                <div className={containerClasses.join(' ')} ref={(c) =>
                    this.container = c}>
                {wrappedChildren[0]}{
                    wrappedChildren.length > 1 &&  (
                        <div className="layout-splitter" ref={(c) =>
                            this.splitter = c} onMouseDown={this.handleSplitterMouseDown}>
                        </div>
                    )
                    
                }{
                    wrappedChildren.length > 1 && wrappedChildren[1]
                }</div>
            )
        ;
    }
}

Splitter.propTypes = {
    customClassName: PropTypes.string,
    split: PropTypes.string,
    percentage: PropTypes.bool,
    primaryIndex: PropTypes.number,
    primaryMinSize: PropTypes.number,
    secondaryInitialSize: PropTypes.number,
    secondaryMinSize: PropTypes.number,
    children: PropTypes.array
}

Splitter.defaultProps  = {
    customClassName: '',
    split: 'vertical',
    percentage: false,
    primaryIndex: 0,
    primaryMinSize: 0,
    secondaryInitialSize: undefined,
    secondaryMinSize: 0,
    children: []
}

export default withStyles(styles)(Splitter)
