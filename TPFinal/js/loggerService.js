app.factory('srvLogger', function($q, $http,$filter){
   var insertaLog = function(datos){
    var fecha = new Date();
    var tiempoDeLogeo = $filter('date')(fecha,'medium');
    datos.accion = datos.accion + tiempoDeLogeo;
    var deferLog = $q.defer();
    
     $http.post('../TPFinalServices/Datos/index.php/insertarLog',{info:datos})
      .then(function(response){
      deferLog.resolve(response.data);
    },function(response) {
        deferLog.reject(response);
    });
      return deferLog.promise;
    };
    var getIp = function(){
    var defer2 = $q.defer();
     $http.get('https://freegeoip.net/json/')
      .then(function(response){
      defer2.resolve(response.data);
    },function(response) {
        defer2.reject(response);
    });
      return defer2.promise;
    };
    //https://freegeoip.net/json
    var getLogs = function(){
    var defer6 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerLogs')
      .then(function(response){
      defer6.resolve(response.data);
    },function(response) {
        defer6.reject(response);
    });
      return defer6.promise;
    };
    return{
      insertarLog: insertaLog,
      getIpAdress: getIp,
      getTodosLosLogs: getLogs
    };
});