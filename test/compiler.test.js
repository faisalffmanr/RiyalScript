import { execSync } from "child_process"
import { describe, it, before, after } from "node:test"
import { strictEqual, match } from "node:assert/strict"
import fs from "node:fs/promises"

const tempFile = "test_program.riyalscript"
const advancedFile = "advanced.riyalscript"

const testProgram = `let a = 5\nlet b = 10\nlet c = a + b`
const advancedProgram = `let a = 4\nlet b = 6\nlet max = if a > b a else b`

before(async () => {
  await fs.writeFile(tempFile, testProgram)
  await fs.writeFile(advancedFile, advancedProgram)
})

after(async () => {
  await fs.unlink(tempFile)
  await fs.unlink(advancedFile)
})

describe("RiyalScript Compiler Tests", () => {
  it("parses valid code", () => {
    const output = execSync(`node src/riyalscript.js ${tempFile} parsed`, { encoding: "utf8" }).trim()
    match(output, /Syntax is ok/)
  })

  it("analyzes code to produce an AST", () => {
    const output = execSync(`node src/riyalscript.js ${tempFile} analyzed`, { encoding: "utf8" }).trim()
    match(output, /Program/)
  })

  it("optimizes code with constant folding", () => {
    const output = execSync(`node src/riyalscript.js ${tempFile} optimized`, { encoding: "utf8" }).trim()
    match(output, /Program/)
  })

  it("generates valid JavaScript output", () => {
    const output = execSync(`node src/riyalscript.js ${tempFile} js`, { encoding: "utf8" }).trim()
    match(output, /let a = 5;/)
  })

  it("runs the program and checks results", () => {
    const output = execSync(`node src/riyalscript.js ${tempFile} run`, { encoding: "utf8" }).trim()
    const env = eval(`(${output})`)
    strictEqual(env.a, 5)
    strictEqual(env.b, 10)
    strictEqual(env.c, 15)
  })

  it("evaluates conditional expressions correctly", () => {
    const output = execSync(`node src/riyalscript.js ${advancedFile} run`, { encoding: "utf8" }).trim()
    const env = eval(`(${output})`)
    strictEqual(env.a, 4)
    strictEqual(env.b, 6)
    strictEqual(env.max, 6)
  })

  it("handles string concatenation at runtime", async () => {
    const code = `let name = \"Faisal\"\nlet msg = \"Hi, \" + name`
    await fs.writeFile("string_test.riyalscript", code)
    const output = execSync(`node src/riyalscript.js string_test.riyalscript run`, { encoding: "utf8" }).trim()
    const env = eval(`(${output})`)
    strictEqual(env.msg, "Hi, Faisal")
    await fs.unlink("string_test.riyalscript")
  })

  it("handles math expressions with precedence", async () => {
    const code = `let x = 3 + 4 * 2`
    await fs.writeFile("math_test.riyalscript", code)
    const output = execSync(`node src/riyalscript.js math_test.riyalscript run`, { encoding: "utf8" }).trim()
    const env = eval(`(${output})`)
    strictEqual(env.x, 11)
    await fs.unlink("math_test.riyalscript")
  })

  it("evaluates nested if expressions", async () => {
    const code = `let a = 2\nlet b = 3\nlet result = if a > b if a > 10 a else b else a + b`
    await fs.writeFile("if_test.riyalscript", code)
    const output = execSync(`node src/riyalscript.js if_test.riyalscript run`, { encoding: "utf8" }).trim()
    const env = eval(`(${output})`)
    strictEqual(env.result, 5)
    await fs.unlink("if_test.riyalscript")
  })
})
