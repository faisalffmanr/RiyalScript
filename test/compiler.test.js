

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import compile from '../src/compiler.js';

describe('RiyalScript Compiler Integration', () => {
  describe('Basic Compilation', () => {
    it('should compile simple variable declaration', () => {
      const code = 'let x = 5';
      const result = compile(code, 'js');
      assert(result.includes('let x = 5;'));
    });

    it('should compile arithmetic expressions', () => {
      const code = 'let total = 10 + 5 * 2';
      const result = compile(code, 'js');
      assert(result.includes('let total = 20;'));
    });

    it('should compile conditional expressions', () => {
      const code = 'let result = if 5 > 3 then "yes" else "no"';
      const result = compile(code, 'js');
      assert(result.includes('let result = (true ? "yes" : "no");'));
    });
  });

  describe('Function Compilation', () => {
    it('should compile function declarations', () => {
      const code = 'func add[x, y] (x + y) end';
      const result = compile(code, 'js');
      assert(result.includes('function add(x, y)'));
    });

    it('should compile function calls', () => {
      const code = 'let result = add[5, 3]';
      const result = compile(code, 'js');
      assert(result.includes('let result = add['));
    });
  });

  describe('Data Structures', () => {
    it('should compile array literals', () => {
      const code = 'let arr = [1, 2, 3]';
      const result = compile(code, 'js');
      assert(result.includes('let arr = [1,'));
    });

    it('should compile object literals', () => {
      const code = 'let obj = {name: "test", value: 42}';
      const result = compile(code, 'js');
      assert(result.includes('let obj = {name: "test"'));
    });
  });

  describe('Control Flow', () => {
    it('should compile while loops', () => {
      const code = 'while x > 0 do let x = x - 1 end';
      const result = compile(code, 'js');
      assert(result.includes('while ((x > 0))'));
    });

    it('should compile for loops', () => {
      const code = 'for i in [1, 2, 3] do let sum = sum + i end';
      const result = compile(code, 'js');
      assert(result.includes('for (let i of [1,'));
    });
  });

  describe('Market Data Integration', () => {
    it('should compile market function calls', () => {
      const code = 'let price = market.getStockPrice("AAPL")';
      const result = compile(code, 'js');
      assert(result.includes('await marketFunctions.getStockPrice("AAPL")'));
    });
  });
});
