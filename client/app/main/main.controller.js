'use strict';

angular.module('tttimeApp')
  .controller('MainCtrl', function ($scope, Auth, workentry) {
    $scope.workEntries = [];
    $scope.newEntry = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.datePickerOpened = false;

    $scope.reloadEntries = function(){
      function cb(loggedIn){
        if (loggedIn){
          workentry.query(function(workEntries) {
            $scope.workEntries = workEntries;
          });
        }
      }
      Auth.isLoggedInAsync(cb);
    };
    $scope.reloadEntries();

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
      var i = $scope.workEntries.indexOf(entry);
      if (i > -1) $scope.workEntries.splice(i,1);
      entry.$remove();
    };

    $scope.updateEntry = function(entry) {
      delete entry._backup;
      entry.$save();
      entry.editMode = false;
    };

    $scope.switchToEdit = function(entry) {
      angular.copy(entry, entry._backup = {});
      entry.editMode = true;
    };

    $scope.revertChanges = function(entry) {
      angular.copy(entry._backup, entry);
      delete entry._backup;
      entry.editMode = false;
    };

    $scope.openDatePicker = function($event, entry) {
      $event.preventDefault();
      $event.stopPropagation();
      entry.datePickerOpened = true;
    };



  });
