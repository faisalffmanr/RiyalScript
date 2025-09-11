import compile from './src/compiler.js';
import { marketFunctions } from './src/market.js';

console.log(" RiyalScript Final Market Analysis Showcase\n");

// Test all market functions
const marketExamples = [
  {
    name: "Get Current Stock Price",
    code: 'let price = market.getStockPrice("AAPL")',
    description: "Fetch real-time stock price"
  },
  {
    name: "Get Opening Stock Price", 
    code: 'let openPrice = market.getOpenPrice("AAPL")',
    description: "Get today's opening price"
  },
  {
    name: "Get High Price",
    code: 'let highPrice = market.getHighPrice("AAPL")',
    description: "Get today's highest price"
  },
  {
    name: "Get Low Price",
    code: 'let lowPrice = market.getLowPrice("AAPL")',
    description: "Get today's lowest price"
  },
  {
    name: "Check 52-Week High",
    code: 'let isHigh = market.isAllTimeHigh("AAPL")',
    description: "Check if stock is at 52-week high"
  },
  {
    name: "Get 52-Week High Value",
    code: 'let week52High = market.get52WeekHigh("AAPL")',
    description: "Get the 52-week high value"
  },
  {
    name: "Risk Assessment",
    code: 'let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"',
    description: "Assess risk based on 52-week high"
  },
  {
    name: "Portfolio Array",
    code: 'let portfolio = ["AAPL", "GOOGL", "MSFT", "TSLA"]',
    description: "Create portfolio of stocks"
  }
];

console.log(" RiyalScript Market Functions Demo:\n");

marketExamples.forEach((example, index) => {
  console.log(`${index + 1}. ${example.name}`);
  console.log(`   Description: ${example.description}`);
  console.log(`   Code: ${example.code}`);
  console.log(`   Generated JS: ${compile(example.code, 'js')}`);
  console.log();
});

// Real market data demonstration
console.log("🌍 Real Market Data Demonstration\n");

async function demonstrateRealMarketData() {
  try {
    console.log(" Fetching live market data:\n");
    
    // Test with a few popular stocks
    const testStocks = ["MSFT", "GOOGL", "AAPL"];
    
    for (const symbol of testStocks) {
      console.log(`🔍 Analyzing ${symbol}...`);
      
      try {
        // Get basic stock info
        const stockInfo = await marketFunctions.getStockInfo(symbol);
        
        if (stockInfo) {
          console.log(`   Current Price: $${stockInfo.price}`);
          console.log(`   Opening Price: $${stockInfo.open}`);
          console.log(`   High Price: $${stockInfo.high}`);
          console.log(`   Low Price: $${stockInfo.low}`);
          console.log(`   Change: $${stockInfo.change} (${stockInfo.changePercent}%)`);
          console.log(`   Volume: ${stockInfo.volume.toLocaleString()}`);
          
          // Check 52-week high
          const week52Data = await marketFunctions.get52WeekHigh(symbol);
          if (week52Data) {
            console.log(`   52-Week High: $${week52Data.week52High}`);
            console.log(`   52-Week Low: $${week52Data.week52Low}`);
            console.log(`   At 52-Week High: ${week52Data.isAt52WeekHigh ? "🚀 YES!" : "No"}`);
            
            if (week52Data.isAt52WeekHigh) {
              console.log(`    ALERT: ${symbol} is at/near 52-week high!`);
            }
          }
          
          // Check if at all-time high
          const isAllTimeHigh = await marketFunctions.isAllTimeHigh(symbol);
          console.log(`   All-Time High: ${isAllTimeHigh ? "🚀 YES!" : "No"}`);
          
        } else {
          console.log(`   noooo! No data available for ${symbol}`);
        }
        
      } catch (error) {
        console.log(`   nooo! Error fetching data for ${symbol}: ${error.message}`);
      }
      
      console.log();
    }
    
    // Portfolio scan
    console.log(" Portfolio Scan Results:");
    const portfolioResults = await marketFunctions.scanStocks(testStocks);
    
    if (portfolioResults.length > 0) {
      portfolioResults.forEach((stock, index) => {
        console.log(`\n${index + 1}. ${stock.symbol}:`);
        console.log(`   Current: $${stock.currentPrice}`);
        console.log(`   52-Week High: $${stock.week52High}`);
        console.log(`   At High: ${stock.isAllTimeHigh ? "🚀 YES!" : "No"}`);
        console.log(`   Alert: ${stock.alert}`);
      });
      
      // Find stocks at 52-week high
      const stocksAtHigh = portfolioResults.filter(stock => stock.isAllTimeHigh);
      console.log(`\n Stocks at 52-Week High: ${stocksAtHigh.length}`);
      stocksAtHigh.forEach(stock => {
        console.log(`    ${stock.symbol}: $${stock.currentPrice}`);
      });
    }
    
  } catch (error) {
    console.log("noooo! Error in market data demonstration:", error.message);
    console.log(" Note: This requires a valid Alpha Vantage API key");
    console.log("   Set ALPHA_VANTAGE_API_KEY environment variable");
    console.log("   Get free API key at: https://www.alphavantage.co/support/#api-key");
  }
}
//next level is link it for fintel.com, and tradingview.com so it's synced to real trading data
// Run the demonstration
demonstrateRealMarketData();

console.log("\n🎯 This RiyalScript Market Analysis is good for:");
console.log(" Real-time stock price fetching");
console.log(" Opening, high, low price tracking");
console.log(" 52-week high/low analysis");
console.log(" All-time high detection");
console.log(" Portfolio scanning and monitoring");
console.log(" Market alerts and notifications");
console.log(" Built-in financial analysis functions");
console.log(" Perfect for tracking stocks above 52-week high!");

console.log("\n💡 Complete Usage Examples:");
console.log("let price = market.getStockPrice(\"AAPL\")");
console.log("let openPrice = market.getOpenPrice(\"AAPL\")");
console.log("let highPrice = market.getHighPrice(\"AAPL\")");
console.log("let lowPrice = market.getLowPrice(\"AAPL\")");
console.log("let isHigh = market.isAllTimeHigh(\"GOOGL\")");
console.log("let week52 = market.get52WeekHigh(\"MSFT\")");
console.log("let risk = if market.isAllTimeHigh(\"AAPL\") then \"High Risk\" else \"Normal\"");
console.log("let portfolio = [\"AAPL\", \"GOOGL\", \"MSFT\", \"TSLA\"]");

console.log("\n🚀RiyalScript + Real-Time Market Data = Ultimate Financial Analysis!");
console.log(" Perfect for tracking stocks that move above their 52-week high!");
console.log(" Built for real-world financial applications!");
