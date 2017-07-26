var myApp = angular.module('MyFinalWeb.Doctores',[]);

myApp.controller('doctoresCtrl',function($scope,$http,$auth,$state, $timeout, $q){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }

    /*$scope.traerDomicilioDoctor = function(){
	    srvDoctores.getDomDoctor()
	    .then(function(respuesta){
	    	console.log(respuesta);
	    })
	}*/


});