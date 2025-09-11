import compile from './src/compiler.js';
import { marketFunctions } from './src/market.js';

console.log("🚀 RiyalScript Real-Time Market Analysis\n");

// Example 1: Basic market data fetching
console.log("📊 Example 1: Get Stock Price");
console.log("Code: let price = market.getStockPrice(\"AAPL\")");
console.log("Generated JS:", compile('let price = market.getStockPrice("AAPL")', 'js'));

// Example 2: Check 52-week high
console.log("\n📈 Example 2: Check 52-Week High");
console.log("Code: let isHigh = market.isAllTimeHigh(\"GOOGL\")");
console.log("Generated JS:", compile('let isHigh = market.isAllTimeHigh("GOOGL")', 'js'));

// Example 3: Risk assessment with market data
console.log("\n⚠️ Example 3: Risk Assessment");
console.log("Code: let risk = if market.isAllTimeHigh(\"AAPL\") then \"High Risk\" else \"Normal\"");
console.log("Generated JS:", compile('let risk = if market.isAllTimeHigh("AAPL") then "High Risk" else "Normal"', 'js'));

// Example 4: Get opening stock price
console.log("\n🌅 Example 4: Get Opening Stock Price");
console.log("Code: let openPrice = market.getOpenPrice(\"AAPL\")");
console.log("Generated JS:", compile('let openPrice = market.getOpenPrice("AAPL")', 'js'));

// Example 5: Get high and low prices
console.log("\n📈 Example 5: Get High and Low Prices");
console.log("Code: let highPrice = market.getHighPrice(\"AAPL\")");
console.log("Generated JS:", compile('let highPrice = market.getHighPrice("AAPL")', 'js'));
console.log("Code: let lowPrice = market.getLowPrice(\"AAPL\")");
console.log("Generated JS:", compile('let lowPrice = market.getLowPrice("AAPL")', 'js'));

// Example 6: Portfolio analysis
console.log("\n💼 Example 6: Portfolio Analysis");
console.log("Code: let portfolio = [\"AAPL\", \"GOOGL\", \"MSFT\", \"TSLA\"]");
console.log("Generated JS:", compile('let portfolio = ["AAPL", "GOOGL", "MSFT", "TSLA"]', 'js'));

// Real market data demonstration
console.log("\n🌍 Real Market Data Demo");
console.log("Fetching live data...\n");

async function demonstrateRealMarketData() {
  try {
    console.log("📊 Fetching AAPL data...");
    const aaplData = await marketFunctions.getStockInfo("AAPL");
    
    if (aaplData) {
      console.log(`\n🍎 AAPL Stock Information:`);
      console.log(`  Current Price: $${aaplData.price}`);
      console.log(`  Change: $${aaplData.change} (${aaplData.changePercent}%)`);
      console.log(`  Volume: ${aaplData.volume.toLocaleString()}`);
      console.log(`  High: $${aaplData.high}`);
      console.log(`  Low: $${aaplData.low}`);
      console.log(`  Open: $${aaplData.open}`);
      console.log(`  Previous Close: $${aaplData.previousClose}`);
      
      // Check 52-week high
      console.log(`\n📈 Checking 52-Week High...`);
      const week52Data = await marketFunctions.get52WeekHigh("AAPL");
      
      if (week52Data) {
        console.log(`  52-Week High: $${week52Data.week52High}`);
        console.log(`  52-Week Low: $${week52Data.week52Low}`);
        console.log(`  Current Price: $${week52Data.currentPrice}`);
        console.log(`  At 52-Week High: ${week52Data.isAt52WeekHigh ? "🚀 YES!" : "No"}`);
        console.log(`  Weeks Analyzed: ${week52Data.weeksAnalyzed}`);
      }
      
      // Check if at all-time high
      console.log(`\n🚀 Checking All-Time High...`);
      const allTimeHigh = await marketFunctions.isAllTimeHigh("AAPL");
      console.log(`  AAPL at 52-week high: ${allTimeHigh ? "🚀 YES!" : "No"}`);
      
    } else {
      console.log("❌ No data available for AAPL");
    }
    
    // Scan multiple stocks
    console.log(`\n🔍 Scanning Multiple Stocks...`);
    const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA"];
    const results = await marketFunctions.scanStocks(symbols);
    
    console.log(`\n📊 Portfolio Analysis Results:`);
    results.forEach((stock, index) => {
      console.log(`\n${index + 1}. ${stock.symbol}:`);
      console.log(`   Current Price: $${stock.currentPrice}`);
      console.log(`   52-Week High: $${stock.week52High}`);
      console.log(`   At High: ${stock.isAllTimeHigh ? "🚀 YES!" : "No"}`);
      console.log(`   Alert: ${stock.alert}`);
    });
    
    // Find stocks at 52-week high
    const stocksAtHigh = results.filter(stock => stock.isAllTimeHigh);
    console.log(`\n🎯 Stocks at 52-Week High: ${stocksAtHigh.length}`);
    stocksAtHigh.forEach(stock => {
      console.log(`   🚀 ${stock.symbol}: $${stock.currentPrice} (${stock.percentageFromHigh}% from high)`);
    });
    
  } catch (error) {
    console.log("❌ Error fetching market data:", error.message);
    console.log("💡 Note: This requires a valid Alpha Vantage API key");
    console.log("   Set ALPHA_VANTAGE_API_KEY environment variable");
    console.log("   Get free API key at: https://www.alphavantage.co/support/#api-key");
  }
}

// Run the demonstration
demonstrateRealMarketData();

console.log("\n🎯 RiyalScript Market Features:");
console.log("✅ Real-time stock price fetching");
console.log("✅ 52-week high/low tracking");
console.log("✅ All-time high detection");
console.log("✅ Portfolio scanning");
console.log("✅ Market alerts and notifications");
console.log("✅ Built-in financial analysis functions");

console.log("\n💡 Usage Examples:");
console.log("let price = market.getStockPrice(\"AAPL\")");
console.log("let openPrice = market.getOpenPrice(\"AAPL\")");
console.log("let highPrice = market.getHighPrice(\"AAPL\")");
console.log("let lowPrice = market.getLowPrice(\"AAPL\")");
console.log("let isHigh = market.isAllTimeHigh(\"GOOGL\")");
console.log("let week52 = market.get52WeekHigh(\"MSFT\")");
console.log("let scan = market.scanStocks([\"AAPL\", \"GOOGL\", \"MSFT\"])");

console.log("\n🚀 RiyalScript + Market Data = Powerful Financial Analysis!");
console.log("💰 Perfect for tracking stocks that move above their 52-week high!");
