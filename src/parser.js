import * as fs from "node:fs/promises";
import * as ohm from "ohm-js";

const grammarPath = new URL("./RiyalScript.ohm", import.meta.url);
const grammarSource = await fs.readFile(grammarPath, "utf-8");
const grammar = ohm.grammar(grammarSource);

export { grammar };

export function parse(sourceCode) {
  const matchResult = grammar.match(sourceCode);
  if (matchResult.failed()) {
    throw new Error(`Syntax Error:\n${matchResult.message}`);
  }
  return matchResult;
}
