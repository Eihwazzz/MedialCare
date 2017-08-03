app.controller('disponibilidadDoctoresCtrl',function($scope,$http,$auth,$state, $timeout, $q,srvDoctores){

	if(!$auth.isAuthenticated()){
    $state.go('login');
  }

  var payload = $auth.getPayload();

  $scope.diasDeLaSemana = [
    {name:'Lunes',codigo:1},
    {name:'Martes',codigo:2},
    {name:'Miercoles',codigo:3},
    {name:'Jueves',codigo:4},
    {name:'Viernes',codigo:5},
    {name:'Sabado',codigo:6},
    {name:'Domingo',codigo:0},
  ]


  $scope.volver = function(){
    $state.go('menuDoctores');
  };


  $scope.guardar = function(){
    $scope.diasSeleccionados = [];
    angular.forEach($scope.diasDeLaSemana, function(dia){
      if (!!dia.selected) $scope.diasSeleccionados.push(dia.codigo);
    })
    console.log($scope.diasSeleccionados);
    var parametros = {
      dias: $scope.diasSeleccionados,
      id: payload.id
    }
    srvDoctores.borrarDiasDisponibles(parametros)
    .then(function(respuesta){
      console.log(respuesta);
      srvDoctores.insertarDiasDisponibles(parametros)
      .then(function(respuesta){
        console.log(respuesta);
        $state.go('menuDoctores');
      })
    })
  }

    console.log("Disponibilidad Doctores");

});