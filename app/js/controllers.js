'use strict';

/* Controllers */

angular.module('8020Planner.controllers', [])
    .controller('MainController', ['$scope', '$filter', function ($scope, $filter) {

        function Task(id, title, state) {
            this.id = id;
            this.title = title;
            this.state = state;
        }

        Task.STATE_BACKLOG = 1;
        Task.STATE_TODO = 2;
        Task.STATE_COMPLETE = 3;

        $scope.states = {
            "backlog": Task.STATE_BACKLOG,
            "todo": Task.STATE_TODO,
            "complete": Task.STATE_COMPLETE
        };

        $scope.tasks = [];
        $scope.backlog = [];
        $scope.todo = [];

        function updateLists() {
            $scope.backlog = $filter('filter')($scope.tasks, {
                state: Task.STATE_BACKLOG
            });

            $scope.todo = $filter('filter')($scope.tasks, {
                state: Task.STATE_TODO
            });
        }

        var sortableOptionsCommon = {
            placeholder: "task-ph",
            start: function (event, ui) {

            },
            beforeStop: function (evt, ui) {
                var id = ui.helper[0].id;
                var task = $.grep($scope.tasks, function (item) {
                    return item.id == id;
                })[0];
                if (!task || task === undefined) {
                    return;
                }
                var typeString = ui.helper.parent()[0].getAttribute('data-taskstate');
                if (task.state != typeString) {
                    task.state = parseInt(typeString);
                }
            }
        };

        updateLists();

        $scope.sortableOptionsBacklog = angular.extend(sortableOptionsCommon, {
            connectWith: '.task-list'
        });

        $scope.sortableOptionsTodo = angular.extend(sortableOptionsCommon, {
            connectWith: '.task-list'
        });

        $scope.onAddBacklog = function () {
            if ($scope.newTaskTitle) {
                $scope.tasks.push(new Task($scope.tasks.length + 1, $scope.newTaskTitle, Task.STATE_BACKLOG));
            }
            $scope.isAddBacklogVisible = false;
            $scope.newTaskTitle = "";

            $scope.backlog = $filter('filter')($scope.tasks, {
                state: Task.STATE_BACKLOG
            });

            $scope.todo = $filter('filter')($scope.tasks, {
                state: Task.STATE_TODO
            });

        }

        $scope.onAddTodo = function () {
            if ($scope.newTaskTitle) {
                $scope.tasks.push(new Task($scope.tasks.length + 1, $scope.newTaskTitle, Task.STATE_TODO));
            }
            $scope.isAddTodoVisible = false;
            $scope.newTaskTitle = "";

            $scope.backlog = $filter('filter')($scope.tasks, {
                state: Task.STATE_BACKLOG
            });

            $scope.todo = $filter('filter')($scope.tasks, {
                state: Task.STATE_TODO
            });

        }

        $scope.removeTask = function (task) {
            for (var i = 0; i < $scope.tasks.length; i++) {
                if (task.id == $scope.tasks[i].id) {
                    $scope.tasks.splice(i, 1);
                    break;
                }
            }
            updateLists();
        }

    }]);
