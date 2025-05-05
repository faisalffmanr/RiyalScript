import * as fs from "node:fs/promises";
import stringify from "graph-stringify";
import compile from "./compiler.js";

async function compileFromFile(filename, outputType) {
  try {
    const buffer = await fs.readFile(filename);
    const compiled = compile(buffer.toString(), outputType);

    if (["parsed", "analyzed", "optimized"].includes(outputType)) {
      console.log(typeof compiled === "string" ? compiled : stringify(compiled, "type"));
    } else {
      console.log(compiled);
    }

  } catch (e) {
    console.error(`\u001b[31m${e}\u001b[39m`);
    process.exitCode = 1;
  }
}

if (process.argv.length !== 4) {
  console.log("Usage: node src/riyalscript.js <filename> <outputType>");
  console.log("Valid output types: parsed, analyzed, optimized, js, run");
} else {
  compileFromFile(process.argv[2], process.argv[3]);
}
