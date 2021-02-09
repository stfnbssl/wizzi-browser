# wizzi-utils

Utility library for the wizzi factory.

## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

## vfile - virtual file system
#### var vfile = require('wizzi-utils').vfile
### vfileInst - create a virtual file system instance
#### var vfileInst = vfile([fsimpl])
* `fsimpl` `Object` Default: NodeJS fs object or fs-graceful if available. 
### vfileInst.read(path_string, options[, callback])
* `path_string` 
* `options` `Object` 
* `callback` `Function` If absent the call is sync. * `err` 
* `content` 

### vfileInst.write(path_string, content, options[, callback])
* `path_string` 
* `content` `String` 
* `options` `Object` 
* `callback` `Function` If absent the call is sync. When the call is sync if `fsimpl` does not implement `readFileSync` throw Error.
* `err` 
* `content` 

### vfileInst.readJSON(path_string, options[, callback])
### vfileInst.writeJSON(path_string, obj, options[, callback])
## The `fsimpl` - interface

<p>This interface must be implemented by file system objects`that expose their documents to the wizzi factory.`
</p>


<p>The `Sync` methods are optional, but a `Sync` call to an`fsimpl that does not implement it throw an Error.`
</p>

#### stat(path, callback)

<p>The returned `stats` object must implement: stats.isFile()`stats.isDirectory()`
</p>

#### statSync(path)

<p>The returned `stats` object must implement: stats.isFile()`stats.isDirectory()`
</p>

#### lstat(path, callback)

<p>The returned `stats` object must implement: stats.isFile()`stats.isDirectory()`
</p>

#### lstatSync(path)

<p>The returned `stats` object must implement: stats.isFile()`stats.isDirectory()`
</p>

#### readFile(path[, options], callback)
#### readFileSync(path[, options])
#### writeFile(path, content[, options], callback)
#### writeFileSync(path, content[, options])
#### readdir(path[, options], callback)
#### readdirSync(path[, options])
#### mkdir(path[, options], callback)
#### mkdirSync(path[, options])
## verify - helper object
#### var verify = require('wizzi-utils').verify
## verify - type checks
#### verify.isDefined(item)
#### verify.isNullOrUndefined(item)
#### verify.isObject(item)
#### verify.isArray(item)
#### verify.isFunction(item)
#### verify.isNumber(item)
#### verify.isBoolean(item)
#### verify.isDate(item)
#### verify.isString(item)
#### verify.isEmpty(item)
#### verify.isNotEmpty(item)
#### verify.isPrimitive(item)
#### verify.isRegExp(item)
#### verify.isError(item)
#### verify.isAbsolutePath(item)
#### verify.isIttfMacro(item)
## verify.convert(value, type[, unquote])
* `value` `String` If `@@null` return null; if `@@undefined` return undefined. 
* `type` `String` One-of string, integer, float, boolean, date 
* `options` `Object` 
## verify.canConvertTo(value, type)
* `value` `String` 
* `type` `String` One-of string, integer, float, boolean, date 
## verify - validations
#### verify.isEmail(value)
#### verify.isEmails(value)
#### verify.isMinLength(value, length)
#### verify.isMaxLength(value, length)
#### verify.isExactLength(value, length)
#### verify.isGreaterThan(value, test)
#### verify.isLessThan(value, test)
#### verify.isGreaterEqualThan(value, test)
#### verify.isLessEqualThan(value, test)
#### verify.isAlpha(value)
#### verify.isAlphaNumeric(value)
#### verify.isIp(value)
#### verify.isBase64(value)
#### verify.isUrl(value)
#### verify.isCreditCard(value)
#### verify.isGreaterThanDate(value, date)
#### verify.isLessThanDate(value, date)
#### verify.isGreaterEqualDate(value, date)
#### verify.isLessEqualDate(value, date)
## verify - errors
#### verify.error([inner,] [obj,] message, [arg-1[, arg-2[, arg-...]]])
#### verify.fatal(err[, code])
## folderScanner - ittf documents folder scanner
#### var folderScanner = require('wizzi-utils').folderScanner
## folderScanner.scan(folderPath[, options])
* `folderPath` `uri` 
* `options` `Object` 
* returns the root IttfFsNode of the 'folderPath' with its descendant folders as children. 
## ittfMTreeEx - enhanced mTree with import, export, analize capabilities
#### var ittfMTreeEx = require('wizzi-utils').ittfMTreeEx
#### ittfMTreeEx.loadFrom(path_string)
* `path_string` `uri` The uri of the ittf document that will be loaded as is (no composition, non template evaluation) 
* returns an ittfMTreeEx instance 
#### ittfMTreeEx.loadFrom(mTree)
* `mTree` `Object` An existent final or partial mTree. 
* returns an ittfMTreeEx instance 
## ittfHtmlPrettifier - ittf html formatter for documentation
#### var ittfHtmlPrettifier = require('wizzi-utils').ittfHtmlPrettifier
## ittfHtmlPrettifier(rootNode[, options])
* `rootNode` `Object` ittfMTreeEx instance 
* `options` `Object` 
## jsHtmlPrettifier - javascript html formatter for documentation
#### var jsHtmlPrettifier = require('wizzi-utils').jsHtmlPrettifier
## jsHtmlPrettifier(script[, options])
* `script` `String` javascript code 
* `options` `Object` 
## The Wizzi Factory

A model driven artifact factory.


<p><a href="https://wizzifactory.github.io/">Project page</a></p>

## Built With
* [Nodejs](https://nodejs.org)

* [Wizzi Factory](https://github.com/wizzifactory)


## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>

