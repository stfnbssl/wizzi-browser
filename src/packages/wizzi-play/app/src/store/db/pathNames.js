/*
    artifact generator: C:\my\wizzi\v5\apps\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    primary source IttfDocument: C:\my\wizzi\v5\apps\wizzi-play\wizzi\ittf\src\store\db\pathNames.js.ittf
    utc time: Wed, 24 Apr 2019 16:34:32 GMT
*/
'use strict';
import path from 'path';
import verify from '../../utils/verify';
// const EXAMPLES_PATH = 'ittf/default/default'
const SCHEMAS_COLL_PATH = 'schemas';
const EXAMPLES_COLL_PATH = 'sample';
const EXAMPLES_COLL_PATH2 = 'examples';
const SNIPPETS_COLL_PATH = 'snippets';
const FRAGMENTS_COLL_PATH = 'fragments';
const TEMPLATES_COLL_PATH = 'templates';
const PROJECTS_COLL_PATH = 'projects';
class PathNames {
    ctor(userId, projectName) {
        this.userId = userId;
        this.projectName = projectName;
    }
    projectDocName(userId) {
        return userId + '.projects';
    }
    schemasCollPath() {
        return SCHEMAS_COLL_PATH;
    }
    examplesCollPath(schemaName) {
        return 'schemas/' + schemaName + '/' + EXAMPLES_COLL_PATH2;
    }
    snippetsCollPath(schemaName) {
        return 'schemas/' + schemaName + '/' + SNIPPETS_COLL_PATH;
    }
    fragmentsCollPath(schemaName) {
        return 'schemas/' + schemaName + '/' + FRAGMENTS_COLL_PATH;
    }
    templatesCollPath(schemaName) {
        return 'schemas/' + schemaName + '/' + TEMPLATES_COLL_PATH;
    }
    fragmentDocName(schemaName) {
        return schemaName + '.fragments';
    }
    projectsPath(userId) {
        return PROJECTS_COLL_PATH + '/' + this.projectDocName(userId);
    }
    fragmentsPath(schemaName) {
        return EXAMPLES_COLL_PATH + '/' + this.fragmentDocName(schemaName);
    }
    ittfFileRelPath(name, schemaName) {
        var relPath = this.stripIttfExtension(name, schemaName);
        return encodeDocName(relPath);
    }
    fileRelPath(name, schemaName) {
        var relPath = this.stripExtension(name, schemaName);
        return encodeDocName(relPath);
    }
    examplePath(name, schemaName) {
        return 'schemas/' + schemaName + '/' + EXAMPLES_COLL_PATH2 + '/' + this.ittfFileRelPath(name, schemaName);
    }
    snippetPath(name, schemaName) {
        return 'schemas/' + schemaName + '/' + SNIPPETS_COLL_PATH + '/' + this.fileRelPath(name, schemaName);
    }
    fragmentPath(name, schemaName) {
        return 'schemas/' + schemaName + '/' + FRAGMENTS_COLL_PATH + '/' + this.ittfFileRelPath(name, schemaName);
    }
    templatePath(name, schemaName) {
        return 'schemas/' + schemaName + '/' + TEMPLATES_COLL_PATH + '/' + this.ittfFileRelPath(name, schemaName);
    }
    stripIttfExtension(basename, schemaName) {
        basename = normalizeFile(basename);
        const suffix = '.' + schemaName + '.ittf';
        if (basename.substr(-suffix.length) === suffix) {
            console.log('stripIttfExtension: ' + basename.substr(0, basename.length - suffix.length));
            return basename.substr(0, basename.length - suffix.length);
        }
        else {
            console.log('stripIttfExtension.result:' + basename);
            return basename;
        }
    }
    stripExtension(basename, schemaName) {
        console.log('stripExtension.basename.schemaName', basename, schemaName);
        basename = normalizeFile(basename);
        const suffix = '.' + schemaName;
        if (basename.substr(-suffix.length) === suffix) {
            console.log('stripExtension.result:', basename.substr(0, basename.length - suffix.length));
            return basename.substr(0, basename.length - suffix.length);
        }
        else {
            console.log('stripExtension.result:' + basename);
            return basename;
        }
    }
    replaceSchemaInIttfPath(name, oldSchemaName, newSchemaName) {
        var ret = this.stripIttfExtension(name, oldSchemaName);
        return ret + '.' + newSchemaName + '.ittf';
    }
}
export function normalizeFile(filePath) {
    const basename = path.basename(filePath);
    if (basename === filePath) {
        return basename;
    }
    const dirname = path.dirname(filePath);
    return verify.replaceAll(dirname, '\\', '/').toLowerCase() + '/' + basename;
}
export function normalizeFolder(folderPath) {
    return verify.replaceAll(folderPath, '\\', '/').toLowerCase();
}
export function encodeDocName(name) {
    return verify.replaceAll(name, '/', '[.]');
}
export function decodeDocName(name) {
    return verify.replaceAll(name, '[.]', '/');
}
export default PathNames;
