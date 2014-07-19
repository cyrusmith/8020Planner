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

        var sortableOptionsCommon = {
            placeholder: "task-ph",
            start: function(event, ui){

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

        $scope.states = {
            "backlog": Task.STATE_BACKLOG,
            "todo": Task.STATE_TODO,
            "complete": Task.STATE_COMPLETE
        };

        $scope.tasks = [];
        $scope.tasks.push(new Task(1, "Save the world", Task.STATE_BACKLOG));
        $scope.tasks.push(new Task(2, "Buy the bread", Task.STATE_BACKLOG));
        $scope.tasks.push(new Task(3, "Kill Bill", Task.STATE_BACKLOG));

        $scope.backlog = $filter('filter')($scope.tasks, {
            state: Task.STATE_BACKLOG
        });

        $scope.todo = $filter('filter')($scope.tasks, {
            state: Task.STATE_TODO
        });

        $scope.sortableOptionsBacklog = angular.extend(sortableOptionsCommon, {
            connectWith: '.task-list'
        });

        $scope.sortableOptionsTodo = angular.extend(sortableOptionsCommon, {
            connectWith: '.task-list'
        });


    }]);
