var myApp = angular.module('MyFinalWeb');

myApp.controller('mapaCtrl',function($scope,$http,$auth,$state, $timeout){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }

  var markerArray = []; 
  //var directionsService = new google.maps.DirectionsService;
  
  var pos = {};

  var posConsultorio = "-34.6989701,-58.3823258";
	
        var directionsService = new google.maps.DirectionsService;
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          center: {lat: -34.603, lng: -58.383}
        });
        directionsDisplay.setMap(map);

      

  /*var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.6037389, lng: -58.3837591},
      zoom: 15
    });*/

  //var infoWindow = new google.maps.InfoWindow({map: map});
  //var stepDisplay = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        //map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function calculateAndDisplayRoute(directionsDisplay, directionsService) {      
	  	directionsService.route({
	      origin: pos.lat + "," + pos.lng,
	      destination: posConsultorio,
	      travelMode: 'DRIVING'
	    }, function(response, status) {

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        //showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

	}

	 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ?
	                        'Error: The Geolocation service failed.' :
	                        'Error: Your browser doesn\'t support geolocation.');
	}
	//var infoWindow = new google.maps.InfoWindow({map: map});
	//var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
	//var directionsDisplay = new google.maps.DirectionsRenderer;
	$timeout(function(){
	calculateAndDisplayRoute(     
	          directionsDisplay, directionsService);
	},2000);


});