/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\db\wizziStore.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import path from 'path';
import FbFsClient from './fbFsClient';
import UpdatesQueue from './updatesQueue';
import PathNames from './pathNames';
import { normalizeFile, normalizeFolder, encodeDocName, decodeDocName } from './pathNames';
import verify from '../../utils/verify';
var wz = wizziStandalone.default;
window.wizzi = wz.wizzi;
window.wizziJs = wz.wizziJs;
window.wizziWeb = wz.wizziWeb;
window.wizziCore = wz.wizziCore;
window.wizziTools = wz.wizziTools;
import LRU from 'lru-cache';
const projectsCache = LRU({
    max: 300, 
    length: function (n, key) { return Object.keys(n).length }
});
const examplesCache = LRU({
    max: 100, 
    length: function (n, key) { return n.length }
});
const snippetsCache = LRU({
    max: 100, 
    length: function (n, key) { return n.length }
});
const fragmentsCache = LRU({
    max: 300, 
    length: function (n, key) { return n.length }
});
const templatesCache = LRU({
    max: 30, 
    length: function (n, key) { return n.length }
});
class WizziStore {
    constructor(project) {
        // not used
        this.userId = 'default';
        // not used
        this.project = project || 'default';
        this.schemas = null;
        this.fb = new FbFsClient();
        this.updatesQueue = new UpdatesQueue();
        this.pathNames = new PathNames(this.userId, this.project);
        this.uploadDelay = 3 * 1000;
    }
    init() {
        this.fb.init();
    }
    getSchemas(callback) {
        if (this.schemas != null) {
            return callback(null, this.schemas);
        }
        this.fb.getCollection(this.pathNames.schemasCollPath(), {}, (err, schemas) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getSchemas.schemas: ', schemas);
            this.schemas = {};
            var i, i_items=schemas, i_len=schemas.length, item;
            for (i=0; i<i_len; i++) {
                item = schemas[i];
                var schema = {
                    name: item.data.name, 
                    retrieved: false, 
                    examples: [
                        
                    ], 
                    fragments: [
                        
                    ], 
                    snippets: [
                        
                    ], 
                    templates: [
                        
                    ]
                };
                this.schemas[item.data.name] = schema;
            }
            console.log('WizziStore.getSchemas.this.schemas: ', this.schemas);
            return callback(null, this.schemas);
        });
    }
    retrieveSchema(schemaName, callback) {
        console.log('WizziStore.retrieveSchema', schemaName);
        var schema = this.schemas[schemaName];
        console.log('WizziStore.retrieveSchema', schemaName, schema);
        this.fb.getCollection(this.pathNames.examplesCollPath(schemaName), {}, (err, examples) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.retrieveSchema. examples: ', examples);
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                schema.examples.push({
                    id: item.id, 
                    name: item.data.name
                });
                console.log('WizziStore.retrieveSchema. schema.examples: ', schema.examples);
            }
            this.fb.getCollection(this.pathNames.snippetsCollPath(schemaName), {}, (err, snippets) => {
                if (err) {
                    return callback(err);
                }
                console.log('WizziStore.retrieveSchema. snippets: ', snippets);
                var i, i_items=snippets, i_len=snippets.length, item;
                for (i=0; i<i_len; i++) {
                    item = snippets[i];
                    schema.snippets.push({
                        id: item.id, 
                        name: item.data.name
                    });
                }
                console.log('WizziStore.retrieveSchema. schema.snippets: ', schema.snippets);
                this.fb.getCollection(this.pathNames.fragmentsCollPath(schemaName), {}, (err, fragments) => {
                    if (err) {
                        return callback(err);
                    }
                    var i, i_items=fragments, i_len=fragments.length, item;
                    for (i=0; i<i_len; i++) {
                        item = fragments[i];
                        schema.fragments.push({
                            id: item.id, 
                            name: item.data.name
                        });
                    }
                    console.log('WizziStore.retrieveSchema. schema.fragments: ', schema.fragments);
                    this.fb.getCollection(this.pathNames.templatesCollPath(schemaName), {}, (err, templates) => {
                        if (err) {
                            return callback(err);
                        }
                        var i, i_items=templates, i_len=templates.length, item;
                        for (i=0; i<i_len; i++) {
                            item = templates[i];
                            schema.templates.push({
                                id: item.id, 
                                name: item.data.name
                            });
                        }
                        console.log('WizziStore.retrieveSchema. schema.templates: ', schema.templates);
                        schema.retrieved = true;
                        return callback(null, schema);
                    });
                });
            });
        });
    }
    setSchemaExample(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.examples, i_len=schema.examples.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.examples[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            copy.push({
                name: name
            });
            schema.examples = copy;
        });
    }
    renameSchemaExample(schemaName, oldName, newName) {
        this.removeSchemaExample(schemaName, oldName);
        this.setSchemaExample(schemaName, newName);
    }
    removeSchemaExample(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.examples, i_len=schema.examples.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.examples[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            schema.examples = copy;
        });
    }
    setSchemaFragment(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.fragments, i_len=schema.fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.fragments[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            copy.push({
                name: name
            });
            schema.fragments = copy;
        });
    }
    renameSchemaFragment(schemaName, oldName, newName) {
        this.removeSchemaFragment(schemaName, oldName);
        this.setSchemaFragment(schemaName, newName);
    }
    removeSchemaFragment(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.fragments, i_len=schema.fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.fragments[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            schema.fragments = copy;
        });
    }
    setSchemaSnippet(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.snippets, i_len=schema.snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.snippets[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            copy.push({
                name: name
            });
            schema.snippets = copy;
        });
    }
    renameSchemaSnippet(schemaName, oldName, newName) {
        this.removeSchemaSnippet(schemaName, oldName);
        this.setSchemaSnippet(schemaName, newName);
    }
    removeSchemaSnippet(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.snippets, i_len=schema.snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.snippets[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            schema.snippets = copy;
        });
    }
    setSchemaTemplate(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.templates, i_len=schema.templates.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.templates[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            copy.push({
                name: name
            });
            schema.templates = copy;
        });
    }
    renameSchemaTemplate(schemaName, oldName, newName) {
        this.removeSchemaTemplate(schemaName, oldName);
        this.setSchemaTemplate(schemaName, newName);
    }
    removeSchemaTemplate(schemaName, name) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const schema = schemas[schemaName];
            const copy = [];
            var i, i_items=schema.templates, i_len=schema.templates.length, item;
            for (i=0; i<i_len; i++) {
                item = schema.templates[i];
                if (item.name !== name) {
                    copy.push(item);
                }
            }
            schema.templates = copy;
        });
    }
    getExamples(options, callback) {
        const getOptions = {};
        if (options.schema) {
            var examples = examplesCache.get(options.schema);
            if (examples) {
                return callback(null, examples);
            }
            this.fb.getCollection(this.pathNames.examplesCollPath(options.schema), {}, (err, examples) => {
                if (err) {
                    return callback(err);
                }
                examplesCache.set(options.schema, examples);
                return callback(null, examples);
            });
        }
        else {
            return callback(new Error('getExamples requires a schema property in the options parameters'));
        }
    }
    getExample(schemaName, name, callback) {
        console.log('WizziStore.getExample', schemaName, name);
        this.getExamples({
            schema: schemaName
        }, (err, examples) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getExample', schemaName, name, examples);
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.data.name === name) {
                    console.log('WizziStore.getExample', 'got', item);
                    return callback(null, item);
                }
            }
            console.log('WizziStore.getExample', 'not found');
            return callback(null, null);
        });
    }
    setExample(schemaName, name, content, callback) {
        console.log('WizziStore.setExample', schemaName, name, content);
        this.getExamples({
            schema: schemaName
        }, (err, examples) => {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var exampleData = null;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.data.name === name) {
                    item.data.content = content;
                    exampleData = item;
                }
            }
            if (exampleData == null) {
                // TODO this changes cache content. Is it OK?
                console.log('WizziStore.setExample not found', schemaName, name, content);
                console.log('WizziStore.setExample create', this.pathNames.ittfFileRelPath(name, schemaName));
                exampleData = {
                    path: this.pathNames.ittfFileRelPath(name, schemaName), 
                    data: {
                        schema: schemaName, 
                        name: name, 
                        content: content
                    }
                };
                examples.push(exampleData);
                inserted++;
            }
            else {
                updated++;
            }
            this.updatesQueue.set(this.pathNames.examplePath(name, schemaName), exampleData.data);
            this.setSchemaExample(schemaName, name);
            this.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: exampleData, 
                schemas: this.schemas, 
                message: 'WizziStore.setExample successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    removeExample(schemaName, name, callback) {
        console.log('WizziStore.removeExample', schemaName, name);
        this.getExamples({
            schema: schemaName
        }, (err, examples) => {
            if (err) {
                return callback(err);
            }
            var copy = [], exampleData;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.data.name !== name) {
                    copy.push(item);
                }
                else {
                    exampleData = item;
                }
            }
            if (examples.length == copy.length) {
                return callback(new Error('Remove error. Example does not exists: ' + schemaName + '/' + name));
            }
            examplesCache.set(schemaName, copy);
            this.updatesQueue.delete(this.pathNames.examplePath(name, schemaName));
            this.removeSchemaExample(schemaName, name);
            this.scheduleCloudUpdate();
            const message = 'WizziStore.remove{item_Name} successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: exampleData, 
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameExample(schemaName, oldName, newName, callback) {
        console.log('WizziStore.renameExample', schemaName, oldName, newName);
        this.getExamples({
            schema: schemaName
        }, (err, examples) => {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.data.name === newName) {
                    return callback(new Error('Rename error. Example new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.data.name === oldName) {
                    item.data.name = newName;
                    oldItem = item.data;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Example new name already exists: ' + schemaName + '/' + newName));
            }
            examplesCache.set(schemaName, examples);
            this.updatesQueue.delete(this.pathNames.examplePath(oldName, schemaName));
            this.renameSchemaExample(schemaName, oldName, newName);
            this.updatesQueue.set(this.pathNames.examplePath(newName, schemaName), oldItem);
            this.scheduleCloudUpdate();
            const message = 'renameExample successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    getFragments(options, callback) {
        const getOptions = {};
        if (options.schema) {
            var fragments = fragmentsCache.get(options.schema);
            if (fragments) {
                return callback(null, fragments);
            }
            this.fb.getCollection(this.pathNames.fragmentsCollPath(options.schema), {}, (err, fragments) => {
                if (err) {
                    return callback(err);
                }
                fragmentsCache.set(options.schema, fragments);
                return callback(null, fragments);
            });
        }
        else {
            return callback(new Error('getFragments requires a schema property in the options parameters'));
        }
    }
    getFragment(schemaName, name, callback) {
        console.log('WizziStore.getFragment', schemaName, name);
        this.getFragments({
            schema: schemaName
        }, (err, fragments) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getFragment', schemaName, name, fragments);
            var i, i_items=fragments, i_len=fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = fragments[i];
                if (item.data.name === name) {
                    console.log('WizziStore.getFragment', 'got', item);
                    return callback(null, item);
                }
            }
            console.log('WizziStore.getFragment', 'not found');
            return callback(null, null);
        });
    }
    setFragment(schemaName, name, content, callback) {
        console.log('WizziStore.setFragment', schemaName, name, content);
        this.getFragments({
            schema: schemaName
        }, (err, fragments) => {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var fragmentData = null;
            var i, i_items=fragments, i_len=fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = fragments[i];
                if (item.data.name === name) {
                    item.data.content = content;
                    fragmentData = item;
                }
            }
            if (fragmentData == null) {
                // TODO this changes cache content. Is it OK?
                console.log('WizziStore.setFragment not found', schemaName, name, content);
                console.log('WizziStore.setFragment create', this.pathNames.ittfFileRelPath(name, schemaName));
                fragmentData = {
                    path: this.pathNames.ittfFileRelPath(name, schemaName), 
                    data: {
                        schema: schemaName, 
                        name: name, 
                        content: content
                    }
                };
                fragments.push(fragmentData);
                inserted++;
            }
            else {
                updated++;
            }
            this.updatesQueue.set(this.pathNames.fragmentPath(name, schemaName), fragmentData.data);
            this.setSchemaFragment(schemaName, name);
            this.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: fragmentData, 
                schemas: this.schemas, 
                message: 'WizziStore.setFragment successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    removeFragment(schemaName, name, callback) {
        console.log('WizziStore.removeFragment', schemaName, name);
        this.getFragments({
            schema: schemaName
        }, (err, fragments) => {
            if (err) {
                return callback(err);
            }
            var copy = [], fragmentData;
            var i, i_items=fragments, i_len=fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = fragments[i];
                if (item.data.name !== name) {
                    copy.push(item);
                }
                else {
                    fragmentData = item;
                }
            }
            if (fragments.length == copy.length) {
                return callback(new Error('Remove error. Fragment does not exists: ' + schemaName + '/' + name));
            }
            fragmentsCache.set(schemaName, copy);
            this.updatesQueue.delete(this.pathNames.fragmentPath(name, schemaName));
            this.removeSchemaFragment(schemaName, name);
            this.scheduleCloudUpdate();
            const message = 'WizziStore.remove{item_Name} successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: fragmentData, 
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameFragment(schemaName, oldName, newName, callback) {
        console.log('WizziStore.renameFragment', schemaName, oldName, newName);
        this.getFragments({
            schema: schemaName
        }, (err, fragments) => {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=fragments, i_len=fragments.length, item;
            for (i=0; i<i_len; i++) {
                item = fragments[i];
                if (item.data.name === newName) {
                    return callback(new Error('Rename error. Fragment new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.data.name === oldName) {
                    item.data.name = newName;
                    oldItem = item.data;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Fragment new name already exists: ' + schemaName + '/' + newName));
            }
            fragmentsCache.set(schemaName, fragments);
            this.updatesQueue.delete(this.pathNames.fragmentPath(oldName, schemaName));
            this.renameSchemaFragment(schemaName, oldName, newName);
            this.updatesQueue.set(this.pathNames.fragmentPath(newName, schemaName), oldItem);
            this.scheduleCloudUpdate();
            const message = 'renameFragment successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    getSnippets(options, callback) {
        const getOptions = {};
        if (options.schema) {
            var snippets = snippetsCache.get(options.schema);
            if (snippets) {
                return callback(null, snippets);
            }
            this.fb.getCollection(this.pathNames.snippetsCollPath(options.schema), {}, (err, snippets) => {
                if (err) {
                    return callback(err);
                }
                snippetsCache.set(options.schema, snippets);
                return callback(null, snippets);
            });
        }
        else {
            return callback(new Error('getSnippets requires a schema property in the options parameters'));
        }
    }
    getSnippet(schemaName, name, callback) {
        console.log('WizziStore.getSnippet', schemaName, name);
        this.getSnippets({
            schema: schemaName
        }, (err, snippets) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getSnippet', schemaName, name, snippets);
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.data.name === name) {
                    console.log('WizziStore.getSnippet', 'got', item);
                    return callback(null, item);
                }
            }
            console.log('WizziStore.getSnippet', 'not found');
            return callback(null, null);
        });
    }
    setSnippet(schemaName, name, content, callback) {
        console.log('WizziStore.setSnippet', schemaName, name, content);
        this.getSnippets({
            schema: schemaName
        }, (err, snippets) => {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var snippetData = null;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.data.name === name) {
                    item.data.content = content;
                    snippetData = item;
                }
            }
            if (snippetData == null) {
                // TODO this changes cache content. Is it OK?
                console.log('WizziStore.setSnippet not found', schemaName, name, content);
                console.log('WizziStore.setSnippet create', this.pathNames.fileRelPath(name, schemaName));
                snippetData = {
                    path: this.pathNames.fileRelPath(name, schemaName), 
                    data: {
                        schema: schemaName, 
                        name: name, 
                        content: content
                    }
                };
                snippets.push(snippetData);
                inserted++;
            }
            else {
                updated++;
            }
            this.updatesQueue.set(this.pathNames.snippetPath(name, schemaName), snippetData.data);
            this.setSchemaSnippet(schemaName, name);
            this.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: snippetData, 
                schemas: this.schemas, 
                message: 'WizziStore.setSnippet successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    removeSnippet(schemaName, name, callback) {
        console.log('WizziStore.removeSnippet', schemaName, name);
        this.getSnippets({
            schema: schemaName
        }, (err, snippets) => {
            if (err) {
                return callback(err);
            }
            var copy = [], snippetData;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.data.name !== name) {
                    copy.push(item);
                }
                else {
                    snippetData = item;
                }
            }
            if (snippets.length == copy.length) {
                return callback(new Error('Remove error. Snippet does not exists: ' + schemaName + '/' + name));
            }
            snippetsCache.set(schemaName, copy);
            this.updatesQueue.delete(this.pathNames.snippetPath(name, schemaName));
            this.removeSchemaSnippet(schemaName, name);
            this.scheduleCloudUpdate();
            const message = 'WizziStore.remove{item_Name} successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: snippetData, 
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameSnippet(schemaName, oldName, newName, callback) {
        console.log('WizziStore.renameSnippet', schemaName, oldName, newName);
        this.getSnippets({
            schema: schemaName
        }, (err, snippets) => {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.data.name === newName) {
                    return callback(new Error('Rename error. Snippet new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.data.name === oldName) {
                    item.data.name = newName;
                    oldItem = item.data;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Snippet new name already exists: ' + schemaName + '/' + newName));
            }
            snippetsCache.set(schemaName, snippets);
            this.updatesQueue.delete(this.pathNames.snippetPath(oldName, schemaName));
            this.renameSchemaSnippet(schemaName, oldName, newName);
            this.updatesQueue.set(this.pathNames.snippetPath(newName, schemaName), oldItem);
            this.scheduleCloudUpdate();
            const message = 'renameSnippet successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    getTemplates(options, callback) {
        const getOptions = {};
        if (options.schema) {
            var templates = templatesCache.get(options.schema);
            if (templates) {
                return callback(null, templates);
            }
            this.fb.getCollection(this.pathNames.templatesCollPath(options.schema), {}, (err, templates) => {
                if (err) {
                    return callback(err);
                }
                templatesCache.set(options.schema, templates);
                return callback(null, templates);
            });
        }
        else {
            return callback(new Error('getTemplates requires a schema property in the options parameters'));
        }
    }
    getTemplate(schemaName, name, callback) {
        console.log('WizziStore.getTemplate', schemaName, name);
        this.getTemplates({
            schema: schemaName
        }, (err, templates) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getTemplate', schemaName, name, templates);
            var i, i_items=templates, i_len=templates.length, item;
            for (i=0; i<i_len; i++) {
                item = templates[i];
                if (item.data.name === name) {
                    console.log('WizziStore.getTemplate', 'got', item);
                    return callback(null, item);
                }
            }
            console.log('WizziStore.getTemplate', 'not found');
            return callback(null, null);
        });
    }
    setTemplate(schemaName, name, content, callback) {
        console.log('WizziStore.setTemplate', schemaName, name, content);
        this.getTemplates({
            schema: schemaName
        }, (err, templates) => {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var templateData = null;
            var i, i_items=templates, i_len=templates.length, item;
            for (i=0; i<i_len; i++) {
                item = templates[i];
                if (item.data.name === name) {
                    item.data.content = content;
                    templateData = item;
                }
            }
            if (templateData == null) {
                // TODO this changes cache content. Is it OK?
                console.log('WizziStore.setTemplate not found', schemaName, name, content);
                console.log('WizziStore.setTemplate create', this.pathNames.ittfFileRelPath(name, schemaName));
                templateData = {
                    path: this.pathNames.ittfFileRelPath(name, schemaName), 
                    data: {
                        schema: schemaName, 
                        name: name, 
                        content: content
                    }
                };
                templates.push(templateData);
                inserted++;
            }
            else {
                updated++;
            }
            this.updatesQueue.set(this.pathNames.templatePath(name, schemaName), templateData.data);
            this.setSchemaTemplate(schemaName, name);
            this.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: templateData, 
                schemas: this.schemas, 
                message: 'WizziStore.setTemplate successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    removeTemplate(schemaName, name, callback) {
        console.log('WizziStore.removeTemplate', schemaName, name);
        this.getTemplates({
            schema: schemaName
        }, (err, templates) => {
            if (err) {
                return callback(err);
            }
            var copy = [], templateData;
            var i, i_items=templates, i_len=templates.length, item;
            for (i=0; i<i_len; i++) {
                item = templates[i];
                if (item.data.name !== name) {
                    copy.push(item);
                }
                else {
                    templateData = item;
                }
            }
            if (templates.length == copy.length) {
                return callback(new Error('Remove error. Template does not exists: ' + schemaName + '/' + name));
            }
            templatesCache.set(schemaName, copy);
            this.updatesQueue.delete(this.pathNames.templatePath(name, schemaName));
            this.removeSchemaTemplate(schemaName, name);
            this.scheduleCloudUpdate();
            const message = 'WizziStore.remove{item_Name} successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: templateData, 
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameTemplate(schemaName, oldName, newName, callback) {
        console.log('WizziStore.renameTemplate', schemaName, oldName, newName);
        this.getTemplates({
            schema: schemaName
        }, (err, templates) => {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=templates, i_len=templates.length, item;
            for (i=0; i<i_len; i++) {
                item = templates[i];
                if (item.data.name === newName) {
                    return callback(new Error('Rename error. Template new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.data.name === oldName) {
                    item.data.name = newName;
                    oldItem = item.data;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Template new name already exists: ' + schemaName + '/' + newName));
            }
            templatesCache.set(schemaName, templates);
            this.updatesQueue.delete(this.pathNames.templatePath(oldName, schemaName));
            this.renameSchemaTemplate(schemaName, oldName, newName);
            this.updatesQueue.set(this.pathNames.templatePath(newName, schemaName), oldItem);
            this.scheduleCloudUpdate();
            const message = 'renameTemplate successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: this.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    toIttfTreeEx(ittfContent, callback) {
        return wizzi.IttfMTreeEx.createFrom(ittfContent, {
                fromString: true, 
                clean: true
            }, callback);
    }
    getSchemaElementDoc(mTreeNode) {
        if (false) {
            var i, i_items=jsSchema.elements, i_len=jsSchema.elements.length, e;
            for (i=0; i<i_len; i++) {
                e = jsSchema.elements[i];
                if (e.tags.indexOf(mTreeNode.name) > -1) {
                    return e;
                }
            }
            var i, i_items=jsSchema.elements, i_len=jsSchema.elements.length, e;
            for (i=0; i<i_len; i++) {
                e = jsSchema.elements[i];
                var j, j_items=e.attributes, j_len=e.attributes.length, attr;
                for (j=0; j<j_len; j++) {
                    attr = e.attributes[j];
                    if (attr.tags.indexOf(mTreeNode.name) > -1) {
                        return e;
                    }
                }
            }
        }
        return null;
    }
    getTemplateJsonFsData(schemaName, name, callback) {
        this.getTemplate(schemaName, name, (err, templateObject) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getExampleJsonFsData.templateObject', templateObject);
            const documents = [];
            // FIXME the folder 'schemaName' is superflous but a bug in wizzi-repo.json.fs.documents
            // requires that a document path will return a not empty string both from path.basename(pathname) and path.dirname(pathname)
            documents.push({
                path: 'w:/' + schemaName + '/' + templateObject.data.name, 
                content: templateObject.data.content
            });
            this.createJsonFsData(documents, callback);
        });
    }
    getExampleJsonFsData(schemaName, name, callback) {
        this.getExample(schemaName, name, (err, exampleObject) => {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getExampleJsonFsData.exampleObject', exampleObject);
            this.getFragments({
                schema: schemaName
            }, (err, fragments) => {
                if (err) {
                    return callback(err);
                }
                const documents = [];
                // FIXME the folder 'schemaName' is superflous but a bug in wizzi-repo.json.fs.documents
                // requires that a document path will return a not empty string both from path.basename(pathname) and path.dirname(pathname)
                documents.push({
                    path: 'w:/' + schemaName + '/' + exampleObject.data.name, 
                    content: exampleObject.data.content
                });
                var i, i_items=fragments, i_len=fragments.length, item;
                for (i=0; i<i_len; i++) {
                    item = fragments[i];
                    documents.push({
                        path: 'w:/' + schemaName + '/t/' + item.data.name, 
                        content: item.data.content
                    });
                }
                this.createJsonFsData(documents, callback);
            });
        });
    }
    createJsonFsData(documents, callback) {
        // [ documents
        // {
        // string path
        // string content
        wizzi.JsonComponents.createJsonFsData(documents, callback);
    }
    createFactory(jsonFsData, callback) {
        wizzi.jsonnoaclFactory({
            plugins: {
                items: [
                    wizziCore, 
                    wizziJs, 
                    wizziWeb
                ]
            }, 
            jsonFsData: jsonFsData
        }, callback);
    }
    generateExampleArtifact(schemaName, name, artifactName, modelContext, callback) {
        if (typeof callback === 'undefined') {
            callback = modelContext;
            modelContext = {};
        }
        // log 'WizziStore.generateExampleArtifact.modelContext', modelContext
        this.getExampleJsonFsData(schemaName, name, (err, jsonFsData) => {
            if (err) {
                return callback(err);
            }
            this.createFactory(jsonFsData, (err, wf) => {
                if (err) {
                    return callback(err);
                }
                const itemPath = 'w:/' + schemaName + '/' + name;
                try {
                    wf.loadModelAndGenerateArtifact(itemPath, {
                        modelRequestContext: {
                            mTreeBuildUpContext: modelContext
                        }, 
                        artifactRequestContext: {}
                    }, artifactName, (err, artifactText) => {
                        if (err) {
                            return callback(err);
                        }
                        // log 'generated artifactText', artifactText
                        return callback(null, artifactText);
                    });
                } 
                catch (ex) {
                    callback(ex);
                } 
            });
        });
    }
    generateTemplateArtifact(schemaName, name, artifactName, callback) {
        // log 'WizziStore.generateTemplateArtifact', schemaName, name
        this.getTemplateJsonFsData(schemaName, name, (err, jsonFsData) => {
            if (err) {
                return callback(err);
            }
            this.createFactory(jsonFsData, (err, wf) => {
                if (err) {
                    return callback(err);
                }
                const itemPath = 'w:/' + schemaName + '/' + name;
                try {
                    wf.loadModelAndGenerateArtifact(itemPath, {
                        modelRequestContext: {
                            mTreeBuildUpContext: {}
                        }, 
                        artifactRequestContext: {}
                    }, artifactName, (err, artifactText) => {
                        if (err) {
                            return callback(err);
                        }
                        // log 'generated artifactText', artifactText
                        return callback(null, artifactText);
                    });
                } 
                catch (ex) {
                    callback(ex);
                } 
            });
        });
    }
    getExampleArtifact(schemaName, documentName, callback) {
        const wizziArchive = WizziArchive.getPooledArchive(schemaName, documentName);
        wizziArchive.retrieveFromServer((err, notUsed) => {
            if (err) {
                return callback(err);
            }
            wizziArchive.generate(callback);
        });
    }
    getJsonExampleObject(documentName, callback) {
        this.getExampleArtifact('json', documentName, (err, jsonText) => {
            if (err) {
                return callback(null, {});
            }
            else {
                return callback(null, JSON.parse(jsonText));
            }
        });
    }
    generateArtifactAction(schemaName, ittfKind, name, callback) {
        const artifactName = this.getArtifactForSchema(schemaName);
        if (ittfKind === 'examples' && schemaName != 'json') {
            var jsonName = this.pathNames.replaceSchemaInIttfPath(name, schemaName, 'json');
            this.getExample('json', jsonName, (err, result) => {
                if (err) {
                    return callback(err);
                }
                if (result == null) {
                    this.generateExampleArtifact(schemaName, name, artifactName, callback);
                }
                else {
                    this.generateExampleArtifact('json', jsonName, 'json/document', (err, jsonArtifact) => {
                        if (err) {
                            return callback(err);
                        }
                        this.generateExampleArtifact(schemaName, name, artifactName, JSON.parse(jsonArtifact), callback);
                    });
                }
            });
        }
        else {
            if (ittfKind === 'examples') {
                this.generateExampleArtifact(schemaName, name, artifactName, callback);
            }
            else {
                this.generateTemplateArtifact(schemaName, name, artifactName, callback);
            }
        }
    }
    getDefaultTemplate(schemaName) {
        if (schemaName == 'js') {
            return 'module\n\tkind es6\n';
        }
        else if (schemaName == 'ts') {
            return 'module\n';
        }
        else if (schemaName == 'json') {
            return '{\n\t[ arrayName\n\t{ objectName\n';
        }
        else {
            return schemaName + '\n';
        }
    }
    getArtifactForSchema(schemaName) {
        if (schemaName == 'js') {
            return 'js/module';
        }
        else if (schemaName == 'ts') {
            return 'ts/module';
        }
        else if (schemaName == 'html') {
            return 'html/document';
        }
        else if (schemaName == 'css') {
            return 'css/document';
        }
        else if (schemaName == 'scss') {
            return 'scss/document';
        }
        else if (schemaName == 'svg') {
            return 'svg/document';
        }
        else if (schemaName == 'graphql') {
            return 'graphql/document';
        }
        else if (schemaName == 'json') {
            return 'json/document';
        }
        else if (schemaName == 'text') {
            return 'text/document';
        }
        else if (schemaName == 'vue') {
            return 'vue/document';
        }
        else if (schemaName == 'xml') {
            return 'xml/document';
        }
        else if (schemaName == 'ittf') {
            return 'ittf/document';
        }
        else {
            throw new Error('WizziStore.getArtifactForSchema. Schema not managed: ' + schemaName);
        }
    }
    simpleGenerate(schemaName, wizzifiedSnippet, callback) {
        const itemPath = 'w:/' + schemaName + '/wizzified.' + schemaName + '.ittf';
        const documents = [];
        // FIXME the folder 'schemaName' is superflous but a bug in wizzi-repo.json.fs.documents
        // requires that a document path will return a not empty string both from path.basename(pathname) and path.dirname(pathname)
        documents.push({
            path: itemPath, 
            content: wizzifiedSnippet
        });
        this.createJsonFsData(documents, (err, jsonFsData) => {
            if (err) {
                return callback(err);
            }
            this.exec_generate(schemaName, itemPath, jsonFsData, callback);
        });
    }
    exec_generate(schemaName, itemPath, jsonFsData, modelContext, callback) {
        if (typeof callback === 'undefined') {
            callback = modelContext;
            modelContext = {};
        }
        const artifactName = this.getArtifactForSchema(schemaName);
        this.createFactory(jsonFsData, (err, wf) => {
            if (err) {
                return callback(err);
            }
            try {
                wf.loadModelAndGenerateArtifact(itemPath, {
                    modelRequestContext: {
                        mTreeBuildUpContext: modelContext
                    }, 
                    artifactRequestContext: {}
                }, artifactName, (err, artifactText) => {
                    if (err) {
                        return callback(err);
                    }
                    // log 'WizziStore.simpleGenerate.generated artifactText', artifactText
                    return callback(null, artifactText);
                });
            } 
            catch (ex) {
                callback(ex);
            } 
        });
    }
    getCodeAST(schemaName, snippetCode, callback) {
        wizziTools.getCodeAST(schemaName, snippetCode, callback);
    }
    wizzifySnippet(schemaName, snippetCode, callback) {
        wizziTools.wizzify(schemaName, snippetCode, callback);
    }
    getInitialData(callback) {
        this.getSchemas(function(err, schemas) {
            if (err) {
                return callback(err);
            }
            const ret = {
                schemas: schemas
            };
            return callback(null, ret);
        });
    }
    scheduleCloudUpdate() {
        if (this.uploadTimer) {
            clearTimeout(this.uploadTimer);
            console.log('WizziStore.scheduleCloudUpdate. Cleared previous schedule.', new Date());
        }
        const that = this;
        this.uploadTimer = setTimeout(function() {
            this.uploadTimer = null;
            that.fb.batchFromUpdatesQueue(that.updatesQueue, function(err, notUsed) {
                if (err) {
                    return callback(err);
                }
                console.log('WizziStore.scheduleCloudUpdate. batchFromUpdatesQueue executed.', new Date());
            });
        }, that.uploadDelay);
    }
}
WizziStore.createInstance = function(user, options, callback) {
    if (WizziStore.__instance) {
        throw new Error('WizziStore.createInstance called more than once. This is a bug.');
    }
    user = user || 'default';
    options = options || {};
    WizziStore.__instance = new WizziStore(user, options);
    WizziStore.__instance.init();
    return callback(null, WizziStore.__instance);
};
WizziStore.getInstance = function() {
    if (typeof WizziStore.__instance === 'undefined') {
        throw new Error('WizziStore.getInstance called before WizziStore.createInstance. This is a bug.');
    }
    return WizziStore.__instance;
};
export default WizziStore;
