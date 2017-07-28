var myApp = angular.module('MyFinalWeb');

myApp.controller('mapaRealCtrl',function($scope,$http,$auth,$state, $timeout, $q, srvDoctores, $stateParams,FileUploader){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }
    $scope.uploader = new FileUploader({url: '../TPFinalServices/Datos/index.php/subirimagen'});
	$scope.uploader.queueLimit = 1;

    var pos = {};
    var map;
    
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        

	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        //map.setCenter(pos);
        var map = new google.maps.Map(document.getElementById('mapReal'), {
          zoom: 6,
          center: {lat: pos.lat, lng: pos.lng}
        });
        directionsDisplay.setMap(map);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

	  function calculateAndDisplayRoute(directionsService, directionsDisplay) {

	  	
	  	srvDoctores.traerDomicilioDoctor($stateParams.idDoctor)
	    .then(function(respuesta){
	    	console.log(respuesta);
	    	$scope.latitudDoctor = respuesta.data.latitud;
	    	$scope.longitudDoctor = respuesta.data.longitud;
	    	var posConsultorio = $scope.latitudDoctor + "," + $scope.longitudDoctor;
	    	directionsService.route({
		      origin: pos.lat + "," + pos.lng,
		      destination: posConsultorio,
		      optimizeWaypoints: true,
		      travelMode: 'DRIVING'
		    }, function(response, status) {
		      if (status === 'OK') {
		        directionsDisplay.setDirections(response);
		        
		      } else {
		        window.alert('Directions request failed due to ' + status);
		      }
		    });
	    })
	  }
	    $timeout(function() {
	      calculateAndDisplayRoute(directionsService, directionsDisplay);
	  	}, 1500);
 });