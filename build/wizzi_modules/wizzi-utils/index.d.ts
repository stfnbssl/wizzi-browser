type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

export interface FileDef {
    fullPath: string;
    relPath: string;
    content?: string;
}

export interface FolderDef {
    fullPath: string;
    relPath: string;
    documents?: FileDef[];
}

export interface GetFilesOptions {
    deep: boolean;
    extension?: string;
    documentContent?: boolean;
}

export interface GetFoldersOptions {
    deep: boolean;
    tFoldersOnly?: string;
    documentNames?: boolean;
}

export interface GlobOptions {
    removeRoot?: string;
}

export interface VFile {
    mkdir(folderPath: string, callback: cb<any>): void;
    read(filePath: string, callback: cb<string>): void;
    write(filePath: string, content: string, callback: cb<any>): void;
    exists(filePath: string, callback: cb<boolean>): void;
    unlink(filePath: string, callback: cb<any>): void;
    deleteFolder(folderPath: string, callback: cb<any>): void;
    copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    rename(oldPath: string, newPath: string, callback: cb<any>): void;
    isFile(filePath: string, callback: cb<boolean>): void;
    isDirectory(folderPath: string, callback: cb<boolean>): void;
    getFiles(folderPath: string, options: GetFilesOptions, callback: cb<FileDef[]>): void;
    getFolders(folderPath: string, options: GetFoldersOptions, callback: cb<FolderDef[]>): void;
    glob(globExpr: string, options: GlobOptions, callback: cb<FileDef[]>): void;
}

export interface VFileFS {
    // Sync
    mkdir(folderPath: string): any;
    read(filePath: string): string;
    write(filePath: string, content: string): any;
    exists(filePath: string): boolean;
    unlink(filePath: string): any;
    // NOT IMPLEMENTED deleteFolder(folderPath: string): any;
    copyFile(fromFile: string, toFile: string): any;
    // NOT IMPLEMENTED copyFolder(fromFolder: string, toFolder: string): any;
    // NOT IMPLEMENTED moveFile(fromFile: string, toFile: string): any;
    // NOT IMPLEMENTED moveFolder(fromFolder: string, toFolder: string): any;
    isFile(filePath: string): boolean;
    isDirectory(folderPath: string): boolean;
    getFiles(folderPath: string, options: GetFilesOptions): FileDef[];
    getFolders(folderPath: string, options: GetFoldersOptions): FolderDef[];
    glob(globExpr: string, options: GlobOptions): FileDef[];
    // Async
    mkdir(folderPath: string, callback: cb<any>): void;
    read(filePath: string, callback: cb<string>): void;
    write(filePath: string, content: string, callback: cb<any>): void;
    exists(filePath: string, callback: cb<boolean>): void;
    unlink(filePath: string, callback: cb<any>): void;
    deleteFolder(folderPath: string, callback: cb<any>): void;
    copyFile(fromFile: string, toFile: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    copyFolder(fromFolder: string, toFolder: string, callback: cb<any>): void;
    moveFile(fromFile: string, toFile: string, callback: cb<any>): void;
    isFile(filePath: string, callback: cb<boolean>): void;
    isDirectory(folderPath: string, callback: cb<boolean>): void;
    getFiles(folderPath: string, options: GetFilesOptions, callback: cb<FileDef[]>): void;
    getFolders(folderPath: string, options: GetFoldersOptions, callback: cb<FolderDef[]>): void;
    glob(globExpr: string, options: GlobOptions, callback: cb<FileDef[]>): void;
}

interface FsImpl {
    stat(path: string, callback: cb<object>): any;
}

interface VFileOptions {
    storeName?: string;
}

interface ParsedUri {
    storeKind: string;
    userId: string;
    projectId: string;
    path: string;
    basename: string;
    extension: string;
    isIttfDocument: boolean;
}

export function uriParser(uri: string): ParsedUri;
export function vfile(): VFileFS;
export function vfile(fsImpl: FsImpl): VFileFS;
export function vfile(options: VFileOptions, callback: cb<VFile>): void;

export interface IttfMTreeFragment {
    id: string;
    oper: string;
    name: string;
    uri: string;
    baseUri: string;
    relUri: string;
    hash: string;
    ittfContent: string;
    ittfPretty: string;
}

export interface IttfMTreeFragmentError extends IttfMTreeFragment {
    message: string;
}

export interface IttfMTreeState {
    id: string;
    primaryPath: string;
    primaryUri: string;
    breadCrumbs: BreadCrumb[];
    primaryHash: string;
    primaryIttf: IttfDocumentContent;
    mTree: IttfMTreeEx;
    fragments: IttfMTreeFragment[];
    ittfReferences: IttfMTreeReference[];
    errorFragments: IttfMTreeFragmentError[];
}

export interface IttfMTreeReference {
    id: string;
    oper: string;
    name: string;
    uri: string;
    baseUri: string;
    relUri: string;
    documentState: IttfMTreeState,
}

export interface IttfMTreeExNode {
    name: string;
    value: string;
    children: IttfMTreeExNode[];
}

export interface IttfMTreeEx extends IttfMTreeExNode {
    fragments: IttfMTreeFragment[];
    ittfReferences: IttfMTreeReference[];
    errorFragments: IttfMTreeFragmentError[];
}

interface FolderScanOptions {
    /* 
    * the name of the 'wzpackage' wizzi model that
    * will be generated from this folder
    ***/
    name: string;
    /*
    * the base path to the 'main' generated artifact
    ***/
    gitPath?: string;
    /*
    * the virtual filesystem used for scanning the folder
    * default: filesystem
    ***/
    file?: VFileFS;
}

export namespace folderScanner {
    export function scan(folderPath: string, options: FolderScanOptions, callback: cb<IttfMTreeEx>): void;
}

interface TextDocumentScannerOptions {
    /*
    * the virtual filesystem used for scanning the folder
    * default: filesystem
    ***/
    file?: VFileFS;
}

export namespace textDocumentScanner {
    export function scan(folderPath: string, options: TextDocumentScannerOptions, callback: cb<IttfMTreeEx>): void;
}

interface IttfDocumentContent {
    content: string;
    pretty: string;
}


interface IttfDocumentScannerOptions {
    rootFolder: string;
    baseIdCounter?: number;
    /*
    * the virtual filesystem used for scanning the folder
    * default: filesystem
    ***/
    file?: VFileFS;
}

export namespace ittfDocumentScanner {
    export function scan(folderPath: string, options: IttfDocumentScannerOptions, callback: cb<IttfMTreeState>): void;
}

interface BreadCrumb {
    uri: string;
    name: string;
    isLast: boolean;
}

interface FsItem {
    isFolder?: boolean;
    uri: string;          // dirname + '/' + basename
    name: string;         // without extension
    basename?: string;    // name + '.' + mime
    dirname: string;
    isIttfDocument?: boolean;
    isFragment?: boolean; // when true always isIttfDocument is true
    isSchema?: boolean;   // schema === 'wfschema'
    isJob?: boolean;      // schema === 'wfjob'
    schema?: string;      // wizzi schema when isIttfDocument is true
    mime?: string;        // extension without dot '.'
    hash?: string;
    content?: string;
}

interface FolderBrowseResult {
    folderPath: string;
    folderUri: string;
    breadCrumbs: BreadCrumb[];
    fsitems: FsItem[];
}

interface FolderBrowseOptions {
    rootFolder?: string;
    /*
    * the virtual filesystem used for scanning the folder
    * default: filesystem
    ***/
    file?: VFileFS;
}

export namespace folderBrowse {
    export function scan(folderPath: string, options: FolderBrowseOptions, callback: cb<FolderBrowseResult>): void;
}

interface ParseNameValueReturn {
    name(): string;
    value(): string;
    hasValue(): boolean;
}

export namespace verify {
    export function startsWith(text: string, prefix: string): string;
    export function endsWith(text: string, suffix: string): string;
    export function unquote(text: string): string;
    export function capitalize(text: string): string;
    export function dashToCamelCase(text: string): string;
    export function escapeRegExp(text: string): string;
    export function htmlEscape(text: string): string;
    export function resolveToString(value: any): string;
    export function makeInline(text: string): string;
    export function unixifyPath(text: string): string;
    export function replaceAll(text: string, find: string, repl: string): string;
    export function isDefined(test?: any): boolean;
    export function isUndefined(test?: any): boolean;
    export function isDefined(test?: any): boolean;
    export function isNullOrUndefined(test?: any): boolean;
    export function isString(test?: any): boolean;
    export function isEmpty(text?: any): boolean;
    export function isNotEmpty(text?: any): boolean;
    export function isNumber(test?: any): boolean;
    export function isBoolean(test?: any): boolean;
    export function isDate(test?: any): boolean;
    export function isPrimitive(test?: any): boolean;
    export function isObject(test?: any): boolean;
    export function isArray(test?: any): boolean;
    export function isArrayOrObject(test?: any): boolean;
    export function isFunction(test?: any): boolean;
    export function isRegExp(test?: any): boolean;
    export function isError(test?: any): boolean;
    export function isAbsolutePath(test?: any): boolean;
    export function isIttfMacro(test?: any): boolean;
    export function isSingleQuoteLiteral(test?: any): boolean;
    export function isDoubleQuoteLiteral(test?: any): boolean;
    export function isCssLength(test?: any): boolean;
    export function isEmail(test?: any): boolean;
    export function isEmails(test?: any): boolean;
    export function isMinLength(test: any, length: number): boolean;
    export function isMaxLength(test: any, length: number): boolean;
    export function isExactLength(test: any, length: number): boolean;
    export function isGreaterThan(value: any, test: any): boolean;
    export function isLessThan(value: any, test: any): boolean;
    export function isGreaterEqualThan(value: any, test: any): boolean;
    export function isLessEqualThan(value: any, test: any): boolean;
    export function isAlpha(value: any): boolean;
    export function isAlphaNumeric(value: any): boolean;
    export function isIp(value: any): boolean;
    export function isBase64(value: any): boolean;
    export function isUrl(value: any): boolean;
    export function isGreaterThanDate(value: any, date: any): boolean;
    export function isLessThanDate(value: any, date: any): boolean;
    export function isGreaterEqualDate(value: any, date: any): boolean;
    export function isLessEqualDate(value: any, date: any): boolean;
    export function escapeQuotes(text?: any): string;
    export function splitLines(text?: any, options?: { numbered: boolean }): string;
    export function stripIttfExtension(path_string: any): string;
    export function stripExtension(path_string: string): string;
    export function replaceExtension(path_string: string, newExtension: string): string;
    export function parseNameValue(text: string, node?: any, options?: { objectProperty: boolean }): ParseNameValueReturn;
    export function convert(value: any, type: string, unquote?: boolean): any;
    export function canConvert(value: any, type: string): boolean;
    export function fatal(err: any, errcode?: number): void;
    export function loginfo(msg: string): void;
    export function logwarn(msg: string): void;
    export function logerror(msg: string): void;
    export function dumpStack(err: any): void;
}