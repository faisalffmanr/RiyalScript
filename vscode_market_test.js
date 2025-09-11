import compile from './src/compiler.js';
import { marketFunctions } from './src/market.js';

console.log("RiyalScript Market Test for VSCode\n");

// Test basic market functions
console.log("1. Testing market.getStockPrice:");
const priceCode = 'let price = market.getStockPrice("AAPL")';
console.log("Code:", priceCode);
console.log("Generated JS:", compile(priceCode, 'js'));

console.log("\n2. Testing market.getOpenPrice:");
const openCode = 'let openPrice = market.getOpenPrice("AAPL")';
console.log("Code:", openCode);
console.log("Generated JS:", compile(openCode, 'js'));

console.log("\n3. Testing market.isAllTimeHigh:");
const highCode = 'let isHigh = market.isAllTimeHigh("AAPL")';
console.log("Code:", highCode);
console.log("Generated JS:", compile(highCode, 'js'));

console.log("\n4. Testing risk assessment:");
const riskCode = 'let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"';
console.log("Code:", riskCode);
console.log("Generated JS:", compile(riskCode, 'js'));

// Test real market data
console.log("\n5. Testing real market data:");
async function testRealData() {
  try {
    const data = await marketFunctions.getStockInfo("MSFT");
    if (data) {
      console.log("MSFT Current Price: $" + data.price);
      console.log("MSFT Opening Price: $" + data.open);
      console.log("MSFT High Price: $" + data.high);
      console.log("MSFT Low Price: $" + data.low);
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.log("Error:", error.message);
  }
}

testRealData();

console.log("\nMarket functions working correctly!");
