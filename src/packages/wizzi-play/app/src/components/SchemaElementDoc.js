/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\components\SchemaElementDoc.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
function showTags(name, tags) {
    return tags.filter((tag) => {
            return tag != name;
        });
}
var Comments = ({ comments: c }) => {
    if (!c || !c.length) {
        return null;
    }
    else {
        return  (
                <div className="hb-sch-doc-comments-box">
                {
                    c.map((comment) => {
                        return  (
                                <div>
                                { comment }
                                </div>
                            )
                        ;
                    })
                }</div>
            )
        ;
    }
};
var Flags = ({ flags }) => {
    if (!flags || !flags.length) {
        return null;
    }
    else {
        return  (
                <span>
                {flags}
                </span>
            )
        ;
    }
};
var Attribute = ({ attribute: a }) => {
    var xrestricts = null;
    if (a.restricts.length > 0) {
        var facets = [];
        var i, i_items=a.restricts, i_len=a.restricts.length, r;
        for (i=0; i<i_len; i++) {
            r = a.restricts[i];
            var j, j_items=r.facets, j_len=r.facets.length, f;
            for (j=0; j<j_len; j++) {
                f = r.facets[j];
                facets.push(f);
            }
        }
        xrestricts =  (
            <div>
                <span className="hb-sch-doc-e-subtitle-2">
                Restrict facets
                </span>
            
                <div className="hb-sch-doc-restricts-box">
                    <table className="hb-sch-doc-table">
                        <tbody>
                        {
                            facets.map((facet) => {
                                const type = facet.type.substr(0, facet.type.length - 5);
                                return  (
                                        <tr>
                                            <td>
                                            {type}
                                            </td>
                                        
                                            <td>
                                            {facet.value}
                                            </td>
                                        
                                            <td>
                                                <Comments comments={facet.comments}>
                                                </Comments>
                                            
                                            </td>
                                        
                                        </tr>
                                    )
                                ;
                            })
                        }</tbody>
                    
                    </table>
                
                </div>
            
            </div>
        )
        ;
    }
    return  (
            <tr key={a.name}>
                <td>
                {a.name}
                </td>
            
                <td>
                {showTags(a.name, a.tags).join(' | ')}
                </td>
            
                <td>
                {a.type}
                </td>
            
                <td>
                {a.default}
                </td>
            
                <td>
                    <Flags flags={a.flags}>
                    </Flags>
                
                </td>
            
                <td>
                    <Comments comments={a.comments}>
                    </Comments>
                
                {xrestricts}</td>
            
            </tr>
        )
    ;
};
var Relation = ({ relation: r }) => {
    return  (
            <tr key={r.name}>
                <td>
                {r.name}
                </td>
            
                <td>
                {r.role}
                </td>
            
                <td>
                {r.flags}
                </td>
            
                <td>
                {r.cardinality}
                </td>
            
                <td>
                {r.inheritedFrom}
                </td>
            
            </tr>
        )
    ;
};
var Method = ({ method: m }) => {
    var Statement = ({ statement: s, level }) => {
        const sStyle = {
            paddingLeft: level * 5 + 'px'
        };
        return  (
                <div className="pp-ln" style={ sStyle }>
                    <span className="pp-tag">
                    {s.tag + ' '}
                    </span>
                
                    <span className="pp-pln">
                    {s.value}
                    </span>
                
                {
                    s.statements && s.statements.length > 0 && s.statements.map((statement) => {
                        return  (
                                <Statement statement={statement} level={ level + 1 }>
                                </Statement>
                            )
                        ;
                    })
                }</div>
            )
        ;
    };
    return  (
            <div>
                <div>
                    <span className="hb-sch-doc-label-3">
                    { 'method ' }
                    </span>
                
                    <span className="hb-sch-doc-title-3">
                    {m.name}
                    </span>
                
                    <span className="hb-sch-doc-title-3">
                    { m.isStatic ? 'static ' : '' }
                    </span>
                
                    <span className="hb-sch-doc-label-3">
                    { m.isKnownMethod ? ' (known method) ' : '' }
                    </span>
                
                </div>
            
                <div >
                    <pre>
                    {
                        m.statements.map((statement) => {
                            return  (
                                    <Statement statement={statement} level={ 2 }>
                                    </Statement>
                                )
                            ;
                        })
                    }</pre>
                
                </div>
            
            </div>
        )
    ;
};
const styles = theme => (
    {
        container: {
            display: 'flex', 
            flexWrap: 'wrap'
        }, 
        input: {
            margin: theme.spacing.unit
        }
    });

class SchemaElementDoc extends React.Component {
    render() {
        const {
            classes,
            element : e
        } = this.props;
        return  (
                <div className="hb-sch-doc-box" id={ 'e-' + e.name} name={ 'e-' + e.name}>
                    <div>
                        <span className="hb-sch-doc-label-2">
                        { 'element '}
                        </span>
                    
                        <span className="hb-sch-doc-title-2">
                        { e.name }
                        </span>
                    
                    {
                        e.super &&  (
                            <span className="hb-sch-doc-title-2">
                            { ' : ' + e.super }
                            </span>
                        )
                        
                    }</div>
                
                {
                    showTags(e.name, e.tags).length > 0 &&  (
                        <div>
                            <span className="hb-sch-doc-label-2">
                            { 'tag '}
                            </span>
                        
                            <span className="hb-sch-doc-title-2b">
                            { e.tags.join(' | ') }
                            </span>
                        
                        </div>
                    )
                    
                }{
                    e.isRoot &&  (
                        <div>
                            <span className="hb-sch-doc-title-2b">
                            { ' is-root '}
                            </span>
                        
                        </div>
                    )
                    
                }<div className="hb-sch-doc-element-box">
                        <Comments comments={e.comments}>
                        </Comments>
                    
                    {
                        e.attributes.length > 0 &&  (
                            <div>
                                <span className="hb-sch-doc-e-subtitle">
                                attributes
                                </span>
                            
                                <div className="hb-sch-doc-attributes-box">
                                    <table className="hb-sch-doc-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                name
                                                </th>
                                            
                                                <th>
                                                tag
                                                </th>
                                            
                                                <th>
                                                type
                                                </th>
                                            
                                                <th>
                                                default
                                                </th>
                                            
                                                <th>
                                                flags
                                                </th>
                                            
                                                <th>
                                                description
                                                </th>
                                            
                                            </tr>
                                        
                                        </thead>
                                    
                                        <tbody>
                                        {
                                            e.attributes.map((attribute) => {
                                                return  (
                                                        <Attribute attribute={attribute}>
                                                        </Attribute>
                                                    )
                                                ;
                                            })
                                        }</tbody>
                                    
                                    </table>
                                
                                </div>
                            
                            </div>
                        )
                        
                    }{
                        e.relations.length > 0 &&  (
                            <div>
                                <span className="hb-sch-doc-e-subtitle">
                                relations
                                </span>
                            
                                <div className="hb-sch-doc-relations-box">
                                    <table className="hb-sch-doc-table">
                                        <thead>
                                            <tr>
                                                <th>
                                                name
                                                </th>
                                            
                                                <th>
                                                role
                                                </th>
                                            
                                                <th>
                                                flags
                                                </th>
                                            
                                                <th>
                                                cardinality
                                                </th>
                                            
                                                <th>
                                                inherited
                                                </th>
                                            
                                            </tr>
                                        
                                        </thead>
                                    
                                        <tbody>
                                        {
                                            e.relations.map((relation) => {
                                                return  (
                                                        <Relation relation={relation}>
                                                        </Relation>
                                                    )
                                                ;
                                            })
                                        }</tbody>
                                    
                                    </table>
                                
                                </div>
                            
                            </div>
                        )
                        
                    }{
                        e.methods.length > 0 &&  (
                            <div>
                            {
                                e.methods.map((method) => {
                                    return  (
                                            <Method method={method}>
                                            </Method>
                                        )
                                    ;
                                })
                            }</div>
                        )
                        
                    }</div>
                
                </div>
            )
        ;
    }
}

SchemaElementDoc.propTypes = {
    element: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SchemaElementDoc)
