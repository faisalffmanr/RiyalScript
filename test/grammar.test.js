import { describe, it } from "node:test"
import assert from "assert"
import RiyalGrammar from "../src/RiyalScript.js"

function matches(source) {
  return RiyalGrammar.match(source).succeeded()
}

const program = {
  good: [
    String.raw`
func calc(x, y)
  x + y * 2;
  "done"
end

func f()
  "hello y'all";
  5 * 3 - 1 ** 3;
  val if cond else alt;
  -8 + 3;
  x!;
  g[1, 2, 3]
end

calc[9, 10]
    `
  ],
  bad: [
    `func (x) x + 1; end`,            
    `func f(x x) x + x; end`,         
    `5 + ;`,                          
    `func g() x + 1 end`,            
    `func h() "unterminated; end`,
  ]
}

describe("RiyalScript grammar", () => {
  for (const source of program.good) {
    it(`accepts: ${JSON.stringify(source)}`, () => {
      assert.ok(matches(source))
    })
  }

  for (const source of program.bad) {
    it(`rejects: ${JSON.stringify(source)}`, () => {
      assert.ok(!matches(source))
    })
  }
})
