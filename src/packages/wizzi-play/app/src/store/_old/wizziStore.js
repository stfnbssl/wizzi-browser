/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\_old\wizzistore.js.ittf
    utc time: Tue, 29 Jan 2019 14:37:40 GMT
*/
'use strict';
import path from 'path';
import FbFsClient from './fbFsClient';
import UpdatesQueue from './updatesQueue';
import PathNames from './pathNames';
import { normalizeFile, normalizeFolder, encodeDocName, decodeDocName } from './pathNames';
import verify from '../utils/verify';
window.wizzi = wizziPackage.default;
window.wizziJs = wizziJsPlugin.default;
window.wizziWeb = wizziWebPlugin.default;
window.wizziCore = wizziCorePlugin.default;
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
    length: function (n, key) { return Object.keys(n).length }
});
class WizziStore {
    constructor(project) {
        this.project = project || 'default';
        this.schemas = null;
        this.fb = new FbFsClient();
        this.updatesQueue = new UpdatesQueue();
        this.pathNames = new PathNames(this.project);
        this.uploadDelay = 3 * 1000;
    }
    init() {
        this.fb.init();
    }
    getSchemas(callback) {
        if (this.schemas != null) {
            return callback(null, this.schemas);
        }
        const that = this;
        this.fb.getCollection(this.pathNames.examplesCollPath(), {}, function(err, examples) {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getSchemas. examples: ', examples);
            that.schemas = {};
            var schema;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.data.schema) {
                    schema = that.schemas[item.data.schema];
                    if (!schema) {
                        schema = {
                            name: item.data.schema, 
                            examples: [
                                
                            ], 
                            fragments: [
                                
                            ], 
                            snippets: [
                                
                            ]
                        };
                        that.schemas[item.data.schema] = schema;
                    }
                    schema.examples.push({
                        name: item.data.name
                    });
                }
            }
            that.fb.getCollection(that.pathNames.snippetsCollPath(), {}, function(err, snippets) {
                if (err) {
                    return callback(err);
                }
                console.log('WizziStore.getSchemas. snippets: ', snippets);
                that.schemas = {};
                var schema;
                var i, i_items=snippets, i_len=snippets.length, item;
                for (i=0; i<i_len; i++) {
                    item = snippets[i];
                    if (item.data.schema) {
                        schema = that.schemas[item.data.schema];
                        if (!schema) {
                            schema = {
                                name: item.data.schema, 
                                examples: [
                                    
                                ], 
                                fragments: [
                                    
                                ], 
                                snippets: [
                                    
                                ]
                            };
                            that.schemas[item.data.schema] = schema;
                        }
                        schema.snippets.push({
                            name: item.data.name
                        });
                    }
                }
                console.log('WizziStore.getSchemas', that.schemas);
                const schemaNames = Object.keys(that.schemas);
                const schemaLen = schemaNames.length;
                function set_fragments(count) {
                    if (count == schemaLen) {
                        return callback(null, that.schemas);
                    }
                    else {
                        var schemaItem = that.schemas[schemaNames[count]];
                        that.getFragments(schemaItem.name, function(err, fragments) {
                            if (err) {
                                return callback(err);
                            }
                            for (var k in fragments) {
                                schemaItem.fragments.push({
                                    name: k
                                });
                            }
                            set_fragments(count + 1);
                        });
                    }
                }
                set_fragments(0);
            });
        });
    }
    setSchemaExanple(schemaName, name) {
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
    renameSchemaExanple(schemaName, oldName, newName) {
        this.removeSchemaExanple(schemaName, oldName);
        this.setSchemaExanple(schemaName, newName);
    }
    removeSchemaExanple(schemaName, name) {
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
    getExamples(options, callback) {
        const getOptions = {};
        if (options.schema) {
            var examples = examplesCache.get(options.schema);
            if (examples) {
                return callback(null, examples);
            }
            getOptions.where = {
                field: 'schema', 
                op: '==', 
                value: options.schema
            };
            this.fb.getCollection(this.pathNames.examplesCollPath(), getOptions, function(err, examples) {
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
        this.getExamples({
            schema: schemaName
        }, function(err, examples) {
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
        const that = this;
        this.getExamples({
            schema: schemaName
        }, function(err, examples) {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var exampleData = null;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.name === name) {
                    item.content = content;
                    exampleData = item;
                }
            }
            if (exampleData == null) {
                // TODO this changes cache content. Is it OK?
                exampleData = {
                    path: that.pathNames.exampleRelPath(name, schemaName), 
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
            that.updatesQueue.set(that.pathNames.examplePath(name, schemaName), exampleData);
            that.setSchemaExample(schemaName, name);
            that.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: exampleData, 
                schemas: that.schemas, 
                message: 'WizziStore.setExample successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    deleteExample(schemaName, name, callback) {
        const that = this;
        this.getExamples({
            schema: schemaName
        }, function(err, examples) {
            if (err) {
                return callback(err);
            }
            var copy = [], exampleData;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.name !== name) {
                    copy.push(item);
                }
                else {
                    exampleData = item;
                }
            }
            if (examples.length == copy.length) {
                return callback(new Error('Delete error. Example does not exists: ' + schemaName + '/' + name));
            }
            examplesCache.set(schemaName, copy);
            that.updatesQueue.delete(that.pathNames.examplePath(name, schemaName));
            that.removeSchemaExample(schemaName, name);
            that.scheduleCloudUpdate();
            const message = 'WizziStore.deleteExample successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: exampleData, 
                schemas: that.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameExample(schemaName, oldName, newName, callback) {
        const that = this;
        this.getExamples({
            schema: schemaName
        }, function(err, examples) {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=examples, i_len=examples.length, item;
            for (i=0; i<i_len; i++) {
                item = examples[i];
                if (item.name === newName) {
                    return callback(new Error('Rename error. Example new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.name === oldName) {
                    item.name = newName;
                    oldItem = item;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Example new name already exists: ' + schemaName + '/' + newName));
            }
            examplesCache.set(schemaName, examples);
            that.updatesQueue.delete(that.pathNames.examplePath(oldName, schemaName));
            that.renameSchemaExample(schemaName, oldName, newName);
            that.updatesQueue.set(that.pathNames.examplePath(newName, schemaName), oldItem);
            that.scheduleCloudUpdate();
            const message = 'renameExample successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: that.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    getFragments(schemaName, callback) {
        // returns
        // { fragments
        var fragments = fragmentsCache.get(schemaName);
        if (fragments) {
            return callback(null, fragments);
        }
        this.fb.getDocument(this.pathNames.fragmentsPath(schemaName), function(err, fragments) {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getFragments', fragments);
            if (fragments) {
                fragmentsCache.set(schemaName, fragments);
            }
            return callback(null, fragments || {});
        });
    }
    getFragment(schemaName, name, callback) {
        this.getFragments(schemaName, function(err, fragments) {
            if (err) {
                return callback(err);
            }
            const item = fragments[name];
            console.log('WizziStore.getFragment', 'got', item);
            return callback(null, item);
        });
    }
    setFragment(schemaName, name, content, callback) {
        const that = this;
        this.getFragments(schemaName, function(err, fragments) {
            if (err) {
                return callback(err);
            }
            var updated, inserted;
            if (fragments[name]) {
                fragments[name] = content;
                updated++;
            }
            else {
                fragments[name] = content;
                inserted++;
            }
            fragmentsCache.set(schemaName, fragments);
            that.setSchemaFragment(schemaName, name);
            that.updatesQueue.set(that.pathNames.fragmentsPath(schemaName), fragments);
            that.scheduleCloudUpdate();
            const message = 'setFragment successfull ' + schemaName + '/' + name;
            console.log('message', message);
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: fragments[name], 
                schemas: that.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    deleteFragment(schemaName, name, callback) {
        const that = this;
        this.getFragments(schemaName, function(err, fragments) {
            if (err) {
                return callback(err);
            }
            if (!fragments[name]) {
                return callback(new Error('Delete error. Fragment does not exists: ' + schemaName + '/' + name));
            }
            const dataItem = fragments[name];
            delete fragments[name]
            fragmentsCache.set(schemaName, fragments);
            that.removeSchemaFragment(schemaName, name);
            that.updatesQueue.set(that.pathNames.fragmentsPath(schemaName), fragments);
            that.scheduleCloudUpdate();
            const message = 'deleteFragment successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: dataItem, 
                schemas: that.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameFragment(schemaName, oldName, newName, callback) {
        const that = this;
        this.getFragments(schemaName, function(err, fragments) {
            if (err) {
                return callback(err);
            }
            if (!fragments[oldName]) {
                return callback(new Error('Rename error. Fragment old name does not exists: ' + schemaName + '/' + oldName));
            }
            if (fragments[newName]) {
                return callback(new Error('Rename error. Fragment new name already exists: ' + schemaName + '/' + newName));
            }
            fragments[newName] = fragments[oldName];
            delete fragments[oldName]
            fragmentsCache.set(schemaName, fragments);
            that.renameSchemaFragment(schemaName, oldName, newName);
            that.updatesQueue.set(that.pathNames.fragmentsPath(schemaName), fragments);
            that.scheduleCloudUpdate();
            const message = 'renameFragment successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: that.schemas, 
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
            getOptions.where = {
                field: 'schema', 
                op: '==', 
                value: options.schema
            };
            this.fb.getCollection(this.pathNames.snippetsCollPath(), getOptions, function(err, snippets) {
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
        this.getSnippets({
            schema: schemaName
        }, function(err, snippets) {
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
        const that = this;
        this.getSnippets({
            schema: schemaName
        }, function(err, snippets) {
            if (err) {
                return callback(err);
            }
            var inserted = 0;
            var updated = 0;
            var snippetData = null;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.name === name) {
                    item.content = content;
                    snippetData = item;
                }
            }
            if (snippetData == null) {
                // TODO this changes cache content. Is it OK?
                snippetData = {
                    path: that.pathNames.snippetRelPath(name, schemaName), 
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
            that.updatesQueue.set(that.pathNames.snippetPath(name, schemaName), snippetData);
            that.setSchemaSnippet(schemaName, name);
            that.scheduleCloudUpdate();
            const result = {
                inserted: inserted, 
                updated: updated, 
                item: snippetData, 
                schemas: that.schemas, 
                message: 'WizziStore.setSnippet successfull ' + schemaName + '/' + name
            };
            return callback(null, result);
        });
    }
    deleteSnippet(schemaName, name, callback) {
        const that = this;
        this.getSnippets({
            schema: schemaName
        }, function(err, snippets) {
            if (err) {
                return callback(err);
            }
            var copy = [], snippetData;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.name !== name) {
                    copy.push(item);
                }
                else {
                    snippetData = item;
                }
            }
            if (snippets.length == copy.length) {
                return callback(new Error('Delete error. Snippet does not exists: ' + schemaName + '/' + name));
            }
            snippetsCache.set(schemaName, copy);
            that.updatesQueue.delete(that.pathNames.snippetPath(name, schemaName));
            that.removeSchemaSnippet(schemaName, name);
            that.scheduleCloudUpdate();
            const message = 'WizziStore.deleteSnippet successfull ' + schemaName + '/' + name;
            console.log(message);
            const result = {
                deleted: 1, 
                item: snippetData, 
                schemas: that.schemas, 
                message: message
            };
            return callback(null, result);
        });
    }
    renameSnippet(schemaName, oldName, newName, callback) {
        const that = this;
        this.getSnippets({
            schema: schemaName
        }, function(err, snippets) {
            if (err) {
                return callback(err);
            }
            var oldItem = null;
            var i, i_items=snippets, i_len=snippets.length, item;
            for (i=0; i<i_len; i++) {
                item = snippets[i];
                if (item.name === newName) {
                    return callback(new Error('Rename error. Snippet new name already exists: ' + schemaName + '/' + newName));
                }
                if (item.name === oldName) {
                    item.name = newName;
                    oldItem = item;
                }
            }
            if (oldItem == null) {
                return callback(new Error('Rename error. Snippet new name already exists: ' + schemaName + '/' + newName));
            }
            snippetsCache.set(schemaName, snippets);
            that.updatesQueue.delete(that.pathNames.snippetPath(oldName, schemaName));
            that.renameSchemaSnippet(schemaName, oldName, newName);
            that.updatesQueue.set(that.pathNames.snippetPath(newName, schemaName), oldItem);
            that.scheduleCloudUpdate();
            const message = 'renameSnippet successfull ' + schemaName + '/' + oldName + '/' + newName;
            console.log(message);
            const result = {
                schemas: that.schemas, 
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
    getExampleJsonFsData(schema, name, callback) {
        const that = this;
        this.getExample(schema, name, function(err, exampleObject) {
            if (err) {
                return callback(err);
            }
            console.log('WizziStore.getExampleJsonFsData', exampleObject);
            that.getFragments(schema, function(err, fragments) {
                if (err) {
                    return callback(err);
                }
                const documents = [];
                // FIXME the folder 'schema' is superflous but a bug in wizzi-repo.json.fs.documents
                // requires that a document path will return a not empty string both from path.basename(pathname) and path.dirname(pathname)
                documents.push({
                    path: 'w:/' + schema + '/' + exampleObject.data.name, 
                    content: exampleObject.data.content
                });
                var i, i_items=Object.keys(fragments), i_len=Object.keys(fragments).length, item;
                for (i=0; i<i_len; i++) {
                    item = Object.keys(fragments)[i];
                    documents.push({
                        path: 'w:/' + schema + '/t/' + item, 
                        content: fragments[item]
                    });
                }
                that.createJsonFsData(documents, callback);
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
        const that = this;
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
    generateExample(schema, name, artifactName, modelContext, callback) {
        if (typeof callback === 'undefined') {
            callback = modelContext;
            modelContext = {};
        }
        // log 'WizziClient.generate.modelContext', modelContext
        const that = this;
        this.getExampleJsonFsData(schema, name, function(err, jsonFsData) {
            if (err) {
                return callback(err);
            }
            that.createFactory(jsonFsData, function(err, wf) {
                if (err) {
                    return callback(err);
                }
                const itemPath = 'w:/' + schema + '/' + name;
                wf.loadModelAndGenerateArtifact(itemPath, {
                    modelRequestContext: {
                        mTreeBuildUpContext: modelContext
                    }, 
                    artifactRequestContext: {}
                }, artifactName, function(err, artifactText) {
                    if (err) {
                        return callback(err);
                    }
                    // log 'generated artifactText', artifactText
                    return callback(null, artifactText);
                });
            });
        });
    }
    getExampleArtifact(schemaName, documentName, callback) {
        const wizziArchive = WizziArchive.getPooledArchive(schemaName, documentName);
        wizziArchive.retrieveFromServer(function(err, notUsed) {
            if (err) {
                return callback(err);
            }
            wizziArchive.generate(callback);
        });
    }
    getJsonExampleObject(documentName, callback) {
        this.getExampleArtifact('json', documentName, function(err, jsonText) {
            if (err) {
                return callback(null, {});
            }
            else {
                return callback(null, JSON.parse(jsonText));
            }
        });
    }
    generateArtifactAction(schema, name, callback) {
        const artifactName = this.getArtifactForSchema(schema);
        if (schema != 'json') {
            const that = this;
            this.getExample('json', name, function(err, result) {
                if (err) {
                    return callback(err);
                }
                if (result == null) {
                    that.generateExample(schema, name, artifactName, callback);
                }
                else {
                    that.generateExample('json', name, 'json/document', function(err, jsonArtifact) {
                        if (err) {
                            return callback(err);
                        }
                        that.generateExample(schema, name, artifactName, JSON.parse(jsonArtifact), callback);
                    });
                }
            });
        }
        else {
            this.generateExample(schema, name, artifactName, callback);
        }
    }
    getArtifactForSchema(schema) {
        if (schema == 'js') {
            return 'js/module';
        }
        else if (schema == 'ts') {
            return 'ts/module';
        }
        else if (schema == 'html') {
            return 'html/document';
        }
        else if (schema == 'css') {
            return 'css/document';
        }
        else if (schema == 'svg') {
            return 'svg/document';
        }
        else if (schema == 'json') {
            return 'json/document';
        }
        else if (schema == 'text') {
            return 'text/document';
        }
        else if (schema == 'xml') {
            return 'xml/document';
        }
        else if (schema == 'ittf') {
            return 'ittf/document';
        }
        else {
            throw new Error('WizziStore.getArtifactForSchema. Schema not managed: ' + schema);
        }
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
