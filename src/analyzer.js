import * as core from "./core.js"
import { grammar } from "./parser.js"

class Context {
  constructor(parent = null) {
    this.parent = parent
    this.variables = new Map()
    this.functions = new Map()
  }

  addVariable(name, type) {
    if (this.variables.has(name)) {
      throw new Error(`Variable "${name}" already declared`)
    }
    this.variables.set(name, type)
  }

  lookupVariable(name) {
    if (this.variables.has(name)) {
      return this.variables.get(name)
    } else if (this.parent) {
      return this.parent.lookupVariable(name)
    } else {
      throw new Error(`Undeclared variable "${name}"`)
    }
  }

  addFunction(name, paramCount) {
    if (this.functions.has(name)) {
      throw new Error(`Function "${name}" already declared`)
    }
    this.functions.set(name, paramCount)
  }

  lookupFunction(name) {
    if (this.functions.has(name)) {
      return this.functions.get(name)
    } else if (this.parent) {
      return this.parent.lookupFunction(name)
    } else {
      throw new Error(`Undeclared function "${name}"`)
    }
  }
}

export default function analyze(match) {
  const semantics = grammar.createSemantics().addOperation("analyze", {
    Program(statements) {
      const context = new Context()
      const analyzedStatements = statements.children.map(s => s.analyze(context))
      return core.program(analyzedStatements)
    },

    FuncDecl(_func, name, _lbrack, params, _rbrack, _lparen, body, _rparen, _end) {
      const paramNames = params.asIteration().children.map(p => p.sourceString)
      this.args[0].addFunction(name.sourceString, paramNames.length)
      const functionContext = new Context(this.args[0])
      for (const param of paramNames) {
        functionContext.addVariable(param, "any") 
      }
      const bodyStatements = body.asIteration().children.map(s => s.analyze(functionContext))
      return core.funcDecl(name.sourceString, paramNames, bodyStatements)
    },

    VarDecl(_let, name, _eq, exp) {
      const expr = exp.analyze(this.args[0])
      this.args[0].addVariable(name.sourceString, expr.inferredType || "any")
      return core.varDecl(name.sourceString, expr)
    },

    AssignStmt(name, _eq, exp) {
      const expr = exp.analyze(this.args[0])
      this.args[0].lookupVariable(name.sourceString)
      return core.assignStmt(name.sourceString, expr)
    },

    IfExpr(_if, cond, thenExpr, _else, elseExpr) {
      const condExpr = cond.analyze(this.args[0])
      const thenBranch = thenExpr.analyze(this.args[0])
      const elseBranch = elseExpr.analyze(this.args[0])
      return core.conditional(condExpr, thenBranch, elseBranch)
    },

    AddChain(left, op, right) {
      const leftExpr = left.analyze(this.args[0])
      const rightExpr = right.analyze(this.args[0])
      return {
        ...core.binary(op.sourceString, leftExpr, rightExpr),
        inferredType: inferBinaryType(leftExpr, rightExpr)
      }
    },

    MulChain(left, op, right) {
      const leftExpr = left.analyze(this.args[0])
      const rightExpr = right.analyze(this.args[0])
      return {
        ...core.binary(op.sourceString, leftExpr, rightExpr),
        inferredType: inferBinaryType(leftExpr, rightExpr)
      }
    },

    Negate(_dash, expr) {
      const subExpr = expr.analyze(this.args[0])
      return {
        ...core.unary("-", subExpr),
        inferredType: "number"
      }
    },

    PostfixChain(expr, _bang) {
      const subExpr = expr.analyze(this.args[0])
      return {
        ...core.unary("!", subExpr),
        inferredType: "boolean"
      }
    },

    Grouped(_open, expr, _close) {
      return expr.analyze(this.args[0])
    },

    Call(name, _lbrack, args, _rbrack) {
      const argValues = args.children.map(arg => arg.analyze(this.args[0]))
      const expectedParams = this.args[0].lookupFunction(name.sourceString)
      if (argValues.length !== expectedParams) {
        throw new Error(`Function "${name.sourceString}" expects ${expectedParams} args, got ${argValues.length}`)
      }
      return core.call(name.sourceString, argValues)
    },

    id(_first, _rest) {
      this.args[0].lookupVariable(this.sourceString)
      return core.identifier(this.sourceString)
    },

    num(_digits, _dot, _frac, _e, _sign, _exp) {
      return {
        ...core.number(this.sourceString),
        inferredType: "number"
      }
    },

    str(_open, chars, _close) {
      return {
        ...core.string(this.sourceString.slice(1, -1)),
        inferredType: "string"
      }
    },

    Params(params) {
      return params.children.map(p => p.sourceString)
    },

    Args(args) {
      return args.children.map(a => a.analyze(this.args[0]))
    },

    ExpBlock(exps) {
      return exps.children.map(e => e.analyze(this.args[0]))
    }
  })

  return semantics(match).analyze(new Context())
}

// type inferencef
function inferBinaryType(left, right) {
  const t1 = left.inferredType
  const t2 = right.inferredType
  if (t1 === "number" && t2 === "number") return "number"
  if (t1 === "string" || t2 === "string") return "string"
  return "any"
}
