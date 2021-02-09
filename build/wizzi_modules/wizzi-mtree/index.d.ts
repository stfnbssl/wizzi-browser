type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
}

/**
 * Parsed line of an ittf document.
 */
declare interface MTreeBrickLine {
    indent: number;
    name: string; // node name
    value: string; // node value, always trimmed
    row: number;
    col: number;
    sourceKey: string;
    tagSuffix?: string; // undefined || '(',
    hasMacro: boolean; // the line contains a ` (ascii 96) character, replaced by a Æ (ascii 146) character
}

/**
 * Nodified parsed line of an ittf document.
 */
declare interface MTreeBrickNode extends MTreeBrickLine {
    parent: MTreeBrickNode;     // parent MTreeBrickNode
    model: MTreeBrick;          // the mTreeBrick to which the node belongs
    children: MTreeBrickNode[]; // the children MTreeBrickNodes
    id: number;                 // an id unique inside the loaded MTree
}

/**
 * The parsed tree of an ittf document.
 */
declare interface MTreeBrick {
    uri: string;                         // The location of the source IttfDocument.
    schema: string;                      // The source IttfDocument schema.
    loadHistory: WizziModelLoadHistory;  // The loadHistory object
    frontMatter?: Readonly<string, any>; // The front matter object
    lines: MTreeBrickLine[];             // parsed lines of source text
    nodes: MTreeBrickNode[];             // nodified lines of source text
    sourceKey: string;                   // key of the source info of the IttfDocument (see interface IttfDocumentData)
    brickKey: string;                    // key of the cloned mTreeBrick
    // these are set by the mixer, on the cloned object
    mixed: boolean;                      // true if has been mixed
    $mixerBrickKey: string;              // the brickKey of the mTreeBrick of the calling node (mixer)
    $args: string;                       // the node-value of the mixer node
    $argArray: string[]                  // the $arg array of the mixer node
    // these are set by the nodifier on the original mtree, then cloned
    $params: string;                     // the node-value of the $params node, if declared
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
    frontMatter?: Readonly<string, any>;
}

/**
 * Source map of an element of a wizzi model.
 */
declare interface SourceLineInfo {
    row: number;
    col: number;
    sourceKey: string;
}

/* FIXME copy from wizzi-repo */
interface Store {}
type createStore = (callback: cb<Store>) => void;

export type CreateLoadMTreeOptions = {
    useCache?: boolean; // default false
    frontMatter?: boolean; // default false
    raw?: boolean; // default false
    debugInfo?: boolean; // default false
};

export type LoadMTreeContext = {
    __productionManager: {
        productionContext: {
            aclstat: {}
        },
        mTreeBuildUpContext?: {},
        options?: {
            isCompile: boolean
        }
    }
};

export type loadMTreeFn = (ittfDocumentUri: string, loadContext: LoadMTreeContext, callback: cb<MTree>) => void;

export function createLoadMTree(createStore: createStore, options?: CreateLoadMTreeOptions) : loadMTreeFn;



