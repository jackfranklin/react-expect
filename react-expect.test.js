var React = require('react');
var assert = require('assert');
var expect = require('./react-expect');

describe('Testing a component has an element with text inside', () => {
  it('succeeds when the element passes the test', () => {
    const App = () => React.createElement('p', null, 'Hello World');

    const test = expect(App).toRender('p').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `p` with `Hello World`'
    });
  });

  it('fails when the element does not pass the test', () => {
    const App = () => React.createElement('p', null, 'Hey World');

    const test = expect(App).toRender('p').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: false,
      message: 'Expected component to render a `p` with `Hello World`',
      errorMessage: '\'Hey World\' == \'Hello World\''
    });
  });
});
