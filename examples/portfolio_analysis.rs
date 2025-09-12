// Portfolio Analysis Example
// This program is for portfolio management and risk assessment

let portfolio = [10000, 15000, 20000, 25000]
let total = 0
let riskThreshold = 0.7

// Calculate total portfolio value
for asset in portfolio do
    total = total + asset
end

// Calculate average asset value
let average = total / 4

// Risk assessment
let riskLevel = if average > 20000 then "High Risk" else "Low Risk"

// Portfolio diversification check limited for now----
let isDiversified = if 4 > 3 then true else false

// Investment recommendation: this is very important expand it
let recommendation = if total > 50000 then "Consider rebalancing" else "Portfolio looks good"

// Display results
let summary = {
    totalValue: total,
    averageAsset: average,
    riskLevel: riskLevel,
    diversified: isDiversified,
    recommendation: recommendation
}
