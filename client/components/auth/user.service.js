'use strict';

angular.module('tttimeApp')
  .factory('User', function ($resource) {
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      },
      update: {
        method: 'PUT',
        params: {
          id:'me',
          controller:'save'
        }
      }
	  });
  });
