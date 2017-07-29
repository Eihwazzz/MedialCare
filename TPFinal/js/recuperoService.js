app.factory('srvRecuperacion', function($q, $http){
   var recuperoDePassword = function(){
   var defer3 = $q.defer(datos);
     $http.post('../TPFinalServices/Datos/index.php/recuperarPassword').
      then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };

    return{
      recuperarPassword: recuperoDePassword
    };
});