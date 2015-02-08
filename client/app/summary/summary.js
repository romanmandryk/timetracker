'use strict';

angular.module('tttimeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('summary', {
        url: '/summary',
        templateUrl: 'app/summary/summary.html',
        controller: 'SummaryCtrl'
      });
  });