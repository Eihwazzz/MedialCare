var app = angular.module('MyFinalWeb');

app.service('srvDoctores', function($http,$q){

	function doctoresServices($http) {
	  this.getDomDoctor = function getDomDoctor(id) {
	    return $http.get('../TPFinalServices/Datos/index.php/traerDomicilioDoctor/'+id);
	  };
	}

});