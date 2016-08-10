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

  it('can deal with the element being wrong', () => {
    const App = () => React.createElement('p', null, 'Hey World');

    const test = expect(App).toRender('h1').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: false,
      message: 'Expected component to render a `h1` with `Hello World`',
      errorMessage: 'Couldn\'t find a `h1` component'
    });
  });

  it('can find the element if it is nested', () => {
    const App = () => React.createElement('div', null,
      React.createElement('h1', null, 'Title'),
      React.createElement('p', null, 'Hello World')
    );

    const test = expect(App).toRender('p').withText('Hello World').exec();
    assert(test.passed);
  });

  it('can find props', () => {
    const App = () => React.createElement('div', { className: 'foo' }, 'Hello');

    const test = expect(App).toRender('div').withProp('className', 'foo').exec();
    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `div` with prop `className` having value `foo`'
    });
  });
});
