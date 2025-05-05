import { strictEqual, throws } from "node:assert/strict"
import { describe, it } from "node:test"
import { parse } from "../src/parser.js"

describe("RiyalScript Parser", () => {
  it("parses a simple variable declaration", () => {
    const code = `let x = 42`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses a basic function declaration", () => {
    const code = `func add[a, b] (a + b) end`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses nested arithmetic expressions", () => {
    const code = `let y = (3 + 5) * 2`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses if expressions correctly", () => {
    const code = `let max = if a > b a else b`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses function calls with arguments", () => {
    const code = `let z = add[4, 6]`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("throws on missing 'let' keyword", () => {
    const code = `x = 5`
    throws(() => parse(code), /Syntax Error/)
  })

  it("throws on unclosed parentheses", () => {
    const code = `let x = (3 + 5`
    throws(() => parse(code), /Syntax Error/)
  })

  it("throws on bad function declaration syntax", () => {
    const code = `func f a, b (a + b) end`
    throws(() => parse(code), /Syntax Error/)
  })

  it("parses string literals with escape sequences", () => {
    const code = `let message = \"hello\\nworld\"`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses expressions with all binary ops", () => {
    const code = `let result = 1 + 2 - 3 * 4 / 2 % 2`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("parses function call inside another expression", () => {
    const code = `func sq[x] (x * x) end\nlet y = sq[5] + 1`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })

  it("throws on multiple equals", () => {
    const code = `let x = = 5`
    throws(() => parse(code), /Syntax Error/)
  })

  it("throws on dangling else without if", () => {
    const code = `let x = else 5`
    throws(() => parse(code), /Syntax Error/)
  })

  it("parses nested function calls", () => {
    const code = `func id[x] (x) end\nlet result = id[id[5]]`
    const result = parse(code)
    strictEqual(result.failed(), false)
  })
})
