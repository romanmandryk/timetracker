'use strict';

angular.module('tttimeApp')
  .controller('MainCtrl', function ($scope, Auth, workentry) {
    $scope.workEntries = [];
    $scope.newEntry = {};
    $scope.isLoggedIn = Auth.isLoggedIn;

    workentry.query(function(workEntries) {
      $scope.workEntries = workEntries;
    });

    $scope.addEntry = function() {
      if(!$scope.newEntry || !$scope.newEntry.date) {
        return;
      }

      workentry.save($scope.newEntry, function(updatedEntry){
        $scope.workEntries.push(updatedEntry);
      });
      $scope.newEntry = {};
    };

    $scope.deleteEntry = function(entry) {
      workentry.delete(entry);
    };

    $scope.updateEntry = function(entry) {
      workentry.save(entry);
    };

    $scope.switchMode = function() {
      workentry.editMode = !workentry.editMode;
    };
  });
