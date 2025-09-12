// Loan Calculator Example
// This program is for loan approval and payment calculations

func calculateMonthlyPayment[principal, rate, months] (
    principal * (rate * (1 + rate) ** months) / ((1 + rate) ** months - 1)
) end

func calculateTotalInterest[principal, monthlyPayment, months] (
    (monthlyPayment * months) - principal
) end

// Loan data
let principal = 100000
let annualRate = 0.05
let monthlyRate = annualRate / 12
let months = 360

// this calculates payments
let monthlyPayment = calculateMonthlyPayment[principal, monthlyRate, months]
let totalInterest = calculateTotalInterest[principal, monthlyPayment, months]
let totalCost = principal + totalInterest

// Loan approval 
let income = 8000
let monthlyIncome = income / 12
let debtToIncome = monthlyPayment / monthlyIncome
let approved = debtToIncome < 0.28 && principal > 50000

// Risk assessment(helps risk managment for lenders)
let riskLevel = if debtToIncome > 0.25 then "High Risk" else if debtToIncome > 0.20 then "Medium Risk" else "Low Risk"

// the lender's final decision
let decision = if approved then "APPROVED" else "DENIED"
