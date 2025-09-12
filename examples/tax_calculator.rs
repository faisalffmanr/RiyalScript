// Tax Calculator Example
// This program is for tax calculation and optimization strategies

func calculateTax[income, rate] (
    income * rate
) end

func calculateEffectiveRate[totalTax, totalIncome] (
    totalTax / totalIncome
) end

func optimizeTaxBracket[income, brackets] (
    let tax = 0
    let remainingIncome = income
    
    for bracket in brackets do
        if remainingIncome > 0 then
            let taxableAmount = if remainingIncome > bracket.limit then bracket.limit else remainingIncome
            tax = tax + calculateTax[taxableAmount, bracket.rate]
            remainingIncome = remainingIncome - bracket.limit
        end
    end
    
    tax
) end

// Tax brackets: tiers of tax rates
let taxBrackets = [
    {limit: 10000, rate: 0.10},
    {limit: 20000, rate: 0.15},
    {limit: 30000, rate: 0.25},
    {limit: 50000, rate: 0.30}
]

// Income scenarios
let lowIncome = 25000
let mediumIncome = 50000
let highIncome = 100000

// Calculate taxes for each scenario
let lowTax = optimizeTaxBracket[lowIncome, taxBrackets]
let mediumTax = optimizeTaxBracket[mediumIncome, taxBrackets]
let highTax = optimizeTaxBracket[highIncome, taxBrackets]

// Calculate effective tax rates
let lowEffectiveRate = calculateEffectiveRate[lowTax, lowIncome]
let mediumEffectiveRate = calculateEffectiveRate[mediumTax, mediumIncome]
let highEffectiveRate = calculateEffectiveRate[highTax, highIncome]

// Tax optimization strategies
let lowIncomeStrategy = if lowEffectiveRate > 0.15 then "Consider deductions" else "Tax efficient"
let mediumIncomeStrategy = if mediumEffectiveRate > 0.20 then "Consider retirement contributions" else "Tax efficient"
let highIncomeStrategy = if highEffectiveRate > 0.25 then "Consider tax-advantaged investments" else "Tax efficient"

// Overall tax efficiency
let taxEfficiency = if highEffectiveRate < 0.30 then "Efficient" else "Needs optimization"
