const assertionsPass = require('./assertions-pass');
const makeResult = require('./make-result');
const TestUtils = require('react-addons-test-utils');
const React = require('react');
const enzyme = require('enzyme');
const assert = require('assert');

const runExpectation = ({ component, props, children }, expectation) => {
  const wrapper = enzyme.shallow(
    React.createElement(component, props, children)
  );

  const elem = wrapper.find(expectation.toRender);

  if (expectation.hasOwnProperty('text')) {
    const renderedText = elem.text();
    const [ result, errorMessage ] = assertionsPass(() => {
      assert.equal(renderedText, expectation.text);
    });

    return makeResult(result, expectation, errorMessage);
  }
}


module.exports = runExpectation;
