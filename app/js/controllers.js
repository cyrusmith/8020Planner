'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainController', ['$scope', function ($scope) {
        $scope.todos = [
            {
                id: 1,
                title: 'Save the world'
            },
            {
                id: 2,
                title: 'Kill Bill'
            }
        ];

        $scope.todays = [
            {
                id: 3,
                title: 'Save the world'
            }
        ];

        function findTodo(list, todo) {
            for (var i = 0; i < list.length; i++) {
                if (todo.id == list[i].id) {
                    return i;
                }
            }
            return -1;
        }

        $scope.onAddTodo = function (todo) {

            if (findTodo($scope.todos, todo) == -1) {
                $scope.todos.push(todo);
            }

            var fromIdx = findTodo($scope.todays, todo);
            if (fromIdx !== -1) {
                $scope.todays.splice(fromIdx, 1);
            }
        }

        $scope.onAddToday = function (todo) {
            if (findTodo($scope.todays, todo) == -1) {
                $scope.todays.push(todo);
            }

            var fromIdx = findTodo($scope.todos, todo);
            if (fromIdx !== -1) {
                $scope.todos.splice(fromIdx, 1);
            }
        }
    }]);
