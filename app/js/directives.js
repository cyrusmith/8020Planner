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
                elm.data('todo', scope.todo);
            },
            template: '{{todo.title}} {{todo.id}}'
        }
    }).directive('todosList', function () {
        return  {
            restrict: 'A',
            scope: {
                "todosSource": "=",
                "onSort": "&"
            },
            link: function (scope, elm, attrs) {

                elm.addClass('todos-list');
                elm.sortable({
                    placeholder: "ui-state-highlight",
                    connectWith: ".todos-list",
                    forcePlaceholderSize: true,
                    revert: true,
                    update: function (evt, ui) {

                        var htmlIds = elm.sortable("toArray");
                        var ids = [];
                        for (var i = 0; i < htmlIds.length; i++) {
                            ids.push(htmlIds[i].replace(/^todo-/, ''));
                        }
                        console.log("update", htmlIds, ids);

                        scope.onSort({ids: ids});

                    }
                });
            },
            template: '<li ng-repeat="todo in todosSource" todo="todo" id="todo-{{todo.id}}" todo-item/>'
        }
    });
