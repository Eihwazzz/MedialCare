app.controller('logsCtrl',function($scope,$http,$auth,$state, $timeout, $q, srvLogger){

	if(!$auth.isAuthenticated()){
      $state.go('login');
    }

    $scope.volver = function(){
      $state.go('gestionDeUsuarios');
    }

    srvLogger.getTodosLosLogs()
    .then(function(respuesta){
      console.log(respuesta);
      $scope.gridOptions.data = respuesta;
    })

    $scope.gridOptions = {};
    //$scope.gridOptions.enablePaginationControls: true,
    $scope.gridOptions = {
      rowHeight:50,
      enableFiltering: true,
      rowWidth:50,
      enableCellEditOnFocus:true,
    enableColumnResizing: true,
    columnDefs: [
      {name:'usuario',fieldName:'Usuario'},
      {name:'perfil',fieldName:'Perfil'},
      {name:'mail',fieldName:'mail',displayName:'Mail'},
      {name:'pais',fieldName:'Pais',displayName:'Pais'},
      {name:'ip',fieldName:'ip',displayName:'Ip'},
      {name:'accion',fieldName:'accion',displayName:'Accion'}
    ],
    enableGridMenu: true,
    enableSelectAll: true,
    //exporterCsvFilename: 'myFile.csv',
    exporterCsvFilename: 'turnos.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true , alignment:'center'};
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
    exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    onRegisterApi: function(gridApi){
      $scope.gridApi = gridApi;
    }
  };
  $scope.gridOptions.paginationPageSizes = [25, 50, 75];
  $scope.gridOptions.paginationPageSize = 25;
  $scope.gridOptions.exporterCsvColumnSeparator = ';';

});