'use strict';

describe('Service: workentry', function () {

  // load the service's module
  beforeEach(module('tttimeApp'));

  // instantiate service
  var workentry;
  beforeEach(inject(function (_workentry_) {
    workentry = _workentry_;
  }));

  it('should do something', function () {
    expect(!!workentry).toBe(true);
  });

});
