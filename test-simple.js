import { compile } from './src/compiler.js';

console.log('Testing basic compilation...');

// Test 1: Simple variable declaration
console.log('\n1. Testing simple variable declaration:');
try {
  const result1 = compile('let x = 42;');
  console.log('✓ Success:', result1.success);
  if (result1.success) {
    console.log('Generated JS contains "let x = 42":', result1.result.includes('let x = 42'));
    console.log('Last 50 chars:', result1.result.substring(result1.result.length - 50));
  } else {
    console.log('Error:', result1.error);
  }
} catch (error) {
  console.log('✗ Error:', error.message);
}

// Test 2: Expression
console.log('\n2. Testing expression:');
try {
  const result2 = compile('let y = 10 + 5;');
  console.log('✓ Success:', result2.success);
  if (result2.success) {
    console.log('Generated JS contains "let y = 15":', result2.result.includes('let y = 15'));
  } else {
    console.log('Error:', result2.error);
  }
} catch (error) {
  console.log('✗ Error:', error.message);
}

// Test 3: Runtime library inclusion
console.log('\n3. Testing runtime library inclusion:');
try {
  const result3 = compile('let z = 1;');
  console.log('✓ Success:', result3.success);
  if (result3.success) {
    console.log('Contains Currency class:', result3.result.includes('class Currency'));
    console.log('Contains Decimal class:', result3.result.includes('class Decimal'));
    console.log('Contains InterestRate class:', result3.result.includes('class InterestRate'));
  } else {
    console.log('Error:', result3.error);
  }
} catch (error) {
  console.log('✗ Error:', error.message);
}

console.log('\nBasic tests completed!');
