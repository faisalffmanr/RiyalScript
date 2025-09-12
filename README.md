# RiyalScript

A high-performance, statically-typed, finance-oriented programming language designed for financial calculations and analysis.

## Features

- **Static Typing**: Type inference with compile-time checking
- **Financial Operations**: Built-in support for financial calculations
- **Control Flow**: Conditionals, loops, and function declarations
- **Data Structures**: Arrays and objects with clean syntax
- **Market Integration**: Real-time stock data access
- **Optimization**: Constant folding and expression simplification
- **JavaScript Output**: Compiles to clean, readable JavaScript

## Installation

```bash
git clone https://github.com/faisalffmanr/riyalscript.git
cd riyalscript
npm install
npm run build
```

## Quick Start

```javascript
import compile from './src/compiler.js';

// Simple calculation
const result = compile('let balance = 1000 + 500 * 2', 'js');
console.log(result); // let balance = 2000;

// Function declaration
const func = compile('func calculateTax[income, rate] (income * rate) end', 'js');
console.log(func); // function calculateTax(income, rate) { ... }
```

## Examples

See the [examples directory](examples/) for comprehensive sample programs including portfolio analysis, loan calculations, and market data integration.

## Project Structure

```
RiyalScript/
├── .gitignore
├── README.md
├── LICENSE
├── package.json
├── .prettierrc.json
├── docs/
│   ├── logo.png
│   ├── index.html
│   ├── style.css
│   └── _config.yml
├── examples/
│   ├── portfolio_analysis.rs
│   ├── loan_calculator.rs
│   ├── interest_calculator.rs
│   ├── risk_assessment.rs
│   ├── market_analysis.rs
│   └── tax_calculator.rs
├── src/
│   ├── riyalscript.ohm      # Grammar definition
│   ├── parser.js            # Parser implementation
│   ├── analyzer.js          # Semantic analysis
│   ├── optimizer.js         # AST optimization
│   ├── generator.js         # Code generation
│   ├── compiler.js          # Main pipeline
│   ├── core.js              # Core utilities
│   ├── riyalscript.js       # Main language interface
│   └── market.js            # Market data integration
└── test/
    ├── analyzer.test.js
    ├── compiler.test.js
    ├── generator.test.js
    ├── grammar.test.js
    └── optimizer.test.js
```

## Compiler Architecture

RiyalScript uses a multi-phase compiler pipeline:

1. **Parser**: Ohm-based grammar parsing
2. **Analyzer**: Semantic analysis with type inference
3. **Optimizer**: AST optimization with constant folding
4. **Generator**: Clean JavaScript code generation

## Testing

```bash
npm test  # Run all 70 unit tests
```

## Language Syntax

```riyalscript
// Variables and types
let balance = 10000
let currency = "USD"

// Functions
func calculateTax[income, rate] (income * rate) end

// Control flow
let risk = if balance > 50000 then "High" else "Low"
while balance < 100000 do
    balance = balance * 1.05
end

// Data structures
let portfolio = [1000, 2000, 3000]
let account = {name: "John", balance: 1000}

// Market data
let price = market.getStockPrice("AAPL")
```

## RiyalScript vs JavaScript

| **RiyalScript** | **JavaScript** |
|-----------------|----------------|
| `let x = if 5 > 3 then 10 else 20` | `let x = 5 > 3 ? 10 : 20` |
| `func add[x, y] (x + y) end` | `function add(x, y) { return x + y; }` |
| `while 5 > 3 do let x = 1 end` | `while (5 > 3) { let x = 1; }` |
| `for asset in [1,2,3] do let x = asset end` | `for (let asset of [1,2,3]) { let x = asset; }` |
| `market.getStockPrice("AAPL")` | `await marketFunctions.getStockPrice("AAPL")` |

### Key Differences

**Conditionals**
- **RS**: `if condition then value1 else value2`
- **JS**: `condition ? value1 : value2`

**Functions**
- **RS**: `func name[param1, param2] (expression) end`
- **JS**: `function name(param1, param2) { return expression; }`

**Loops**
- **RS**: `while condition do statements end`
- **JS**: `while (condition) { statements; }`

**Market Data**
- **RS**: `market.getStockPrice("AAPL")` (built-in)
- **JS**: `await marketFunctions.getStockPrice("AAPL")` (manual setup)

**Type Safety**
- **RS**: Automatic type inference, compile-time errors
- **JS**: Dynamic typing, runtime errors

**Bottom line**: RiyalScript is JavaScript made cleaner and safer for financial programming!

## Contributing

```bash
npm install
npm test
npm run build
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Links

- **Documentation**: [GitHub Pages](https://faisalffmanr.github.io/riyalscript)
- **Issues**: [GitHub Issues](https://github.com/faisalffmanr/riyalscript/issues)