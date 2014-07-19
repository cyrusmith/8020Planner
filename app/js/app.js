'use strict';


// Declare app level module which depends on filters, and services
angular.module('8020Planner', [
        'ngRoute',
        '8020Planner.filters',
        '8020Planner.services',
        '8020Planner.directives',
        '8020Planner.controllers',
        'ui.sortable'
    ]).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/main.html', controller: 'MainController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);
