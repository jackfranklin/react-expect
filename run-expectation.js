const assertionsPass = require('./assertions-pass');
const makeMessage = require('./make-message');
const TestUtils = require('react-addons-test-utils');
const React = require('react');
const enzyme = require('enzyme');
const assert = require('assert');

const runExpectation = ({ component, props, children }, expectation) => {
  const wrapper = enzyme.shallow(
    React.createElement(component, props, children)
  );

  let assertions = [];
  let message = makeMessage(expectation);

  const elem = wrapper.find(expectation.toRender);

  if (elem.length === 0) {
    assertions.push({
      passed: false,
      text: `toRender expected value: ${expectation.toRender}`,
      errorMessage: `Assertion failed: component does not render a \`${expectation.toRender}\` element`
    });

    return {
      passed: assertions.every(a => a.passed),
      message,
      assertions
    }
  }


  if (expectation.hasOwnProperty('text')) {
    const renderedText = elem.text();
    const [ result, errorMessage ] = assertionsPass(() => {
      assert.equal(renderedText, expectation.text);
    });

    assertions.push({
      passed: result,
      text: `withText expected value: ${expectation.text}`,
      errorMessage
    });
  }

  if (expectation.hasOwnProperty('props')) {
    Object.keys(expectation.props).forEach(prop => {
      const elemProp = elem.prop(prop);
      const [ result, errorMessage ] = assertionsPass(() => {
        assert.equal(elemProp, expectation.props[prop]);
      });

      assertions.push({
        passed: result,
        text: `withProp ${prop}, expected value: ${expectation.props[prop]}`,
        errorMessage
      });
    });
  }

  return {
    passed: assertions.every(a => a.passed),
    message,
    assertions
  }
}


module.exports = runExpectation;
