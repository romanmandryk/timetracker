'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('tttimeApp'));

  var MainCtrl,
      scope,
      $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/workentries')
      .respond([]);

    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should display a login message for anonymous user', function () {});
  it('should attach a list of work entries to the scope', function () {});
  it('should add new valid entry', function () {});
  it('should not add invalid entry', function () {});


});
