const assertionsPass = fn => {
  try {
    fn();
    return [ true ];
  } catch (e) {
    return [ false, `Assertion failed: ${e.message}` ];
  }
}

module.exports = assertionsPass;
