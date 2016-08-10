var React = require('react');
var assert = require('assert');
var expect = require('./react-expect');

describe('Testing a component has an element with text inside', () => {
  it('succeeds when the element passes the test', () => {
    const App = () => React.createElement('p', null, 'Hello World');

    const test = expect(App).toRender('p').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `p` with text `Hello World`',
      assertions: [{
        passed: true,
        text: 'withText expected value: Hello World',
        errorMessage: undefined
      }]
    });
  });

  it('fails when the element does not pass the test', () => {
    const App = () => React.createElement('p', null, 'Hey World');

    const test = expect(App).toRender('p').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: false,
      message: 'Expected component to render a `p` with text `Hello World`',
      assertions: [{
        passed: false,
        text: 'withText expected value: Hello World',
        errorMessage: `Assertion failed: 'Hey World' == 'Hello World'`
      }]
    });
  });

  it('can deal with the element being wrong', () => {
    const App = () => React.createElement('p', null, 'Hey World');

    const test = expect(App).toRender('h1').withText('Hello World').exec();
    assert.deepEqual(test, {
      passed: false,
      message: 'Expected component to render a `h1` with text `Hello World`',
      assertions: [{
        passed: false,
        text: 'toRender expected value: h1',
        errorMessage: 'Assertion failed: component does not render a `h1` element'
      }]
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

});

describe('finding props', () => {
  it('can find props', () => {
    const App = () => React.createElement('div', { className: 'foo' }, 'Hello');

    const test = expect(App).toRender('div').withProp('className', 'foo').exec();
    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `div` with prop `className` having value `foo`',
      assertions: [{
        errorMessage: undefined,
        passed: true,
        text: 'withProp className, expected value: foo'
      }]
    });
  });

  it('can deal with multiple prop assertions', () => {
    const App = () => React.createElement('div', { className: 'foo', id: 'bar' }, 'Hello');

    const test = expect(App).toRender('div')
      .withProp('className', 'foo')
      .withProp('id', 'bar')
      .exec();

    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `div` with prop `className` having value `foo` and with prop `id` having value `bar`',
      assertions: [{
        errorMessage: undefined,
        passed: true,
        text: 'withProp className, expected value: foo'
      }, {
        errorMessage: undefined,
        passed: true,
        text: 'withProp id, expected value: bar'
      }]
    });
  });
});

describe('making multiple assertions', () => {
  it('can deal looking for a prop and text', () => {
    const App = () => React.createElement('div', { className: 'foo' }, 'Hello');

    const test = expect(App).toRender('div')
      .withProp('className', 'foo')
      .withText('Hello')
      .exec();

    assert.deepEqual(test, {
      passed: true,
      message: 'Expected component to render a `div` with text `Hello` and with prop `className` having value `foo`',
      assertions: [{
        passed: true,
        errorMessage: undefined,
        text: 'withText expected value: Hello'
      }, {
        passed: true,
        errorMessage: undefined,
        text: 'withProp className, expected value: foo'
      }]
    });
  });

  it('fails during multiple assertions when one part fails', () => {
    const App = () => React.createElement('div', { className: 'bar' }, 'Hello');

    const test = expect(App).toRender('div')
      .withText('Hello')
      .withProp('className', 'foo')
      .exec();

    assert.deepEqual(test, {
      passed: false,
      message: 'Expected component to render a `div` with text `Hello` and with prop `className` having value `foo`',
      assertions: [{
        passed: true,
        text: 'withText expected value: Hello',
        errorMessage: undefined
      }, {
        passed: false,
        text: 'withProp className, expected value: foo',
        errorMessage: `Assertion failed: 'bar' == 'foo'`
      }]
    });
  });
});
