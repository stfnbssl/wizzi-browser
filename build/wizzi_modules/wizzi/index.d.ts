import { JsonFsData, FsJson } from 'wizzi-repo';
type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

/**
 * Parsed line of an ittf document.
 */
declare interface MTreeBrickLine {
    indent: number;
    name: string;
    value: string; // always trimmed
    row: number;
    col: number;
    sourceKey: string;
    tagSuffix?: string; // undefined; || '(',
    hasMacro: boolean;
}

/**
 * Nodified parsed line of an ittf document.
 */
declare interface MTreeBrickNode extends MTreeBrickLine {
    parent: MTreeBrickNode;     // parent mTreeBrick
    model: MTreeBrick;          // the mTreeBrick to which the node belongs
    children: MTreeBrickNode[]; // the children mTreeBricks
    id: number;                 // unique id
}

/**
 * The parsed tree of an ittf document.
 */
declare interface MTreeBrick {
    uri: string;                       // The location of the source IttfDocument.
    schema: string;                     // The source IttfDocument schema.
    loadHistory: WizziModelLoadHistory; // The loadHistory object
    lines: MTreeBrickLine[];           // parsed lines of source text
    nodes: MTreeBrickNode[];           // nodified lines of source text
    sourceKey: string;                 // key of the source info of the IttfDocument
    brickKey: string;                  // key of the cloned mTreeBrick
    // these are set by the mixer, on the cloned object
    mixed: boolean;                    // true if has been mixed
    $mixerBrickKey: string;            // the brickKey of the mTreeBrick of the calling node (mixer)
    $args: string;                     // the node-value of the mixer node
    $argArray: string[]                // the $arg array of the mixer node
    // these are set by the nodifier on the original mtree, then cloned
    $params: string;                   // the node-value of the $params node, if declared
}

/**
 * An history object containing the text source of an ittf document.
 */
declare interface IttfDocumentData {
    ittfDocumentUri: string;
    sourceKey: string;
    content: string;
}

/**
 * An history object containing the parsed tree of an ittf document.
 */
declare interface MTreeBrickData {
    ittfDocumentUri: string;
    schema: string;
    sourceKey: string;
    brickKey: string;
    mTreeBrick: MTreeBrick;
}

/**
 * The container of all the parsed ittf documents that compose an MTree.
 */
declare interface WizziModelLoadHistory {
    ittfDocumentDatas: Readonly<string, IttfDocumentData>;
    mTreeBrickDatas: Readonly<string, MTreeBrickData>;
    getIttfDocumentContent(sourceKey: string): string;
    getSourceKey(ittfDocumentUri: string): string;
}

/**
 * The node of the builded final tree. See the [[MTree]] interface.
 */
declare interface MTreeNode {
    // The value of the source ittf node name
    n: string;
    // The value of the source ittf node value
    v: string;
    // The source ittf node row position
    r: number;
    // The source ittf node name column position
    c: number;
    /* The key of the ittfDocumentData of the ittf source document
        to which this node belongs. The ittfDocumentData object
        can be retrieved, with this key, from the wizzi-mtree.mTree.loadHistory object, 
        available as a property of the wizzi-mtree.mTree.*/
    s: string;
    /* The key of the mTreeBrick to which this node belongs.
        The mTreeBrick object can be retrieved, with this key, from the 
        wizzi-mtree.mTree.loadHistory object, available as a property 
        of the wizzi-mtree.mTree.*/
    u: string;
    // Children nodes
    children: MTreeNode[];
}

/**
 * The builded final tree, after composition and template processing.
 */
declare interface MTree {
    uri: string;
    $schema: string;
    loadHistory: WizziModelLoadHistory;
    nodes: MTreeNode[];
}

/**
 * Source map of an element of a wizzi model.
 */
declare interface SourceLineInfo {
    row: number;
    col: number;
    sourceKey: string;
}

/**
 * Context object used during validation and initialization of a wizzi model.
 */
declare interface WizziModelLoadContext {
    validationErrors: string[];
    schemaIsValid(): boolean;
    addError(message: string, node?: WizziModelElement): void;
    verifyEnum(
        valueType: string, valueName: string, value: string, allowed: string[], node?: WizziModelElement
    ): void
}

/**
 * The root element of a wizzi model.
 */
declare interface WizziModelRoot extends WizziModelElement {
    loadHistory: WizziModelLoadHistory;
}

/**
 * An element of a wizzi model.
 */
declare interface WizziModelElement {
    wzTag: string;
    wzName: string;
    wzElement: string;
    wzSourceLineInfo: SourceLineInfo;
    wzRoot(): WizziModelRoot;
    wzSourceFilepath(): string;
    wzVerify(ctx: WizziModelLoadContext): void;
    wzInitialize(ctx: WizziModelLoadContext): void;
}

/**
 * A wizzi model.
 */
declare interface WizziModel extends WizziModelElement { }


/**
 * WIZZI FACTORY CREATION
 */

/**
 * Supported repository kinds for ittf document sources and artifacts persistence.
 */
declare enum StoreKind {
    filesystem = 'filesystem',
    mongodb = 'mongodb',
    json = 'json',
    browserfs = 'browserfs'
}

/**
 * Repository config options. 
 * A Wizzi Factory instance may have one single repository.
 */
type RepositoryOptions = {
    storeKind: string;
    storeUri?: string;
    storeBaseFolder?: string;
}

/**
 * Required plugins.
 * The pluginsBaseFolder options is for local plugins.
 */
type PluginsOptions = {
    items: string[];
    pluginsBaseFolder?: string;
}

/**
 * Options parameter for testing the wizzi factory.
 */
type FactoryTestOptions = {
    testOnlyMockBaseDir?: string;
    dumps?: {
        dumpsBaseFolder: string;
        mTreeBuildupJsWizziScript: {
            dump?: boolean;
        }
    };
}

/**
 * The wizzi factory configuration object
 */
type FactoryOptions = {
    repo: RepositoryOptions;
    plugins: PluginsOptions;
    globalContext?: object;
    test?: FactoryTestOptions;
}

type NoAclFactoryOptions = {
    plugins?: PluginsOptions;
    globalContext?: object;
    fsJson?: FsJson;
}

/**
 * Creates a wizzi factory.
 */
export function createFactory(user: string, role: string, options: FactoryOptions, callback: cb<WizziFactory>): void;
export function createFactory(options: FactoryOptions, callback: cb<WizziFactory>): void;
export function fsFactory(options: NoAclFactoryOptions, callback: cb<WizziFactory>): void;
export function mongoFactory(storeUri: string, storeBaseFolder: string, options: NoAclFactoryOptions, callback: cb<WizziFactory>): void;
export function jsonFactory(options: NoAclFactoryOptions, callback: cb<WizziFactory>): void;
export function browserFactory(options: NoAclFactoryOptions, callback: cb<WizziFactory>): void;

/**
 * WIZZI FACTORY PRODUCTION MANAGER
 */

type ArtifactOptions = {
    // TODO basedir should not to be here
    basedir: string;
    isDebug?: boolean,
    CRLF?: string,
    indentSpaces?: number,
    dotgExtensionPrefix?: boolean,
    dumps?: object,
}

interface CodeLine {
    containsFilePath?: boolean,
    text: string[],
    indentValue: number,
    options: ArtifactOptions,
}

interface CodeBlock {
    lines: CodeLine[];
    options: ArtifactOptions,
    indentValue: number,
    currentline?: CodeLine,
}

interface GenContext {
    block: CodeBlock;
    values: object;
    isEmpty: boolean;
    artifactGenerationErrors: object[],
}

interface ModelInfo {
    id: string;
    config: object;
    schema: string;
    format?: string;
    isCompile: boolean;
    contexts?: object[];
    transformers?: string[];
    coll?: object;
    exportName?: string;
    generatorRequireContextOnly: boolean;
}

type ArtifactDestFolder = {
    baseFolder: string;
    folder: string;
    extension: string;
}

type ArtifactDestPath = {
    path?: string;
    extension: string;
}

interface ArtifactConfig {
    // from wfjob.artifact.wzName
    name: string;
    options: ArtifactOptions;
    model: {
        cwd: string,     // from wfjob.line.cwdFolder
        src: string,     // from wfjob.artifact.src
        ignore?: string,  // from wfjob.artifact.ignore
        schema: string,  // from wfjob.artifact.schema
        contexts?: object[],
        transformers?: string[], // from wfjob.artifact.transformers
    },
    contexts?: object[],
    isWfJob?: boolean, // from wfjob.artifact.isWfJob
    gen: {
        generator: string, // from wfjob.artifact.generator
    },
    dest: ArtifactDestPath | ArtifactDestFolder
}

interface ArtifactInfo {
    name: string;
    options: ArtifactOptions;
    modelInfo: ModelInfo;
    contextInfos: object[],
    transformers: string[],
    gen: {
        generator: string,
    },
    dest: ArtifactDestPath | ArtifactDestFolder,
    isWfJob?: boolean, // from wfjob.artifact.isWfJob
    isWfModelType?: boolean, // from wfjob.artifact.isWfJob
    genContexts: GenContext[],
}

interface PManJobRequest {
    wfjob: {
        ittfDocumentUri: string,
    }
}

interface PManPersistResult {
    oper: string;
    item: {
        filepath: string,
    };
    status: string;
}

interface ProductionManager {
    addArtifactRequest(request: ArtifactConfig): void;
    addJobRequest(jobRequest: PManJobRequest): void;
    run(callback: cb<ArtifactInfo[]>): void;
    persistToFile(callback: cb<PManPersistResult[][]>): void;
    terminate(): void;
}

export function createProductionManager(options?: ProductionOptions, globalContext?: object): ProductionManager;

/**
 * WIZZI FACTORY OPERATIONS
 */

/**
* The configuration of the loading of a complex wizzi model.
*/
type ModelLoadConfig = {
    src: string;
    cwd: string;
    schema: string;
    format?: string;
    exportName?: string;
    contexts: ModelLoadConfig[];
    transformers: string[];
}

/**
* The required result format of a loaded wizzi model.
*/
type ModelFormatOptions = {
    // if true returns not the model but its ittf source documents.
    ittfSources: boolean;
}

/**
* A wizzi model load context.
*/
type ModelLoadContext = {
    mTreeBuildUpContext?: object;
    formatOptions?: ModelFormatOptions;
}

/**
* An artifact generation context.
*/
type GenerationContext = {
    modelRequestContext?: {
        mTreeBuildUpContext?: {}
    };
    artifactRequestContext?: {
    };
}

/**
* Job production options.
*/
type ProductionOptions = {
    indentSpaces?: number;
    basedir?: string;
    verbose?: number;
}

/**
* Wizzi job options
*/
type JobRequest = {
    name: string;
    path: string;
    globalContext?: object;
    productionOptions: ProductionOptions;
}

type JsonFactoryOptions = {
    jsonFsData: JsonFsData;
    globalContext?: object;
}


/**
* The Wizzi Factory instance interface
*/
declare interface WizziFactory {

    /**
     * @param ittfDocumentUri      The path to the primary ittf source document.
     * @param mTreeBuildUpContext  A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[MTree]].
     */
    loadMTree(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<MTree>
    ): void;
    /**
     * @param ittfDocumentUri      The path to the primary ittf source document.
     * @param mTreeBuildUpContext  A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
     * @param callback             Receives the builded [[MTree]].
     */
    loadMTreeDebugInfo(
        ittfDocumentUri: string, mTreeBuildUpContext: object, callback: cb<string>
    ): void;
    /**
    * @param schemaName           
    * @param ittfDocumentUri      The path to the primary ittf source document.
    * @param loadContext          A context object for the [[MTree]] build up, [[WizziModel]] or POJO.
    * @param callback             Receives the builded [[WizziModel]].
    */
    loadModel(
        schemaName: string, ittfDocumentUri: string, loadContext: ModelLoadContext, callback: cb<WizziModel>
    ): void;
    loadModelFromConfig(
        modelConfig: ModelLoadConfig, globalContext: object, callback: cb<WizziModel>
    ): void;
    transformModel(
        model: object, transformerName: string, context: object, callback: cb<object>
    ): void;
    generateArtifact(
        artifactModel: object, ittfDocumentUri: string, artifactName: string, callback?: cb<string>
    ): void;
    generateArtifact(
        artifactModel: object, ittfDocumentUri: string, artifactName: string, artifactRequestContext: object, callback: cb<string>
    ): void;
    loadModelAndGenerateArtifact(
        ittfDocumentUri: string, context: GenerationContext, artifactName: string, callback?: cb<string>
    ): void;
    generateModelTypes(
        wfschemaIttfDocumentUri: string, outputPackagePath: string, wfschemaName: string, mTreeBuildUpContext: object, callback: cb<object>
    ): void;
    executeJob(
        jobRequest: JobRequest, callback: cb<any>
    ): void;
    createJsonFactory(
        options: JsonFactoryOptions, callback: cb<WizziFactory>
    ): void;
    createProductionManager(options?: ProductionOptions, globalContext?: object): ProductionManager;
}

/**
* OPTIONS FOR WIZZI LIGHT FUNCTIONS
*/

/**
* The base wizzi ligth options interface.
*/
interface LightOptions {
    plugins?: string[];
    pluginsBaseFolder?: string;
}

/**
* Options for ligth MTree loading
*/
interface LightMTreeOptions extends LightOptions {
    raw?: boolean;
}

/**
* Options for ligth MTree loading from text
*/
interface LightMTreeFromTextOptions extends LightOptions {
    schema: string;
    raw?: boolean;
}

/**
* Options for ligth MTree loading
*/
interface LightModelOptions extends LightOptions {
    ittfSources?: boolean;
}

/**
* Options for ligth MTree loading from text
*/
interface LightModelFromTextOptions extends LightOptions {
    schema: string;
    ittfSources?: boolean;
}

/**
* Options for ligth artifact generation
*/
interface LightArtifactOptions extends LightOptions {
    // if undefined the default artifact for the wizzi schema is used
    artifactName?: string;
    artifactContext?: object;
}

/**
* Options for ligth job execution
*/
interface LightJobOptions extends LightOptions {
    name?: string,
    productionOptions?: ProductionOptions;
    modelContext?: object;
    jobContext?: object;
}

/**
* Options for ligth wizzi schema generation
*/
interface LightSchemaOptions extends LightOptions {
    outputPackagePath: string
}

/**
* Options for ligth wizzi schema generation of an entire folder
*/
interface LightArtifactsFolderOptions extends LightOptions {
    destFolder: string;
}

/**
* [[MTree]] build up
*/
export function mtree(ittfDocumentPath: string, callback: cb<MTree>): void;
export function mtree(ittfDocumentPath: string, mTreeBuildUpContext: object, callback: cb<MTree>): void;
export function mtree(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightMTreeOptions, callback: cb<MTree>
): void;
export function mtreeFromText(ittfContent: string, callback: cb<MTree>): void;
export function mtreeFromText(ittfContent: string, mTreeBuildUpContext: object, callback: cb<MTree>): void;
export function mtreeFromText(
    ittfContent: string, mTreeBuildUpContext: object, options: LightMTreeFromTextOptions, callback: cb<MTree>
): void;

/**
* [[WizziModel]] loading
*/
export function model(ittfDocumentPath: string, callback: cb<WizziModel>): void;
export function model(ittfDocumentPath: string, mTreeBuildUpContext: object, callback: cb<WizziModel>): void;
export function model(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightModelOptions, callback: cb<WizziModel>
): void;
export function modelFromText(ittfContent: string, callback: cb<WizziModel>): void;
export function modelFromText(ittfContent: string, mTreeBuildUpContext: object, callback: cb<WizziModel>): void;
export function modelFromText(
    ittfContent: string, mTreeBuildUpContext: object, options: LightModelFromTextOptions, callback: cb<WizziModel>
): void;

/**
* Artifact generation (single document)
*/
export function artifact(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightArtifactOptions, callback: cb<string>
): void;

/**
* Artifact generation (folder documents)
*/
export function artifactsFolder(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightArtifactsFolderOptions, callback: cb<string>
): void;

/**
* Wizzi job execution
*/
export function job(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightJobOptions, callback: cb<string>
): void;

/**
* Wizzi schema generation
*/
export function schema(
    ittfDocumentPath: string, mTreeBuildUpContext: object, options: LightSchemaOptions, callback: cb<string>
): void;

/**
 * Wizzi runner server
 */
interface RunnerServerConfig {
    cwd: string,
    userid: string;
    role: string;
    wizzifile?: any;
}
export function startRunnerServer(config: RunnerServerConfig, callback: cb<WizziFactory>): void;

/**
 * FILE NAMESPACE
 */
export namespace file {
    export function write(filePath: string, content: string): void;
    export function read(filePath: string): void;
}