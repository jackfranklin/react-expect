const assertionsPass = fn => {
  try {
    fn();
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = assertionsPass;
