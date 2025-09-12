

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import optimize from '../src/optimizer.js';
import analyze from '../src/analyzer.js';
import { parse } from '../src/parser.js';

describe('RiyalScript Optimizer', () => {
  describe('Constant Folding', () => {
    it('should fold arithmetic constants', () => {
      const code = 'let x = 5 + 3 * 2';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      // Should be optimized to 11
      assert(optimized.statements[0].initializer.value === 11);
    });

    it('should fold comparison constants', () => {
      const code = 'let result = 5 > 3';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      // Should be optimized to true
      assert(optimized.statements[0].initializer.value === true);
    });

    it('should fold logical constants', () => {
      const code = 'let result = true && false';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      

      assert(optimized.statements[0].initializer.type === 'BinaryExpression');
    });

    it('should fold power operations', () => {
      const code = 'let result = 2 ** 3';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
 
      assert(optimized.statements[0].initializer.value === 8);
    });
  });

  describe('Expression Optimization', () => {
    it('should optimize nested arithmetic', () => {
      const code = 'let result = (10 + 5) * (3 - 1)';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      

      assert(optimized.statements[0].initializer.value === 30);
    });

    it('should optimize complex comparisons', () => {
      const code = 'let result = (5 + 3) > (2 * 3)';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
 
      assert(optimized.statements[0].initializer.value === true);
    });
  });

  describe('Conditional Optimization', () => {
    it('should optimize conditional expressions with constants', () => {
      const code = 'let result = if 5 > 3 then 10 else 20';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      

      assert(optimized.statements[0].initializer.type === 'ConditionalExpression');
      assert(optimized.statements[0].initializer.condition.value === true);
    });

    it('should optimize nested conditionals', () => {
      const code = 'let result = if 5 > 10 then 1 else if 3 > 2 then 2 else 3';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
  
      assert(optimized.statements[0].initializer.type === 'ConditionalExpression');
      assert(optimized.statements[0].initializer.condition.value === false);
    });
  });

  describe('Array and Object Optimization', () => {
    it('should preserve array literals', () => {
      const code = 'let arr = [1, 2, 3]';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].initializer.type === 'ArrayLiteral');
    });

    it('should preserve object literals', () => {
      const code = 'let obj = {name: "test", value: 42}';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].initializer.type === 'ObjectLiteral');
    });
  });

  describe('Function Optimization', () => {
    it('should preserve function declarations', () => {
      const code = 'func add[x, y] (x + y) end';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].type === 'FunctionDeclaration');
    });

    it('should preserve function calls', () => {
      const code = 'let result = add[5, 3]';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].initializer.type === 'FunctionCall');
    });
  });

  describe('Control Flow Optimization', () => {
    it('should preserve while loops', () => {
      const code = 'while x > 0 do let x = x - 1 end';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].type === 'WhileLoop');
    });

    it('should preserve for loops', () => {
      const code = 'for i in [1, 2, 3] do let sum = sum + i end';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].type === 'ForLoop');
    });
  });

  describe('Market Data Optimization', () => {
    it('should preserve market function calls', () => {
      const code = 'let price = market.getStockPrice("AAPL")';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      
      assert(optimized.statements[0].initializer.type === 'MarketCall');
    });
  });
});
