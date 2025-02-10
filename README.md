
![RiyalScript Logo](docs/RiyalScript_Logo.png)

RiyalScript
Overview
RiyalScript is a high-performance, statically-typed programming language inspired by JavaScript and C++, designed for financial applications, algorithmic trading, and data-driven business solutions. It blends the simplicity and flexibility of JavaScript with the speed and efficiency of C++, making it ideal for developers building high-performance trading platforms, fintech applications, and business automation tools.

The name "RiyalScript" comes from the Saudi Riyal (SAR), symbolizing precision, stability, and financial focus.

Features
JavaScript-Like Syntax, C++-Like Performance
Familiar syntax for JavaScript and C++ developers.
Strongly typed, but with type inference, similar to TypeScript and modern C++.
<<<<<<< HEAD
Uses curly braces {} and semicolons; making it easy for C++ and JS developers to pick up.
=======
Uses curly braces {} and semicolons ;, making it easy for C++ and JS developers to pick up.
>>>>>>> 50fe0af (Updated RiyalScript.js to print hello message and fixed test)
Finance & Business-Oriented
Built-in financial types like Currency, Decimal, and InterestRate, avoiding floating-point inaccuracies.
Optimized for real-time trading algorithms, large financial datasets, and complex business calculations.
Low-latency execution, making it ideal for high-frequency trading (HFT) and automated decision-making.
High-Performance & Compiled
Compiled to optimized bytecode, making it faster than interpreted languages like JavaScript or Python.
Memory-efficient with both manual and automatic memory management (inspired by C++).
<<<<<<< HEAD
It supports multi-threading and concurrency, which are essential for real-time financial applications.
Interoperability with C++ and JavaScript
It can be embedded in C++ applications for performance-critical tasks.
It can interact with JavaScript via WebAssembly (WASM), making it suitable for web-based fintech solutions.
=======
Supports multi-threading and concurrency, essential for real-time financial applications.
Interoperability with C++ and JavaScript
Can be embedded in C++ applications for performance-critical tasks.
Can interact with JavaScript via WebAssembly (WASM), making it suitable for web-based fintech solutions.
>>>>>>> 50fe0af (Updated RiyalScript.js to print hello message and fixed test)
Supports API calls to web services, databases, and cloud-based financial tools.
Object-Oriented & Functional Hybrid
Supports classes, inheritance, and polymorphism (like C++).
Supports arrow functions and async/await (like JavaScript).
Allows functional programming features, such as higher-order functions and immutable structures.

Examples
------------------------------------------------------------------------------------------
Convert Saudi Riyal to USD with a real-time exchange rate

fn convert_currency(amount: Decimal, rate: Decimal) -> Decimal {
    return amount ⨉ rate; // ⨉ is Multiplication instead of * 
}

let sar_amount = 1000.00; // 1000 riyals
let exchange_rate = 0.27; // riyal to USD conversion rate

let usd_amount = convert_currency(sar_amount, exchange_rate);
print("1000 SAR is equivalent to: $" + usd_amount.⚡(2)); // ⚡(2) is a custom toFixed(n)

------------------------------------------------------------------------------------------
Calculate Simple Moving Average for stocks

fn simple_moving_average(prices: Array<Decimal>, period: Int) -> Decimal {
    let sum = 0.0;
    for (let i = 0; i ⩽ period; i++) { // ⩽ is instead of <= (Less than or equal)
        sum += prices[i];
    }
    return sum ÷ period; // ÷ for division
}

// Example stock prices
let stock_prices = [120.5, 121.0, 119.8, 122.3, 123.5];
let sma = simple_moving_average(stock_prices, 5);

print("5-day SMA: " + sma.⚡(2)); // ⚡(2) decimal format

------------------------------------------------------------------------------------------

Loan Simulation Using Threads
thread LoanSimulation {
    fn calculate_monthly_payment(principal: Decimal, rate: Decimal, years: Int) -> Decimal {
        let monthly_rate = rate ÷ 12 ÷ 100;
        let months = years ⨉ 12;
        return (principal ⨉ monthly_rate) ÷ (1 ➖ (1 ➕ monthly_rate) ↑ -months); // ↑ = Exponentiation, ➖ is subtraction 
    }
}

// Start multiple loan simulations in parallel
let loan1 = thread LoanSimulation.calculate_monthly_payment(50_000, 3.5, 15);
let loan2 = thread LoanSimulation.calculate_monthly_payment(100_000, 4.2, 30);

print("Loan 1 Monthly Payment: SAR " + loan1.result.⚡(2));
print("Loan 2 Monthly Payment: SAR " + loan2.result.⚡(2));

------------------------------------------------------------------------------------------
Stock Price Alert System

fn check_stock(ticker: String, price: Decimal, high: Decimal, low: Decimal) {
    if (price ⬆ high) { 
        print(ticker + " is above SAR " + high + "! Current Price: SAR " + price.⚡(2));
    } elif (price ⬇ low) { 
        print(ticker + " is below SAR " + low + "! Current Price: SAR " + price.⚡(2));
    } else {
        print(ticker + " is stable at SAR " + price.⚡(2));
    }
}

// Example stock prices in the saudi market
check_stock("TADAWUL:2020", 110.5, 120.0, 100.0);
check_stock("TADAWUL:1120", 45.2, 50.0, 40.0);
  
------------------------------------------------------------------------------------------
Calculate Total Price After Sales Tax

fn calculate_total(price: Decimal, tax_rate: Decimal) -> Decimal {
    return price ➕ (price ⨉ tax_rate ÷ 100);
}


let product1 = { name: "Laptop", price: 5000.00, tax: 15.0 }; // 15% VAT
let product2 = { name: "Smartphone", price: 3000.00, tax: 10.0 }; // 10% VAT


let total1 = calculate_total(product1.price, product1.tax);
let total2 = calculate_total(product2.price, product2.tax);


print(product1.name + " Final Price: SAR " + total1.⚡(2));
print(product2.name + " Final Price: SAR " + total2.⚡(2));

------------------------------------------------------------------------------------------

<<<<<<< HEAD
=======


>>>>>>> 50fe0af (Updated RiyalScript.js to print hello message and fixed test)



