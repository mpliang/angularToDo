'use strict';

var app = angular.module('sample', ['ui.router'])
  .config(function($urlRouterProvider, $stateProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/templates/home.html',
        controller: 'home'
        })
      .state('todo', {
        url: '/todo',
        templateUrl: '/templates/todo.html',
        controller: 'todo'
      })
  })
  .controller('todo', function($scope, $state, $http){
    // console.log('working');
    $http.get('/todos/')
      .then(function(data){
        $scope.todos = data.data;
      })
      .catch(function(error){
        console.log(error);
      });

    $scope.newTask = function(){
      // console.log($scope.task);
      $http.post('/todos', {task: $scope.task})
        .then(function(data){
        console.log(data);
        $state.go($state.current, {}, {reload: true});
      })
      .catch(function(error){
        console.log(error);
      });
    }

    $scope.toggleCompleted = function(todo){
      console.log(todo._id);
      $http.put('/todos/' + todo._id)
      .then(function(data){
        console.log(data.data);
      })
      .catch(function(error){
        console.log(error);
      })
    }

    $scope.removeTodo = function(todo){
      console.log(todo);
      $http.delete('/todos/' + todo._id)
      .then(function(data){
        $state.go($state.current, {}, {reload: true});
      })
      .catch(function(error){
        console.log(error);
      })
    }


  })
  .controller('home', function($scope){
    console.log('test');
    $scope.number = 0;
    $scope.count = function(){
      console.log('clicked');
      $scope.number++;
    };
  })
