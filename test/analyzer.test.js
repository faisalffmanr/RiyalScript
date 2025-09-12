
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import analyze from '../src/analyzer.js';
import { parse } from '../src/parser.js';

describe('RiyalScript Semantic Analyzer', () => {
  describe('Type Inference', () => {
    it('should infer number type for arithmetic expressions', () => {
      const code = 'let x = 5 + 3';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.inferredType === 'number');
    });

    it('should infer string type for string literals', () => {
      const code = 'let name = "RiyalScript"';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.inferredType === 'string');
    });

    it('should infer boolean type for comparison expressions', () => {
      const code = 'let isGreater = 5 > 3';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.inferredType === 'boolean');
    });
  });

  describe('Expression Analysis', () => {
    it('should analyze binary expressions', () => {
      const code = 'let result = 10 * 5 + 2';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'BinaryExpression');
    });

    it('should analyze conditional expressions', () => {
      const code = 'let result = if 5 > 3 then "yes" else "no"';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'ConditionalExpression');
    });

    it('should analyze function calls', () => {
      const code = 'let result = add[5, 3]';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'FunctionCall');
    });
  });

  describe('Data Structure Analysis', () => {
    it('should analyze array literals', () => {
      const code = 'let arr = [1, 2, 3]';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'ArrayLiteral');
      assert(ast.statements[0].initializer.inferredType === 'array');
    });

    it('should analyze object literals', () => {
      const code = 'let obj = {name: "test", value: 42}';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'ObjectLiteral');
      assert(ast.statements[0].initializer.inferredType === 'object');
    });
  });

  describe('Control Flow Analysis', () => {
    it('should analyze while loops', () => {
      const code = 'while x > 0 do let x = x - 1 end';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].type === 'WhileLoop');
    });

    it('should analyze for loops', () => {
      const code = 'for i in [1, 2, 3] do let sum = sum + i end';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].type === 'ForLoop');
    });
  });

  describe('Function Analysis', () => {
    it('should analyze function declarations', () => {
      const code = 'func add[x, y] (x + y) end';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].type === 'FunctionDeclaration');
    });
  });

  describe('Market Data Analysis', () => {
    it('should analyze market function calls', () => {
      const code = 'let price = market.getStockPrice("AAPL")';
      const match = parse(code);
      assert(match.succeeded());
      
      const ast = analyze(match);
      assert(ast.statements[0].initializer.type === 'MarketCall');
    });
  });
});
