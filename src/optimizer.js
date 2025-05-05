export default function optimize(node) {
  switch (node.type) {
    case "Program":
      return {
        type: "Program",
        statements: node.statements.map(optimize)
      };

    case "VariableDeclaration":
      return {
        ...node,
        initializer: optimize(node.initializer)
      };

    case "Assignment":
      return {
        ...node,
        expression: optimize(node.expression)
      };

    case "FunctionDeclaration":
      return {
        ...node,
        body: node.body.map(optimize)
      };

    case "FunctionCall":
      return {
        ...node,
        args: node.args.map(optimize)
      };

    case "BinaryExpression": {
      const left = optimize(node.left);
      const right = optimize(node.right);

      if (left.type === "NumberLiteral" && right.type === "NumberLiteral") {
        let result;
        switch (node.op) {
          case "+": result = left.value + right.value; break;
          case "-": result = left.value - right.value; break;
          case "*": result = left.value * right.value; break;
          case "/": result = left.value / right.value; break;
          case "%": result = left.value % right.value; break;
          default:
            throw new Error(`Unknown binary operator: ${node.op}`);
        }
        return { type: "NumberLiteral", value: result };
      }

      return { ...node, left, right };
    }

    case "UnaryExpression": {
      const expr = optimize(node.expression);
      if (expr.type === "NumberLiteral" && node.op === "-") {
        return { type: "NumberLiteral", value: -expr.value };
      }
      return { ...node, expression: expr };
    }

    case "ConditionalExpression":
      return {
        ...node,
        condition: optimize(node.condition),
        consequent: optimize(node.consequent),
        alternate: optimize(node.alternate)
      };

    case "Identifier":
    case "NumberLiteral":
    case "StringLiteral":
      return node;

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}
