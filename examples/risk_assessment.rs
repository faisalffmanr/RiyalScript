// Risk Assessment Example
// This program id for portfolio risk analysis and management

func calculateVolatility[returns] (
    // very simple volatility calculation----expand
    let sum = 0
    let count = 0
    for return in returns do
        sum = sum + return
        count = count + 1
    end
    sum / count
) end

func calculateSharpeRatio[returns, riskFreeRate] (
    let avgReturn = calculateVolatility[returns]
    (avgReturn - riskFreeRate) / 0.1  // simple risk calculation
) end

// Portfolio data
let stockReturns = [0.05, -0.02, 0.08, 0.03, -0.01, 0.06, 0.04, -0.03]
let bondReturns = [0.02, 0.01, 0.03, 0.02, 0.01, 0.02, 0.01, 0.02]
let riskFreeRate = 0.02

// Calculate risk metrics
let stockVolatility = calculateVolatility[stockReturns]
let bondVolatility = calculateVolatility[bondReturns]
let stockSharpe = calculateSharpeRatio[stockReturns, riskFreeRate]
let bondSharpe = calculateSharpeRatio[bondReturns, riskFreeRate]

// Risk classification--ecpand---
let stockRisk = if stockVolatility > 0.05 then "High Risk" else if stockVolatility > 0.02 then "Medium Risk" else "Low Risk"
let bondRisk = if bondVolatility > 0.03 then "High Risk" else if bondVolatility > 0.01 then "Medium Risk" else "Low Risk"

// Portfolio allocation recommendation: exapnd----
let stockAllocation = if stockSharpe > bondSharpe then 0.7 else 0.3
let bondAllocation = 1 - stockAllocation

// Overall portfolio risk--very important expand
let portfolioRisk = if stockAllocation > 0.6 then "Aggressive" else if stockAllocation > 0.4 then "Balanced" else "Conservative"

// Investment recommendation
let recommendation = if portfolioRisk == "Aggressive" then "Suitable for young investors" else if portfolioRisk == "Balanced" then "Suitable for most investors" else "Suitable for conservative investors"
