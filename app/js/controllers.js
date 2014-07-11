'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
    .controller('MainController', ['$scope', function ($scope) {

        function Task(id, title) {
            this.id = id;
            this.title = title;
            this.isToday = false;
            this.isComplete = false;
        }

        Task.prototype.setToday = function (isToday) {
            this.isToday = true;
            return this;
        }

        Task.prototype.setComplete = function () {
            if (this.isToday) {
                this.isComplete = true;
            }
            return this;
        }

        function TaskList() {
            this.__hash = {};
            this.__items = [];
        }

        TaskList.prototype.append = function (todo) {
            if (!(todo instanceof Task)) throw "Illegal argument";
            if (!this.__hash.hasOwnProperty(todo.id)) {
                this.__hash[todo.id] = todo;
                this.__items.push(todo);
            }
        }

        TaskList.prototype.getTasks = function () {
            return this.__items;
        }

        TaskList.prototype.update = function (tasks) {

            this.__hash = {};
            this.__items = [];

            for (var i = 0; i < tasks.length; i++) {
                this.__hash[tasks[i].id] = tasks[i];
                this.__items.push(tasks[i]);
            }
        }

        $scope.tasks = {};
        $scope.tasks["1"] = new Task("1", "Todo 1");
        $scope.tasks["2"] = new Task("2", "Todo 2");
        $scope.tasks["3"] = new Task("3", "Todo 3").setToday(true);

        $scope.backlog = new TaskList();
        $scope.todays = new TaskList();

        function configBoard() {
            for (var id in $scope.tasks) {
                if ($scope.tasks.hasOwnProperty(id)) {
                    $scope.tasks[id].isToday ? $scope.todays.append($scope.tasks[id]) : $scope.backlog.append($scope.tasks[id]);
                }
            }
        }

        configBoard();

        $scope.onUpdateBacklog = function (ids) {
            console.log("onUpdateBacklog", ids);
            var tasks = [];
            for (var i = 0; i < ids.length; i++) {
                tasks.push($scope.tasks[ids[i]].setToday(false));
            }
            $scope.backlog.update(tasks);
        }

        $scope.onUpdateToday = function (ids) {
            console.log("onUpdateToday", ids);
            var tasks = [];
            for (var i = 0; i < ids.length; i++) {
                tasks.push($scope.tasks[ids[i]].setToday(true));
            }
            $scope.todays.update(tasks);
        }
    }]);
