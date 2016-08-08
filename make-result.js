const makeMessage = expectation => {
  return `Expected component to render a \`${expectation.toRender}\` with \`${expectation.text}\``;
}

const makeResult = (passed, expectation) => {
  return {
    passed,
    message: makeMessage(expectation)
  };
};

module.exports = makeResult;
