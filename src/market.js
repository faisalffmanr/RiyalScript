// Market Data Integration for RiyalScript
import https from 'https';
import http from 'http';

class MarketDataAPI {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 60000; // 1 minute cache
  }

  async fetchStockData(symbol) {
    const cacheKey = `stock_${symbol}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }

    try {
      // Using Alpha Vantage API (free tier)
      const data = await this.fetchFromAlphaVantage(symbol);
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      return data;
    } catch (error) {
      console.error(`Error fetching data for ${symbol}:`, error.message);
      return null;
    }
  }

  async fetchFromAlphaVantage(symbol) {
    return new Promise((resolve, reject) => {
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
      const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`;
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const quote = json['Global Quote'];
            
            if (!quote || quote['01. symbol'] === undefined) {
              reject(new Error(`No data found for symbol: ${symbol}`));
              return;
            }

            resolve({
              symbol: quote['01. symbol'],
              price: parseFloat(quote['05. price']),
              change: parseFloat(quote['09. change']),
              changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
              volume: parseInt(quote['06. volume']),
              high: parseFloat(quote['03. high']),
              low: parseFloat(quote['04. low']),
              open: parseFloat(quote['02. open']),
              previousClose: parseFloat(quote['08. previous close']),
              timestamp: new Date().toISOString()
            });
          } catch (error) {
            reject(new Error(`Failed to parse API response: ${error.message}`));
          }
        });
      }).on('error', reject);
    });
  }

  async fetch52WeekHigh(symbol) {
    try {
      // Using Alpha Vantage for 52-week data
      const data = await this.fetchFromAlphaVantageWeekly(symbol);
      return data;
    } catch (error) {
      console.error(`Error fetching 52-week data for ${symbol}:`, error.message);
      return null;
    }
  }

  async fetchFromAlphaVantageWeekly(symbol) {
    return new Promise((resolve, reject) => {
      const apiKey = process.env.ALPHA_VANTAGE_API_KEY || 'demo';
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${apiKey}`;
      
      https.get(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const json = JSON.parse(data);
            const timeSeries = json['Weekly Time Series'];
            
            if (!timeSeries) {
              reject(new Error(`No weekly data found for symbol: ${symbol}`));
              return;
            }

            const weeks = Object.keys(timeSeries).slice(0, 52); // Last 52 weeks
            const prices = weeks.map(week => parseFloat(timeSeries[week]['2. high']));
            const maxPrice = Math.max(...prices);
            const minPrice = Math.min(...prices);
            
            resolve({
              symbol,
              week52High: maxPrice,
              week52Low: minPrice,
              currentPrice: parseFloat(timeSeries[weeks[0]]['4. close']),
              isAt52WeekHigh: parseFloat(timeSeries[weeks[0]]['4. close']) >= maxPrice * 0.99, // 99% threshold
              weeksAnalyzed: weeks.length
            });
          } catch (error) {
            reject(new Error(`Failed to parse weekly data: ${error.message}`));
          }
        });
      }).on('error', reject);
    });
  }

  async checkAllTimeHigh(symbol) {
    const data = await this.fetch52WeekHigh(symbol);
    if (!data) return null;

    return {
      symbol,
      currentPrice: data.currentPrice,
      week52High: data.week52High,
      isAllTimeHigh: data.isAt52WeekHigh,
      percentageFromHigh: ((data.currentPrice - data.week52High) / data.week52High * 100).toFixed(2),
      alert: data.isAt52WeekHigh ? `🚀 ${symbol} is at/near 52-week high!` : `${symbol} is ${data.percentageFromHigh}% from 52-week high`
    };
  }

  async scanMultipleStocks(symbols) {
    const results = [];
    for (const symbol of symbols) {
      const result = await this.checkAllTimeHigh(symbol);
      if (result) {
        results.push(result);
      }
      // Add delay to respect API rate limits
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    return results;
  }
}

// Export singleton instance
export const marketAPI = new MarketDataAPI();

// Built-in RiyalScript functions for market data
export const marketFunctions = {
  getStockPrice: async (symbol) => {
    const data = await marketAPI.fetchStockData(symbol);
    return data ? data.price : null;
  },

  get52WeekHigh: async (symbol) => {
    const data = await marketAPI.fetch52WeekHigh(symbol);
    return data ? data.week52High : null;
  },

  isAllTimeHigh: async (symbol) => {
    const data = await marketAPI.checkAllTimeHigh(symbol);
    return data ? data.isAllTimeHigh : false;
  },

  scanStocks: async (symbols) => {
    return await marketAPI.scanMultipleStocks(symbols);
  },

  getStockInfo: async (symbol) => {
    const data = await marketAPI.fetchStockData(symbol);
    return data;
  },

  getOpenPrice: async (symbol) => {
    const data = await marketAPI.fetchStockData(symbol);
    return data ? data.open : null;
  },

  getHighPrice: async (symbol) => {
    const data = await marketAPI.fetchStockData(symbol);
    return data ? data.high : null;
  },

  getLowPrice: async (symbol) => {
    const data = await marketAPI.fetchStockData(symbol);
    return data ? data.low : null;
  }
};
