app.factory('srvLogger', function($q, $http){
   var administradores = function(){
   var defer3 = $q.defer();
     $http.get('../Lab4/TPFinal/TPFinalServices/Datos/index.php/getusuarios/administradores').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
    return{
      getadmins: administradores
    };
});