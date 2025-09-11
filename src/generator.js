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

    case "BooleanLiteral":
      return node.value.toString();

    case "ArrayLiteral":
      return `[${node.elements.map(generate).join(", ")}]`;

    case "ObjectLiteral":
      const props = node.properties.map(prop => `${prop.key}: ${generate(prop.value)}`).join(", ");
      return `{${props}}`;

    case "WhileLoop":
      return `while (${generate(node.condition)}) {\n${node.body.map(generate).join("\n")}\n}`;

    case "ForLoop":
      return `for (let ${node.variable} of ${generate(node.iterable)}) {\n${node.body.map(generate).join("\n")}\n}`;

    case "Property":
      return `${node.key}: ${generate(node.value)}`;

    case "MarketCall":
      return `await marketFunctions.${node.functionName}("${node.symbol}")`;

    case "MarketScan":
      return `await marketFunctions.scanStocks([${node.symbols.map(s => `"${s}"`).join(", ")}])`;

    default:
      return `/* ${node.type} */`;
  }
}
