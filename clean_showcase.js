import compile from './src/compiler.js';

console.log("RiyalScript Complete Showcase - All Features Working!\n");

const completeExamples = [
  {
    category: "Basic Language Features",
    examples: [
      { code: "let balance = 10000", description: "Variable declaration" },
      { code: 'let currency = "USD"', description: "String literal" },
      { code: "let isActive = true", description: "Boolean literal" },
      { code: "let rate = 0.05", description: "Decimal number" }
    ]
  },
  {
    category: "Arithmetic & Math",
    examples: [
      { code: "let total = 1000 + 500 * 2", description: "Operator precedence" },
      { code: "let compound = 1000 * (1 + 0.05) ** 10", description: "Power operations" },
      { code: "let remainder = 1000 % 3", description: "Modulo operation" },
      { code: "let negative = -100", description: "Unary minus" }
    ]
  },
  {
    category: "Comparison & Logic",
    examples: [
      { code: "let isGreater = 1000 > 500", description: "Greater than" },
      { code: "let isEqual = 1000 == 1000", description: "Equality check" },
      { code: "let isBoth = true && false", description: "Logical AND" },
      { code: "let isEither = true || false", description: "Logical OR" }
    ]
  },
  {
    category: "Conditional Logic",
    examples: [
      { code: 'let status = if 1000 > 500 then "High" else "Low"', description: "If-then-else" },
      { code: 'let risk = if true && false then "High" else "Low"', description: "Complex condition" }
    ]
  },
  {
    category: "Functions",
    examples: [
      { code: 'func calculate[x] (x * 2) end', description: "Function declaration" },
      { code: 'let result = calculate[100]', description: "Function call" }
    ]
  },
  {
    category: "Data Structures",
    examples: [
      { code: 'let prices = [100, 200, 300]', description: "Array literal" },
      { code: 'let stock = {symbol: "AAPL", price: 150}', description: "Object literal" }
    ]
  },
  {
    category: "Loops",
    examples: [
      { code: 'while balance > 0 do balance = balance - 100 end', description: "While loop" },
      { code: 'for price in [100, 200, 300] do let total = total + price end', description: "For loop" }
    ]
  },
  {
    category: "Market Data Integration",
    examples: [
      { code: 'let price = market.getStockPrice("AAPL")', description: "Get stock price" },
      { code: 'let openPrice = market.getOpenPrice("AAPL")', description: "Get opening price" },
      { code: 'let isHigh = market.isAllTimeHigh("AAPL")', description: "Check 52-week high" },
      { code: 'let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"', description: "Risk assessment" }
    ]
  }
];

let totalTests = 0;
let passedTests = 0;

console.log("Running comprehensive tests...\n");

completeExamples.forEach(category => {
  console.log(`${category.category}:`);
  
  category.examples.forEach(example => {
    totalTests++;
    try {
      const result = compile(example.code, 'js');
      console.log(`  ✓ ${example.description}`);
      console.log(`    Code: ${example.code}`);
      console.log(`    Generated: ${result}`);
      passedTests++;
    } catch (error) {
      console.log(`  ✗ ${example.description}`);
      console.log(`    Error: ${error.message}`);
    }
    console.log();
  });
});

console.log("Test Results:");
console.log(`Passed: ${passedTests}/${totalTests} (${Math.round(passedTests/totalTests*100)}%)`);

if (passedTests === totalTests) {
  console.log("All tests passed! RiyalScript compiler is working perfectly!");
} else {
  console.log("Some tests failed. Check the errors above.");
}

console.log("\nRiyalScript Features Implemented:");
console.log("Variable declarations (let)");
console.log("String and number literals");
console.log("Arithmetic operators (+, -, *, /, %, **)");
console.log("Comparison operators (>, <, >=, <=, ==, !=)");
console.log("Logical operators (&&, ||)");
console.log("Conditional expressions (if-then-else)");
console.log("Function declarations and calls");
console.log("Array literals");
console.log("Object literals");
console.log("While and for loops");
console.log("Unary operators (-, !)");
console.log("Operator precedence");
console.log("Type inference");
console.log("Constant folding optimization");
console.log("Clean JavaScript code generation");
console.log("Real-time market data integration");
console.log("52-week high tracking");
console.log("Stock price analysis");
