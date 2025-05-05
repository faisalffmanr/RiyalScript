import { parse } from "./parser.js"
import analyze from "./analyzer.js"
import optimize from "./optimizer.js"
import generate from "./generator.js"
import run from "./run.js"

export default function compile(source, outputType) {
  if (!["parsed", "analyzed", "optimized", "js", "run"].includes(outputType)) {
    throw new Error("Unknown output type")
  }

  const match = parse(source)

  if (outputType === "parsed") {
    return "Syntax is ok"
  }

  const analyzed = analyze(match)

  if (outputType === "analyzed") {
    return analyzed
  }

  if (outputType === "run") {
    return run(analyzed)
  }

  const optimized = optimize(analyzed)

  if (outputType === "optimized") {
    return optimized
  }

  if (outputType === "js") {
    return generate(optimized)
  }
}
