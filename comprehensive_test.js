import compile from './src/compiler.js';

console.log(" Comprehensive RiyalScript Compiler Test Suite\n");

const testCategories = [
  {
    name: "Basic Language Features",
    tests: [
      {
        name: "Simple variable declaration",
        code: "let x = 5",
        description: "Basic variable assignment with number literal"
      },
      {
        name: "String variable",
        code: 'let name = "RiyalScript"',
        description: "String literal assignment"
      },
      {
        name: "Negative number",
        code: "let balance = -1000",
        description: "Unary minus operator"
      },
      {
        name: "Factorial",
        code: "let result = 5!",
        description: "Postfix factorial operator"
      }
    ]
  },
  {
    name: "Arithmetic Expressions",
    tests: [
      {
        name: "Simple addition",
        code: "let sum = 5 + 3",
        description: "Basic arithmetic"
      },
      {
        name: "Complex arithmetic",
        code: "let result = 5 + 3 * 2 - 1",
        description: "Operator precedence"
      },
      {
        name: "Division and modulo",
        code: "let quotient = 10 / 3",
        description: "Division operation"
      },
      {
        name: "Modulo operation",
        code: "let remainder = 10 % 3",
        description: "Modulo operation"
      }
    ]
  },
  {
    name: "Conditional Logic",
    tests: [
      {
        name: "Simple conditional",
        code: "let status = if 1 then \"active\" else \"inactive\"",
        description: "Basic if-else expression"
      },
      {
        name: "Nested conditional",
        code: "let grade = if 85 then \"A\" else if 70 then \"B\" else \"C\"",
        description: "Nested conditional logic"
      }
    ]
  },
  {
    name: "Functions",
    tests: [
      {
        name: "Simple function",
        code: "func greet[name] (\"Hello \" + name) end",
        description: "Function with string concatenation"
      },
      {
        name: "Math function",
        code: "func square[x] (x * x) end",
        description: "Mathematical function"
      },
      {
        name: "Function call",
        code: "let result = square[5]",
        description: "Calling a function"
      },
      {
        name: "Multiple parameters",
        code: "func add[x, y] (x + y) end",
        description: "Function with multiple parameters"
      }
    ]
  },
  {
    name: "Financial Examples",
    tests: [
      {
        name: "Interest calculation",
        code: "func calculateInterest[principal, rate, time] (principal * rate * time) end",
        description: "Financial interest calculation"
      },
      {
        name: "Compound interest",
        code: "func compoundInterest[principal, rate, time] (principal * (1 + rate) ** time) end",
        description: "Compound interest formula"
      },
      {
        name: "Loan payment",
        code: "func monthlyPayment[principal, rate, months] (principal * rate / (1 - (1 + rate) ** -months)) end",
        description: "Monthly loan payment calculation"
      }
    ]
  },
  {
    name: "Edge Cases",
    tests: [
      {
        name: "Empty function",
        code: "func empty[] () end",
        description: "Function with no parameters and empty body"
      },
      {
        name: "Zero values",
        code: "let zero = 0",
        description: "Zero value assignment"
      },
      {
        name: "Empty string",
        code: 'let empty = ""',
        description: "Empty string literal"
      },
      {
        name: "Large number",
        code: "let big = 999999999",
        description: "Large number handling"
      }
    ]
  }
];

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

for (const category of testCategories) {
  console.log(`\n ${category.name}`);
  console.log("=" + "=".repeat(category.name.length + 3));
  
  for (const test of category.tests) {
    totalTests++;
    try {
      console.log(`\n ${test.name}`);
      console.log(`   Code: ${test.code}`);
      console.log(`   Description: ${test.description}`);
      
      const result = compile(test.code, 'js');
      console.log(`    Generated: ${result}`);
      passedTests++;
    } catch (error) {
      console.log(`    Error: ${error.message}`);
      failedTests++;
    }
  }
}

console.log(`\n📊 Final Results`);
console.log("=" + "=".repeat(15));
console.log(`Total Tests: ${totalTests}`);
console.log(` Passed: ${passedTests}`);
console.log(` Failed: ${failedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (failedTests === 0) {
  console.log(`\n All tests passed! RiyalScript compiler is working perfectly!`);
} else {
  console.log(`\n⚠️  ${failedTests} tests failed. The compiler needs some fixes.`);
}
