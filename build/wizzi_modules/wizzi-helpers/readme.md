# wizzi-helpers

Helpers library for the wizzi factory.

## Work still in progress

Availability of features will be announced
on [Twitter](https://twitter.com/wizziteam) and [Facebook](https://www.facebook.com/wizzifactory)

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
## The Wizzi Factory

A model driven artifact factory.


<p><a href="https://wizzifactory.github.io/">Project page</a></p>

## Built With
* [Nodejs](https://nodejs.org)

* [Wizzi Factory](https://github.com/wizzifactory)


## License

<p>This project is licensed under the MIT License - see the <a href="license.txt">license.txt</a> for details.</p>

