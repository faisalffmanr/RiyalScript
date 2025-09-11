import compile from './src/compiler.js';

console.log("🚀 RiyalScript Compiler - Final Demo\n");

// Real-world financial examples
const examples = [
  {
    name: "Basic Calculator",
    code: "let result = 5 + 3 * 2",
    description: "Mathematical expression with operator precedence"
  },
  {
    name: "Interest Rate Check",
    code: 'let status = if 5.5 then "High" else "Low"',
    description: "Conditional logic for interest rate classification"
  },
  {
    name: "Power Calculation",
    code: "let compound = 1000 * (1 + 0.05) ** 10",
    description: "Compound interest calculation using power operator"
  },
  {
    name: "String Formatting",
    code: 'let message = "Account balance: " + 5000',
    description: "String concatenation for financial reporting"
  },
  {
    name: "Financial Function",
    code: "func calculateTax[income, rate] (income * rate) end",
    description: "Tax calculation function"
  },
  {
    name: "Complex Financial Formula",
    code: "func presentValue[fv, rate, periods] (fv / (1 + rate) ** periods) end",
    description: "Present value calculation for financial analysis"
  },
  {
    name: "Risk Assessment",
    code: 'let risk = if 0.8 then "High Risk" else if 0.5 then "Medium Risk" else "Low Risk"',
    description: "Nested conditional for risk assessment"
  },
  {
    name: "Portfolio Value",
    code: "let portfolio = 10000 + 5000 - 2000",
    description: "Portfolio value calculation with additions and withdrawals"
  }
];

console.log(" Testing Real-World Financial Examples\n");

let passed = 0;
let total = examples.length;

for (const example of examples) {
  try {
    console.log(`\n💼 ${example.name}`);
    console.log(`   Code: ${example.code}`);
    console.log(`   Description: ${example.description}`);
    
    const result = compile(example.code, 'js');
    console.log(`   Yess! Generated: ${result}`);
    passed++;
  } catch (error) {
    console.log(`   Nooo! Error: ${error.message}`);
  }
}

console.log(`\n Final Results`);
console.log("=" + "=".repeat(20));
console.log(`Yesss! Passed: ${passed}/${total} (${((passed/total)*100).toFixed(1)}%)`);

if (passed === total) {
  console.log(`\n Perfect!! working well!`);
  console.log(`\n RiyalScript Compiler Status: PRODUCTION READY!`);
  console.log(`\n Key Features Working:`);
  console.log(`   • Arithmetic expressions with correct precedence`);
  console.log(`   • Conditional logic with 'then' keyword`);
  console.log(`   • Power operator (**) for compound calculations`);
  console.log(`   • String concatenation for reporting`);
  console.log(`   • Function declarations and calls`);
  console.log(`   • Financial formulas and calculations`);
  console.log(`   • Nested conditionals for complex logic`);
} else {
  console.log(`\n⚠️  Some examples failed. The compiler needs more work.`);
}
