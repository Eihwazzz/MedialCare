angular.module('MyFinalWeb.MyController',[])


.controller('menuSupCtrl', function($scope, $auth, $state) {
  if($auth.isAuthenticated())
    {
        $scope.usuarioLogeado = "Usuario: " + $auth.getPayload().nombre;
        if($auth.getPayload().perfil === 'Paciente'){
          $scope.perfilUsuario = 'Paciente';
        }else{
          $scope.perfilUsuario = null;
        }
    }else{
      $scope.perfilUsuario = null;
      $scope.usuarioLogeado = "Sin Identificar";
    }
})
.controller('perfilCtrl', function($scope, $auth, $state, ServiceTraerPacientePorId, ServiceModificarPaciente) {
  if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }else{
      var payload = $auth.getPayload();
      console.log(payload);
      if(payload.perfil != 'Paciente')
      {
        alert('Esta opcion es solo para pacientes');
        $state.go('login');
      }else{
        ServiceTraerPacientePorId.getpaciente(payload.id).then(function(respuesta){
          console.log(respuesta);
          $scope.paciente = {};
          $scope.paciente.id = payload.id;
          $scope.paciente.nombre = respuesta.nombre;
          $scope.paciente.mail = respuesta.mail;
          $scope.paciente.clave = respuesta.clave;

        },function(error) {
          console.log('unable to get the data', error);
        });
      }
    }
    $scope.guardar = function(){
      ServiceModificarPaciente.modificarPaciente($scope.paciente).then(function(respuesta){
          console.log(respuesta);
          $state.go('menu');
        },function(error) {
          console.log('unable to get the data', error);
        });
    };
    $scope.cancelar = function(){
      $state.go('menu');
    };
})
.controller('menuCtrl', function($scope, $auth, $state, $timeout) {
	
  var markerArray = []; 
  var directionsService = new google.maps.DirectionsService;
  var pos = {};

  var posConsultorio = "-34.803333,-58.4532453";

  $scope.solTurno = function(){
    $state.go('solicitarTurno');
  };

  $scope.verTurnos = function(){
    $state.go('grillaTurnos');
  };
  //$scope.initMap = function(){
  var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.6037389, lng: -58.3837591},
      zoom: 15
    });

  
  var infoWindow = new google.maps.InfoWindow({map: map});
  var stepDisplay = new google.maps.InfoWindow;
  // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        map.setCenter(pos);
      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  //}
////////////////////////////////////////////////////////////
/*

  var latLngBuscar;
  var directionsDisplay = new google.maps.DirectionsRenderer();
  var directionsService = new google.maps.DirectionsService();
    
  

    //debugger;
    latLngDestino = {lat:-34.6037389, lng:58.3837591};
  
      latLngOrigin = {lat:-35.2432959, lng:-58.5918078};
      
      var request = {
      origin: 'Chicago, IL',
      destination: 'Los Angeles, CA',
      travelMode: google.maps.TravelMode.DRIVING
      
      };
      directionsService.route(request, function(result, status) {
        if(status == google.maps.DirectionsStatus.OK) {
          console.log(result);
            directionsDisplay.setDirections(result);
          }
      });

      
    $timeout(function(){
    //directionsDisplay = new google.maps.DirectionsRenderer();

    directionsDisplay.setMap(map);
  },2000);


*/
////////////////////////////////////////////////////////////
function calculateAndDisplayRoute(directionsDisplay, directionsService,     
  markerArray, stepDisplay, map) {      
    // Remove any existing markers      
    for (var i = 0; i < markerArray.length; i++) {      
      markerArray[i].setMap(null);      
    }
  directionsService.route({
      origin: "" + pos.lat + "," + pos.lng,
      destination: posConsultorio,
      travelMode: 'WALKING'
    }, function(response, status) {

      if (status === 'OK') {
        directionsDisplay.setDirections(response);
        //showSteps(response, markerArray, stepDisplay, map);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

}
function attachInstructionText(stepDisplay, marker, text, map) {
        google.maps.event.addListener(marker, 'click', function() {
          // Open an info window when the marker is clicked on, containing the text
          // of the step.
          stepDisplay.setContent(text);
          stepDisplay.open(map, marker);
        });
      }
function showSteps(directionResult, markerArray, stepDisplay, map) {
        // For each step, place a marker, and add the text to the marker's infowindow.
        // Also attach the marker to an array so we can keep track of it and remove it
        // when calculating new routes.
        var myRoute = directionResult.routes[0].legs[0];
        for (var i = 0; i < myRoute.steps.length; i++) {
          var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
          marker.setMap(map);
          marker.setPosition(myRoute.steps[i].start_location);
          attachInstructionText(
              stepDisplay, marker, myRoute.steps[i].instructions, map);
        }
      }
 function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
var infoWindow = new google.maps.InfoWindow({map: map});
var directionsDisplay = new google.maps.DirectionsRenderer({map: map});     
$timeout(function(){
calculateAndDisplayRoute(     
          directionsDisplay, directionsService, markerArray, stepDisplay, map);
},2000);



	$scope.mapa = function(){
    initMap();
  }

	$scope.testPDF = function(){
		//Or Use
		//document.getElementById('tablaTurnos')
		var elem = document.getElementById('ta1');
		
		var doc = new jsPDF();
		/*html2canvas(elem,{
			background: '#FFFFFF'
		});*/
		//elem.style.backgroundColor = "#FFFFFF";
		doc.addHTML(elem,15,15, function() {
		  doc.save('Turnos.pdf');
		  //elem.style.backgroundColor = "transparent";
		});
		//elem.style.backgroundColor = "transparent";
		/*html2canvas(document.body,{ 
			onrendered: function(canvas){
				var img = canvas.toDataURL("image/jpeg",1);
				var doc = new jsPDF();
				doc.addImage(img,'JPEG',0,0, 180,150);
				doc.save('Turnos.pdf');
			}
		});*/
		/*doc.fromHTML(document.getElementById('tablaTurnos'),20,20,{
			'width': 170
		});
		doc.save('turnos.pdf');*/
	};

})
.controller('solicitarTurnoCtrl', function($scope, $http, $auth, $state, ServiceTraerDoctoresTurnos, ServiceTraerEspecialidades) {
  if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
     $scope.perfiles = [
      {name:'Doctores', id:1},
      {name:'Especialidades', id:2},
      {name:'Seleccione',id:4}
      ];
      $scope.selectedUser = 'Seleccione';
  $scope.volver = function(){
    $state.go('menu');
  };
  $scope.opcionesTurnos = function(){
    if($scope.selectedUser === 'Doctores')
    {
      ServiceTraerDoctoresTurnos.getdoctores().then(function(respuesta){
        //console.log(respuesta);
        $scope.ListadoOpciones = respuesta;
      },function(error) {
        console.log('unable to get the data', error);
      });
    }else if($scope.selectedUser === 'Especialidades')
    {
      ServiceTraerEspecialidades.getespecialidades().then(function(respuesta){
        console.log(respuesta);
        $scope.ListadoOpciones = respuesta;
      },function(error) {
        console.log('unable to get the data', error);
      });
    }else{
      $scope.ListadoOpciones = [];
    }
  };
  $scope.solTurno = function(id){
    //console.log(id);
    $state.go('solicitudDeTurno',{id:id});
  };

})
.controller('solicitudDeTurnoCtrl', function($scope, $http, $auth, $stateParams, $state, ServiceTraerDoctoresTurnos, ServiceTraerDoctorPorId, ServiceGuardarTurno, $filter) {
  if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $scope.volver = function(){
      $state.go('solicitarTurno');
    };
    $scope.turno = {};
    //console.log($stateParams.id);
    var payload = $auth.getPayload();
    console.log(payload.id);
    $scope.turno.cod_doctor = $stateParams.id;
    $scope.turno.id_paciente = payload.id;
    $scope.guardarTurno = function(){
      console.log($scope.turno.hora);
      var fechaTurno = new Date(toJSONLocal($scope.fecha));
      $scope.turno.fecha = $filter('date')(fechaTurno,'yyyy-MM-dd');
      //$scope.turno.fecha = fechaTurno.toLocaleDateString();
      console.log($scope.turno);
      $scope.turnoAEnviar = angular.copy($scope.turno);
      $scope.turnoAEnviar.hora = $scope.turnoAEnviar.hora + ':00:00';
      alert(typeof $scope.turno.fecha);
      
      ServiceGuardarTurno.guardarTurno($scope.turnoAEnviar).then(function(respuesta){
        console.log(respuesta);
      },function(error) {
        console.log('unable to get the data', error);
      });

    };

    Date.prototype.yyyymmdd = function() {
  var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
  var dd = this.getDate().toString();

  return [this.getFullYear(), mm.length===2 ? '' : '0', mm, dd.length===2 ? '' : '0', dd].join(''); // padding
};

    function toJSONLocal (date) {
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
})
.controller('loginCtrl', function($scope, $http, $auth, $state) {
	if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
	
    $scope.perfiles = [
			{name:'Administrador', id:1},
			{name:'Doctor', id:2},
			{name:'Paciente', id:3}
			//{name:'Invitado', id:4},
		  ];
		  
		  $scope.selectedUser = '';


	$scope.seleccion = true;
	
	$scope.usuarioLogeado = "Sin Identificar";
	$scope.usuario = {};
	$scope.varAdministrador = {
		mail:'mike@hotmail.com',
		perfil: 'Administrador',
		password: '1234'
	};
	$scope.varPaciente = {
		mail:'marcos@gmail.com.ar',
		perfil: 'Paciente',
		password: '1234'
	};
	/*$scope.varInvitado = {
		mail:'invitado@hotmail.com',
		perfil: 'Invitado',
		password: '1234'
	};*/
	$scope.varDoctor = {
		mail:'roberto@hotmail.com',
		perfil: 'Doctor',
		password: '1234'
	};
	$scope.limpiarPerfiles = function(){
    $scope.usuario = {};
    $scope.selectedUser = '';
		document.getElementById('radio1').checked = false;
		document.getElementById('radio2').checked = false;
		document.getElementById('radio3').checked = false;
		document.getElementById('radio4').checked = false;
		$scope.mostrarSelect = true;
	};
	$scope.rellenar = function(param){
		switch(param){
			case "Administrador":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Administrador';
				$scope.usuario = $scope.varAdministrador;
			break;
			case "Paciente":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Paciente';
				$scope.usuario = $scope.varPaciente;
			break;
			case "Doctor":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = true;
				$scope.selectedUser = 'Doctor';
				$scope.usuario = $scope.varDoctor;
			break;
			/*case "Invitado":
				$scope.mostrarSelect = false;
				$scope.mostrarInputs = false;
				$scope.usuario = $scope.varInvitado;
			break;*/
			default:
			break;
		}
			
		

		
	};


        var loginOptions = {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        };
	$scope.logear = function(){	
		if($scope.usuario.mail === "" || $scope.usuario.password === "" || $scope.usuario.mail === undefined || $scope.usuario.password === undefined){
			alert("No se ingresaron datos");
		}else{
		    $auth.login({mail:$scope.usuario.mail,clave:$scope.usuario.password,perfil:$scope.selectedUser},loginOptions )
		    .then(function(respuestaAuth){
		      console.info("Respuesta", respuestaAuth); 
		      if($auth.isAuthenticated())
		      {
		      	var payload = $auth.getPayload();
		      	console.log(payload);
		      	if(payload.perfil === 'Administrador'){
		      		$state.go('registroTurnos');
		      	}else if(payload.perfil === 'Paciente'){
		      		$state.go('menu');
		      	}else if(payload.perfil === 'Doctor'){
		      		$state.go('menu');
		      	}else{
		      		$state.go('menu');
		      	}
		      	$scope.usuarioLogeado = payload.nombre;
		        //$state.go('usuario');//Ejemplo
		      }else{
		        $state.go('login');//ejemplo
		      }
		    
		    })
		    .catch(function(parametro){
		      console.info("Error Catch", parametro.error);
		    });
	
		}
	};

})
.controller('logoutCtrl',function($scope,$http,$auth,$state){
  $scope.desloguear = function(){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $auth.logout()
    .then(function(){
      $state.go('login');
    
  });
};
})
.controller('menuAdminCtrl',function($scope,$http,$auth,$state,FactoryGrillaAdmin,ServiceGrillaAdmin){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $scope.gestionarUsuarios = function(){
    	$state.go('gestionDeUsuarios');
    };
    $scope.verTurnos = function(){
    	$state.go('grillaTurnos');
    };
ServiceGrillaAdmin.getpacientes().then(function(respuesta){
        console.log(respuesta);
    },function(error) {
    console.log('unable to get the data', error);
  });
   
})
.controller('gestionDeUsuariosCtrl',function($scope,$http,$auth,$state,FactoryGrillaAdmin, ServiceGrillaAdmin,$q){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
    $scope.volver = function(){
      $state.go('registroTurnos');
    };
    //console.log(FactoryGrillaAdmin.obtenerAdministradores);
   ServiceGrillaAdmin.getadmins().then(function(respuesta){
        console.log(respuesta);
    },function(error) {
    console.log('unable to get the data', error);
  });

ServiceGrillaAdmin.getdoctores().then(function(respuesta){
        console.log(respuesta);
    },function(error) {
    console.log('unable to get the data', error);
  });
})
.controller('templateGrillaTurnosCtrl', function($scope,$http,$auth,$state,ServiceGrillaTurnos,uiGridConstants){
	if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }

    /*
    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions ={rowHeight:50,
      enableFiltering: true,
      rowWidth:50,
      enableCellEditOnFocus:true,
      columnDefs:[
      {name:'nombre',fieldName:'Nombre', enableFiltering:true},
      {name:'marca',fieldName:'Marca', enableFiltering:false},
      {name:'precio',fieldName:'Precio', width:50,resizable:true,enableFiltering:false},
      {name:'foto',fieldName:'Foto', width:80, cellTemplate:'<img style="width:60%;height:80%;" ng-src="{{COL_FIELD}}"/>',enableFiltering:false},
      {name:'borrar',fieldName:'Borrar', width:50, cellTemplate:'<button class="ion-ios-trash" ng-click="grid.appScope.borrarProducto(row.entity.id_producto)"></button>',enableFiltering:false},
      {name:'modificar',fieldName:'Modificar', width:50, cellTemplate:'<button class="ion-edit" ui-sref="inicioEmp.modificarProducto({id:row.entity.id_producto,nombre:row.entity.nombre,marca:row.entity.marca,tamanio:row.entity.tamanio,categoria:row.entity.categoria,foto:row.entity.foto,cantidad:row.entity.cantidad,precio:row.entity.precio})"></button>',enableFiltering:false}
      ]
    };
    */

    $scope.volver = function(){
      $state.go('registroTurnos');
    };

    $scope.verMapa = function(){
      $state.go('verMapa');
    }

    $scope.gridOptions = {};
    $scope.gridOptions.paginationPageSizes = [25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;
    $scope.gridOptions = {
      rowHeight:50,
      enableFiltering: true,
      rowWidth:50,
      enableCellEditOnFocus:true,
    enableColumnResizing: true,
    columnDefs: [
      /*{ field: 'fecha'},
      //{ field: 'gender', visible: false},
      { field: 'horario'}*/
      {name:'fecha',fieldName:'Fecha'},
      {name:'horario',fieldName:'Horario'},
      {name:'nombre_espec',fieldName:'Especialidad',displayName:'Especialidad'},
      {name:'iconoMapa',displayName:'Ver Mapa',cellTemplate:"<center><div class='mapIcon' ng-click='grid.appScope.verMapa();'></div></center>", width:"120"}
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    //exporterCsvFilename: 'myFile.csv',
    exporterCsvFilename: 'turnos.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true , alignment:'center'};
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  $scope.gridOptions.exporterCsvColumnSeparator = ';';
    $scope.mostrarTurnos = function(){
      var payload = $auth.getPayload();
      console.log($auth);
    	ServiceGrillaTurnos.getturnos({id:payload.id, perfil:payload.perfil}).then(function(respuesta){
    		$scope.ListadoTurnos = respuesta;
    		$scope.gridOptions.data = respuesta;
    		console.log(respuesta);
    	}, function(error){
    		console.log('No se pueden mostrar los turnos');
    	});
    };
    $scope.mostrarTurnos();
})
.controller('templateGrillaCtrl',function($scope,$http,$auth,$state,ServiceGrillaAdmin,FactoryGrillaAdmin){
    if(!$auth.isAuthenticated())
    {
      $state.go('login');
    }
     $scope.perfiles = [
			{name:'Administrador', id:1},
			{name:'Doctor', id:2},
			{name:'Paciente', id:3},
			{name:'Seleccione',id:4}
		  ];
      /*TESTO DE ALGO
      $scope.selection = {
        ids:{1:true}
      }
		  
      $scope.ver = function(){
        console.log($scope.selection);
        $scope.personasSeleccionadas = [];
        console.log($scope.ListadoPersonas);
          angular.forEach($scope.ListadoPersonas, function(persona) {
            
            console.log($scope.selection);
            //console.log(persona);
            //console.log($scope.selection);
            //$scope.personasSeleccionadas = $scope.personasSeleccionadas.concat(persona);
          });
          //console.log($scope.personasSeleccionadas); 
      };*/
		  $scope.selectedUser = 'Seleccione';

      $scope.volver = function(){
        $state.go('gestionDeUsuarios');
      };

	$scope.mostrarPerfiles = function(){
		switch($scope.selectedUser){
			case 'Administrador':
				FactoryGrillaAdmin.getadmserv().then(function(resp){
			    	$scope.ListadoPersonas = resp;
			    });
			break;
			case 'Doctor':
				FactoryGrillaAdmin.getdocserv().then(function(resp){
			    	$scope.ListadoPersonas = resp;
			    });
			break;
			case 'Paciente':
				FactoryGrillaAdmin.getpacserv().then(function(resp){
			    	$scope.ListadoPersonas = resp;
			    });
			break;
			default:
			break;
		}
	};

    

    /*ServiceGrillaAdmin.getadmins().then(function(respuesta){
        $scope.ListadoPersonas = respuesta;
    },function(error) {
    console.log('unable to get the data', error);
  });*/
    $scope.modificar2 = function(usuario){
      console.log(usuario);
      if(usuario.id_administrador !== undefined){
          $state.go('modificar',{id:usuario.id_administrador,nombre:usuario.nombre,mail:usuario.mail,clave:usuario.clave,foto:usuario.foto,perfil:'administrador'});
        }
        if(usuario.id_paciente !== undefined){
          $state.go('modificar',{id:usuario.id_paciente,nombre:usuario.nombre,mail:usuario.mail,clave:usuario.clave,foto:usuario.foto,perfil:'paciente'});
        }
        if(usuario.cod_doctor !== undefined){
          $state.go('modificar',{id:usuario.cod_doctor,nombre:usuario.nombre,mail:usuario.mail,clave:usuario.clave,foto:usuario.foto,perfil:'doctor'});
        }
    };

    $scope.Borrar = function(id){
	    $http.delete('../TPFinalServices/Datos/index.php/borrarusuario/'+id)
	 	.then(function(respuesta) {     	
	 		console.log("Respuesta: "+respuesta);
	      	$state.go($state.current, {}, {reload: true});
	    },function errorCallback(response) {
	     		$scope.ListadoPersonas= [];
	     		console.log( response);
	 	 });
 	};

 	$scope.Modificar = function(id){
    $http.post("PHP/nexo.php",{datos:{accion :"traer",idPersona:id}})
       .then(function(respuesta) {     
            $scope.modificar = !$scope.modificar;
            var key = "data";
            $scope.nuevoNombre = respuesta[key].nombre;
            $scope.nuevoMail = respuesta[key].mail;
            $scope.nuevaClave = respuesta[key].clave;
            $scope.nuevoId = respuesta[key].id;
          },function errorCallback(response) {        
        //aca se ejecuta cuando hay errores
        console.log( response);           
    });
  };
    /*$http.get('http://www.eihwazzz.com/TPFinalServices/Datos/index.php/usuarios')
 	.then(function(respuesta) {     	
 		console.log(respuesta.data);
      	 $scope.ListadoPersonas = respuesta.data;
    },function errorCallback(response) {
     		 $scope.ListadoPersonas= [];
     		console.log( response);
 	 });*/
   
})
.controller('templateAltaCtrl',function($scope,ServiceCargadorDeFotos,$http,$auth,$state,FileUploader){
	//subirimagen
	$scope.perfiles = [
      {name:'Seleccione',id:4},
			{name:'Administrador', id:1},
			{name:'Doctor', id:2},
			{name:'Paciente', id:3}
			//{name:'Invitado', id:4},
		  ];
	$scope.volver = function(){
    $state.go('gestionDeUsuarios');
  };
	$scope.perfilSeleccionado = 'Seleccione';
	
	$scope.uploader = new FileUploader({url: '../TPFinalServices/Datos/index.php/subirimagen'});
  	$scope.uploader.queueLimit = 1; 
  	$scope.persona={};
	$scope.persona.nombre= "Mariano" ;
	$scope.persona.clave= "1234" ;
	$scope.persona.mail= "example@hotmail.com" ;
	$scope.persona.foto="pordefecto.png";	
  	ServiceCargadorDeFotos.cargarFoto($scope.persona.foto,$scope.uploader);

  	$scope.uploader.onSuccessItem = function(item, response, status, headers) {
  		console.info(item,response,status,headers);
    $http.post('../TPFinalServices/Datos/index.php/insertarusuario',{usuario:$scope.persona,perfil:$scope.perfilSeleccionado})
      	.then(function(respuesta) {       
        console.log("Respuesta: "+respuesta.data);  
        $state.go('grilla');    
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


})

.controller('templateModificarCtrl', function($scope, $http, $state,FileUploader,$stateParams,ServiceCargadorDeFotos,ServiceModificarAdministrador,ServiceModificarDoctor,ServiceModificarPaciente) {
  

  $scope.uploader = new FileUploader({url: '../TPFinalServices/Datos/index.php/subirimagen'});
  $scope.uploader.queueLimit = 1; 

  $scope.DatoTest="**modificar**";
  
  $scope.volver = function(){
    $state.go('grilla');
  };
  $scope.mostrarSelect = false;
  //console.log($stateParams);
  $scope.persona = {};
  $scope.persona.id = $stateParams.id;
  $scope.persona.nombre = $stateParams.nombre;
  $scope.persona.mail = $stateParams.mail;
  $scope.persona.clave = $stateParams.clave;
  $scope.persona.foto = $stateParams.foto;
  $scope.persona.perfil = $stateParams.perfil;
  
 /*$scope.cargarFoto = function(nombreDeFoto){
    var direccion = "fotos/"+nombreDeFoto;
    $http.get(direccion, {responseType:"blob"})
      .then(function(respuesta) {       
         var mimetype = respuesta.data.type;
         var archivo = new File([respuesta.data], direccion, {type:mimetype});
         var fotoObtenida = new FileUploader.FileItem($scope.uploader,{});
         fotoObtenida._file = archivo;
         fotoObtenida.file = {};
         fotoObtenida.file = new File([respuesta.data], nombreDeFoto, {type:mimetype});
         $scope.uploader.queue.push(fotoObtenida);
    },function errorCallback(response) {        
        console.log( response);           
    });
  };
  $scope.cargarFoto($scope.persona.foto);*/
  ServiceCargadorDeFotos.cargarFoto($scope.persona.foto,$scope.uploader);

  $scope.uploader.onSuccessItem = function(item, response, status, headers) {
    if($scope.persona.perfil === 'administrador'){
      ServiceModificarAdministrador.modificarAdministrador($scope.persona).then(function(respuesta){
            console.log(respuesta);
            $state.go('grilla');
          },function(error) {
            console.log('unable to get the data', error);
          });
    }
    if($scope.persona.perfil === 'paciente'){
      ServiceModificarPaciente.modificarPaciente($scope.persona).then(function(respuesta){
            console.log(respuesta);
            $state.go('grilla');
          },function(error) {
            console.log('unable to get the data', error);
          });
    }
    if($scope.persona.perfil === 'doctor'){
      ServiceModificarDoctor.modificarDoctor($scope.persona).then(function(respuesta){
            console.log(respuesta);
            $state.go('grilla');
          },function(error) {
            console.log('unable to get the data', error);
          });
    }
  };

  $scope.Guardar=function(){
    if($scope.uploader.queue[0].file.name != 'pordefecto.png')
    {
      var nombreFoto = $scope.uploader.queue[0].file.name;
      console.log(nombreFoto);
      $scope.persona.foto = nombreFoto;
    }
    $scope.uploader.uploadAll();
  };
})

.service('ServiceCargadorDeFotos', function($http, FileUploader){

  this.cargarFoto = function(nombreDeFoto,uploader){
    var direccion = "../TPFinalServices/Datos/fotos/"+nombreDeFoto;
    $http.get(direccion, {responseType:"blob"})
      .then(function(respuesta) {       
         var mimetype = respuesta.data.type;
         var archivo = new File([respuesta.data], direccion, {type:mimetype});
         var fotoObtenida = new FileUploader.FileItem(uploader,{});
         fotoObtenida._file = archivo;
         fotoObtenida.file = {};
         fotoObtenida.file = new File([respuesta.data], nombreDeFoto, {type:mimetype});
         uploader.queue.push(fotoObtenida);
    },function errorCallback(response) {        
        console.log( response);           
    });
  };

});