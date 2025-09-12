// Market Analysis Example
// This program for market data analysis and trading decisions(will expand more for HFT-highFrequncyTrade, for the senior thesis)
// I will try and sync with a real time market data, for stocks, 
// Market data for different stocks
let stockData = {
    "AAPL": {price: 150.25, volume: 1000000, change: 0.02},
    "GOOGL": {price: 2800.50, volume: 500000, change: -0.01},
    "MSFT": {price: 300.75, volume: 800000, change: 0.03},
    "TSLA": {price: 800.00, volume: 1200000, change: 0.05}
}

// Market analysis functions
func isBullish[change] (
    change > 0.02
) end

func isHighVolume[volume, threshold] (
    volume > threshold
) end

func calculateMarketSentiment[stocks] (
    let bullishCount = 0
    let totalCount = 0
    for stock in stocks do
        if isBullish[stock.change] then
            bullishCount = bullishCount + 1
        end
        totalCount = totalCount + 1
    end
    bullishCount / totalCount
) end

// Analyze each stock
let aaplBullish = isBullish[stockData.AAPL.change]
let googlBullish = isBullish[stockData.GOOGL.change]
let msftBullish = isBullish[stockData.MSFT.change]
let tslaBullish = isBullish[stockData.TSLA.change]

// Volume analysis
let highVolumeThreshold = 750000
let aaplHighVolume = isHighVolume[stockData.AAPL.volume, highVolumeThreshold]
let googlHighVolume = isHighVolume[stockData.GOOGL.volume, highVolumeThreshold]
let msftHighVolume = isHighVolume[stockData.MSFT.volume, highVolumeThreshold]
let tslaHighVolume = isHighVolume[stockData.TSLA.volume, highVolumeThreshold]

// Overall market sentiment
let marketSentiment = calculateMarketSentiment[stockData]

// Trading recommendations: this is very important, will be used for HFT-trading, and I will try and learn how Aladdin(blackrock) algos is structured, 
let aaplRecommendation = if aaplBullish && aaplHighVolume then "BUY" else if aaplBullish then "HOLD" else "SELL"
let googlRecommendation = if googlBullish && googlHighVolume then "BUY" else if googlBullish then "HOLD" else "SELL"
let msftRecommendation = if msftBullish && msftHighVolume then "BUY" else if msftBullish then "HOLD" else "SELL"
let tslaRecommendation = if tslaBullish && tslaHighVolume then "BUY" else if tslaBullish then "HOLD" else "SELL"

// Market outlook
let marketOutlook = if marketSentiment > 0.6 then "Bullish Market" else if marketSentiment > 0.4 then "Neutral Market" else "Bearish Market"
