var app = angular.module('MyFinalWeb', ['ui.router','MyFinalWeb.MyController','angularFileUpload','satellizer',
    'ngAnimate',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.pagination',
    'ui.grid.autoResize',
    'ui.grid.resizeColumns',
    'ui.grid.selection',
    'ui.grid.exporter',
    'ui.grid.edit']);

app.config(function($stateProvider, $urlRouterProvider, $authProvider) {


  $authProvider.loginUrl = '../Lab4/TPFinal/TPFinalServices/PHP/clases/autentificador.php';
  $authProvider.signupUrl = 'PHP/clases/autentificador.php';
  $authProvider.tokenName = 'tokenMed';
  $authProvider.tokenPrefix = 'Medical_Care';
  $authProvider.authHeader = 'Data';
  //$authProvider.authToken = 'Bearer';


  $stateProvider

.state('login', {
    views: {
      'principal': { templateUrl: 'templates/login.html',controller: 'loginCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'loginCtrl'}
    },
    url:'/login'
  })
.state('perfil', {
    views: {
      'principal': { templateUrl: 'templates/perfil.html',controller: 'perfilCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/perfil'
  })
.state('menu', {
    views: {
      'principal': { templateUrl: 'templates/menu.html',controller: 'menuCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/menu'
  })
.state('solicitarTurno', {
    views: {
      'principal': { templateUrl: 'templates/solicitarTurno.html',controller: 'solicitarTurnoCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/solicitarTurno'
  })
.state('solicitudDeTurno', {
    views: {
      'principal': { templateUrl: 'templates/solicitudDeTurno.html',controller: 'solicitudDeTurnoCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/solicitudDeTurno/:id'
  })
.state('menuAdmin', {
    views: {
      'principal': { templateUrl: 'templates/menuAdmin.html',controller: 'menuAdminCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    },
    url:'/menuAdmin'
  })
  .state('gestionDeUsuarios', {
    url: '/gestionDeUsuarios',
    views: {
      'principal': { templateUrl: 'templates/gestionDeUsuarios.html',controller: 'gestionDeUsuariosCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })

    .state('grilla', {
    url: '/grilla',
    views: {
      'principal': { templateUrl: 'templates/templateGrilla.html',controller: 'templateGrillaCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('grillaTurnos', {
    url: '/grillaTurnos',
    views: {
      'principal': { templateUrl: 'templates/templateGrillaTurnos.html',controller: 'templateGrillaTurnosCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
  .state('modificar', {
    url: '/modificar/{{:id}?:nombre:mail:clave:foto:perfil}',
    views: {
      'principal': { templateUrl: 'templates/templateAlta.html',controller: 'templateModificarCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('alta', {
    url: '/alta',
    views: {
      'principal': { templateUrl: 'templates/templateAlta.html',controller: 'templateAltaCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('verMapa', {
    url: '/verMapa/{{:idDoctor}?}',
    views: {
      'principal': { templateUrl: 'templates/verEnMapa.html',controller: 'mapaRealCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('menuDoctores', {
    url: '/menuDoctores',
    views: {
      'principal': { templateUrl: 'templates/menuDoctores.html',controller: 'doctoresCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('estadisticas', {
    url: '/estadisticas',
    views: {
      'principal': { templateUrl: 'templates/estadisticas.html',controller: 'estadisticasCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  })
    .state('estadisticasEspecialidades', {
    url: '/estadisticasEspecialidades',
    views: {
      'principal': { templateUrl: 'templates/estadisticasEspecialidades.html',controller: 'estadisticasEspecialidadesCtrl' },
      'menuSuperior': {templateUrl: 'templates/menuSup.html',controller: 'menuSupCtrl'},
      'logout': {templateUrl: 'templates/logout.html', controller: 'logoutCtrl'}
    }
  });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
