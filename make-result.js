const makeMessage = expectation => {
  return `Expected component to render a \`${expectation.toRender}\` with \`${expectation.text}\``;
}

const makeResult = (passed, expectation, errorMessage) => {
  const resultObj = {
    passed,
    message: makeMessage(expectation)
  }

  if (errorMessage) resultObj.errorMessage = errorMessage;

  return resultObj;
};

module.exports = makeResult;
