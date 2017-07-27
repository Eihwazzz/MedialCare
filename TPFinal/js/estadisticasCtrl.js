app.controller('estadisticasCtrl',function($scope,$http,$auth,$state){
    
    if(!$auth.isAuthenticated()){
      $state.go('login');
    }


      Highcharts.chart('containerEsdisticasGrafico', {

      title: {
          text: 'Cantidad de Productos al iniciar el año'
      },

      subtitle: {
          text: 'Ultimos 5 años'
      },

      yAxis: {
          title: {
              text: 'Cantidad de productos'
          }
      },
      legend: {
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle'
      },

      plotOptions: {
          series: {
              pointStart: 7-4
          }
      },

      series: [{
          name: 'Chango Plus',
          data: 432
      }, {
          name: 'Chango Max',
          data: 654
      }, {
          name: 'Chango Plex',
          data: 123
      }, {
          name: 'Chango Lets',
          data: 234
      }]

    });
});