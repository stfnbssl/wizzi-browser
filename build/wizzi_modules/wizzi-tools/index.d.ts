type cb<T> = (err: any, result: T) => void;

interface BabelOptions {
    sourceType: string;
    ts_or_flow: string;
}

interface WizzifyOptions {
    babel?: BabelOptions;
}

export function wizzify(
    schemaName: string, codeSnippet: string, options: WizzifyOptions, callback: cb<string>
): void;
