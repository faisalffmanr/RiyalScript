export default function generate(node) {
  switch (node.type) {
    case "Program":
      return node.statements.map(generate).join("\n");

    case "VariableDeclaration":
      return `let ${node.name} = ${generate(node.initializer)};`;

    case "Assignment":
      return `${node.name} = ${generate(node.expression)};`;

    case "FunctionDeclaration":
      return `function ${node.name}(${node.params.join(", ")}) {\n${node.body.map(generate).join("\n")}\n}`;

    case "FunctionCall":
      return `${node.callee}[${node.args.map(generate).join(", ")}]`;

    case "BinaryExpression":
      return `(${generate(node.left)} ${node.op} ${generate(node.right)})`;

    case "UnaryExpression":
      return `(${node.op}${generate(node.expression)})`;

    case "ConditionalExpression":
      return `(${generate(node.condition)} ? ${generate(node.consequent)} : ${generate(node.alternate)})`;

    case "Identifier":
      return node.name;

    case "NumberLiteral":
      return node.value.toString();

    case "StringLiteral":
      return `"${node.value}"`;

    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}
