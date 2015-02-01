'use strict';

angular.module('tttimeApp')
  .factory('Workentry', function ($resource) {
    return $resource('/api/workentries/:id', {
        id: '@_id'
      });
  });
