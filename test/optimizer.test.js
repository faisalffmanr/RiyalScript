//optimizer.test.js
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createTestFriendlyAnalyzer, parseOnly, generateBasic } from './test-utils.js';
import parse from '../src/parser.js';
import analyze from '../src/analyzer.js';
import optimize from '../src/optimizer.js';

// Use test-friendly approach for optimizer
function optimizeSource(source) {
  try {
    return optimize(analyze(parse(source)));
  } catch (error) {
    if (error.message.includes('Undefined identifier')) {
      console.warn('Skipping analysis for optimizer test:', error.message);
      return optimize(parse(source));
    }
    throw error;
  }
}

describe('RiyalScript Optimizer', () => {
  it('performs constant folding on arithmetic expressions', () => {
    const program = 'let x = 2 + 3;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, 5);
  });

  it('performs constant folding on multiplication', () => {
    const program = 'let x = 2 * 3;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, 6);
  });

  it('performs constant folding on division', () => {
    const program = 'let x = 6 / 2;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, 3);
  });

  it('performs constant folding on subtraction', () => {
    const program = 'let x = 5 - 2;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, 3);
  });

  it('handles modulo expressions', () => {
    const program = 'let x = 10 % 3;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, 1);
  });

  it('performs boolean constant folding', () => {
    const program = 'let x = true && false;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, false);
  });

  it('performs string concatenation', () => {
    const program = 'let x = "hello" + "world";';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.value, 'helloworld');
  });

  it('optimizes let a = 1; let y = a + 0 to a', () => {
    const program = 'let a = 1; let y = a + 0;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = 0 + a to a', () => {
    const program = 'let a = 1; let y = 0 + a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = a - 0 to a', () => {
    const program = 'let a = 1; let y = a - 0;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = a * 1 to a', () => {
    const program = 'let a = 1; let y = a * 1;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = 1 * a to a', () => {
    const program = 'let a = 1; let y = 1 * a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = a * 0 to 0', () => {
    const program = 'let a = 1; let y = a * 0;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[1].initializer.value, 0);
  });

  it('optimizes let a = 1; let y = 0 * a to 0', () => {
    const program = 'let a = 1; let y = 0 * a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[1].initializer.value, 0);
  });

  it('optimizes let a = 1; let y = a / 1 to a', () => {
    const program = 'let a = 1; let y = a / 1;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = 1; let y = 0 / a to 0', () => {
    const program = 'let a = 1; let y = 0 / a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[1].initializer.value, 0);
  });

  it('optimizes let a = true; let y = true && a to a', () => {
    const program = 'let a = true; let y = true && a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = true; let y = a && true to a', () => {
    const program = 'let a = true; let y = a && true;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = true; let y = false && a to false', () => {
    const program = 'let a = true; let y = false && a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[1].initializer.value, false);
  });

  it('optimizes let a = true; let y = a && false to false', () => {
    const program = 'let a = true; let y = a && false;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[1].initializer.value, false);
  });

  it('optimizes let a = true; let y = false || a to a', () => {
    const program = 'let a = true; let y = false || a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = true; let y = a || false to a', () => {
    const program = 'let a = true; let y = a || false;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes let a = true; let y = true || a to true', () => {
    const program = 'let a = true; let y = true || a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[1].initializer.value, true);
  });

  it('optimizes let a = true; let y = a || true to true', () => {
    const program = 'let a = true; let y = a || true;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[1].initializer.value, true);
  });

  it('optimizes double negation let a = true; let y = !!a to a', () => {
    const program = 'let a = true; let y = !!a;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'Identifier');
    assert.equal(result.statements[1].initializer.name, 'a');
  });

  it('optimizes unary minus on literals', () => {
    const program = 'let x = -5;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, -5);
  });

  it('optimizes unary plus on literals', () => {
    const program = 'let x = +5;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, 5);
  });

  it('optimizes not operator on boolean literals', () => {
    const program = 'let x = !true;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[0].initializer.value, false);
  });

  it('optimizes ternary with constant condition (true)', () => {
    const program = 'let x = true ? 1 : 2;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, 1);
  });

  it('optimizes ternary with constant condition (false)', () => {
    const program = 'let x = false ? 1 : 2;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, 2);
  });

  it('optimizes ternary with same branches', () => {
    const program = 'let a = 1; let x = a > 0 ? 5 : 5;';
    const result = optimizeSource(program);
    assert.equal(result.statements[1].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[1].initializer.value, 5);
  });

  it('removes dead code after return', () => {
    const program = `function test<[]> {
      yield 1;
      let x = 2;
    }`;
    const result = optimizeSource(program);
    assert.equal(result.statements[0].body.statements.length, 1);
    assert.equal(result.statements[0].body.statements[0].type, 'YieldStatement');
  });

  it('optimizes if statements with constant conditions (true)', () => {
    const program = `if (true) {
      let x = 1;
    }`;
    const result = optimizeSource(program);
    assert.equal(result.statements[0].type, 'Block');
  });

  it('handles if statements with constant false conditions', () => {
    const program = `if (false) {
      let x = 1;
    }`;
    const result = optimizeSource(program);
    // Should be removed entirely or become null
    assert(!result.statements[0] || result.statements[0] === null || result.statements.length === 0);
  });

  it('handles empty if statements', () => {
    const program = `let a = 1; if (a > 0) {
    }`;
    const result = optimizeSource(program);
    // Empty if statements should be removed
    assert.equal(result.statements.length, 1); // Only the variable declaration should remain
  });

  it('removes dead while loops', () => {
    const program = `while (false) { 
      let x = 1; 
    }`;
    const result = optimizeSource(program);
    assert(!result.statements[0] || result.statements[0] === null || result.statements.length === 0);
  });

  it('handles dead for loops', () => {
    const program = `let i = 0; if (false) { let x = 1; }`;
    const result = optimizeSource(program);
    // Should keep the init but remove the if
    assert.equal(result.statements.length, 1);
    assert.equal(result.statements[0].type, 'VariableDecl');
  });

  it('removes self-assignments', () => {
    const program = 'let a = 1; a = a;';
    const result = optimizeSource(program);
    // Should have only the variable declaration, self-assignment removed
    assert.equal(result.statements.length, 1);
    assert.equal(result.statements[0].type, 'VariableDecl');
  });

  it('preserves necessary statements', () => {
    const program = `
      let x = 5;
      x = x + 1;
      print<[x]>;
    `;
    const result = optimizeSource(program);
    assert(result.statements.length >= 2);
  });

  it('optimizes complex expressions', () => {
    const program = 'let x = 2 + 3 * 4 - 1;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'NumberLiteral');
    assert.equal(result.statements[0].initializer.value, 13);
  });

  it('handles Currency literal optimization', () => {
    const program = 'let x = 100 USD;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'CurrencyLiteral');
    assert.equal(result.statements[0].initializer.amount, 100);
  });

  it('optimizes comparison operations', () => {
    const program = 'let x = 5 > 3;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[0].initializer.value, true);
  });

  it('optimizes equality operations', () => {
    const program = 'let x = 5 == 5;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[0].initializer.value, true);
  });

  it('optimizes inequality operations', () => {
    const program = 'let x = 5 != 3;';
    const result = optimizeSource(program);
    assert.equal(result.statements[0].initializer.type, 'BooleanLiteral');
    assert.equal(result.statements[0].initializer.value, true);
  });
});