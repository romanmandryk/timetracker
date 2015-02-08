'use strict';

describe('Controller: SummaryCtrl', function () {

  // load the controller's module
  beforeEach(module('tttimeApp'));

  var SummaryCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SummaryCtrl = $controller('SummaryCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
