import { describe, it } from "node:test"
import assert from "assert"
import * as ohm from "ohm-js"
import fs from "fs"
import path from "path"

// Load RiyalScript grammar file, and i'm using the template from your website for HW2 instructions page
const grammarSource = fs.readFileSync(
  path.join("src", "riyalscript.ohm"),
  "utf-8"
)

const RiyalGrammar = ohm.grammar(grammarSource)

function matches(source) {
  return RiyalGrammar.match(source).succeeded()
}

// A valid RiyalScript program using every major feature (from HW2 Exercise 2)
const everythingProgram = `
func calc(x, y)
  x + y * 2;
  "done"
end

func f()
  "hello";
  5 * 3 - 1 ** 3;
  val if cond else alt;
  -8 + 3;
  x!;
  g[1, 2, 3]
end

calc[9, 10]
`

// A few invalid programs for negative tests
const badPrograms = [
  `func (x) x + 1; end`,            // missing name
  `func f(x x) x + x; end`,         // duplicate param name or bad syntax
  `5 + ;`,                          // incomplete expression
  `func g() x + 1 end`,            // missing semicolon
  `func h() "unterminated; end`,   // unterminated string
]

describe("RiyalScript grammar", () => {
  it("accepts the everything-program", () => {
    assert.ok(matches(everythingProgram))
  })

  for (const bad of badPrograms) {
    it(`rejects: ${JSON.stringify(bad)}`, () => {
      assert.ok(!matches(bad))
    })
  }
})
