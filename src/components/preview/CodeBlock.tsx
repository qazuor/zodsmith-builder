import { useMemo } from 'react';

import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  className?: string;
}

type TokenType =
  | 'comment'
  | 'string'
  | 'keyword'
  | 'zod'
  | 'method'
  | 'number'
  | 'punctuation'
  | 'text';

interface Token {
  type: TokenType;
  value: string;
}

const tokenColors: Record<TokenType, string> = {
  comment: 'text-emerald-600 dark:text-emerald-400',
  string: 'text-amber-600 dark:text-amber-400',
  keyword: 'text-purple-600 dark:text-purple-400',
  zod: 'text-blue-600 dark:text-blue-400',
  method: 'text-cyan-600 dark:text-cyan-400',
  number: 'text-orange-600 dark:text-orange-400',
  punctuation: 'text-muted-foreground',
  text: '',
};

const KEYWORDS = new Set([
  'import',
  'export',
  'const',
  'let',
  'var',
  'function',
  'return',
  'type',
  'interface',
  'from',
  'typeof',
  'new',
  'true',
  'false',
  'null',
  'undefined',
]);

/**
 * Simple syntax highlighting for TypeScript/Zod code
 */
export function CodeBlock({ code, className }: CodeBlockProps) {
  const tokens = useMemo(() => tokenize(code), [code]);

  return (
    <pre
      className={cn(
        'p-4 text-sm font-mono leading-relaxed',
        className
      )}
    >
      <code>
        {tokens.map((token, i) => {
          const colorClass = tokenColors[token.type];
          if (!colorClass) {
            return <span key={`${token.type}-${i}`}>{token.value}</span>;
          }
          return (
            <span key={`${token.type}-${i}`} className={colorClass}>
              {token.value}
            </span>
          );
        })}
      </code>
    </pre>
  );
}

/**
 * Tokenize code into syntax-highlighted parts
 */
function tokenize(code: string): Token[] {
  if (!code) return [];

  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    // JSDoc/multiline comments: /** ... */
    if (code.slice(i, i + 3) === '/**') {
      const end = code.indexOf('*/', i + 3);
      if (end !== -1) {
        tokens.push({ type: 'comment', value: code.slice(i, end + 2) });
        i = end + 2;
        continue;
      }
    }

    // Single line comments: // ...
    if (code.slice(i, i + 2) === '//') {
      const end = code.indexOf('\n', i);
      if (end !== -1) {
        tokens.push({ type: 'comment', value: code.slice(i, end) });
        i = end;
        continue;
      } else {
        tokens.push({ type: 'comment', value: code.slice(i) });
        break;
      }
    }

    // Strings: 'xxx' or "xxx"
    if (code[i] === "'" || code[i] === '"') {
      const quote = code[i];
      let j = i + 1;
      while (j < code.length) {
        if (code[j] === '\\') {
          j += 2;
        } else if (code[j] === quote) {
          j++;
          break;
        } else {
          j++;
        }
      }
      tokens.push({ type: 'string', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Word tokens (identifiers, keywords)
    if (/[a-zA-Z_$]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[a-zA-Z0-9_$]/.test(code[j])) {
        j++;
      }
      const word = code.slice(i, j);

      // Check if it's 'z' followed by '.'
      if (word === 'z' && code[j] === '.') {
        tokens.push({ type: 'zod', value: word });
      } else if (KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', value: word });
      } else {
        // Check if preceded by '.' (method call)
        const lastToken = tokens[tokens.length - 1];
        if (lastToken && lastToken.type === 'punctuation' && lastToken.value === '.') {
          tokens.push({ type: 'method', value: word });
        } else {
          tokens.push({ type: 'text', value: word });
        }
      }
      i = j;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i])) {
      let j = i;
      while (j < code.length && /[0-9.]/.test(code[j])) {
        j++;
      }
      tokens.push({ type: 'number', value: code.slice(i, j) });
      i = j;
      continue;
    }

    // Punctuation and operators
    if (/[.,;:(){}[\]=<>+\-*/|&!?]/.test(code[i])) {
      tokens.push({ type: 'punctuation', value: code[i] });
      i++;
      continue;
    }

    // Whitespace and other characters
    let j = i;
    while (j < code.length && !/[a-zA-Z0-9_$'".,;:(){}[\]=<>+\-*/|&!?]/.test(code[j]) && code.slice(j, j + 2) !== '//' && code.slice(j, j + 3) !== '/**') {
      j++;
    }
    if (j > i) {
      tokens.push({ type: 'text', value: code.slice(i, j) });
      i = j;
    } else {
      tokens.push({ type: 'text', value: code[i] });
      i++;
    }
  }

  return tokens;
}
