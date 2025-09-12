import compile from './src/compiler.js';

console.log('Compiler loaded:', typeof compile);

const riyalscript = {
  compile: (code, outputType = 'js') => compile(code, outputType),
  parse: (code) => compile(code, 'parsed'),
  analyze: (code) => compile(code, 'analyzed'),
  optimize: (code) => compile(code, 'optimized'),
  generate: (code) => compile(code, 'js')
};

console.log('RiyalScript object:', riyalscript);
console.log('Test compile:', riyalscript.compile('let x = 5 + 3', 'js'));

export { compile };
export default riyalscript;
