## Ittf document loading
`A textual Ittf document is loaded into an mTree object by these modules that are run in sequence.`
* liner 
* nodifier 
* includer 
* mixer 
* appender 
* evaluator 
## Glossary

<table>
<tr>
<td>$append [hook-name]</td>
<td>
Is an ittf node command that declares a node branch that`must be appended to a related '$hook [hook-name]' node command in`
`a mixed mTree brick.`
</tr>
<tr>
<td>$hook [hook-name]</td>
<td>
Is an ittf node command that declares an insertion point in`the tree structure of a mixed mTree brick. Node branches,`
`children of a 'mix' node command, declared with the`
`'$append [hook-name]' node command can be appended to the '$hook' node.`
</tr>
<tr>
<td>$include [path]</td>
<td>
Is an ittf node command that invokes the inclusion of another mTree brick.`An include node command cannot have children nodes, and it is simply`
`replaced by the included brick.`
</tr>
<tr>
<td>ittf document</td>
<td>
Ittf, short for Indented Text Tree Format, is the textual notation format of an mTree.`An ittf document is a syntax tree, codified in a text document,`
`where child nodes are indented to their parent.`
`Every line is a node consisting of a name-value pair.`
`The name is the first string of chars of the line and is separated`
`from the value by a space or a tab.`
`An ittf document is a template and when loaded for building an mTree`
`we can pass a context object to the mTree loader.`
`All nodes are templateable and composable. Even the root node may be a command node`
`that invokes the mixup of its container.`
`When parsed and nodified an ittf document become an mTree brick.`
</tr>
<tr>
<td>jsWizzi</td>
<td>
JsWizzi is a subset of the ECMA-262 javascript standard used by the wizzi factory`for the buildup of mTrees.`
`It is built on the quite efficent esprima parsing infrastructure and is run`
`by a custom, sandboxed, javascript engine. See jsWizziRunner.`
</tr>
<tr>
<td>jsWizziContext</td>
<td>
The evaluation step of an mTree loading uses three types of value contexts.* One global context. 
* One single node structure context, where the mTree is built. 
* One value context for each mTree brick. 
</tr>
<tr>
<td>jsWizziRunner</td>
<td>
The javascript engine of an mTree buildup. It is run for expressions interpolation,`template commands evaluation and mTree final buildup.`
</tr>
<tr>
<td>mix node command</td>
<td>
Is an ittf node command that invokes the mixup of another mTree brick.`Every node with the node-name ending with an open paren is a mix node command.`
`A mix node command may have children nodes, that may declare`
`branches to be appended to hooks in the mixed mTree brick.`
`See the $append and $hook command nodes.`
</tr>
<tr>
<td>mTree</td>
<td>
An in-memory tree data structure of name-valued nodes that is built loading and`processing an ittf document`
</tr>
<tr>
<td>mTree brick</td>
<td>
A nodified ittf document.`mTree bricks are the items that compose an mTree.`
`They can mix (or include) other bricks and be mixed (or included).`
`The same brick can be reused in many branches of the mTree,`
`so a brick is loaded once and always cloned.`
</tr>
<tr>
<td>- included mTree brick</td>
<td>
An mTree brick included in an including mTree brick`using the node command <bold>$include [path]</bold>.`

<p>Both the tree structure and the value context are included.`Context values declared in the included nodes are created in`
`the scope of the includer.`
</p>

</tr>
<tr>
<td>- mixed mTree brick</td>
<td>
An mTree brick mixed in a mixing mTree brick`using the node command <bold>[path]([params])</bold>.`

<p>The tree structure is mixed but the value context remain distinct.`Context values declared in the mixed nodes are created in`
`the scope of the mixed mTree brick and do not interfere with the mixer.`
</p>

</tr>
<tr>
<td>mTree loading</td>
<td>
The creation of an mTree from an ittf document.* line parsing (of a source ittf document) 
* nodification (produces one mTree brick from every source ittf document) 
* mix-composition (recursive on mixed and included mTree bricks) 
* include-composition (recursive on mixed and included mTree bricks) 
* append-resolution (on the composed mTree piece) 
* evaluation (on the mixed and appended mTree piece) 
</tr>
<tr>
<td>- line parsing</td>
<td>
The text of the ittf document is parsed into name-valued lines,`eliminating comments, resolving line continuations, detecting indentation`
`and managing chars that interfere with variable interpolation.`
</tr>
<tr>
<td>- nodification</td>
<td>
The lines parsed in the previous step are transformed in a tree`structure, an mTree brick, respecting the indentation of the source.`
`One root node only is allowed.`
</tr>
<tr>
<td>- mix-composition</td>
<td>
The mTree brick, produced by the previous step, is traversed and`all the 'mix node commands' encountered are recursively resolved.`
`The result is an mTree piece composed by one or many bricks.`
</tr>
<tr>
<td>- include-composition</td>
<td>
The mTree piece, produced by the previous step, is traversed and`all the '$include [path]' node commands encountered are recursively resolved.`
`The recursion manages the mix-composition of included bricks too.`
</tr>
<tr>
<td>- append resolution</td>
<td>
The mTree piece resulting from composition is traversed again and`child branches (of mix node commands), declared with the '$append [hook-name]'`
`node command, are moved, replacing the related '$hook [hook-name]'`
`node command of the mixed mTree brick.`
</tr>
<tr>
<td>- evaluation</td>
<td>
The last step of an mTree loading. From the mTree piece produced`by the previous steps is created a jsWizzi script that evaluates`
`the template commands of its nodes and builds the final mTree.`
</tr>
<tr>
<td>mTree buildup script</td>
<td>
The jsWizzi script that, once executed, by the`jsWizziRunner, will give as result the final mTree`
`of the source ittf document.`
</tr>
<tr>
<td>mTreeBuildUpScriptCoder</td>
<td>
A module of the wizzi.mtree package that generates the`mTree build up script.`
</tr>
<tr>
<td>path resolution</td>
<td>
Include and mix command nodes declare the path of the ittf document`that must be mixed or included. At first the path to match is built`
`joining the current folder path of the calling document and the name`
`of the callee document. If this match fails, then the 't' folder rule is applied,`
`starting from the current folder path and going up on the folder tree.`
`See 't' folder.`
</tr>
<tr>
<td>'t' folder</td>
<td>
Folders named 't' have special rules for the path resolution`of mixed and included ittf documents. In the folder structure`
`of a wizzi factory package, ittf documents contained in a 't' folder,`
`can be referenced with the same rules that apply to nodejs packages`
`in 'node_modules' folders. They are searched up on the folder tree, until the`
`relative path of the mixin or include call is matched or the path resolution fails.`
</tr>
</table>

