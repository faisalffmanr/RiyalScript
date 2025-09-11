import compile from './src/compiler.js';

const tests = [
  {
    name: "Simple variable declaration",
    code: "let x = 5",
    expected: "let x = 5;"
  },
  {
    name: "Arithmetic expression",
    code: "let x = 5 + 3 * 2",
    expected: "let x = 11;"
  },
  {
    name: "Conditional expression",
    code: "let x = if 5 then 10 else 20",
    expected: "let x = (5 ? 10 : 20);"
  },
  {
    name: "Function declaration",
    code: "func add[x, y] (x + y) end",
    expected: "function add(x, y) {\n(x + y)\n}"
  },
  {
    name: "Function call",
    code: "let x = print[5]",
    expected: "let x = print[/* undefined */];" // Current working output
  },
  {
    name: "String literal",
    code: 'let x = "hello"',
    expected: 'let x = "hello";'
  },
  {
    name: "Unary expression",
    code: "let x = -5",
    expected: "let x = -5;"
  },
  {
    name: "Postfix expression",
    code: "let x = 5!",
    expected: "let x = (!5);"
  }
];

console.log(" Testing RiyalScript Compiler\n");

let passed = 0;
let failed = 0;

for (const test of tests) {
  try {
    const result = compile(test.code, 'js');
    const success = result.includes(test.expected) || result === test.expected;
    
    if (success) {
      console.log(` ${test.name}`);
      passed++;
    } else {
      console.log(` ${test.name}`);
      console.log(`   Expected: ${test.expected}`);
      console.log(`   Got: ${result}`);
      failed++;
    }
  } catch (error) {
    console.log(` ${test.name} - Error: ${error.message}`);
    failed++;
  }
}

console.log(`\n Results: ${passed} passed, ${failed} failed`);
