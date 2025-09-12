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

    case "ArrayLiteral":
      return {
        ...node,
        elements: node.elements.map(optimize)
      };

    case "ObjectLiteral":
      return {
        ...node,
        properties: node.properties.map(optimize)
      };

    case "WhileLoop":
      return {
        ...node,
        condition: optimize(node.condition),
        body: node.body.map(optimize)
      };

    case "ForLoop":
      return {
        ...node,
        iterable: optimize(node.iterable),
        body: node.body.map(optimize)
      };

    case "BinaryExpression": {
      const left = optimize(node.left);
      const right = optimize(node.right);

      if ((left.type === "NumberLiteral" && right.type === "NumberLiteral") ||
          (left.type === "BooleanLiteral" && right.type === "BooleanLiteral")) {
        let result;
        switch (node.op) {
          case "+":  result = left.value +  right.value; break;
          case "-":  result = left.value -  right.value; break;
          case "*":  result = left.value *  right.value; break;
          case "/":  result = left.value /  right.value; break;
          case "%":  result = left.value %  right.value; break;
          case "**": result = Math.pow(left.value, right.value); break;

          case ">":  result = left.value >  right.value; break;
          case "<":  result = left.value <  right.value; break;
          case ">=": result = left.value >= right.value; break;
          case "<=": result = left.value <= right.value; break;
          case "==": result = left.value === right.value; break;
          case "!=": result = left.value !== right.value; break;
          case "&&": result = left.value &&  right.value; break;
          case "||": result = left.value ||  right.value; break;

          default:
            throw new Error(`Unknown binary operator: ${node.op}`);
        }
        if (['>', '<', '>=', '<=', '==', '!=', '&&', '||'].includes(node.op)) {
          return { type: "BooleanLiteral", value: result };
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
    case "FunctionCall":
    case "BinaryExpression":
    case "UnaryExpression":
    case "ConditionalExpression":
    case "MarketCall":
    case "MarketScan":
      return node;

    default:
      return node;
  }
}
