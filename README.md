
![RiyalScript Logo](docs/RiyalScript_Logo.png)

RiyalScript

RiyalScript is a high-performance, statically-typed programming language inspired by JavaScript and C++, designed for financial applications, algorithmic trading, and data-driven business solutions. It blends the simplicity and flexibility of JavaScript with the speed and efficiency of C++, making it ideal for developers building high-performance trading platforms, fintech applications, and business automation tools.

The name "RiyalScript" comes from the Saudi Riyal (SAR), symbolizing precision, stability, and financial focus.

Features
JavaScript-Like Syntax, C++-Like Performance
Familiar syntax for JavaScript and C++ developers.
Strongly typed, but with type inference, similar to TypeScript and modern C++.
Uses curly braces {} and semicolons ;, making it easy for C++ and JS developers to pick up.
Finance & Business-Oriented
Built-in financial types like Currency, Decimal, and InterestRate, avoiding floating-point inaccuracies.
Optimized for real-time trading algorithms, large financial datasets, and complex business calculations.
Low-latency execution, making it ideal for high-frequency trading (HFT) and automated decision-making.
High-Performance & Compiled
Compiled to optimized bytecode, making it faster than interpreted languages like JavaScript or Python.
Memory-efficient with both manual and automatic memory management (inspired by C++).
Supports multi-threading and concurrency, essential for real-time financial applications.
Interoperability with C++ and JavaScript
Can be embedded in C++ applications for performance-critical tasks.
Can interact with JavaScript via WebAssembly (WASM), making it suitable for web-based fintech solutions.
Supports API calls to web services, databases, and cloud-based financial tools.
Object-Oriented & Functional Hybrid
Supports classes, inheritance, and polymorphism (like C++).
Supports arrow functions and async/await (like JavaScript).
Allows functional programming features, such as higher-order functions and immutable structures.


<<<<<<< HEAD
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
For hybrid RS(RiyalScript) and C++ examples 
this is Just because I want to see C++ with RS(RiyalScript)...

#include <iostream>
#include <vector>
#include <cmath>
#include <thread>

// RiyalScript 
extern "C" {
    double convert_currency(double amount, double rate) {
        return amount * rate;  
    }

    double simple_moving_average(std::vector<double> prices, int period) {
        double sum = 0.0;
        for (int i = 0; i < period; i++) {
            sum += prices[i];
        }
        return sum / period;  // Division using C++
    }

    double calculate_monthly_payment(double principal, double rate, int years) {
        double monthly_rate = rate / 12 / 100;
        int months = years * 12;
        return (principal * monthly_rate) / (1 - pow(1 + monthly_rate, -months));
    }

    void check_stock(std::string ticker, double price, double high, double low) {
        if (price > high) {
            std::cout << "🚀 " << ticker << " is above SAR " << high << "! Current Price: SAR " << price << std::endl;
        } else if (price < low) {
            std::cout << "📉 " << ticker << " is below SAR " << low << "! Current Price: SAR " << price << std::endl;
        } else {
            std::cout << "📊 " << ticker << " is stable at SAR " << price << std::endl;
        }
    }

    double calculate_total(double price, double tax_rate) {
        return price + (price * tax_rate / 100);
    }
}

// RiyalScript Section (Simulated as Embedded Script)
const char* riyal_script = R"(
    fn convert_currency(amount: Decimal, rate: Decimal) -> Decimal {
        return amount ⨉ rate; 
    }

    let sar_amount = 1000.00;
    let exchange_rate = 0.27;
    let usd_amount = convert_currency(sar_amount, exchange_rate);
    print("1000 SAR is equivalent to: $" + usd_amount.⚡(2));
)";

// Main C++ function
int main() {
    // Currency Conversion Example
    double sar_amount = 1000.00;
    double exchange_rate = 0.27;
    double usd_amount = convert_currency(sar_amount, exchange_rate);
    std::cout << "1000 SAR is equivalent to: $" << usd_amount << std::endl;

    // Simple Moving Average Example
    std::vector<double> stock_prices = {120.5, 121.0, 119.8, 122.3, 123.5};
    double sma = simple_moving_average(stock_prices, 5);
    std::cout << "5-day SMA: " << sma << std::endl;

    // Loan Simulation Using Threads
    std::thread loan1([]() {
        double result = calculate_monthly_payment(50000, 3.5, 15);
        std::cout << "Loan 1 Monthly Payment: SAR " << result << std::endl;
    });

    std::thread loan2([]() {
        double result = calculate_monthly_payment(100000, 4.2, 30);
        std::cout << "Loan 2 Monthly Payment: SAR " << result << std::endl;
    });

    loan1.join();
    loan2.join();

    // Stock Price Alert System
    check_stock("TADAWUL:2020", 110.5, 120.0, 100.0);
    check_stock("TADAWUL:1120", 45.2, 50.0, 40.0);

    // Tax Calculation
    double total1 = calculate_total(5000.00, 15.0);
    double total2 = calculate_total(3000.00, 10.0);
    std::cout << "Laptop Final Price: SAR " << total1 << std::endl;
    std::cout << "Smartphone Final Price: SAR " << total2 << std::endl;

    // Simulating RiyalScript Execution
    std::cout << "Executing RiyalScript Code:\n" << riyal_script << std::endl;

    return 0;
}
=======


>>>>>>> 366d24b (modifications to hw2)


