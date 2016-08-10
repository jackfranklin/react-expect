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

  if (expectation.hasOwnProperty('prop')) {
    const prop = elem.prop(expectation.prop.name);
    const [ result, errorMessage ] = assertionsPass(() => {
      assert.equal(prop, expectation.prop.value);
    });

    assertions.push({
      passed: result,
      text: `withProp ${expectation.prop.name}, expected value: ${expectation.prop.value}`,
      errorMessage
    });
  }

  return {
    passed: assertions.every(a => a.passed),
    message,
    assertions
  }
}


module.exports = runExpectation;
