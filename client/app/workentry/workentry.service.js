'use strict';

angular.module('tttimeApp')
  .factory('workentry', function ($resource) {
    return $resource('/api/workentries/:id', {
        id: '@_id'
      });
  });
