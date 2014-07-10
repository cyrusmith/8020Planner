'use strict';

/* Directives */


angular.module('myApp.directives', []).
    directive('appVersion', ['version', function (version) {
        return function (scope, elm, attrs) {
            elm.text(version);
        };
    }]).directive('todoItem',function () {
        return  {
            restrict: 'A',
            scope: {
                "todo": "="
            },
            link: function (scope, elm, attrs) {
                elm.addClass('todo-item');
                elm.draggable({
                    cursor: "move",
                    revert: true
                });
                elm.data('todo', scope.todo);
            },
            template: '{{todo.title}} {{todo.id}}'
        }
    }).directive('todosList', function () {
        return  {
            restrict: 'A',
            scope: {
                "todosSource": "=",
                "onDrop": "&"
            },
            link: function (scope, elm, attrs) {
                elm.addClass('todos-list');
                elm.droppable({
                    drop: function (event, ui) {
                        scope.onDrop({todo: ui.draggable.data().todo});
                        scope.$apply();
                    }
                });
            },
            template: '<li ng-repeat="todo in todosSource" todo="todo" todo-item/>'
        }
    });
