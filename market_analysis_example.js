import compile from './src/compiler.js';
import { marketFunctions } from './src/market.js';

console.log("🚀 RiyalScript Market Analysis - Real-Time Stock Tracking\n");

// Example 1: Check if a single stock is at 52-week high
console.log("📊 Example 1: Single Stock Analysis");
console.log("Code: let price = market.getStockPrice(\"AAPL\")");
console.log("Generated JS:", compile('let price = market.getStockPrice("AAPL")', 'js'));

// Example 2: Check 52-week high for multiple stocks
console.log("\n📈 Example 2: Portfolio Analysis");
console.log("Code: let portfolio = [\"AAPL\", \"GOOGL\", \"MSFT\", \"TSLA\"]");
console.log("Generated JS:", compile('let portfolio = ["AAPL", "GOOGL", "MSFT", "TSLA"]', 'js'));

// Example 3: Risk assessment with market data
console.log("\n⚠️ Example 3: Risk Assessment");
console.log("Code: let risk = if market.isAllTimeHigh(\"AAPL\") then \"High Risk\" else \"Normal\"");
console.log("Generated JS:", compile('let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"', 'js'));

// Real market data demonstration
console.log("\n🌍 Real Market Data Demo");
console.log("Fetching live data for AAPL...\n");

async function demonstrateMarketData() {
  try {
    // Get current stock price
    const price = await marketFunctions.getStockPrice("AAPL");
    console.log(`📊 AAPL Current Price: $${price}`);
    
    // Check 52-week high
    const week52Data = await marketFunctions.get52WeekHigh("AAPL");
    console.log(`📈 AAPL 52-Week High: $${week52Data.week52High}`);
    console.log(`📉 AAPL 52-Week Low: $${week52Data.week52Low}`);
    
    // Check if at all-time high
    const allTimeHigh = await marketFunctions.isAllTimeHigh("AAPL");
    console.log(`🚀 AAPL at 52-week high: ${allTimeHigh ? "YES!" : "No"}`);
    
    // Scan multiple stocks
    console.log("\n🔍 Scanning Multiple Stocks...");
    const results = await marketFunctions.scanStocks(["AAPL", "GOOGL", "MSFT", "TSLA"]);
    
    results.forEach(stock => {
      console.log(`\n${stock.symbol}:`);
      console.log(`  Current: $${stock.currentPrice}`);
      console.log(`  52-Week High: $${stock.week52High}`);
      console.log(`  At High: ${stock.isAllTimeHigh ? "🚀 YES!" : "No"}`);
      console.log(`  Alert: ${stock.alert}`);
    });
    
  } catch (error) {
    console.log("❌ Error fetching market data:", error.message);
    console.log("💡 Note: This requires a valid Alpha Vantage API key");
    console.log("   Set ALPHA_VANTAGE_API_KEY environment variable");
  }
}

// Run the demonstration
demonstrateMarketData();

console.log("\n🎯 RiyalScript Market Features:");
console.log("✅ Real-time stock price fetching");
console.log("✅ 52-week high/low tracking");
console.log("✅ All-time high detection");
console.log("✅ Portfolio scanning");
console.log("✅ Market alerts and notifications");
console.log("✅ Built-in financial analysis functions");

console.log("\n💡 Usage Examples:");
console.log("let price = market.getStockPrice(\"AAPL\")");
console.log("let isHigh = market.isAllTimeHigh(\"GOOGL\")");
console.log("let week52 = market.get52WeekHigh(\"MSFT\")");
console.log("let scan = market.scanStocks([\"AAPL\", \"GOOGL\", \"MSFT\"])");

console.log("\n🚀 RiyalScript + Market Data = Powerful Financial Analysis!");
