function run(programNode) {
  const env = {}; 

  if (!programNode || programNode.type !== "Program") {
    throw new Error("Invalid AST: expected root node of type 'Program'");
  }

  for (let i = 0; i < programNode.statements.length; i++) {
    const stmt = programNode.statements[i];
    if (!stmt || typeof stmt !== "object" || !stmt.type) {
      continue;
    }
    try {
      evaluate(stmt, env);
    } catch (err) {
      throw err;
    }
  }

  
  console.log(JSON.stringify(env, null, 2));
}

function evaluate(node, env) {
  if (!node || typeof node !== "object" || !("type" in node)) {
    throw new Error("Invalid AST node");
  }

  switch (node.type) {
    case "NumberLiteral":
    case "StringLiteral":
      return node.value;

    case "Identifier":
      if (node.name in env) {
        return env[node.name];
      } else {
        throw new ReferenceError(`Variable "${node.name}" is not defined`);
      }

    case "VariableDeclaration":
      env[node.name] = evaluate(node.initializer, env);
      return;

    case "Assignment":
      if (!(node.name in env)) {
        throw new ReferenceError(`Cannot assign to undeclared variable "${node.name}"`);
      }
      env[node.name] = evaluate(node.expression, env);
      return;

    case "BinaryExpression": {
      const left = evaluate(node.left, env);
      const right = evaluate(node.right, env);
      switch (node.op) {
        case "+": return left + right;
        case "-": return left - right;
        case "*": return left * right;
        case "/": return left / right;
        case "%": return left % right;
        default:
          throw new Error(`Unsupported binary operator "${node.op}"`);
      }
    }

    case "UnaryExpression": {
      const value = evaluate(node.expression, env);
      switch (node.op) {
        case "-": return -value;
        case "!": return factorial(value);
        default:
          throw new Error(`Unsupported unary operator "${node.op}"`);
      }
    }

    case "ConditionalExpression": {
      const test = evaluate(node.condition, env);
      return test ? evaluate(node.consequent, env) : evaluate(node.alternate, env);
    }

    default:
      throw new Error(`Unknown node type: "${node.type}"`);
  }
}

function factorial(n) {
  if (n < 0) throw new RangeError("Factorial of negative number");
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
}

export default run;
