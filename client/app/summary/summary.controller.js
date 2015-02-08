'use strict';

angular.module('tttimeApp')
  .controller('SummaryCtrl', function ($scope, Auth, Workentry) {
    $scope.workEntries = [];
    $scope.newEntry = {};
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.datePickerOpened = false;
    $scope.filteredEntries= [];
    $scope.groupedEntries=[];
    $scope.filter = {
      dateFrom:{},
      dateTo:{}
    };

    function GroupedEntry(dateStr, date, totalHours, entries){
      this.dateStr = dateStr;
      this.date = date;
      this.totalHours = totalHours;
      this.entries = entries;
    }

    function dateToStr(date){
      if (! date){return;}
      return ''+date.getYear()+date.getMonth()+date.getDate();
    }

    function refreshDateHourMap(){
      var dateHourMap = {};
      $scope.workEntries.forEach(function(e){
        if (typeof e.date === 'string'){ e.date = new Date(e.date);}
        var dateStr = dateToStr(e.date);
        if (dateHourMap[dateStr]){
          dateHourMap[dateStr].totalHours += e.hours;
          dateHourMap[dateStr].entries.push(e);
        } else{
          var groupedEntry = new GroupedEntry(dateStr, e.date, e.hours, [e]);
          dateHourMap[dateStr] = groupedEntry;
          $scope.groupedEntries.push(groupedEntry);
        }
      });
      $scope.filterEntries();
      $scope.prefHours = Auth.getCurrentUser().settings.preferredWorkingHoursPerDay;
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

    $scope.openDatePicker = function($event, entry) {
      $event.preventDefault();
      $event.stopPropagation();
      if (entry) entry.datePickerOpened = true;
    };

    $scope.filterEntries = function(){
      $scope.filteredEntries = $scope.groupedEntries.filter(function(entry){
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
