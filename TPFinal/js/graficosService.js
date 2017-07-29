app.factory('srvGraficos', function($q, $http){
   var turnosPorEspecialidad = function(){
   var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getTurnosPorEspecialidad').
      then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };

    var cantidadDoctoresPorEspecialidad = function(){
    var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerCantidadDoctoresPorEspecialidad').
      then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };

    return{
      getTurnosPorEspecialidad: turnosPorEspecialidad,
      getCantidadDoctoresPorEspecialidad: cantidadDoctoresPorEspecialidad
    };
});