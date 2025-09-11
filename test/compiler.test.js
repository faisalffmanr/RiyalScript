/**
 * compiler.test.js
 * Compiler Integration Tests for RiyalScript
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import compile, { compileToJS, checkSyntax, getCompilationStats } from '../src/compiler.js';

describe('RiyalScript Compiler Integration', () => {
  
  describe('Compilation Pipeline', () => {
    it('compiles simple program to JavaScript', () => {
      const code = 'let x = 42';
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('let x = 42'));
    });

    it('compiles financial types', () => {
      const code = 'let price = 100';
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('let price = 100'));
    });

    it('includes runtime library', () => {
      const code = 'let x = 1';
      const result = compile(code);
      assert(result.result.includes('class Currency'));
      assert(result.result.includes('class Decimal'));
      assert(result.result.includes('class InterestRate'));
    });
  });

  describe('Phase-specific Compilation', () => {
    it('stops at parse phase', () => {
      const code = 'let x = 42';
      const result = compile(code, 'parse');
      assert.equal(result.success, true);
      assert.equal(result.result.type, 'Program');
    });

    it('stops at analyze phase', () => {
      const code = 'let x = 42;';
      const result = compile(code, 'analyze');
      assert.equal(result.success, true);
      assert.equal(result.result.type, 'Program');
    });

    it('stops at optimize phase', () => {
      const code = 'let x = 2 + 3;';
      const result = compile(code, 'optimize');
      assert.equal(result.success, true);
      // Check that constant folding occurred
      assert.equal(result.result.statements[0].initializer.type, 'NumberLiteral');
      assert.equal(result.result.statements[0].initializer.value, 5);
    });
  });

  describe('Error Handling', () => {
    it('reports syntax errors', () => {
      const code = 'let x =';
      const result = compile(code);
      assert.equal(result.success, false);
      assert(result.error.includes('parse'));
    });

    it('reports semantic errors', () => {
      const code = `
        let x = 42;
        let x = 100;
      `;
      const result = compile(code);
      assert.equal(result.success, false);
      assert(result.error.includes('already declared'));
    });

    it('reports type errors', () => {
      const code = 'let x: number = "not a number";';
      const result = compile(code);
      assert.equal(result.success, false);
      assert(result.error.includes('Type mismatch'));
    });
  });

  describe('Helper Functions', () => {
    it('checkSyntax validates correct code', () => {
      const code = 'let x = 42;';
      assert.equal(checkSyntax(code), true);
    });

    it('checkSyntax rejects invalid code', () => {
      const code = 'let x =';
      assert.equal(checkSyntax(code), false);
    });

    it('compileToJS generates JavaScript', () => {
      const code = 'print<["Hello, World!"]>;';
      const js = compileToJS(code);
      assert(js.includes('print("Hello, World!")'));
    });

    it('getCompilationStats analyzes program', () => {
      const code = `
        function add<[a: number, b: number]> {
          yield a + b;
        }
        let x = 42;
        class Account {
          let balance = 0;
        }
      `;
      const stats = getCompilationStats(code);
      assert.equal(stats.valid, true);
      assert.equal(stats.stats.functions, 1);
      assert(stats.stats.variables > 0);
      assert.equal(stats.stats.classes, 1);
    });
  });

  describe('Complex Compilation', () => {
    it('compiles function with yield to return', () => {
      const code = `
        function getValue<[]> {
          yield 42;
        }
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('return 42'));
    });

    it('compiles unique call syntax', () => {
      const code = 'let result = add<[1, 2]>;';
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('add(1, 2)'));
    });

    it('compiles trade statements', () => {
      const code = 'trade<["AAPL", 100, "BUY"]>;';
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('trade("AAPL", 100, "BUY")'));
    });

    it('compiles audit statements', () => {
      const code = `
        audit x > 0 {
          print<["x is positive"]>;
        }
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('if (!('));
      assert(result.result.includes('throw new Error("Audit assertion failed")'));
    });

    it('compiles Currency operations', () => {
      const code = `
        let a: Currency = 100 USD;
        let b: Currency = 50 USD;
        let c = a + b;
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('.add('));
    });

    it('optimizes constant expressions', () => {
      const code = 'let x = 2 + 3 * 4;';
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('let x = 14'));
    });

    it('compiles classes', () => {
      const code = `
        class Account {
          let balance: Currency = 0 USD;
          
          function deposit<[amount: Currency]> {
            this.balance = this.balance + amount;
          }
        }
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('class Account'));
      assert(result.result.includes('constructor()'));
      assert(result.result.includes('deposit(amount)'));
    });

    it('compiles async functions', () => {
      const code = `
        async function fetchData<[]> {
          await delay<[1000]>;
          yield "data";
        }
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('async function fetchData()'));
      assert(result.result.includes('await delay(1000)'));
    });
  });

  describe('Full Program Compilation', () => {
    it('compiles ROI calculator', () => {
      const code = `
        function calculateROI<[principal: Currency, gain: Currency]> {
          yield (gain - principal) / principal * 100;
        }
        
        let investment = 1000 USD;
        let returns = 1500 USD;
        let roi = calculateROI<[investment, returns]>;
        print<["ROI:", roi, "%"]>;
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('function calculateROI'));
      assert(result.result.includes('new Currency(1000, "USD")'));
      assert(result.result.includes('print("ROI:", roi, "%")'));
    });

    it('compiles compound interest calculator', () => {
      const code = `
        function compound<[p: Currency, r: InterestRate, t: number]> {
          let periods = t * 12;
          let amount = p;
          for (let i = 0; i < periods; i = i + 1) {
            amount = amount * (1 + r / 12);
          }
          yield amount;
        }
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('for (let i = 0'));
    });

    it('compiles trading system', () => {
      const code = `
        class TradingBot {
          let portfolio: Currency = 100000 USD;
          
          function executeTrade<[symbol: string, quantity: number, price: Currency]> {
            trade<[symbol, quantity, "BUY"]>;
            this.portfolio = this.portfolio - (price * quantity);
          }
        }
        
        let bot = new TradingBot<[]>;
        bot.executeTrade<["AAPL", 100, 150 USD]>;
      `;
      const result = compile(code);
      assert.equal(result.success, true);
      assert(result.result.includes('class TradingBot'));
      assert(result.result.includes('new TradingBot()'));
      assert(result.result.includes('bot.executeTrade'));
    });
  });
});