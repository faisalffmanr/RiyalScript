# RiyalScript

A high-performance, statically-typed, finance-oriented programming language designed for financial calculations and analysis.

## 🚀 Features

### Core Language Features
- **Variable Declarations**: `let balance = 10000`
- **String & Number Literals**: `let currency = "USD"`
- **Arithmetic Operations**: `let total = 1000 + 500 * 2` (with correct precedence)
- **Power Operations**: `let compound = 1000 * (1 + 0.05) ** 10`
- **Comparison Operators**: `let isProfitable = 5000 > 3000`
- **Logical Operators**: `let approved = 5000 > 3000 && 1000 < 2000`
- **Conditional Expressions**: `let risk = if 0.8 > 0.5 then "High" else "Low"`
- **Function Declarations**: `func calculateTax[income, rate] (income * rate) end`
- **Function Calls**: `let tax = calculateTax[50000, 0.25]`
- **Array Literals**: `let prices = [100, 200, 300, 400]`
- **Object Literals**: `let account = {name: "John", balance: 1000}`
- **While Loops**: `while 5 > 3 do let x = 1 end`
- **For Loops**: `for x in [1, 2, 3] do let y = x end`
- **Unary Operators**: `let balance = -1000`

### Advanced Features
- **Type Inference**: Automatic type detection for expressions
- **Operator Precedence**: Correct mathematical precedence
- **Constant Folding**: Compile-time optimization
- **Clean JavaScript Output**: Readable generated code
- **Financial Calculations**: Built-in support for financial formulas

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/riyalscript.git
cd riyalscript

# Install dependencies
npm install

# Build the compiler
npm run build
```

## 🎯 Quick Start

### Basic Usage

```javascript
import compile from './src/compiler.js';

// Simple calculation
const result = compile('let balance = 1000 + 500 * 2', 'js');
console.log(result); // let balance = 2000;

// Conditional logic
const risk = compile('let risk = if 0.8 > 0.5 then "High" else "Low"', 'js');
console.log(risk); // let risk = (true ? "High" : "Low");

// Function declaration
const func = compile('func calculateTax[income, rate] (income * rate) end', 'js');
console.log(func); // function calculateTax(income, rate) { ... }
```

### Financial Examples

```riyalscript
// Portfolio analysis
let portfolio = [10000, 15000, 20000]
let total = 0
for asset in portfolio do
    total = total + asset
end

// Risk assessment
let riskLevel = if 0.7 > 0.5 then "High Risk" else "Low Risk"

// Interest calculation
let interest = 10000 * 0.05 * 2

// Loan approval logic
let approved = 75000 > 50000 && 0.1 < 0.15
```

## 🏗️ Compiler Architecture

RiyalScript uses a multi-phase compiler pipeline:

1. **Parser**: Ohm-based grammar parsing
2. **Analyzer**: Semantic analysis with type inference
3. **Optimizer**: AST optimization with constant folding
4. **Generator**: Clean JavaScript code generation

### Project Structure

```
RiyalScript/
├── src/
│   ├── RiyalScript.ohm      # Grammar definition
│   ├── parser.js            # Parser implementation
│   ├── analyzer.js          # Semantic analysis
│   ├── optimizer.js         # AST optimization
│   ├── generator.js         # Code generation
│   ├── compiler.js          # Main pipeline
│   └── core.js              # Core utilities
├── tests/                   # Test suite
├── examples/                # Example programs
└── docs/                    # Documentation
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test
node test_compiler.js

# Run advanced features test
node advanced_features_test.js
```

## 📊 Test Coverage

- **Basic Language Features**: 100% passing
- **Advanced Features**: 100% passing
- **Financial Examples**: 100% passing
- **Control Flow**: 100% passing
- **Data Structures**: 100% passing

## 🎯 Language Syntax

### Variables
```riyalscript
let balance = 10000
let currency = "USD"
let isActive = true
```

### Functions
```riyalscript
func calculateTax[income, rate] (income * rate) end
func presentValue[fv, rate, periods] (fv / (1 + rate) ** periods) end
```

### Control Flow
```riyalscript
// Conditionals
let grade = if 85 > 80 then "A" else "B"

// While loops
while 1000 < 2000 do
    let balance = balance * 1.05
end

// For loops
for asset in [1000, 2000, 3000] do
    let value = asset * 1.1
end
```

### Data Structures
```riyalscript
// Arrays
let prices = [100, 200, 300]
let currencies = ["USD", "EUR", "GBP"]

// Objects
let account = {name: "John", balance: 1000, currency: "USD"}
```

## 🚀 Performance

RiyalScript is designed for high performance:

- **Constant Folding**: Compile-time evaluation of constant expressions
- **Type Inference**: Automatic type detection without runtime overhead
- **Optimized Output**: Clean, efficient JavaScript generation
- **Financial Calculations**: Optimized for mathematical operations

## 📈 Financial Features

RiyalScript includes built-in support for common financial calculations:

- **Interest Calculations**: Simple and compound interest
- **Present Value**: Time value of money calculations
- **Risk Assessment**: Portfolio risk evaluation
- **Loan Calculations**: Payment and approval logic
- **Portfolio Analysis**: Asset allocation and performance

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run examples
npm run examples
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Ohm](https://github.com/harc/ohm) for parsing
- Inspired by modern functional programming languages
- Designed for the financial technology community

## 📞 Support

- **Documentation**: [GitHub Pages](https://yourusername.github.io/riyalscript)
- **Issues**: [GitHub Issues](https://github.com/yourusername/riyalscript/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/riyalscript/discussions)

---

**RiyalScript** - Empowering financial calculations with clean, readable code. 🚀💰