

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse } from '../src/parser.js';

describe('RiyalScript Grammar', () => {
  describe('Basic Syntax', () => {
    it('should parse variable declarations', () => {
      const code = 'let x = 5';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse string literals', () => {
      const code = 'let name = "RiyalScript"';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse number literals', () => {
      const code = 'let value = 42.5';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Expressions', () => {
    it('should parse arithmetic expressions', () => {
      const code = 'let result = 10 + 5 * 2';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse comparison expressions', () => {
      const code = 'let isGreater = 5 > 3';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse logical expressions', () => {
      const code = 'let isValid = true && false';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Control Flow', () => {
    it('should parse conditional expressions', () => {
      const code = 'let result = if 5 > 3 then "yes" else "no"';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse while loops', () => {
      const code = 'while x > 0 do let x = x - 1 end';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse for loops', () => {
      const code = 'for i in [1, 2, 3] do let sum = sum + i end';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Functions', () => {
    it('should parse function declarations', () => {
      const code = 'func add[x, y] (x + y) end';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse function calls', () => {
      const code = 'let result = add[5, 3]';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Data Structures', () => {
    it('should parse array literals', () => {
      const code = 'let arr = [1, 2, 3]';
      const result = parse(code);
      assert(result.succeeded());
    });

    it('should parse object literals', () => {
      const code = 'let obj = {name: "test", value: 42}';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Market Data', () => {
    it('should parse market function calls', () => {
      const code = 'let price = market.getStockPrice("AAPL")';
      const result = parse(code);
      assert(result.succeeded());
    });
  });

  describe('Error Cases', () => {
    it('should reject invalid syntax', () => {
      const code = 'let x = if 5 10 else 20'; // Missing 'then'
      try {
        const result = parse(code);
        assert(!result.succeeded());
      } catch (error) {
        // Expected to throw an error
        assert(error.message.includes('Syntax Error'));
      }
    });

    it('should reject malformed expressions', () => {
      const code = 'let x = + + 5'; // Invalid operator sequence
      try {
        const result = parse(code);
        assert(!result.succeeded());
      } catch (error) {
        // Expected to throw an error
        assert(error.message.includes('Syntax Error'));
      }
    });
  });
});
