import compile from './src/compiler.js';
import { marketFunctions } from './src/market.js';

console.log("RiyalScript Market Analysis - Clean Version\n");

// Test market functions
const marketExamples = [
  {
    name: "Get Current Stock Price",
    code: 'let price = market.getStockPrice("AAPL")'
  },
  {
    name: "Get Opening Stock Price", 
    code: 'let openPrice = market.getOpenPrice("AAPL")'
  },
  {
    name: "Get High Price",
    code: 'let highPrice = market.getHighPrice("AAPL")'
  },
  {
    name: "Get Low Price",
    code: 'let lowPrice = market.getLowPrice("AAPL")'
  },
  {
    name: "Check 52-Week High",
    code: 'let isHigh = market.isAllTimeHigh("AAPL")'
  },
  {
    name: "Risk Assessment",
    code: 'let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"'
  }
];

console.log("RiyalScript Market Functions Demo:\n");

marketExamples.forEach((example, index) => {
  console.log(`${index + 1}. ${example.name}`);
  console.log(`   Code: ${example.code}`);
  console.log(`   Generated JS: ${compile(example.code, 'js')}`);
  console.log();
});

// Real market data demonstration
console.log("Real Market Data Demonstration\n");

async function demonstrateRealMarketData() {
  try {
    console.log("Fetching live market data...\n");
    
    // Test with MSFT (known to work)
    const symbol = "MSFT";
    console.log(`Analyzing ${symbol}...`);
    
    const stockInfo = await marketFunctions.getStockInfo(symbol);
    
    if (stockInfo) {
      console.log(`Current Price: $${stockInfo.price}`);
      console.log(`Opening Price: $${stockInfo.open}`);
      console.log(`High Price: $${stockInfo.high}`);
      console.log(`Low Price: $${stockInfo.low}`);
      console.log(`Change: $${stockInfo.change} (${stockInfo.changePercent}%)`);
      console.log(`Volume: ${stockInfo.volume.toLocaleString()}`);
      
      // Check 52-week high
      const week52Data = await marketFunctions.get52WeekHigh(symbol);
      if (week52Data) {
        console.log(`52-Week High: $${week52Data.week52High}`);
        console.log(`52-Week Low: $${week52Data.week52Low}`);
        console.log(`At 52-Week High: ${week52Data.isAt52WeekHigh ? "YES!" : "No"}`);
      }
      
      // Check if at all-time high
      const isAllTimeHigh = await marketFunctions.isAllTimeHigh(symbol);
      console.log(`All-Time High: ${isAllTimeHigh ? "YES!" : "No"}`);
      
    } else {
      console.log(`No data available for ${symbol}`);
    }
    
  } catch (error) {
    console.log("Error in market data demonstration:", error.message);
    console.log("Note: This requires a valid Alpha Vantage API key");
    console.log("Set ALPHA_VANTAGE_API_KEY environment variable");
    console.log("Get free API key at: https://www.alphavantage.co/support/#api-key");
  }
}

// Run the demonstration
demonstrateRealMarketData();

console.log("\nRiyalScript Market Analysis Features:");
console.log("Real-time stock price fetching");
console.log("Opening, high, low price tracking");
console.log("52-week high/low analysis");
console.log("All-time high detection");
console.log("Portfolio scanning and monitoring");
console.log("Market alerts and notifications");
console.log("Built-in financial analysis functions");
console.log("Perfect for tracking stocks above 52-week high!");

console.log("\nUsage Examples:");
console.log("let price = market.getStockPrice(\"AAPL\")");
console.log("let openPrice = market.getOpenPrice(\"AAPL\")");
console.log("let highPrice = market.getHighPrice(\"AAPL\")");
console.log("let lowPrice = market.getLowPrice(\"AAPL\")");
console.log("let isHigh = market.isAllTimeHigh(\"GOOGL\")");
console.log("let week52 = market.get52WeekHigh(\"MSFT\")");
console.log("let risk = if market.isAllTimeHigh(\"AAPL\") then \"High Risk\" else \"Normal\"");
