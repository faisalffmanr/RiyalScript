// Base classes
export class Node {
  constructor() {
    this.type = this.constructor.name;
  }
}

export class Statement extends Node {}
export class Expression extends Node {}

// Program structure
export class Program extends Node {
  constructor(statements) {
    super();
    this.statements = statements;
  }
}

// Statements
export class Block extends Statement {
  constructor(statements) {
    super();
    this.statements = statements;
  }
}

export class VariableDecl extends Statement {
  constructor(name, type, initializer, isConst = false) {
    super();
    this.name = name;
    this.type = type;
    this.initializer = initializer;
    this.isConst = isConst;
  }
}

export class Assignment extends Statement {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }
}

export class IfStatement extends Statement {
  constructor(condition, thenStmt, elseStmt = null) {
    super();
    this.condition = condition;
    this.thenStmt = thenStmt;
    this.elseStmt = elseStmt;
  }
}

export class WhileLoop extends Statement {
  constructor(condition, body) {
    super();
    this.condition = condition;
    this.body = body;
  }
}

export class ForLoop extends Statement {
  constructor(variable, iterable, body) {
    super();
    this.variable = variable;
    this.iterable = iterable;
    this.body = body;
  }
}

export class FunctionDecl extends Statement {
  constructor(name, params, returnType, body, isAsync = false) {
    super();
    this.name = name;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
    this.isAsync = isAsync;
  }
}

export class ReturnStatement extends Statement {
  constructor(expression = null) {
    super();
    this.expression = expression;
  }
}

export class ClassDecl extends Statement {
  constructor(name, members) {
    super();
    this.name = name;
    this.members = members;
  }
}

export class MethodDecl extends Statement {
  constructor(name, params, returnType, body, isAsync = false) {
    super();
    this.name = name;
    this.params = params;
    this.returnType = returnType;
    this.body = body;
    this.isAsync = isAsync;
  }
}

export class FieldDecl extends Statement {
  constructor(name, type, initializer) {
    super();
    this.name = name;
    this.type = type;
    this.initializer = initializer;
  }
}

export class ImportStatement extends Statement {
  constructor(spec, source) {
    super();
    this.spec = spec;
    this.source = source;
  }
}

export class ImportDefaultSpecifier extends Statement {
  constructor(name) {
    super();
    this.name = name;
  }
}

export class ImportNamedSpecifier extends Statement {
  constructor(items) {
    super();
    this.items = items;
  }
}

export class ImportNamespaceSpecifier extends Statement {
  constructor(name) {
    super();
    this.name = name;
  }
}

// Expressions
export class Identifier extends Expression {
  constructor(name) {
    super();
    this.name = name;
  }
}

export class Literal extends Expression {
  constructor(value, literalType) {
    super();
    this.value = value;
    this.literalType = literalType;
  }
}

export class BinaryExpression extends Expression {
  constructor(left, operator, right) {
    super();
    this.left = left;
    this.operator = operator;
    this.right = right;
  }
}

export class UnaryExpression extends Expression {
  constructor(operator, argument) {
    super();
    this.operator = operator;
    this.argument = argument;
  }
}

export class CallExpression extends Expression {
  constructor(callee, args) {
    super();
    this.callee = callee;
    this.args = args;
  }
}

export class NewExpression extends Expression {
  constructor(callee, args) {
    super();
    this.callee = callee;
    this.args = args;
  }
}

export class MemberExpression extends Expression {
  constructor(object, property) {
    super();
    this.object = object;
    this.property = property;
  }
}

export class IfExpression extends Expression {
  constructor(condition, thenExpr, elseExpr) {
    super();
    this.condition = condition;
    this.thenExpr = thenExpr;
    this.elseExpr = elseExpr;
  }
}

export class ArrayLiteral extends Expression {
  constructor(elements) {
    super();
    this.elements = elements;
  }
}

export class ObjectLiteral extends Expression {
  constructor(properties) {
    super();
    this.properties = properties;
  }
}

export class Property extends Expression {
  constructor(key, value) {
    super();
    this.key = key;
    this.value = value;
  }
}

// Type annotations
export class TypeAnnotation extends Node {
  constructor(type) {
    super();
    this.type = type;
  }
}

// Parameter
export class Parameter extends Node {
  constructor(name, type) {
    super();
    this.name = name;
    this.type = type;
  }
}

export default {
  // Base classes
  Node, Statement, Expression,
  // Program structure
  Program, Block,
  // Statements
  VariableDecl, Assignment, IfStatement, WhileLoop, ForLoop, FunctionDecl, ReturnStatement,
  ClassDecl, MethodDecl, FieldDecl, ImportStatement, ImportDefaultSpecifier, ImportNamedSpecifier, ImportNamespaceSpecifier,
  // Expressions
  Identifier, Literal, BinaryExpression, UnaryExpression, CallExpression, NewExpression, MemberExpression,
  IfExpression, ArrayLiteral, ObjectLiteral, Property,
  // Types
  TypeAnnotation, Parameter
};