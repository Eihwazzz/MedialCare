app.controller('estadisticasCtrl',function($scope,$http,$auth,$state,srvTurnos){
    
    if(!$auth.isAuthenticated()){
      $state.go('login');
    }
    var contadoresPorMes = [];
    srvTurnos.traerTurnos()
    .then(function(data){
      console.log(data);
      for(var i=0;i<data.length;++i){
        //fechas.push(data[i].fecha.substring(5,7));

      }
      console.log(contadoresPorMes);  
    })

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
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              pointStart: 2017
          }
      },

      series: [{
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
      }]

    });
});