(function () {
	'use strict';
	angular
        .module('app',[
        	'ui.router',
            'ui.gravatar',
            'ui.bootstrap',
            'angularUtils.directives.dirPagination',
            'easypiechart',
            'ui.calendar',
            'studentSearchBox',
            'toaster', 
            'ngAnimate',
            'uiSwitch',
            'countTo'
        	])
        .config(config)
        .run(run);
        function config($stateProvider, $urlRouterProvider) {
        	// default route
            $urlRouterProvider.otherwise("/");
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'home/index.html',
                    controller: 'HomeCtrl',
                    controllerAs: 'hmCrtl'
                })
                .state('studentsAttendance', {
                    url: '/students/attendance/:studentId',
                    templateUrl: 'records/attendance.html',
                    controller: 'AttendanceCtrl',
                    controllerAs: 'rcCrtl'
                })
                .state('studentsRecords', {
                    url: '/students/records/:studentId',
                    templateUrl: 'records/records.html',
                    controller: 'ReportsCtrl',
                    controllerAs: 'rpCrtl'
                })
                .state('studentsTimetable', {
                    url: '/students/timetable/:studentId',
                    templateUrl: 'curr/timetable.html',
                    controller: 'TimeTableCtrl',
                    controllerAs: 'ttCrtl'
                })
                .state('studentsEvents', {
                    url: '/students/events/:studentId',
                    templateUrl: 'curr/events.html',
                    controller: 'EventsCtrl',
                    controllerAs: 'evCrtl'
                })
                .state('news', {
                    url: '/news',
                    templateUrl: 'curr/news.html',
                    controller: 'NewsCtrl',
                    controllerAs: 'nwCrtl'
                })
                .state('adminEnroll', {
                    url: '/admin/enroll',
                    templateUrl: 'admin/enroll.html',
                    controller: 'AdminCtrl',
                    controllerAs: 'admCrtl'
                })
        }
        function run($http, $rootScope, $window) {
        	// body...
        }
        // manually bootstrap angular after the JWT token is retrieved from the server
	    $(function () {
	        // get JWT token from server
            $.get('/token', function (token) {
                window.jwtToken = token;
                angular.bootstrap(document, ['app']);
            });
	    });
})();