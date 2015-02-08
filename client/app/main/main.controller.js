'use strict';

angular.module('tttimeApp')
  .controller('MainCtrl', function ($scope, Auth, Workentry) {
    $scope.workEntries = [];
    $scope.newEntry = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.datePickerOpened = false;
    $scope.dateHourMap= {};
    $scope.filter = {
      dateFrom:{},
      dateTo:{}
    };

    function dateToStr(date){
      if (! date){return;}
      return ''+date.getYear()+date.getMonth()+date.getDate();
    }

    function refreshDateHourMap(){
      $scope.dateHourMap = {};
      $scope.workEntries.forEach(function(e){
        if (typeof e.date === 'string'){ e.date = new Date(e.date);}
        var dateStr = dateToStr(e.date);
        if ($scope.dateHourMap[dateStr]){
          $scope.dateHourMap[dateStr]+= e.hours;
        } else{
          $scope.dateHourMap[dateStr] = e.hours;
        }
      });
      var pref = Auth.getCurrentUser().settings.preferredWorkingHoursPerDay;
      $scope.workEntries.forEach(function(e){
        var dateStr = dateToStr(e.date);
        e.colorClass = ($scope.dateHourMap[dateStr] >= pref)
          ? "light-green"
          : "light-red";
      });
    }

    $scope.reloadEntries = function(){
      function cb(loggedIn){
        if (loggedIn){
          Workentry.query(function(workEntries) {
            $scope.workEntries = workEntries;
            refreshDateHourMap();
          });
        }
      }
      Auth.isLoggedInAsync(cb);
    };
    $scope.reloadEntries();

    $scope.addEntry = function() {
     /* if(!$scope.newEntry || !$scope.newEntry.date) {
        return;
      }*/
      Workentry.save($scope.newEntry, function(updatedEntry){
        $scope.workEntries.push(updatedEntry);
        refreshDateHourMap();
      });
      $scope.newEntry = {};
    };

    $scope.deleteEntry = function(entry) {
      var i = $scope.workEntries.indexOf(entry);
      if (i > -1) {$scope.workEntries.splice(i,1);}
      entry.$remove();
      refreshDateHourMap();
    };

    $scope.updateEntry = function(entry, form) {
      if (!form.$valid) {return};
      delete entry._backup;
      entry.$save(function(){
        entry.editMode = false;
        refreshDateHourMap();
      });
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
      if (entry) entry.datePickerOpened = true;
    };

    $scope.getFilteredEntries = function(){
      return $scope.workEntries.filter(function(entry){
        if ($scope.filter.dateFrom.date && $scope.filter.dateTo.date){
          return $scope.filter.dateFrom.date <= entry.date && $scope.filter.dateTo.date >= entry.date;
        } else if($scope.filter.dateFrom.date){
          return $scope.filter.dateFrom.date <= entry.date;
        } else if ($scope.filter.dateTo.date){
          return $scope.filter.dateTo.date >= entry.date;
        } else {
          return true;
        }
      });
    }


  });
