app.controller('estadisticasEspecialidadesCtrl',function($scope,$http,$auth,$state,srvGraficos){
    
    if(!$auth.isAuthenticated()){
      $state.go('login');
    }

    $scope.cantidadDoctoresPorEspecialidad = [];

    $scope.volver = function(){
        $state.go('menuAdmin');
    }

    srvGraficos.getCantidadDoctoresPorEspecialidad()
    .then(function(respuesta){
        console.log(respuesta);
        for(var i=0;i<respuesta.length;++i){
            $scope.cantidadDoctoresPorEspecialidad.push({name:respuesta[i].nombre_espec,y:parseInt(respuesta[i].cantidad)});
        }

        Highcharts.chart('containerEsdisticasCirculo', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Cantidad de Doctores por Especialidad'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Porcentaje',
            colorByPoint: true,
            data: $scope.cantidadDoctoresPorEspecialidad
            /*[{
                name: 'Microsoft Internet Explorer',
                y: 56.33
            }, {
                name: 'Chrome',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Firefox',
                y: 10.38
            }, {
                name: 'Safari',
                y: 4.77
            }, {
                name: 'Opera',
                y: 0.91
            }, {
                name: 'Proprietary or Undetectable',
                y: 0.2
            }]*/
        }]
      });
    })

});