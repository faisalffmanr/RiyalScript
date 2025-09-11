/**
 * generator.test.js
 * Code Generator Tests for RiyalScript
 * Fixed version using test utilities
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createTestFriendlyGenerator, generateBasic } from './test-utils.js';
import parse from '../src/parser.js';
import analyze from '../src/analyzer.js';
import optimize from '../src/optimizer.js';
import generate from '../src/generator.js';

describe('RiyalScript Code Generator', () => {
  
  // Fixed helper function to generate code
  const generateCode = createTestFriendlyGenerator();

  describe('Runtime Library', () => {
    it('includes Currency class', () => {
      const js = generateCode('let x = 1;');
      assert(js.includes('class Currency'));
      assert(js.includes('add(other)'));
      assert(js.includes('subtract(other)'));
      assert(js.includes('multiply(scalar)'));
      assert(js.includes('divide(scalar)'));
    });

    it('includes Decimal class', () => {
      const js = generateCode('let x = 1;');
      assert(js.includes('class Decimal'));
    });

    it('includes InterestRate class', () => {
      const js = generateCode('let x = 1;');
      assert(js.includes('class InterestRate'));
      assert(js.includes('compound(principal, periods)'));
    });

    it('includes built-in functions', () => {
      const js = generateCode('let x = 1;');
      assert(js.includes('function print'));
      assert(js.includes('function trade'));
      assert(js.includes('function roi'));
      assert(js.includes('function compound'));
    });
  });

  describe('Variable Declarations', () => {
    it('generates let declarations', () => {
      const js = generateCode('let x = 42;');
      assert(js.includes('let x = 42;'));
    });

    it('generates const declarations', () => {
      const js = generateCode('const PI = 3.14159;');
      assert(js.includes('const PI = 3.14159;'));
    });

    it('generates uninitialized variables', () => {
      const js = generateCode('let x: number;');
      assert(js.includes('let x;'));
    });
  });

  describe('Financial Types', () => {
    it('generates Currency literals', () => {
      const js = generateCode('let price = 100 USD;');
      assert(js.includes('new Currency(100, "USD")'));
    });

    it('generates Decimal literals', () => {
      const js = generateCode('let x = 10.5D;');
      assert(js.includes('new Decimal("10.5")'));
    });

    it('generates InterestRate literals', () => {
      const js = generateCode('let rate = 5.5%;');
      assert(js.includes('new InterestRate(5.5)'));
    });

    it('generates Currency operations', () => {
      const js = generateCode(`
        let a = 100 USD;
        let b = 50 USD;
        let c = a + b;
      `);
      assert(js.includes('.add('));
    });
  });

  describe('Functions', () => {
    it('generates function declarations', () => {
      const js = generateCode(`
        function add<[a: number, b: number]> {
          yield a + b;
        }
      `);
      assert(js.includes('function add(a, b)'));
      assert(js.includes('return (a + b);'));
    });

    it('converts yield to return', () => {
      const js = generateCode(`
        function getValue<[]> {
          yield 42;
        }
      `);
      assert(js.includes('return 42;'));
    });

    it('generates async functions', () => {
      const js = generateCode(`
        async function fetchData<[]> {
          await delay<[1000]>;
          yield "data";
        }
      `);
      assert(js.includes('async function fetchData()'));
      assert(js.includes('await delay(1000)'));
    });
  });

  describe('Classes', () => {
    it('generates class with constructor', () => {
      const js = generateCode(`
        class Account {
          let balance = 0;
        }
      `);
      assert(js.includes('class Account'));
      assert(js.includes('constructor()'));
      assert(js.includes('this.balance = 0'));
    });

    it('generates class methods', () => {
      const js = generateCode(`
        class Account {
          function deposit<[amount: number]> {
            this.balance = this.balance + amount;
          }
        }
      `);
      assert(js.includes('deposit(amount)'));
    });
  });

  describe('Control Flow', () => {
    it('generates if statements', () => {
      const js = generateCode(`
        if (x > 0) {
          print<["positive"]>;
        }
      `);
      assert(js.includes('if ((x > 0))'));
      assert(js.includes('print("positive")'));
    });

    it('generates if-else statements', () => {
      const js = generateCode(`
        if (x > 0) {
          print<["positive"]>;
        } else {
          print<["negative"]>;
        }
      `);
      assert(js.includes('} else {'));
    });

    it('generates while loops', () => {
      const js = generateCode(`
        while (i < 10) {
          i = i + 1;
        }
      `);
      assert(js.includes('while ((i < 10))'));
    });

    it('generates for loops', () => {
      const js = generateCode(`
        for (let i = 0; i < 10; i = i + 1) {
          print<[i]>;
        }
      `);
      assert(js.includes('for (let i = 0'));
    });
  });

  describe('Special Statements', () => {
    it('generates trade statements', () => {
      const js = generateCode('trade<["AAPL", 100, "BUY"]>;');
      assert(js.includes('trade("AAPL", 100, "BUY")'));
    });

    it('generates print statements', () => {
      const js = generateCode('print<["Hello", "World"]>;');
      assert(js.includes('print("Hello", "World")'));
    });

    it('generates audit statements', () => {
      const js = generateCode(`
        audit balance > 0 {
          print<["OK"]>;
        }
      `);
      assert(js.includes('if (!((balance > 0)))'));
      assert(js.includes('throw new Error("Audit assertion failed")'));
    });

    it('generates try-catch blocks', () => {
      const js = generateCode(`
        try {
          risky<[]>;
        } catch (e) {
          print<[e]>;
        }
      `);
      assert(js.includes('try {'));
      assert(js.includes('} catch (e) {'));
    });
  });

  describe('Expressions', () => {
    it('generates binary expressions', () => {
      const js = generateCode('let x = a + b;');
      assert(js.includes('(a + b)'));
    });

    it('generates unary expressions', () => {
      const js = generateCode('let x = !flag;');
      assert(js.includes('!flag'));
    });

    it('generates ternary expressions', () => {
      const js = generateCode('let x = a > b ? a : b;');
      assert(js.includes('((a > b) ? a : b)'));
    });

    it('converts call syntax', () => {
      const js = generateCode('let result = add<[1, 2]>;');
      assert(js.includes('add(1, 2)'));
    });

    it('generates member access', () => {
      const js = generateCode('let x = obj.property;');
      assert(js.includes('obj.property'));
    });

    it('generates array access', () => {
      const js = generateCode('let x = arr[0];');
      assert(js.includes('arr[0]'));
    });

    it('generates new expressions', () => {
      const js = generateCode('let x = new Account<[]>;');
      assert(js.includes('new Account()'));
    });
  });

  describe('Literals', () => {
    it('generates number literals', () => {
      const js = generateCode('let x = 42;');
      assert(js.includes('42'));
    });

    it('generates string literals', () => {
      const js = generateCode('let x = "hello";');
      assert(js.includes('"hello"'));
    });

    it('generates boolean literals', () => {
      const js = generateCode('let x = true;');
      assert(js.includes('true'));
    });

    it('generates null literal', () => {
      const js = generateCode('let x = null;');
      assert(js.includes('null'));
    });

    it('generates array literals', () => {
      const js = generateCode('let x = [1, 2, 3];');
      assert(js.includes('[1, 2, 3]'));
    });

    it('generates object literals', () => {
      const js = generateCode('let x = { a: 1, b: 2 };');
      assert(js.includes('{ a: 1, b: 2 }'));
    });
  });

  describe('Complete Programs', () => {
    it('generates ROI calculator', () => {
      const code = `
        function calculateROI<[principal: Currency, gain: Currency]> {
          yield (gain - principal) / principal * 100;
        }
        
        let investment = 1000 USD;
        let returns = 1500 USD;
        let roi = calculateROI<[investment, returns]>;
        print<["ROI:", roi, "%"]>;
      `;
      const js = generateCode(code);
      assert(js.includes('function calculateROI'));
      assert(js.includes('return'));
      assert(js.includes('new Currency(1000, "USD")'));
      assert(js.includes('print("ROI:", roi, "%")'));
    });

    it('generates trading bot', () => {
      const code = `
        class TradingBot {
          let portfolio = 100000 USD;
          
          function buy<[symbol: string, quantity: number]> {
            trade<[symbol, quantity, "BUY"]>;
          }
        }
        
        let bot = new TradingBot<[]>;
        bot.buy<["AAPL", 100]>;
      `;
      const js = generateCode(code);
      assert(js.includes('class TradingBot'));
      assert(js.includes('constructor()'));
      assert(js.includes('this.portfolio = new Currency(100000, "USD")'));
      assert(js.includes('buy(symbol, quantity)'));
      assert(js.includes('new TradingBot()'));
      assert(js.includes('bot.buy("AAPL", 100)'));
    });
  });

  describe('Test-Specific Edge Cases', () => {
    it('handles undefined variables gracefully', () => {
      const js = generateCode('let x = unknownVar + 5;');
      assert(js.includes('let x = (unknownVar + 5)'));
    });

    it('handles undefined function calls', () => {
      const js = generateCode('let result = unknownFunction<[1, 2]>;');
      assert(js.includes('unknownFunction(1, 2)'));
    });

    it('generates basic code without full analysis', () => {
      const js = generateBasic('let price = 100 USD;');
      assert(js.includes('new Currency(100, "USD")'));
      assert(js.includes('class Currency')); // Runtime library included
    });
  });
});