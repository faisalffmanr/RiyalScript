import * as ohm from 'ohm-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const grammarPath = path.join(__dirname, 'riyalscript.ohm');
const grammarSource = fs.readFileSync(grammarPath, 'utf8');

export const grammar = ohm.grammar(grammarSource);

export function parse(sourceCode) {
  const matchResult = grammar.match(sourceCode);

  if (matchResult.failed()) {
    const error = matchResult.message;
    throw new Error(`Syntax Error:\n${error}`);
  }

  return matchResult;
}
