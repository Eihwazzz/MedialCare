var myApp = angular.module('MyFinalWeb');

myApp.controller('mapaCtrl',function($scope,$http,$auth,$state, $timeout){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }

  var markerArray = []; 
  
  
  var pos = {};

  var posConsultorio = "-34.6989701,-58.3823258";
	var myMarker;
	var map;

	if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        $scope.miLat = position.coords.latitude;
    	$scope.miLong = position.coords.longitude;
        //infoWindow.setPosition(pos);
        //infoWindow.setContent('Location found.');
        //map.setCenter(pos);
        map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: $scope.miLat, lng: $scope.miLong},
        scrollwheel: true,
        zoom: 8
      });
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  
  
	var myLatLng = new google.maps.LatLng($scope.miLat,$scope.miLong);    
      myMarker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'My Position'
      });


  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();


      
      var request = {
      origin: pos.lat + "," + pos.lng,
      destination: posConsultorio,
      travelMode: google.maps.TravelMode.DRIVING
      /*drivingOptions: {
          departureTime: new Date(Date.now() + N),  // for the time N milliseconds from now.
          trafficModel: "optimistic"
        }*/
      };
      directionsService.route(request, function(result, status) {
        if(status == google.maps.DirectionsStatus.OK) {
          console.log(result);
            directionsDisplay.setDirections(result);
          }
      });

      
    $timeout(function(){
    //directionsDisplay = new google.maps.DirectionsRenderer();
    /*var map2 = new google.maps.Map(document.getElementById('map'), {
        center: {lat: $scope.latitud, lng: $scope.longitud},
        scrollwheel: true,
        zoom: 8
      });*/
    directionsDisplay.setMap(map);
  },1000);
 


       /* var directionsDisplay = new google.maps.DirectionsRenderer();
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 7,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          center: {lat: -34.603, lng: -58.383}
        });
        directionsDisplay.setMap(map);
        var directionsService = new google.maps.DirectionsService();
        */
      

  /*var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.6037389, lng: -58.3837591},
      zoom: 15
    });*/

  //var infoWindow = new google.maps.InfoWindow({map: map});
  //var stepDisplay = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
  /*var request = {
           origin: '-34.7005203, -58.3774048', 
           destination: '-34.7052949, -58.3714356',
           travelMode: google.maps.DirectionsTravelMode.WALKING
         };
    
         directionsService.route(request, function(response, status) {
           if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(response);
           }
         });
     */
/*
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
*/
    /*function calculateAndDisplayRoute(directionsDisplay, directionsService) {      
	  	directionsService.route({
	      origin: pos.lat + "," + pos.lng,
	      destination: posConsultorio,
	      travelMode: google.maps.DirectionsTravelMode.DRIVING
	    }, function(response, status) {

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        //showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

	}*/

	 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	  infoWindow.setPosition(pos);
	  infoWindow.setContent(browserHasGeolocation ?
	                        'Error: The Geolocation service failed.' :
	                        'Error: Your browser doesn\'t support geolocation.');
	}
	//var infoWindow = new google.maps.InfoWindow({map: map});
	//var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
	//var directionsDisplay = new google.maps.DirectionsRenderer;
	/*$timeout(function(){
	calculateAndDisplayRoute(     
	          directionsDisplay, directionsService);
	},2000);*/


});