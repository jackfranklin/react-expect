const makeMessage = expectation => {
  let messageParts = [
    `Expected component to render a \`${expectation.toRender}\``
  ];

  if (expectation.hasOwnProperty('text')) {
    messageParts.push(`with text \`${expectation.text}\``);
  }

  if (expectation.hasOwnProperty('props')) {
    Object.keys(expectation.props).forEach(prop => {
      const val = expectation.props[prop];
      messageParts.push(`with prop \`${prop}\` having value \`${val}\``);
    });
  }

  const [first, second, ...rest] = messageParts;

  let str = `${first} ${second}`;

  if (rest.length > 0) {
    return `${str} and ${rest.join('and')}`;
  } else {
    return str;
  }
}

module.exports = makeMessage;
