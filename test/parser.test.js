/**
 * parser.test.js
 * Parser Tests for RiyalScript
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { parse, checkSyntax } from '../src/parser.js';

describe('RiyalScript Parser', () => {
  
  describe('Basic Parsing', () => {
    it('parses empty program', () => {
      const ast = parse('');
      assert.equal(ast.type, 'Program');
      assert.deepEqual(ast.statements, []);
    });

    it('parses variable declarations', () => {
      const ast = parse('let x = 42;');
      assert.equal(ast.statements[0].type, 'VariableDecl');
      assert.equal(ast.statements[0].name, 'x');
    });

    it('parses const declarations', () => {
      const ast = parse('const PI = 3.14159;');
      assert.equal(ast.statements[0].type, 'VariableDecl');
      assert.equal(ast.statements[0].isConst, true);
    });

    it('parses type annotations', () => {
      const ast = parse('let x: number = 42;');
      assert.equal(ast.statements[0].varType, 'number');
    });
  });

  describe('Financial Types', () => {
    it('parses Currency literals', () => {
      const ast = parse('let price = 100 USD;');
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'CurrencyLiteral');
      assert.equal(init.amount, 100);
      assert.equal(init.currency, 'USD');
    });

    it('parses multiple currency codes', () => {
      const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'SAR', 'AED'];
      for (const code of currencies) {
        const ast = parse(`let x = 100 ${code};`);
        assert.equal(ast.statements[0].initializer.currency, code);
      }
    });

    it('parses Decimal literals', () => {
      const ast = parse('let x = 10.5D;');
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'DecimalLiteral');
      assert.equal(init.value, '10.5');
    });

    it('parses InterestRate literals', () => {
      const ast = parse('let rate = 5.5%;');
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'InterestRateLiteral');
      assert.equal(init.rate, 5.5);
    });
  });

  describe('Function Declarations', () => {
    it('parses function with unique call syntax', () => {
      const code = `
        function add<[a: number, b: number]> {
          yield a + b;
        }
      `;
      const ast = parse(code);
      const func = ast.statements[0];
      assert.equal(func.type, 'FunctionDecl');
      assert.equal(func.name, 'add');
      assert.equal(func.params.length, 2);
    });

    it('parses async functions', () => {
      const code = `
        async function fetchData<[url: string]> {
          await fetch<[url]>;
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].isAsync, true);
    });

    it('parses yield statements', () => {
      const code = `
        function getValue<[]> {
          yield 42;
        }
      `;
      const ast = parse(code);
      const yieldStmt = ast.statements[0].body.statements[0];
      assert.equal(yieldStmt.type, 'YieldStatement');
    });
  });

  describe('Class Declarations', () => {
    it('parses class with properties and methods', () => {
      const code = `
        class Account {
          let balance: Currency = 0 USD;
          
          function deposit<[amount: Currency]> {
            this.balance = this.balance + amount;
          }
        }
      `;
      const ast = parse(code);
      const cls = ast.statements[0];
      assert.equal(cls.type, 'ClassDecl');
      assert.equal(cls.name, 'Account');
      assert.equal(cls.members.length, 2);
    });
  });

  describe('Control Flow', () => {
    it('parses if-else statements', () => {
      const code = `
        if (x > 0) {
          print<["positive"]>;
        } else {
          print<["negative"]>;
        }
      `;
      const ast = parse(code);
      const ifStmt = ast.statements[0];
      assert.equal(ifStmt.type, 'IfStatement');
      assert(ifStmt.elseBranch);
    });

    it('parses while loops', () => {
      const code = `
        while (i < 10) {
          i = i + 1;
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'WhileLoop');
    });

    it('parses for loops', () => {
      const code = `
        for (let i = 0; i < 10; i = i + 1) {
          print<[i]>;
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'ForLoop');
    });

    it('parses for loops with compound assignment', () => {
      const code = `
        for (let i = 0; i < 10; i += 1) {
          print<[i]>;
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'ForLoop');
    });
  });

  describe('Trading Statements', () => {
    it('parses trade statements', () => {
      const code = 'trade<["AAPL", 100, "BUY"]>;';
      const ast = parse(code);
      const trade = ast.statements[0];
      assert.equal(trade.type, 'TradeStatement');
      assert.equal(trade.args.length, 3);
    });

    it('parses print statements', () => {
      const code = 'print<["Hello", "World"]>;';
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'PrintStatement');
    });
  });

  describe('Special Statements', () => {
    it('parses audit statements', () => {
      const code = `
        audit balance > 0 USD {
          print<["Balance is positive"]>;
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'AuditStatement');
    });

    it('parses try-catch-finally', () => {
      const code = `
        try {
          risky<[]>;
        } catch (e) {
          print<[e]>;
        } finally {
          cleanup<[]>;
        }
      `;
      const ast = parse(code);
      const tryStmt = ast.statements[0];
      assert.equal(tryStmt.type, 'TryCatch');
      assert(tryStmt.finallyBlock);
    });

    it('parses import statements', () => {
      const code = 'import { sqrt, pow } from "math";';
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'ImportStatement');
    });
  });

  describe('Expressions', () => {
    it('parses binary expressions', () => {
      const code = 'let x = a + b * c;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'BinaryExpression');
      assert.equal(init.operator, '+');
    });

    it('parses unary expressions', () => {
      const code = 'let x = !flag;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'UnaryExpression');
      assert.equal(init.operator, '!');
    });

    it('parses ternary expressions', () => {
      const code = 'let x = a > b ? a : b;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'TernaryExpression');
    });

    it('parses call expressions with unique syntax', () => {
      const code = 'let result = add<[1, 2]>;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'CallExpression');
      assert.equal(init.args.length, 2);
    });

    it('parses member expressions', () => {
      const code = 'let x = obj.property;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'MemberExpression');
      assert.equal(init.property, 'property');
    });

    it('parses array access', () => {
      const code = 'let x = arr[0];';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'ArrayAccess');
    });

    it('parses new expressions', () => {
      const code = 'let x = new Account<[]>;';
      const ast = parse(code);
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'NewExpression');
      assert.equal(init.callee, 'Account');
    });
  });

  describe('Literals', () => {
    it('parses number literals', () => {
      const numbers = ['42', '3.14', '0', '-10', '1e10'];
      for (const num of numbers) {
        const ast = parse(`let x = ${num};`);
        assert.equal(ast.statements[0].initializer.type, 'NumberLiteral');
      }
    });

    it('parses string literals', () => {
      const strings = ['"hello"', "'world'", '`template`'];
      for (const str of strings) {
        const ast = parse(`let x = ${str};`);
        assert.equal(ast.statements[0].initializer.type, 'StringLiteral');
      }
    });

    it('parses boolean literals', () => {
      let ast = parse('let x = true;');
      assert.equal(ast.statements[0].initializer.value, true);
      
      ast = parse('let y = false;');
      assert.equal(ast.statements[0].initializer.value, false);
    });

    it('parses null literal', () => {
      const ast = parse('let x = null;');
      assert.equal(ast.statements[0].initializer.type, 'NullLiteral');
    });

    it('parses array literals', () => {
      const ast = parse('let x = [1, 2, 3];');
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'ArrayLiteral');
      assert.equal(init.elements.length, 3);
    });

    it('parses object literals', () => {
      const ast = parse('let x = { a: 1, b: 2 };');
      const init = ast.statements[0].initializer;
      assert.equal(init.type, 'ObjectLiteral');
      assert.equal(init.properties.length, 2);
    });
  });

  describe('Syntax Checking', () => {
    it('accepts valid syntax', () => {
      const validCode = `
        function main<[]> {
          let x: number = 42;
          yield x;
        }
      `;
      assert.equal(checkSyntax(validCode), true);
    });

    it('rejects invalid syntax', () => {
      const invalidCode = 'function missing syntax';
      assert.equal(checkSyntax(invalidCode), false);
    });
  });

  describe('Error Handling', () => {
    it('throws on syntax errors', () => {
      assert.throws(() => parse('let x ='));
    });

    it('provides error location', () => {
      try {
        parse('let x = ;');
        assert.fail('Should have thrown an error');
      } catch (error) {
        assert(error.location);
        assert(error.location.line > 0);
        assert(error.location.column > 0);
      }
    });
  });

  describe('Complex Programs', () => {
    it('parses ROI calculator', () => {
      const code = `
        function roi<[principal: Currency, gain: Currency]> {
          yield (gain - principal) / principal;
        }
        
        let investment = 1000 USD;
        let returns = 1200 USD;
        let result = roi<[investment, returns]>;
      `;
      const ast = parse(code);
      assert.equal(ast.statements.length, 4);
      assert.equal(ast.statements[0].type, 'FunctionDecl');
    });

    it('parses trading bot class', () => {
      const code = `
        class TradingBot {
          let portfolio: Currency = 100000 USD;
          
          function buy<[symbol: string, quantity: number]> {
            trade<[symbol, quantity, "BUY"]>;
            this.portfolio = this.portfolio - (quantity * 150 USD);
          }
        }
      `;
      const ast = parse(code);
      assert.equal(ast.statements[0].type, 'ClassDecl');
    });
  });
});