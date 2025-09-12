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
      const analyzedStatements = statements.children.map(s => s.analyze())
      return core.program(analyzedStatements)
    },

    FuncDecl(_func, name, _lbrack, params, _rbrack, _lparen, body, _rparen, _end) {
      const paramNames = params.asIteration().children.map(p => p.sourceString)
      let bodyStatements = []
      if (body) {
        const analyzed = body.analyze()
        bodyStatements = Array.isArray(analyzed) ? analyzed.flat() : [analyzed]
      }
      return core.funcDecl(name.sourceString, paramNames, bodyStatements)
    },

    VarDecl(_let, name, _eq, exp) {
      const expr = exp.analyze()
      return core.varDecl(name.sourceString, expr)
    },

    AssignStmt(name, _eq, exp) {
      const expr = exp.analyze()
      return core.assignStmt(name.sourceString, expr)
    },

    WhileStmt(_while, condition, _do, body, _end) {
      const condExpr = condition.analyze()
      const bodyStatements = body ? body.analyze() : []
      return core.whileLoop(condExpr, bodyStatements)
    },

    ForStmt(_for, variable, _in, iterable, _do, body, _end) {
      const iterExpr = iterable.analyze()
      const bodyStatements = body ? body.analyze() : []
      return core.forLoop(variable.sourceString, iterExpr, bodyStatements)
    },

    IfExpr(_if, cond, _then, thenExpr, _else, elseExpr) {
      const condExpr = cond.analyze()
      const thenBranch = thenExpr.analyze()
      const elseBranch = elseExpr.analyze()
      return core.conditional(condExpr, thenBranch, elseBranch)
    },

    ComparisonChain(left, op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary(op.sourceString, leftExpr, rightExpr), inferredType: "boolean" }
    },

    LogicalOrChain(left, _op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary("||", leftExpr, rightExpr), inferredType: "boolean" }
    },

    LogicalAndChain(left, _op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary("&&", leftExpr, rightExpr), inferredType: "boolean" }
    },

    AddChain(left, op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary(op.sourceString, leftExpr, rightExpr), inferredType: inferBinaryType(leftExpr, rightExpr) }
    },

    MulChain(left, op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary(op.sourceString, leftExpr, rightExpr), inferredType: inferBinaryType(leftExpr, rightExpr) }
    },

    PowChain(left, _op, right) {
      const leftExpr = left.analyze()
      const rightExpr = right.analyze()
      return { ...core.binary("**", leftExpr, rightExpr), inferredType: "number" }
    },

    Negate(_dash, expr) {
      const subExpr = expr.analyze()
      return { ...core.unary("-", subExpr), inferredType: "number" }
    },

    PostfixChain(expr, _bang) {
      const subExpr = expr.analyze()
      return { ...core.unary("!", subExpr), inferredType: "boolean" }
    },

    Grouped(_open, expr, _close) {
      return expr.analyze()
    },

    FuncCall(name, _lbrack, args, _rbrack) {
      const argValues = args.children.map(arg => arg.analyze())
      return core.call(name.sourceString, argValues)
    },

    id(_first, _rest) {
      return core.identifier(this.sourceString)
    },

    num(_digits, _dot, _frac, _e, _sign, _exp) {
      return { ...core.number(this.sourceString), inferredType: "number" }
    },

    str(_open, chars, _close) {
      return { ...core.string(this.sourceString.slice(1, -1)), inferredType: "string" }
    },

    ArrayLiteral(_open, elements, _close) {
      const elementList = elements ? elements.analyze() : []
      return { ...core.array(elementList), inferredType: "array" }
    },

    ObjectLiteral(_open, properties, _close) {
      const propertyList = properties ? properties.analyze() : []
      return { ...core.object(propertyList), inferredType: "object" }
    },

    Property(key, _colon, value) {
      return { type: "Property", key: key.sourceString, value: value.analyze() }
    },

    MarketCall(_market, _dot, functionName, _open, symbol, _close) {
      return core.marketCall(functionName.sourceString, symbol.analyze())
    },

    Symbol(_open, symbol, _close) {
      return symbol.sourceString
    },
    NonemptyListOf(_first, _separator, _rest) {
      const elements = [_first.analyze()]
      for (let i = 0; i < _rest.numChildren; i++) {
        elements.push(_rest.child(i).analyze())
      }
      return elements
    },

    ListOf(_items) {
      if (_items.numChildren === 0) return []
      const elements = []
      for (let i = 0; i < _items.numChildren; i++) {
        elements.push(_items.child(i).analyze())
      }
      return elements
    },

    _iter(...children) {
      const elements = []
      for (let child of children) {
        elements.push(child.analyze())
      }
      return elements
    },

    _terminal() {
      return this.sourceString
    }
  })

  return semantics(match).analyze()     // Run analysis on the parse tree
}

// Helper to guess type of binary operations
function inferBinaryType(left, right) {
  const t1 = left.inferredType
  const t2 = right.inferredType
  if (t1 === "number" && t2 === "number") return "number"
  if (t1 === "string" || t2 === "string") return "string"
  return "any"
}
