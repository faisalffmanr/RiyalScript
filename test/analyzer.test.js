import { strictEqual, throws } from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "../src/parser.js"
import analyze from "../src/analyzer.js"

function analyzeSource(source) {
  return analyze(parse(source))
}

describe("RiyalScript Static Analyzer", () => {
  it("allows variable declaration and use", () => {
    const program = `let x = 3\nlet y = x + 2`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("allows function declarations and calls with matching arguments", () => {
    const program = `func add[a, b] (a + b) end\nlet result = add[5, 3]`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("supports if expressions inside variable declarations", () => {
    const program = `let a = 10\nlet b = 20\nlet max = if a > b a else b`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws error on use of undeclared variable", () => {
    const program = `let x = y + 2`
    throws(() => analyzeSource(program), /Undeclared variable "y"/)
  })

  it("throws error on variable redeclaration", () => {
    const program = `let x = 1\nlet x = 2`
    throws(() => analyzeSource(program), /Variable "x" already declared/)
  })

  it("throws error on function redeclaration", () => {
    const program = `func foo[a] (a) end\nfunc foo[b] (b) end`
    throws(() => analyzeSource(program), /Function "foo" already declared/)
  })

  it("throws error on function call to undeclared function", () => {
    const program = `let z = magic[1, 2]`
    throws(() => analyzeSource(program), /Undeclared function "magic"/)
  })

  it("throws error on function call with wrong number of arguments", () => {
    const program = `func add[a, b] (a + b) end\nlet z = add[1]`
    throws(() => analyzeSource(program), /expects 2 args, got 1/)
  })

  it("infers string result type on string + number", () => {
    const program = `let result = \"hello\" + 5`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws error on assigning undeclared variable", () => {
    const program = `x = 5`
    throws(() => analyzeSource(program), /Undeclared variable "x"/)
  })

  it("allows nested if expressions", () => {
    const program = `let a = 1\nlet b = 2\nlet c = if a > b if a > 10 a else b else a`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("allows shadowing in function parameters", () => {
    const program = `let x = 1\nfunc test[x] (x + 2) end`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws on using function as variable", () => {
    const program = `func f[a] (a) end\nlet x = f + 1`
    throws(() => analyzeSource(program), /Undeclared variable "f"/)
  })

  it("throws on calling a variable like a function", () => {
    const program = `let f = 2\nlet x = f[1]`
    throws(() => analyzeSource(program), /Undeclared function "f"/)
  })

  it("handles string + number expression", () => {
    const program = `let x = \"result: \" + 10`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws when redefining function name as variable", () => {
    const program = `func run[a] (a) end\nlet run = 5`
    throws(() => analyzeSource(program), /Variable "run" already declared/)
  })

  it("allows multiple binary operations", () => {
    const program = `let total = 1 + 2 - 3 + 4`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("handles modulo operator", () => {
    const program = `let mod = 10 % 3`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })
  it("allows use of variable in multiple expressions", () => {
    const program = `let a = 1\nlet b = a + 2\nlet c = a + b`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws on missing function call arguments", () => {
    const program = `func echo[x] (x) end\nlet x = echo[]`
    throws(() => analyzeSource(program), /expects 1 args, got 0/)
  })

  it("handles chained function calls with correct args", () => {
    const program = `func id[x] (x) end\nlet x = id[id[5]]`
    const result = analyzeSource(program)
    strictEqual(result.type, "Program")
  })

  it("throws error on too many arguments", () => {
    const program = `func greet[name] (name) end\nlet x = greet["hi", "extra"]`
    throws(() => analyzeSource(program), /expects 1 args, got 2/)
  })

  it("throws error when reusing parameter name in function body", () => {
    const program = `func f[x] (let x = 5) end`
    throws(() => analyzeSource(program), /Variable "x" already declared/)
  })
})

