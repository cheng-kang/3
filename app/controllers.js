'use strict';

/* Controllers */

var SBControllers = angular.module('SBControllers', []);

SBControllers.controller('HomeCtrl', ['$scope',
    function ($scope){
        var name = "";
        var answer = "";
        var questionNumber = 0;
        $scope.question = "";
        $scope.errorMsg2 = "";

        $scope.loginStep1 = function () {
            name = $('#login-name').val();

            if ($.inArray(name, Names) == -1) {
                $('#login-name').addClass('is-warning');
                $('#login-name').addClass('is-outlined');
                $('#login-name-btn').addClass('is-warning');
                $('#login-name-btn').addClass('is-outlined');
                $('#login-1-error').removeClass('is-hidden');
            } else {
                $('#login-name').removeClass('is-warning');
                $('#login-name').removeClass('is-outlined');
                $('#login-name-btn').removeClass('is-warning');
                $('#login-name-btn').removeClass('is-outlined');
                $('#login-1-error').addClass('is-hidden');
                questionNumber = Math.floor(Math.random() * Questions.length);
                $scope.question = Questions[questionNumber];
                console.log(questionNumber);
                console.log(Questions[questionNumber]);
                $('#login-1').fadeOut(300, function () {
                    $('#login-2').removeClass('is-hidden');
                });
            }
        };
        $scope.loginStep2 = function () {
            answer = $('#login-answer').val();
            if (Helper.login(name, answer, questionNumber)) {
                $scope.name = name;
                $scope.emoji = Emojis[name] == undefined ? "😃" : Emojis[name];

                $('#login-answer').removeClass('is-warning');
                $('#login-answer').removeClass('is-outlined');
                $('#login-answer-btn').removeClass('is-warning');
                $('#login-answer-btn').removeClass('is-outlined');
                $('#login-2-error').addClass('is-hidden');

                $('#modal-login').removeClass('is-active');
            } else {
                $scope.errorMsg2 = ErrorMsgs[questionNumber+1] == undefined ? ErrorMsgs[0] : ErrorMsgs[questionNumber+1];
                console.log(ErrorMsgs[questionNumber+1]);
                console.log(questionNumber+1);
                $('#login-answer').addClass('is-warning');
                $('#login-answer').addClass('is-outlined');
                $('#login-answer-btn').addClass('is-warning');
                $('#login-answer-btn').addClass('is-outlined');
                $('#login-2-error').removeClass('is-hidden');
            }
        }
        $scope.changeQuestion = function () {
            $('#login-answer').removeClass('is-warning');
            $('#login-answer').removeClass('is-outlined');
            $('#login-answer-btn').removeClass('is-warning');
            $('#login-answer-btn').removeClass('is-outlined');
            $('#login-2-error').addClass('is-hidden');

            questionNumber = Math.floor(Math.random() * Questions.length);
            $scope.question = Questions[questionNumber];
        }

        if (!Helper.isLoggedIn()) {
            $('#modal-login').addClass('is-active');
        } else {
            $scope.name = Helper.name();
            $scope.emoji = Emojis[$scope.name] == undefined ? "😃" : Emojis[$scope.name];
        }

        var oneDayInSecond = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var today = new Date();
        var graduationDay = new Date(2012,6,8);

        $scope.diffDays = Math.round(Math.abs((today.getTime() - graduationDay.getTime())/(oneDayInSecond)));
    }
]);
SBControllers.controller('BrowseCtrl', ['$scope', '$routeParams', '$window',
    function ($scope, $routeParams, $window){
        if (!Helper.isLoggedIn) {
            $window.location.href = "#/";
        }

        var photoId = parseInt($routeParams.photoId)
        if (photoId > photos.count || photoId < 1) {
            $window.location.href = "#404";
        } else {
            $scope.key = photoId;
            $scope.desc = "一张旧照 - 暂无描述";
            $scope.date = "高中时期";

            var photo = photos[photoId];
            if (photo != undefined) {
                $scope.desc = photo["desc"] == undefined ? "一张旧照 - 暂无描述" : photo["desc"];
                $scope.date = photo["date"] == undefined ? "高中时期" : photo["date"];
            }
            $scope.compressedUrl = "https://raw.githubusercontent.com/cheng-kang/oh-you/master/photos/compressed/sb-"+$scope.key+".jpg";
            $scope.url = "https://raw.githubusercontent.com/cheng-kang/oh-you/master/photos/sb-"+$scope.key+".jpg";
            $scope.count = photos.count;
            $scope.prev = photoId-1 < 1 ? 0 : photoId-1;
            $scope.next = photoId+1 > photos.count ? 0 : photoId+1;

            // var el = document.createElement('div');//该div不需要设置class="ds-thread"
            // el.setAttribute('data-thread-key', $scope.key);//必选参数
            // el.setAttribute('data-url', 'http://chengkang.me/3/#browse/'+$scope.key);//必选参数
            // DUOSHUO.EmbedThread(el);
            // $('#duoshuo-commemt').append(el);
        }
    }
]);
SBControllers.controller('LogoutCtrl', ['$scope', '$window',
    function ($scope, $window){
        Helper.logout();
        $window.location.href = "#404";
    }
]);

SBControllers.controller('TimetableCtrl', ['$scope',
    function ($scope){
        document.getElementById("NavTitle").innerHTML = "SBtherine ♥︎ Ant"

        var d = new Date();
        //得到1970年一月一日到现在的秒数
        var len = d.getTime();
        //本地时间与GMT时间的时间偏移差
        var offset = d.getTimezoneOffset() * 60000;
        //得到现在的格林尼治时间
        var utcTime = len + offset;
        // 洛杉矶时间
        var currentDate = new Date(utcTime + 3600000 * -7);

        $scope.today = (new Date(utcTime + 3600000 * -7)).toString('ddd MMM dd yyyy');

        $scope.getUpAt = ""
        if ((new Date(utcTime + 3600000 * -7)).addDays(1).is().monday()) {
            $scope.getUpAt = "7 AM😬";
        } else if ((new Date(utcTime + 3600000 * -7)).addDays(1).is().weekday()) {
            $scope.getUpAt = "6 AM😪";
        } else {
            $scope.getUpAt = "WHENEVER🌝";
        }

        $scope.isMinimumDay = "NO😑";

        $scope.nextHoliday = "";
        if (!(new Date(utcTime + 3600000 * -7)).addDays(1).is().weekday()) {
            $scope.nextHoliday = "TOMORROW💃🏻💃🏻💃🏻"
        } else if (!(new Date(utcTime + 3600000 * -7)).addDays(2).is().weekday()) {
            $scope.nextHoliday = "2 days😃"
        } else {
            var dayDif = parseInt(((new Date(utcTime + 3600000 * -7)).next().saturday().getTime() - (new Date(utcTime + 3600000 * -7)).getTime()) /  1000  /  60  /  60  / 24) - 1
            $scope.nextHoliday = dayDif + " days😃"
        }
    }
]);
