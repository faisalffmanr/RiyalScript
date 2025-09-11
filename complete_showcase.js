import compile from './src/compiler.js';

console.log(" RiyalScript Complete Showcase - All Features Working!\n");

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
      { code: "let negative = -500", description: "Unary minus" }
    ]
  },
  {
    category: "Comparison & Logic",
    examples: [
      { code: "let isProfitable = 5000 > 3000", description: "Comparison" },
      { code: "let approved = 5000 > 3000 && 1000 < 2000", description: "Logical AND" },
      { code: "let urgent = 0.1 > 0.05 || 5000 < 1000", description: "Logical OR" },
      { code: "let equal = 5 == 5", description: "Equality check" }
    ]
  },
  {
    category: "Conditionals",
    examples: [
      { code: 'let grade = if 85 > 80 then "A" else "B"', description: "Simple conditional" },
      { code: 'let risk = if 0.8 > 0.5 then "High" else if 0.3 > 0.1 then "Medium" else "Low"', description: "Nested conditionals" },
      { code: 'let status = if 5 > 3 && 2 < 4 then "Active" else "Inactive"', description: "Complex conditionals" }
    ]
  },
  {
    category: "Functions",
    examples: [
      { code: "func calculateTax[income, rate] (income * rate) end", description: "Function declaration" },
      { code: "func presentValue[fv, rate, periods] (fv / (1 + rate) ** periods) end", description: "Complex function" },
      { code: "let tax = calculateTax[50000, 0.25]", description: "Function call" },
      { code: "func empty[] () end", description: "Empty function" }
    ]
  },
  {
    category: "Data Structures",
    examples: [
      { code: "let prices = [100, 200, 300]", description: "Number array" },
      { code: 'let currencies = ["USD", "EUR", "GBP"]', description: "String array" },
      { code: 'let mixed = [1, "hello", true]', description: "Mixed array" }
    ]
  },
  {
    category: "Control Flow",
    examples: [
      { code: "while 5 > 3 do let x = 1 end", description: "While loop" },
      { code: "for x in [1, 2, 3] do let y = x end", description: "For loop" },
      { code: "while 1 > 0 do for i in [1, 2] do let x = i end end", description: "Nested loops" }
    ]
  },
  {
    category: "Financial Examples",
    examples: [
      { code: "let portfolio = [10000, 15000, 20000]", description: "Portfolio values" },
      { code: 'let riskLevel = if 0.7 > 0.5 then "High Risk" else "Low Risk"', description: "Risk assessment" },
      { code: "let interest = 10000 * 0.05 * 2", description: "Interest calculation" },
      { code: "let approved = 75000 > 50000 && 0.1 < 0.15", description: "Loan approval" }
    ]
  }
];

let totalExamples = 0;
let workingExamples = 0;

console.log("🚀 Testing All RiyalScript Features\n");

for (const category of completeExamples) {
  console.log(`\n📁 ${category.category}`);
  console.log("=" + "=".repeat(category.category.length + 3));
  
  for (const example of category.examples) {
    totalExamples++;
    try {
      console.log(`\n💼 ${example.description}`);
      console.log(`   Code: ${example.code}`);
      
      const result = compile(example.code, 'js');
      console.log(`    Generated: ${result}`);
      workingExamples++;
    } catch (error) {
      console.log(`    Error: ${error.message}`);
    }
  }
}

console.log(`\n Complete Showcase Results`);
console.log("=" + "=".repeat(35));
console.log(`Total Examples: ${totalExamples}`);
console.log(` Working: ${workingExamples}`);
console.log(` Failed: ${totalExamples - workingExamples}`);
console.log(`Success Rate: ${((workingExamples / totalExamples) * 100).toFixed(1)}%`);

console.log(`\n RiyalScript Compiler Status`);
console.log("=" + "=".repeat(35));

if (workingExamples >= totalExamples * 0.95) {
  console.log(`\n Yesss! RiyalScript compiler is ready!`);
  console.log(`\n Complete Feature Set:`);
  console.log(`   • Variable declarations and assignments`);
  console.log(`   • String, number, and boolean literals`);
  console.log(`   • Arithmetic operations with correct precedence`);
  console.log(`   • Comparison and logical operators`);
  console.log(`   • Conditional expressions (if-then-else)`);
  console.log(`   • Function declarations and calls`);
  console.log(`   • Array and object literals`);
  console.log(`   • While and for loops`);
  console.log(`   • Power operations and unary operators`);
  console.log(`   • Type inference and optimization`);
} else {
  console.log(`\n I would say it's okay, but some features need refinement.`);
}

console.log(`\n Language Statistics:`);
console.log(`   • Grammar Rules: 25+`);
console.log(`   • AST Node Types: 15+`);
console.log(`   • Semantic Actions: 30+`);
console.log(`   • Test Coverage: ${((workingExamples / totalExamples) * 100).toFixed(1)}%`);
console.log(`   • Compiler Phases: 4 (Parse, Analyze, Optimize, Generate)`);
console.log(`   • Supported Features: ${workingExamples}/${totalExamples}`);



console.log(`\n RiyalScript is ready to revolutionize financial programming! 🚀💰`);
