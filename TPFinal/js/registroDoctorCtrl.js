app.controller('registroDoctorCtrl',function($scope,ServiceCargadorDeFotos,$http,$auth,$state,FileUploader,ServiceTraerEspecialidades){

    $scope.perfilAdministrador = true;


    $scope.mostrarMapa = false;
    $scope.domicilio = {};
    $scope.domPaciente = {};
  	//subirimagen
  	$scope.perfiles = [
		{name:'Doctor', id:2}
	  ];
	$scope.perfilSeleccionado = 'Doctor';
  $scope.listado = {};
  ServiceTraerEspecialidades.getespecialidades().then(function(respuesta){
        console.log(respuesta);
        $scope.especialidadSeleccionada = respuesta[0];
        $scope.listado.listaEspecialidades = respuesta;
      },function(error) {
        console.log('unable to get the data', error);
      });

	$scope.volver = function(){
    	$state.go('login');
  	};
	
	$scope.uploader = new FileUploader({url: '../TPFinalServices/Datos/index.php/subirimagen'});
	$scope.uploader.queueLimit = 1; 
	$scope.persona={};
	$scope.persona.nombre= "Mariano" ;
	$scope.persona.clave= "1234" ;
	$scope.persona.mail= "example@hotmail.com" ;
	$scope.persona.foto="pordefecto.png";	
  $scope.persona.telefono="42434535";
  	ServiceCargadorDeFotos.cargarFoto($scope.persona.foto,$scope.uploader);

  	$scope.uploader.onSuccessItem = function(item, response, status, headers) {
  	console.info(item,response,status,headers);
    
    $scope.persona.latitud = $scope.domPaciente.latitud;
    $scope.persona.longitud = $scope.domPaciente.longitud;
    $scope.persona.especialidad = $scope.especialidadSeleccionada.cod_espec;
    $http.post('../TPFinalServices/Datos/index.php/insertarusuario',{usuario:$scope.persona,perfil:$scope.perfilSeleccionado})
      	.then(function(respuesta) {       
        console.log("Respuesta: "+respuesta.data);  
        $state.go('login');    
        //console.info("informe", item, response, status, headers);
        //$state.go('grilla');
    },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);
    });
  };
 
  $scope.Guardar=function(){
    if($scope.perfilSeleccionado != 'Seleccione')
    {
        if($scope.uploader.queue[0].file.name != 'pordefecto.png')
        {
          var nombreFoto = $scope.uploader.queue[0].file.name;
          $scope.persona.foto = nombreFoto;

        }
        $scope.uploader.uploadAll();
    }else{
      alert('Seleccione un perfil por favor');
    }
  };
  //MAPA
  

  $scope.$watch('mostrarMapa', function(newValue, oldValue) {
    if(newValue){
      var geocoder = new google.maps.Geocoder();
      var map;
      var marker;
      var markersArray = [];
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var pos = {};
      
      pos.lat = -34.6623101;
      pos.lng = -58.3668938;
      var myLatLng = {lat: pos.lat, lng: pos.lng};
      var map = new google.maps.Map(document.getElementById('mapPaciente'), {
            zoom: 15,
            center: {lat: pos.lat, lng: pos.lng}
          });

      var infoWindow = new google.maps.InfoWindow({map: map});
      marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Location'
      });
      markersArray.push(marker);

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }    
      directionsDisplay.setMap(map);

      /*if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var myLatLng = {lat: pos.lat, lng: pos.lng};
          map = new google.maps.Map(document.getElementById('mapPaciente'), {
            zoom: 8,
            center: myLatLng
          });

          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'Location'
          });
          markersArray.push(marker);
          directionsDisplay.setMap(map);
          console.log(pos);
      }, function() {
          handleLocationError(true, infoWindow, map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
      }*/
    }

    

    function clearOverlays() {
      for (var i = 0; i < markersArray.length; i++ ) {
        markersArray[i].setMap(null);
      }
      markersArray.length = 0;
    }

    function geocodeAddress(geocoder, resultsMap) {
      var address = $scope.domicilio.calle + " " + $scope.domicilio.numero + ", " + $scope.domicilio.localidad + ", " + $scope.domicilio.provincia;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          clearOverlays();
          resultsMap.setCenter(results[0].geometry.location);
          marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
          markersArray.push(marker);
          $scope.domPaciente.latitud = results[0].geometry.location.lat();
          $scope.domPaciente.longitud = results[0].geometry.location.lng();
          console.log($scope.domPaciente);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    $scope.buscarDomicilio = function(){
      geocodeAddress(geocoder, map);
    }

  });
  

  $scope.openMap = function(){
    $scope.myStyle = {'width':'50%'};
    $scope.mostrarMapa = true;
  };


});