var app = angular.module('myApp',['ngMaterial','ngRoute']);
app.controller('MyController',  function($scope,$http,$mdToast,$log,$location,$rootScope){

	$rootScope.content = '';
	$rootScope.compile = (language) => {
		$rootScope.language = parseInt(language);
		$location.path('/code');
	}
})

app.config(function ($routeProvider,$locationProvider) {
	$locationProvider.html5Mode(true);
	
	$routeProvider
	.when('/home', {
		templateUrl: 'pages/index.html',
		controller: 'homeCtrl'
	})
	.when('/code', {
		templateUrl: 'pages/code.html',
		controller: 'codeCtrl'
	})
	.when('/exercise', {
		templateUrl: 'pages/exercise.html',
		controller: 'exerciseCtrl'
	})
	.otherwise({ redirectTo: '/home' })
	
})

app.controller('homeCtrl',  function($scope,$http,$log,$location,$rootScope){
	$scope.do_code = (language) => {
		$rootScope.compile(language);
	}
})

app.controller('exerciseCtrl',  function($scope,$http,$log,$location,$rootScope){
	var API = '../Frontend/data/exercise.json';
	$http.get(API).then(
	function(res){
		$scope.exercise = res.data;
	},function(err){
		console.log(err);
	});

	$scope.do_exercise = (language,id) => {
		$rootScope.compile(language);
		$scope.exercise.forEach(function(item){
			if(id === item.id){
				$rootScope.content = item.content;
			}
		});
	}
})

app.controller('codeCtrl',  function($scope,$http,$log,$rootScope){
	$scope.program = '';
	if(parseInt($rootScope.language) === 1){
		$scope.program += $rootScope.content.length > 0 ? '/* ' + $rootScope.content +' */\n':'';
		$scope.program += 'using System;\n';
		$scope.program += 'namespace Program\n';
		$scope.program += '{\n';
		$scope.program += '\tclass Program\n';
		$scope.program += '\t{\n';
		$scope.program += '\t\tstatic void Main(string[] args)\n';
		$scope.program += '\t\t{\n';
		$scope.program += '\t\t\t// write your code here\n';
		$scope.program += '\t\t}\n';
		$scope.program += '\t}\n';
		$scope.program += '}';   
	}

	if(parseInt($rootScope.language) === 2){
		$scope.program += $rootScope.content.length > 0 ? '/* ' + $rootScope.content +' */\n':'';
		$scope.program += 'public class Main\n';
		$scope.program += '{\n';
		$scope.program += '\tpublic static void main(String[] args) {\n';
		$scope.program += '\t\t// write your code here\n';
		$scope.program += '\t}\n';
		$scope.program += '}';   
	}

	if(parseInt($rootScope.language) === 3){
		$scope.program += $rootScope.content.length > 0 ? '""" ' + $rootScope.content +' """\n':'';
		$scope.program += "# write your code here";   
	}
	$rootScope.content = '';
	$rootScope.runCode = () => {

		var data = $.param({
		 	program:$scope.program,
		 	language:$rootScope.language
		});
		 
		var config = {
		 	headers: {
		 		'content-type':'application/x-www-form-urlencoded;charset:utf-8'
		 	}
		};
		 
		var urlAPI = 'http://localhost:8080/Project/API/Home/compileCode';
		 
		$http.post(urlAPI,data,config)
		.then(function (res) {
			if(parseInt(res.data) !== 0){
				$scope.output = res.data.slice(1, res.data.length - 1);
			}			
			else
				alert("Failed!!!");
		}, function (er) {
		 	console.log(er.data);
		}); 
	}
})