'use strict';

describe('Service: Workentry', function () {

  // load the service's module
  beforeEach(module('tttimeApp'));

  // instantiate service
  var Workentry, $httpBackend;
  beforeEach(inject(function (_Workentry_, _$httpBackend_) {
    Workentry = _Workentry_;
    $httpBackend = _$httpBackend_;
  }));

  it('should exist', function () {
    expect(!!Workentry).toBe(true);
  });

  it('should query workentries', function () {
    $httpBackend.expectGET('/api/workentries').respond([{ id: 1, desc: 'note 1' }, { id: 2, desc: 'note2' }]);
    var result = Workentry.query(function(entries){
      $httpBackend.flush();
      expect(entries.length).toBe(2);
    });
  });

});
