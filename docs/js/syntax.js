/**
 * Lightweight Python syntax highlighter.
 * Regex-based, not a full parser — good enough for short snippets.
 */
const PySyntax = (() => {
    const KEYWORDS = new Set([
        'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
        'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
        'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not',
        'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield'
    ]);

    const BUILTINS = new Set([
        'print', 'len', 'range', 'type', 'isinstance', 'issubclass',
        'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool',
        'bytes', 'bytearray', 'memoryview', 'complex',
        'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed',
        'min', 'max', 'sum', 'abs', 'round', 'pow', 'divmod',
        'any', 'all', 'next', 'iter', 'id', 'hash', 'hex', 'oct', 'bin',
        'input', 'open', 'repr', 'format', 'chr', 'ord',
        'hasattr', 'getattr', 'setattr', 'delattr', 'callable',
        'super', 'property', 'staticmethod', 'classmethod',
        'object', 'Exception', 'ValueError', 'TypeError', 'KeyError',
        'IndexError', 'AttributeError', 'StopIteration', 'RuntimeError',
        'ZeroDivisionError', 'FileNotFoundError', 'NameError', 'NotImplementedError'
    ]);

    const CONSTANTS = new Set(['True', 'False', 'None']);

    function escapeHtml(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function highlightLine(line) {
        const tokens = [];
        let i = 0;

        while (i < line.length) {
            // Comment
            if (line[i] === '#') {
                tokens.push(`<span class="syn-comment">${escapeHtml(line.slice(i))}</span>`);
                i = line.length;
                continue;
            }

            // Decorator
            if (line[i] === '@' && (i === 0 || line.slice(0, i).trim() === '')) {
                const match = line.slice(i).match(/^@\w+(\.\w+)*/);
                if (match) {
                    tokens.push(`<span class="syn-decorator">${escapeHtml(match[0])}</span>`);
                    i += match[0].length;
                    continue;
                }
            }

            // Triple-quoted strings
            if (line.slice(i, i + 3) === '"""' || line.slice(i, i + 3) === "'''") {
                const quote = line.slice(i, i + 3);
                const end = line.indexOf(quote, i + 3);
                if (end !== -1) {
                    const str = line.slice(i, end + 3);
                    tokens.push(`<span class="syn-string">${escapeHtml(str)}</span>`);
                    i = end + 3;
                } else {
                    tokens.push(`<span class="syn-string">${escapeHtml(line.slice(i))}</span>`);
                    i = line.length;
                }
                continue;
            }

            // F-strings (simplified — handles basic cases)
            if ((line[i] === 'f' || line[i] === 'F') && (line[i + 1] === '"' || line[i + 1] === "'")) {
                const quote = line[i + 1];
                let j = i + 2;
                let result = `<span class="syn-string">f${quote}`;
                while (j < line.length && line[j] !== quote) {
                    if (line[j] === '{' && line[j + 1] !== '{') {
                        result += `<span class="syn-fstring-brace">{</span></span>`;
                        j++;
                        let depth = 1;
                        let expr = '';
                        while (j < line.length && depth > 0) {
                            if (line[j] === '{') depth++;
                            else if (line[j] === '}') depth--;
                            if (depth > 0) expr += line[j];
                            j++;
                        }
                        result += escapeHtml(expr);
                        result += `<span class="syn-string"><span class="syn-fstring-brace">}</span>`;
                    } else if (line[j] === '\\') {
                        result += escapeHtml(line.slice(j, j + 2));
                        j += 2;
                    } else {
                        result += escapeHtml(line[j]);
                        j++;
                    }
                }
                result += `${quote}</span>`;
                i = j + 1;
                tokens.push(result);
                continue;
            }

            // Regular strings
            if (line[i] === '"' || line[i] === "'") {
                const quote = line[i];
                let j = i + 1;
                while (j < line.length && line[j] !== quote) {
                    if (line[j] === '\\') j++;
                    j++;
                }
                const str = line.slice(i, j + 1);
                tokens.push(`<span class="syn-string">${escapeHtml(str)}</span>`);
                i = j + 1;
                continue;
            }

            // Numbers
            if (/[0-9]/.test(line[i]) && (i === 0 || /[\s\(\[\{,=+\-*\/%<>:!&|^~]/.test(line[i - 1]))) {
                const match = line.slice(i).match(/^(0[xXoObB])?[\d_]+(\.[\d_]+)?([eE][+-]?\d+)?j?/);
                if (match) {
                    tokens.push(`<span class="syn-number">${escapeHtml(match[0])}</span>`);
                    i += match[0].length;
                    continue;
                }
            }

            // Words (keywords, builtins, constants, identifiers)
            if (/[a-zA-Z_]/.test(line[i])) {
                const match = line.slice(i).match(/^[a-zA-Z_]\w*/);
                if (match) {
                    const word = match[0];
                    if (CONSTANTS.has(word)) {
                        tokens.push(`<span class="syn-constant">${word}</span>`);
                    } else if (KEYWORDS.has(word)) {
                        tokens.push(`<span class="syn-keyword">${word}</span>`);
                    } else if (BUILTINS.has(word) && i + word.length < line.length && line[i + word.length] === '(') {
                        tokens.push(`<span class="syn-builtin">${word}</span>`);
                    } else {
                        tokens.push(escapeHtml(word));
                    }
                    i += word.length;
                    continue;
                }
            }

            // Default: single character
            tokens.push(escapeHtml(line[i]));
            i++;
        }

        return tokens.join('');
    }

    /**
     * Highlight a code string and return HTML with line numbers.
     * @param {string} code - Python source code
     * @param {object} options - { selectable: bool, selectedLine: number|null }
     * @returns {string} HTML string
     */
    function highlight(code, options = {}) {
        const lines = code.split('\n');
        const { selectable = false, selectedLine = null } = options;

        return lines.map((line, idx) => {
            const lineNum = idx + 1;
            const classes = ['code-line'];
            if (selectable) classes.push('selectable');
            if (selectedLine === lineNum) classes.push('selected');

            return `<div class="${classes.join(' ')}" data-line="${lineNum}">` +
                `<span class="line-number">${lineNum}</span>` +
                `<span class="line-content">${highlightLine(line)}</span>` +
                `</div>`;
        }).join('');
    }

    return { highlight, highlightLine };
})();
