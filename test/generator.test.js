

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import generate from '../src/generator.js';
import analyze from '../src/analyzer.js';
import optimize from '../src/optimizer.js';
import { parse } from '../src/parser.js';

describe('RiyalScript Code Generator', () => {
  describe('Basic Code Generation', () => {
    it('should generate variable declarations', () => {
      const code = 'let x = 5';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let x = 5;'));
    });

    it('should generate string literals', () => {
      const code = 'let name = "RiyalScript"';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let name = "RiyalScript";'));
    });

    it('should generate number literals', () => {
      const code = 'let value = 42.5';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let value = 42.5;'));
    });
  });

  describe('Expression Generation', () => {
    it('should generate arithmetic expressions', () => {
      const code = 'let result = 10 + 5 * 2';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      const js = generate(optimized);
      
      assert(js.includes('let result = 20;')); // Should be constant folded
    });

    it('should generate comparison expressions', () => {
      const code = 'let isGreater = 5 > 3';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      const js = generate(optimized);
      
      assert(js.includes('let isGreater = true;')); // Should be constant folded
    });

    it('should generate logical expressions', () => {
      const code = 'let result = true && false';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      const js = generate(optimized);
      
      assert(js.includes('let result = (true && false);')); // Currently not optimized
    });

    it('should generate conditional expressions', () => {
      const code = 'let result = if 5 > 3 then "yes" else "no"';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      const js = generate(optimized);
      
      assert(js.includes('let result = (true ? "yes" : "no");'));
    });
  });

  describe('Function Generation', () => {
    it('should generate function declarations', () => {
      const code = 'func add[x, y] (x + y) end';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('function add(x, y)'));
      assert(js.includes('(x + y)'));
    });

    it('should generate function calls', () => {
      const code = 'let result = add[5, 3]';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let result = add['));
    });
  });

  describe('Data Structure Generation', () => {
    it('should generate array literals', () => {
      const code = 'let arr = [1, 2, 3]';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let arr = [1,'));
    });

    it('should generate object literals', () => {
      const code = 'let obj = {name: "test", value: 42}';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let obj = {name: "test"'));
    });
  });

  describe('Control Flow Generation', () => {
    it('should generate while loops', () => {
      const code = 'while x > 0 do let x = x - 1 end';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('while ((x > 0))'));
      assert(js.includes('let x = (x - 1);'));
    });

    it('should generate for loops', () => {
      const code = 'for i in [1, 2, 3] do let sum = sum + i end';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('for (let i of [1,'));
      assert(js.includes('let sum = (sum + i);'));
    });
  });

  describe('Market Data Generation', () => {
    it('should generate market function calls', () => {
      const code = 'let price = market.getStockPrice("AAPL")';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('await marketFunctions.getStockPrice("AAPL")'));
    });

    it('should generate market opening price calls', () => {
      const code = 'let openPrice = market.getOpenPrice("AAPL")';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('await marketFunctions.getOpenPrice("AAPL")'));
    });
  });

  describe('Complex Code Generation', () => {
    it('should generate nested expressions', () => {
      const code = 'let result = (10 + 5) * (3 - 1)';
      const match = parse(code);
      const ast = analyze(match);
      const optimized = optimize(ast);
      const js = generate(optimized);
      
      assert(js.includes('let result = 30;')); // Should be constant folded
    });

    it('should generate multiple statements', () => {
      const code = 'let x = 5\nlet y = 10\nlet sum = x + y';
      const match = parse(code);
      const ast = analyze(match);
      const js = generate(ast);
      
      assert(js.includes('let x = 5;'));
      assert(js.includes('let y = 10;'));
      assert(js.includes('let sum = (x + y);'));
    });
  });
});
