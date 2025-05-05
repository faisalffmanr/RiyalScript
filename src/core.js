export function program(statements) {
  return { type: "Program", statements };
}

export function funcDecl(name, params, body) {
  return { type: "FunctionDeclaration", name, params, body };
}

export function varDecl(name, initializer) {
  return { type: "VariableDeclaration", name, initializer };
}

export function assignStmt(name, expression) {
  return { type: "Assignment", name, expression };
}

export function conditional(condition, consequent, alternate) {
  return { type: "ConditionalExpression", condition, consequent, alternate };
}

export function binary(op, left, right) {
  return { type: "BinaryExpression", op, left, right };
}

export function unary(op, expression) {
  return { type: "UnaryExpression", op, expression };
}

export function call(callee, args) {
  return { type: "FunctionCall", callee, args };
}

export function identifier(name) {
  return { type: "Identifier", name };
}

export function number(value) {
  return { type: "NumberLiteral", value: Number(value) };
}

export function string(value) {
  return { type: "StringLiteral", value };
}
