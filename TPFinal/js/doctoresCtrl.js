app.controller('doctoresCtrl',function($scope,$http,$auth,$state, $timeout, $q){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }
    
    console.log("Doctores");

    $scope.verTurnos = function(){
   		$state.go('grillaTurnos');
  	};
    /*$scope.traerDomicilioDoctor = function(){
	    srvDoctores.getDomDoctor()
	    .then(function(respuesta){
	    	console.log(respuesta);
	    })
	}*/


});