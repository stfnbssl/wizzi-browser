# wizzi-mtree

Loader component for Indented Text Tree Format (ittf) documents. Implements the Wizzi Magical Tree buildup..

## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

## Features
* Loads an ittf document into an mTree instance ( [wizzi-mtree.mTree]()
, executing documents composition and template evaluation.
### Interface

<p>This interface is used by the wizziFactory class and by`test and demo modules.`
</p>

```javascript
mtree.createLoadMTree(
createStore,
options,
callback
);
```
#### Parameters

<table>
<tr>
<td>createStore</td>
<td>function returned by wizzi-repo.createSore</td>
</tr>
<tr>
<td>options</td>
<td>

<table>
<tr>
<td>useCache</td>
<td>default : false</td>
</tr>
</table>

</tr>
<tr>
<td>callback</td>
<td>returns the function
[wizzi-mtree.loader.loadMTree](https://wizzifactory.github.io/api.html#wizzi-mtree.loader)
.</tr>
</table>

## The Wizzi Factory

A model driven artifact factory.


<p><a href="https://wizzifactory.github.io/">Project page</a></p>

## Built With
* [Nodejs](https://nodejs.org)

* [Wizzi Factory](https://github.com/wizzifactory)


## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>

