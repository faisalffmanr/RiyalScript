import compile from './src/compiler.js';

console.log(" RiyalScript Compiler -  Showcase\n");

//  examples showing all working features
const showcaseExamples = [
  {
    category: "Basic Language Features",
    examples: [
      {
        name: "Variable Declarations",
        code: "let balance = 10000",
        description: "Financial account balance"
      },
      {
        name: "String Literals",
        code: 'let currency = "USD"',
        description: "Currency code"
      },
      {
        name: "Arithmetic Operations",
        code: "let total = 1000 + 500 * 2",
        description: "Complex financial calculation"
      },
      {
        name: "Power Operations",
        code: "let compound = 1000 * (1 + 0.05) ** 10",
        description: "Compound interest calculation"
      }
    ]
  },
  {
    category: "Comparison & Logic",
    examples: [
      {
        name: "Comparison Operators",
        code: "let isProfitable = 5000 > 3000",
        description: "Profitability check"
      },
      {
        name: "Logical AND",
        code: "let approved = 5000 > 3000 && 1000 < 2000",
        description: "Multi-condition approval"
      },
      {
        name: "Logical OR",
        code: "let urgent = 0.1 > 0.05 || 5000 < 1000",
        description: "Urgency assessment"
      },
      {
        name: "Complex Conditionals",
        code: 'let risk = if 0.8 > 0.5 then "High" else if 0.3 > 0.1 then "Medium" else "Low"',
        description: "Risk classification"
      }
    ]
  },
  {
    category: "Functions & Arrays",
    examples: [
      {
        name: "Financial Function",
        code: "func calculateTax[income, rate] (income * rate) end",
        description: "Tax calculation function"
      },
      {
        name: "Array of Prices",
        code: "let prices = [100, 200, 300, 400]",
        description: "Portfolio asset prices"
      },
      {
        name: "String Array",
        code: 'let currencies = ["USD", "EUR", "GBP"]',
        description: "Supported currencies"
      },
      {
        name: "Function Call",
        code: "let tax = calculateTax[50000, 0.25]",
        description: "Tax calculation call"
      }
    ]
  },
  {
    category: "Real-World Financial Examples",
    examples: [
      {
        name: "Portfolio Analysis",
        code: "let portfolio = [10000, 15000, 20000]",
        description: "Investment portfolio values"
      },
      {
        name: "Risk Assessment",
        code: 'let riskLevel = if 0.7 > 0.5 then "High Risk" else "Low Risk"',
        description: "Portfolio risk evaluation"
      },
      {
        name: "Interest Calculation",
        code: "let interest = 10000 * 0.05 * 2",
        description: "Simple interest calculation"
      },
      {
        name: "Approval Logic",
        code: "let approved = 75000 > 50000 && 0.1 < 0.15",
        description: "Loan approval criteria"
      }
    ]
  }
];

let totalExamples = 0;
let workingExamples = 0;

console.log("Finally! Testing All RiyalScript Features\n");

for (const category of showcaseExamples) {
  console.log(`\n ${category.category}`);
  console.log("=" + "=".repeat(category.category.length + 3));
  
  for (const example of category.examples) {
    totalExamples++;
    try {
      console.log(`\n ${example.name}`);
      console.log(`   Code: ${example.code}`);
      console.log(`   Description: ${example.description}`);
      
      const result = compile(example.code, 'js');
      console.log(`   YESS! Generated: ${result}`);
      workingExamples++;
    } catch (error) {
      console.log(`   Nooooo Error: ${error.message}`);
    }
  }
}

console.log(`\n Final Results`);
console.log("=" + "=".repeat(30));
console.log(`Total Examples: ${totalExamples}`);
console.log(`it's working: ${workingExamples}`);
console.log(`noooo it failed: ${totalExamples - workingExamples}`);
console.log(`Success Rate: ${((workingExamples / totalExamples) * 100).toFixed(1)}%`);

console.log(`\n RiyalScript  Summary`);
console.log("=" + "=".repeat(100));

if (workingExamples >= totalExamples * 0.9) {
  console.log(`\n EXCELLENT! RiyalScript is finally runnig!`);
  console.log(`\n What is done:`);
  console.log(`   • Completed the language implementation`);
  console.log(`   • I did an advanced financial calculations which serves as the purpose of riyalscript`);
  console.log(`   • some comparison and logical operators`);
  console.log(`   • Function declarations and calls`);
  console.log(`   • a very very complex conditional logic`);
  console.log(`   • Real-world financial examples, for example the real market data, or the calculator`);
} else {
  console.log(`\n  I would say it's okay, but some features need to be improved, and taken to the next level.`);
}

console.log(`\n The Features i've implemented so far:`);
console.log(`   •  Variable declarations (let)`);
console.log(`   •  String and number literals`);
console.log(`   •  Arithmetic operators (+, -, *, /, %, **)`);
console.log(`   •  Comparison operators (>, <, >=, <=, ==)`);
console.log(`   •  Logical operators (&&, ||)`);
console.log(`   •  Conditional expressions (if-then-else)`);
console.log(`   •  Function declarations and calls`);
console.log(`   •  Array literals`);
console.log(`   •  Unary operators (-, !)`);
console.log(`   •  Operator precedence`);
console.log(`   •  Type inference`);
console.log(`   •  Constant folding optimization`);

