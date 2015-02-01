'use strict';

angular.module('tttimeApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.alerts = [];
    $scope.errors = {};
    $scope.currentUser = Auth.getCurrentUser();
    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.saveUserSettings = function(){
      User.update($scope.currentUser, function(){
        $scope.addAlert({ type: 'success', msg: 'User settings successfully saved'});
      },function(){
        $scope.addAlert({ type: 'danger', msg: 'Error saving user settings'});
      });
    };

    $scope.addAlert = function(alert) {
      $scope.alerts.push(alert);
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

  });
