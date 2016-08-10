var runExpectation = require('./run-expectation');

class ReactExpect {
  constructor(component, opts = {}) {
    this.testComponent = {
      component: component,
      children: undefined,
      props: null
    }

    this.expectation = {};
  }

  toRender(elem) {
    this.expectation.toRender = elem;
    return this;
  }

  withText(text) {
    this.expectation.text = text;
    return this;
  }

  withProp(name, value) {
    this.expectation.prop = {
      name,
      value
    }
    return this;
  }

  exec() {
    return runExpectation(this.testComponent, this.expectation);
  }
}

module.exports = function(component, opts = {}) {
  return new ReactExpect(component, opts);
}
