# RiyalScript

RiyalScript is a high-performance, statically-typed programming language inspired by JavaScript and C++, designed for financial applications, algorithmic trading, and data-driven business solutions. It blends the simplicity and flexibility of JavaScript with the speed and efficiency of C++, making it ideal for developers building high-performance trading platforms, fintech applications, and business automation tools.

The name "RiyalScript" comes from the Saudi Riyal (SAR), symbolizing precision, stability, and financial focus.

## Features

### JavaScript-Like Syntax, C++-Like Performance
- Familiar syntax for JavaScript and C++ developers
- Strongly typed, with type inference (similar to TypeScript)
- Uses semicolon-based and expression-based code blocks for clarity

### Finance & Business-Oriented
- Built-in financial types: `Currency`, `Decimal`, `InterestRate`
- Avoids floating-point inaccuracies common in other languages
- Optimized for large financial datasets and real-time trading logic

### High-Performance & Compiled
- Compiled to optimized bytecode (not interpreted)
- Low-latency, memory-efficient design for HFT and automation
- Supports concurrency and multi-threading

### C++ and JavaScript
- C++ native bindings for high-performance modules
- JavaScript/WebAssembly (WASM) integration for browser and server
- Easy API access for cloud-based financial services

### Object-Oriented & Functional Hybrid
- Classes, inheritance, and polymorphism (C++-style OOP)
- Supports arrow functions, closures, and async/await
- Functional programming: higher-order functions, immutability

---

## Static Checks (Performed by Analyzer)
- Use of undeclared variables or functions
- Duplicate declarations in the same scope
- Function call arity (wrong number of arguments)
- Assignment to undeclared variables
- Type-aware expression validation (e.g. "hello" + 2)
- Function and variable name shadowing errors

---

## How to Run

To run a `.riyalscript` file:
```bash
node src/riyalscript.js examples/add.riyalscript run
```



To run all tests:
```bash
npm test
```


---
used node --test test/grammar.test.js for grammer

##  Website
Check out the RiyalScript showcase site:
[https://faisalffmanr.github.io/riyalscript](https://faisalffmanr.github.io/riyalscript)

---

##  
**Faisal Alhogail**  
Senior Computer Science major at LMU.  
Interested in compiler theory, financial systems, and high-performance language design.
