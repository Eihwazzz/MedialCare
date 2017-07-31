var app = angular.module('MyFinalWeb');

app.factory('FactoryGrillaAdmin', function(ServiceGrillaAdmin,$q, $http){
   var administradores = function(){
   var defer3 = $q.defer();
     $http.get('../Lab4/TPFinal/TPFinalServices/Datos/index.php/getusuarios/administradores').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
   var doctores = function(){
    var defer1 = $q.defer();
     $http.get('../Lab4/TPFinal/TPFinalServices/Datos/index.php/getusuarios/doctores').then(function(response){
      defer1.resolve(response.data);
    },function(response) {
        defer1.reject(response);
    });
      return defer1.promise;
  };
  var pacientes = function(){
    var defer2 = $q.defer();
     $http.get('../Lab4/TPFinal/TPFinalServices/Datos/index.php/getusuarios/pacientes').then(function(response){
      defer2.resolve(response.data);
    },function(response) {
        defer2.reject(response);
    });
      return defer2.promise;
  };
  var getpacserv1 = function(){
    return ServiceGrillaAdmin.getpacientes();
  };
  var getdocserv1 = function(){
    return ServiceGrillaAdmin.getdoctores();
  };
  var getadmserv1 = function(){
    return ServiceGrillaAdmin.getadmins();
  };
    return{
      getadmins: administradores,
      getpacientes: pacientes,
      getdoctores: doctores,
      getadmserv: getadmserv1,
      getpacserv: getpacserv1,
      getdocserv: getdocserv1
    };
});//factoryUsuario.insertarUsuario($socpe.usuario)
app.service('ServiceGrillaAdmin', function($http,$q){
  var administradores = function(){
   var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getusuarios/administradores').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
   var doctores = function(){
    var defer1 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getusuarios/doctores').then(function(response){
      defer1.resolve(response.data);
    },function(response) {
        defer1.reject(response);
    });
      return defer1.promise;
  };
  var pacientes = function(){
    var defer2 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getusuarios/pacientes').then(function(response){
      defer2.resolve(response.data);
    },function(response) {
        defer2.reject(response);
    });
      return defer2.promise;
  };
  
    return{
      getadmins: administradores,
      getpacientes: pacientes,
      getdoctores: doctores
    };
});
app.service('ServiceTraerDoctoresTurnos', function($http,$q){
   var doctores = function(){
    var defer1 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getdoctoresturnos/doctores').then(function(response){
      defer1.resolve(response.data);
    },function(response) {
        defer1.reject(response);
    });
      return defer1.promise;
  }; 
    return{
      getdoctores: doctores
    };
});
app.service('ServiceTraerDoctorPorId', function($http,$q){
   var doctor = function(id){
    var defer1 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerDoctorPorId/'+id).then(function(response){
      defer1.resolve(response.data);
    },function(response) {
        defer1.reject(response);
    });
      return defer1.promise;
  }; 
    return{
      getDoctor: doctor
    };
});
app.service('ServiceTraerTurnosPorIdDoctor', function($http,$q){
   var doctor = function(id){
    var defer1 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerTurnosPorIdDoctor/'+id).then(function(response){
      defer1.resolve(response.data);
    },function(response) {
        defer1.reject(response);
    });
      return defer1.promise;
  }; 
    return{
      getDoctor: doctor
    };
});
app.service('ServiceTraerPacientePorId', function($http,$q){
  var paciente = function(id){
   var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerPacientePorId/'+id).then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
    return{
      getpaciente: paciente
    };
});
app.service('ServiceGuardarTurno', function($http,$q){
  var turno = function(unTurno){
   var defer3 = $q.defer();
     $http.post('../TPFinalServices/Datos/index.php/GuardarTurno',{turno:unTurno}).then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
    return{
      guardarTurno: turno
    };
});
app.service('ServiceTraerEspecialidades', function($http,$q){
  var especialidades = function(){
   var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getespecialidades').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  var especialidad = function(id){
   var defer4 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/getEspecialidad/'+id).then(function(response){
      defer4.resolve(response.data);
    },function(response) {
        defer4.reject(response);
    });
      return defer4.promise;
    };
  
    return{
      getespecialidades: especialidades,
      getEspecialidad: especialidad
    };
});
app.service('ServiceGrillaTurnos', function($http,$q){
  var turnos = function(data){
   var defer3 = $q.defer();
   //var datos = {id:data.id,perfil:data.perfil};
     $http.get('../TPFinalServices/Datos/index.php/getturnos/'+ data.id +'/' + data.perfil).then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  
    return{
      getturnos: turnos
    };
});
app.service('srvTurnos', function($http,$q){
  var turnos = function(data){
   var defer3 = $q.defer();
     $http.get('../TPFinalServices/Datos/index.php/traerTodosLosTurnos').then(function(response){
      defer3.resolve(response.data);
    },function(response) {
        defer3.reject(response);
    });
      return defer3.promise;
    };
  
    return{
      traerTurnos: turnos
    };
});
app.service('ServiceModificarPaciente', function($http,$q){
  var modificar = function(paciente){
  var defer = $q.defer();
    $http.put('../TPFinalServices/Datos/index.php/modificarPaciente/',{paciente:paciente})
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  return{
    modificarPaciente: modificar
  };
});
app.service('ServiceModificarAdministrador', function($http,$q){
  var modificar = function(administrador){
  var defer = $q.defer();
    $http.put('../TPFinalServices/Datos/index.php/modificarAdministrador/',{administrador:administrador})
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  return{
    modificarAdministrador: modificar
  };
});
app.service('ServiceModificarDoctor', function($http,$q){
  var modificar = function(doctor){
  var defer = $q.defer();
    $http.put('../TPFinalServices/Datos/index.php/modificarDoctor/',{doctor:doctor})
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  return{
    modificarDoctor: modificar
  };
});
app.service('srvDoctores', function($http,$q){
  var traerDomDoctor = function(idDoctor){
  var defer = $q.defer();
    $http.get('../TPFinalServices/Datos/index.php/traerDomicilioDoctor/'+idDoctor)
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  var turnoAsistencia = function(idTurno, opcion){
  var defer = $q.defer();
    $http.put('../TPFinalServices/Datos/index.php/marcarTurno/',{turno: idTurno, asistencia: opcion})
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  return{
    traerDomicilioDoctor: traerDomDoctor,
    marcarTurno: turnoAsistencia
  };
});
app.service('srvVerificarCodigoDoctor', function($http,$q){
  var verificaCodigo = function(codigo){
  var defer = $q.defer();
    $http.get('../TPFinalServices/Datos/index.php/chequearCodigo/'+codigo)
      .then(function(response){
        console.log(response);
          defer.resolve(response);
      },function(response) {
            defer.reject(response);
      });
          return defer.promise;
    };
  return{
    verificarCodigo: verificaCodigo
  };
});