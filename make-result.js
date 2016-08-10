const makeMessage = expectation => {
  let messageParts = [
    `Expected component to render a \`${expectation.toRender}\``
  ];

  if (expectation.hasOwnProperty('text')) {
    messageParts.push(`with \`${expectation.text}\``);
  }

  if (expectation.hasOwnProperty('prop')) {
    messageParts.push(`with prop \`${expectation.prop.name}\` having value \`${expectation.prop.value}\``);
  }

  const [first, second, ...rest] = messageParts;

  let str = `${first} ${second}`;

  if (rest.length > 0) {
    return `${str} and ${rest.join('and')}`;
  } else {
    return str;
  }
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
