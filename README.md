<p align="center">

<a rel="noopener" target="_blank" href="https://wizzifactory.github.io">

<img width="450" src="https://wizzifactory.github.io/images/logo.svg" alt="Wizzi">
</img>

</a>

</p>

# Wizzi
A model driven artifact factory
* Design models that express your components features. 
* Write model transformers and artifact generators that target your preferred technologies. 
* Wizzify existing code. 
* Apply templating and composition features to the wizzified code. 
* Generate your artifacts from models. 


## Installation
Wizzi is available as an [npm package](https://www.npmjs.com/package/wizzi).
```sh
npm install wizzi --save-dev
```
## Usage (using the default factory for a quick start)
The default factory is an internally configured factory that uses a `filesystem` store and has three pre-loaded plugins: `wizzi-core`, `wizzi-js` and `wizzi-web`. It is a starter factory to play with that targets common web technologies.
### mTree loading
Loads in memory an mTree defined by an ittf document.
```javascript
var wizzi = require('wizzi');
wizzi.mtree(
    sourcePath,
    context,
    options,
    function(err, mTree) {
    ...
    });
```

<table>
<tr>
<td>sourcePath</td>
<td>The path to the ittf document that describes the mTree.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build of the ittf document.</td>
</tr>
</table>

### Wizzi model loading
Instantiates a wizzi model, loads it from an mTree object, validates and initializes it.
```javascript
var wizzi = require('wizzi');
wizzi.model(
    sourcePath,
    context,
    function(err, wizziModel) {
    ...
    });
```

<table>
<tr>
<td>sourcePath</td>
<td>The path to the ittf document that describes the model.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build of the ittf document.</td>
</tr>
</table>

### Artifact generation
Loads a wizzi model that describes an artifact and executes the generation.
```javascript
var wizzi = require('wizzi');
wizzi.gen(
    sourcePath,
    context,
    options,
    function(err, artifactText) {
    ...
    });
```

<table>
<tr>
<td>sourcePath</td>
<td>The path to the ittf document that describes the artifact.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build of the ittf document.</td>
</tr>
<tr>
<td>options</td>
<td>

<table>
<tr>
<td>artifactName</td>
<td>The name of the artifact to be generated. Defaults to the default artifact of the ittf document schema.</td>
</tr>
<tr>
<td>artifactContext</td>
<td>An object which properties will be values of the artifact generation context.</td>
</tr>
</table>

</tr>
</table>

### Wizzi schema generation
Generates the artifacts that implement a new wizzi model. The model is described by a wizzi schema (a `wfschema` ittf document).
```javascript
var wizzi = require('wizzi');
wizzi.schema(
    schemaPath,
    context,
    options,
    function(err, generationResult) {
        ...
    });
```

<table>
<tr>
<td>schemaPath</td>
<td>The path to the `wfschema` document that describes the new wizzi model.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build up of the `wfschema` document.</td>
</tr>
<tr>
<td>options</td>
<td>

<table>
<tr>
<td>outputPackagePath</td>
<td>The path to the plugin package that will export the new wizzi model.</td>
</tr>
</table>

</tr>
</table>

### Wizzi job execution
Executes the artifact generations described by a `wfjob` model.
```javascript
var wizzi = require('wizzi');
wizzi.job(
    surcePath,
    context,
    options,
    function(err, jobresults) {
    ...
    });
```

<table>
<tr>
<td>surcePath</td>
<td>The path to the `wfjob` document that describes the artifact generations to be executed.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build up of the `wfjob` document.</td>
</tr>
<tr>
<td>options</td>
<td>

<table>
<tr>
<td>name</td>
<td>The name of the job.</td>
</tr>
</table>

</tr>
</table>

### Folder generation
Executes the artifact generation of all the artifacts contained in a folder. Uses the default artifact generator of the ittf document schema.
```javascript
var wizzi = require('wizzi');
wizzi.genFolder(
    sourcePath,
    context,
    function(err, generationResults) {
        ...
    });
```

<table>
<tr>
<td>surcePath</td>
<td>The path of the folder that contains the ittf documents that describe the artifacts.</td>
</tr>
<tr>
<td>context</td>
<td>An object which properties will be context values in the mTree build up of each ittf document.</td>
</tr>
</table>

## Examples
Are you looking for an example to get started?

<p>

<a href="https://github.com/wizzifactory/wizzi/tree/master/examples">We host some
</a>

</p>

<h2>What is not
* Wizzi is NOT REACTIVE, it is a SOURCE BUILDER 
* Wizzi DOES NOT IMPLEMNT technologies, it TARGETS technologies 
</h2>

## Documentation
Check out our [documentation website](https://wizzifactory.github.io/).
## Roadmap
The future plans can be found in the [ROADMAP.md](https://github.com/wizzifactory/wizzi/blob/master/roadmap.md) file.
## Contributing
We'd greatly appreciate any [contribution](https://github.com/wizzifactory/wizzi/blob/master/contributing.md) you make.
## Changelog
Recently Updated?
Please read the [CHANGELOG.md](https://github.com/wizzifactory/wizzi/blob/master/changelog.md).
