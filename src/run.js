// Runtime functions for RiyalScript
export default function run(code) {
  try {
    // For now, just return the code as a result
    return code;
  } catch (error) {
    throw new Error(`Runtime error: ${error.message}`);
  }
}
