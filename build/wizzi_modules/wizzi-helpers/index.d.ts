type cb<T> = (err: any, result: T) => void;

type Readonly<P, T> = {
    readonly [P in keyof T]: T[P];
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