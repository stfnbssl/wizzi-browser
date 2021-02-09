/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: c:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\_old\pathnames.js.ittf
    utc time: Tue, 29 Jan 2019 14:37:40 GMT
*/
'use strict';
import path from 'path';
import verify from '../utils/verify';
// const EXAMPLES_PATH = 'ittf/default/default'
const EXAMPLES_COLL_PATH = 'sample';
const SNIPPETS_COLL_PATH = 'snippets';
const PROJECTS_COLL_PATH = 'projects';
class PathNames {
    ctor(userId, projectName) {
        this.userId = userId;
        this.projectName = projectName;
    }
    projectDocName(userId) {
        return userId + '.projects';
    }
    examplesCollPath() {
        return EXAMPLES_COLL_PATH;
    }
    snippetsCollPath() {
        return SNIPPETS_COLL_PATH;
    }
    fragmentDocName(schemaName) {
        return schemaName + '.fragments';
    }
    projectsPath(userId) {
        return PROJECTS_COLL_PATH + '/' + this.fragmentDocName(userId);
    }
    fragmentsPath(schemaName) {
        return EXAMPLES_COLL_PATH + '/' + this.projectDocName(schemaName);
    }
    exampleRelPath(name, schemaName) {
        var relPath = this.stripExampleExtensions(name, schemaName);
        relPath = encodeDocName(relPath);
        relPath += '-' + schemaName;
        return relPath;
    }
    snippetRelPath(name, schemaName) {
        var relPath = this.stripSnippetExtensions(name, schemaName);
        relPath = encodeDocName(relPath);
        relPath += '-' + schemaName;
        return relPath;
    }
    examplePath(name, schemaName) {
        return EXAMPLES_COLL_PATH + '/' + this.exampleRelPath(name, schemaName);
    }
    snippetPath(name, schemaName) {
        return SNIPPETS_COLL_PATH + '/' + this.snippetRelPath(name, schemaName);
    }
    stripExampleExtensions(basename, schemaName) {
        basename = normalizeFile(basename);
        const suffix = '.' + schemaName + '.ittf';
        if (basename.substr(-suffix.length) === suffix) {
            return basename.substr(0, basename.length - suffix.length);
        }
        else {
            return null;
        }
    }
    stripSnippetExtensions(basename, schemaName) {
        basename = normalizeFile(basename);
        const suffix = '.' + schemaName;
        if (basename.substr(-suffix.length) === suffix) {
            return basename.substr(0, basename.length - suffix.length);
        }
        else {
            return null;
        }
    }
}
export  function normalizeFile(filePath) {
    const basename = path.basename(filePath);
    if (basename === filePath) {
        return basename;
    }
    const dirname = path.dirname(filePath);
    return verify.replaceAll(dirname, '\\', '/').toLowerCase() + '/' + basename;
}export  function normalizeFolder(folderPath) {
    return verify.replaceAll(folderPath, '\\', '/').toLowerCase();
}export  function encodeDocName(name) {
    return verify.replaceAll(name, '/', '[.]');
}export  function decodeDocName(name) {
    return verify.replaceAll(name, '[.]', '/');
}export default PathNames;
