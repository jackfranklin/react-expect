const assertionsPass = fn => {
  try {
    fn();
    return [ true ];
  } catch (e) {
    return [ false, e.message ];
  }
}

module.exports = assertionsPass;
