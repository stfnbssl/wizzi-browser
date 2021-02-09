import {
    GetFilesOptions,
    GetFoldersOptions,
    FolderDef,
    FileDef,
    GlobOptions,
    VFile
} from 'wizzi-utils';
type cb<T> = (err: any, result: T) => void;

interface Collection {
}

interface FsJsonItemData {
    _id: object;
    basename: string;
    parentId: object;
    dirname: string;
    path: string;
    // one-of 0 (directory), 1 (file)
    kind: number;
}

interface FsJsonDocumentData {
    _id: object;
    content: string;
    lastModified: Date;
}

type ObjectID = object;

interface FsJsonInsertResult {
    code: string;
    insertedId: ObjectID;
    insertedCount: number;
    item: FsJsonItemData;
}

interface FsJsonDeleteResult {
    code: string;
    deletedCount: number;
    ok: boolean;
}

interface FsJsonUpdateResult {
    code: string;
    updatedCount: number;
    item: FsJsonItemData;
}

interface FsJsonWriteResult {
    code: string;
    item: FsJsonItemData;
}

/**
 * Json filesystem database
 */
interface FsJson {
    items: Collection;
    documents: Collection;
    getItem(key: object, callback: cb<FsJsonItemData>): void;
    getItemById(id: ObjectID, callback: cb<FsJsonItemData>): void;
    getItemByPath(path: string, callback: cb<FsJsonItemData>): void;
    getItemByNameAndParent(name: string, parent: ObjectID, callback: cb<FsJsonItemData>): void;
    getItemChildren(parentId: ObjectID, callback: cb<FsJsonItemData[]>): void;
    insertItem(item: FsJsonItemData, callback: cb<FsJsonInsertResult[]>): void;
    updateItem(item: FsJsonItemData, callback: cb<FsJsonUpdateResult[]>): void;
    deleteItem(id: ObjectID, callback: cb<FsJsonDeleteResult[]>): void;
    readDocument(id: ObjectID, callback: cb<string>): void;
    writeDocument(id: ObjectID, content: string, callback: cb<FsJsonWriteResult>): void;
    toJson(callback: cb<JsonFsData>): void;
    toFiles(options: { removeRoot: string }, callback: cb<FileDef[]>): void;
}

interface UploadedFileDef {
    relPath: string;
    dest: string;
    result: any;
}

interface FsJsonDocumentManager {
    fsdb: FsJson;
    createFolder(folderPath: string, callback: cb<any>): void;
    readFile(filePath: string, callback: cb<string>): void;
    writeFile(filePath: string, content: string, callback: cb<any>): void;
    exists(filePath: string, callback: cb<boolean>): void;
    deleteFile(filePath: string, callback: cb<any>): void;
    deleteFolder(folderPath: string, callback: cb<any>): void;
    copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    isFile(filePath: string, callback: cb<boolean>): void;
    isDirectory(folderPath: string, callback: cb<boolean>): void;
    getFiles(folderPath: string, options: GetFilesOptions, callback: cb<FileDef[]>): void;
    getFolders(folderPath: string, options: GetFoldersOptions, callback: cb<FolderDef[]>): void;
    glob(globExpr: string, options: GlobOptions, callback: cb<FileDef[]>): void;
    uploadFolder(sourcePath: string, destPath: string, callback: cb<UploadedFileDef[]>): void; 
}

interface FsJsonItem {
}

interface JsonDocumentDto {
    path: string;
    content: string;
}

interface JsonFsData {
    items: Collection;
    documents: Collection;
}

export namespace JsonComponents {
    export function createFsJson(documents: JsonDocumentDto[], callback: cb<FsJson>): void;
    export function createDocumentManager(fsJsonDataOrFsJson: JsonFsData | FsJson): FsJsonDocumentManager;
    export function createJsonFsData(documents: JsonDocumentDto[], callback: cb<JsonFsData>): void;
    export function addToJsonFsData(fsJsonData: JsonFsData, documents: JsonDocumentDto[], callback: cb<object>): void;
}

export function jsonfile(options: { jsonFsData?: JsonFsData, fsJson?: FsJson }, callback: cb<VFile>): void;

interface CreateStoreFactoryOptions {
    storeKind: string;
    storeUri: string;
    storeBaseFolder: string;
    storeJsonFsData: JsonFsData;
}

interface Store {
}

type createStoreFn = (callback: cb<Store>) => void;

export function createStoreFactory(options: CreateStoreFactoryOptions, callback: cb<createStoreFn>): void;

interface FileInfo {
    name: string;
    basename: string;
    isIttfDocument: boolean;
    isFragment: boolean;
    schema: string;
    mime: string;
    relFolder: string;
    fullPath: string;
    destBasename: string;
    destRelPath: string;
}

export function fileInfoByPath(filePath: string, baseFolder: string): FileInfo; 
