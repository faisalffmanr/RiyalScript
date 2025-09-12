// Interest Calculator Example
// This program handles interest calculation in many ways 

func simpleInterest[principal, rate, time] (
    principal * rate * time
) end

func compoundInterest[principal, rate, time, frequency] (
    principal * (1 + rate / frequency) ** (frequency * time)
) end

func presentValue[futureValue, rate, time] (
    futureValue / (1 + rate) ** time
) end

// the investment parameters
let principal = 5000
let annualRate = 0.08
let years = 10
let compoundingFrequency = 12

// this will calculate different interest types(my favorate is compound)
let simple = simpleInterest[principal, annualRate, years]
let compound = compoundInterest[principal, annualRate, years, compoundingFrequency]
let present = presentValue[10000, annualRate, 5]

// this calculates returns
let simpleReturn = simple / principal
let compoundReturn = compound / principal
let presentReturn = present / 10000

// here is the investment comparison
let betterInvestment = if compound > simple then "Compound Interest" else "Simple Interest"
let returnDifference = compound - simple

// here for the risk assessment based on returns
let riskLevel = if compoundReturn > 0.15 then "High Risk, High Return" else if compoundReturn > 0.08 then "Medium Risk" else "Low Risk, Low Return"
