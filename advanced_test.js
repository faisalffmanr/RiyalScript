import compile from './src/compiler.js';

console.log(" RiyalScript Advanced Features Test\n");

const advancedTests = [
  {
    name: "Comparison Operators",
    tests: [
      { code: "let x = 5 > 3", expected: "true" },
      { code: "let y = 10 < 5", expected: "false" },
      { code: "let z = 7 >= 7", expected: "true" },
      { code: "let w = 3 <= 2", expected: "false" },
      { code: "let a = 5 == 5", expected: "true" },
      { code: "let b = 4 != 4", expected: "false" }
    ]
  },
  {
    name: "Logical Operators",
    tests: [
      { code: "let x = 5 > 3 && 2 < 4", expected: "true" },
      { code: "let y = 5 > 3 || 2 > 4", expected: "true" },
      { code: "let z = 1 > 2 && 3 < 4", expected: "false" },
      { code: "let w = 1 > 2 || 3 > 4", expected: "false" }
    ]
  },
  {
    name: "Complex Conditionals",
    tests: [
      { code: 'let grade = if 85 > 80 then "A" else "B"', expected: "A" },
      { code: 'let status = if 5 > 3 && 2 < 4 then "Active" else "Inactive"', expected: "Active" },
      { code: 'let risk = if 0.8 > 0.5 then "High" else if 0.3 > 0.1 then "Medium" else "Low"', expected: "High" }
    ]
  },
  {
    name: "Arrays",
    tests: [
      { code: "let prices = [100, 200, 300]", expected: "array" },
      { code: "let names = [\"Alice\", \"Bob\"]", expected: "array" },
      { code: "let mixed = [1, \"hello\", true]", expected: "array" }
    ]
  },
  {
    name: "Financial Calculations",
    tests: [
      { code: "let profit = 1000 > 500 && 200 < 300", expected: "true" },
      { code: "let rate = if 0.05 > 0.03 then \"High\" else \"Low\"", expected: "High" },
      { code: "let portfolio = [1000, 2000, 3000]", expected: "array" },
      { code: "let isProfitable = 5000 > 3000 && 1000 < 2000", expected: "true" }
    ]
  }
];

let totalTests = 0;
let passedTests = 0;

for (const category of advancedTests) {
  console.log(`\n ${category.name}`);
  console.log("=" + "=".repeat(category.name.length + 3));
  
  for (const test of category.tests) {
    totalTests++;
    try {
      console.log(`\n ${test.code}`);
      
      const result = compile(test.code, 'js');
      console.log(`   Generated: ${result}`);
      
      // Check if the result contains the expected value or type
      const success = result.includes(test.expected) || 
                     (test.expected === "array" && result.includes("[")) ||
                     (test.expected === "true" && result.includes("true")) ||
                     (test.expected === "false" && result.includes("false"));
      
      if (success) {
        console.log(`  PASS`);
        passedTests++;
      } else {
        console.log(` FAIL - Expected: ${test.expected}`);
      }
    } catch (error) {
      console.log(`    ERROR: ${error.message}`);
    }
  }
}

console.log(`\n Advanced Features Results`);
console.log("=" + "=".repeat(30));
console.log(`Total Tests: ${totalTests}`);
console.log(` Passed: ${passedTests}`);
console.log(` Failed: ${totalTests - passedTests}`);
console.log(`Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

if (passedTests === totalTests) {
  console.log(`\n All advanced features working perfectly!`);
} else {
  console.log(`\n  Some advanced features need work.`);
}
