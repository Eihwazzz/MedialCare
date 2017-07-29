app.controller('estadisticasCtrl',function($scope,$http,$auth,$state,srvGraficos, ServiceTraerEspecialidades,$q){
    
    if(!$auth.isAuthenticated()){
      $state.go('login');
    }

    $scope.estadisticasLineal = [];
    $scope.especialidades = [];
    $scope.objetoEspecialidades = {};
    $scope.maximoMes = 0;
    $scope.objetoCompletoGrafico = {};
    $scope.objetoSeries = [];

    $scope.rellenarObjetoCompleto = function(key){
      $scope.objetoCompletoGrafico[key] = [];
      for(var h=0;h<=$scope.maximoMes;++h){
        $scope.objetoCompletoGrafico[key].push(0);
      }
    }

    $scope.armarObjetoGrafico = function(objetoGrafico, especialidades){
      for(var i=0;i<especialidades.length;++i){
          $scope.objetoEspecialidades[especialidades[i].nombre_espec] = [];
        }
      for(var j=0;j<objetoGrafico.length;++j){
        if(objetoGrafico[j].MES > $scope.maximoMes){
          $scope.maximoMes = objetoGrafico[j].MES;
        }
        $scope.objetoEspecialidades[objetoGrafico[j].nombre_espec].push({cantidad:objetoGrafico[j].CANT_ESPEC,mes:objetoGrafico[j].MES});
      }
      $scope.objetoCompletoGrafico = angular.copy($scope.objetoEspecialidades);
      for(var k=1;k<=$scope.maximoMes;++k){
        for(var key in $scope.objetoEspecialidades){
          $scope.rellenarObjetoCompleto(key);
          for(var l=0;l<$scope.objetoEspecialidades[key].length;++l){
            $scope.objetoCompletoGrafico[key][$scope.objetoEspecialidades[key][l].mes] = $scope.objetoEspecialidades[key][l].cantidad;
            /*if($scope.objetoEspecialidades[key][l].mes === k){
              $scope.objetoCompletoGrafico[key][k] = $scope.objetoEspecialidades[key][l].cantidad;
            }*/
          }
        }
      }
      console.log($scope.objetoEspecialidades);
      console.log($scope.maximoMes);
      console.log($scope.objetoCompletoGrafico);

      for(var key in $scope.objetoCompletoGrafico){
        $scope.objetoSeries.push({name:key,data:$scope.objetoCompletoGrafico[key]});
      }

    }

    $scope.volver = function(){
      $state.go('menuAdmin');
    }

    var contadoresPorMes = [];
    $q.all([
          srvGraficos.getTurnosPorEspecialidad(),
          ServiceTraerEspecialidades.getespecialidades()
    ]).then(function(response){
      for(var key in response[1]){
        console.log(key);
      }
      console.log(response);
      $scope.estadisticasLineal = response[0];
      $scope.especialidades = response[1];
      $scope.armarObjetoGrafico(angular.copy($scope.estadisticasLineal),angular.copy($scope.especialidades));
      
      Highcharts.chart('containerEsdisticasGrafico', {

      title: {
          text: 'Cantidad de turnos mensuales'
      },

      subtitle: {
          text: 'Ultimo año'
      },

      yAxis: {
          title: {
              text: 'Cantidad de turnos'
          }
      },
      xAxis: {
          title: {
              text: 'Meses'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              pointStart: $scope.estadisticasLineal[0].MES
          }
      },

      series: $scope.objetoSeries
      /*[{
          name: 'Chango Plus',
          data: [432,432,333,654]
      }, {
          name: 'Chango Max',
          data: [432,122,142,234]
      }, {
          name: 'Chango Plex',
          data: [654,432,543,654]
      }, {
          name: 'Chango Lets',
          data: [765,876,234,543]
      }]*/

    });

    })

      
});