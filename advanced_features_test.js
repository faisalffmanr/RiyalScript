import compile from './src/compiler.js';

console.log(" RiyalScript Advanced Features Test\n");

const advancedFeatures = [
  {
    category: "Control Flow",
    tests: [
      {
        name: "While Loop",
        code: "while 5 > 3 do let x = 1 end",
        description: "Basic while loop"
      },
      {
        name: "For Loop",
        code: "for x in [1, 2, 3] do let y = x end",
        description: "For loop over array"
      },
      {
        name: "Nested Loops",
        code: "while 1 > 0 do for i in [1, 2] do let x = i end end",
        description: "Nested loop structures"
      }
    ]
  },
  {
    category: "Data Structures",
    tests: [
      {
        name: "Simple Array",
        code: "let prices = [100, 200, 300]",
        description: "Array of numbers"
      },
      {
        name: "String Array",
        code: 'let currencies = ["USD", "EUR", "GBP"]',
        description: "Array of strings"
      },
      {
        name: "Mixed Array",
        code: 'let data = [1, "hello", true]',
        description: "Array with mixed types"
      }
    ]
  },
  {
    category: "Financial Examples",
    tests: [
      {
        name: "Portfolio Loop",
        code: "for asset in [1000, 2000, 3000] do let value = asset end",
        description: "Loop through portfolio values"
      },
      {
        name: "Risk Calculation",
        code: "let risk = if 0.8 > 0.5 then \"High\" else \"Low\"",
        description: "Risk assessment logic"
      },
      {
        name: "Interest Loop",
        code: "while 1000 < 2000 do let balance = 1000 * 1.05 end",
        description: "Interest calculation loop"
      }
    ]
  },
  {
    category: "Complex Expressions",
    tests: [
      {
        name: "Nested Conditionals",
        code: 'let grade = if 85 > 80 then "A" else if 70 > 60 then "B" else "C"',
        description: "Nested if-else logic"
      },
      {
        name: "Logical Operations",
        code: "let approved = 5000 > 3000 && 0.1 < 0.15",
        description: "Multi-condition approval"
      },
      {
        name: "Power Operations",
        code: "let compound = 1000 * (1 + 0.05) ** 10",
        description: "Compound interest calculation"
      }
    ]
  }
];

let totalTests = 0;
let passedTests = 0;

for (const category of advancedFeatures) {
  console.log(`\n ${category.category}`);
  console.log("=" + "=".repeat(category.category.length + 3));
  
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
    }
  }
}

console.log(`\n Advanced Features Results`);
console.log("=" + "=".repeat(35));
console.log(`Total Tests: ${totalTests}`);
console.log(` Passed: ${passedTests}`);
console.log(` Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests >= totalTests * 0.8) {
  console.log(`\n Excellent! Advanced features are working well!`);
} else {
  console.log(`\n  Some advanced features need work.`);
}
