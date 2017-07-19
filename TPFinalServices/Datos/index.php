<?php

/**
 * Step 1: Require the Slim Framework using Composer's autoloader
 *
 * If you are not using Composer, you need to load Slim Framework with your own
 * PSR-4 autoloader.
 */
require '../vendor/autoload.php';
require '../PHP/clases/AccesoDatos.php';
include_once '../PHP/clases/JWT.php';
include_once '../PHP/clases/ExpiredException.php';
include_once '../PHP/clases/BeforeValidException.php';
include_once '../PHP/clases/SignatureInvalidException.php';
include_once '../PHP/clases/Personas.php';
include_once '../PHP/clases/pacientes.php';
include_once '../PHP/clases/administradores.php';
include_once '../PHP/clases/doctores.php';
include_once '../PHP/clases/turnos.php';

 header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
//header('Access-Control-Allow-Headers: Origin, X-Requested-With, text/plain, Content-Type, Accept, X-ACCESS_TOKEN, Access-Control-Allow-Origin, application/x-www-form-urlencoded, Authorization,Engaged-Auth-Token'); 
/*
 * Step 2: Instantiate a Slim application
 *
 * This example instantiates a Slim application using
 * its default settings. However, you will usually configure
 * your Slim application now by passing an associative array
 * of setting names and values into the application constructor.
 */
$app = new Slim\App();

/**
 * Step 3: Define the Slim application routes
 *
 * Here we define several Slim application routes that respond
 * to appropriate HTTP request methods. In this example, the second
 * argument for `Slim::get`, `Slim::post`, `Slim::put`, `Slim::patch`, and `Slim::delete`
 * is an anonymous function.
 */
$app->get('/', function ($request, $response, $args) {
    $response->write("Welcome to Slim!");
    return $response;
});
$app->post('/insertarusuario[/]', function($request, $response, $args) {
    $body = $request->getBody();
    //$objDatos = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    $input = json_decode($body); 
    echo $input->perfil;
    var_dump($input->perfil);
    if($input->perfil == 'Administrador'){
        $ultimoId = Administrador::InsertarAdministrador($input->usuario);
        $answer = array( 'answer' => 'Administrador Ingresado!' );
        $json = json_encode( $answer );
        return $json;    
    }else if($input->perfil == 'Paciente'){
        $ultimoId = Paciente::InsertarPaciente($input->usuario);
        $answer = array( 'answer' => 'Paciente Ingresado!' );
        $json = json_encode( $answer );
        return $json;
    }else if($input->perfil == 'Doctor'){
        $ultimoId = Doctor::InsertarDoctor($input->usuario);
        $answer = array( 'answer' => 'Doctor Ingresado!' );
        $json = json_encode( $answer );
        return $json;
    }else{
        
        echo "ERROR";
    }
    /*$answer = array( 'answer' => 'ERROR!' );
        $json = json_encode( $answer );
        echo $json;*/
});
$app->post('/GuardarTurno[/]', function($request, $response, $args) {
    $body = $request->getBody();
    $input = json_decode($body); 
    
    var_dump($input->turno);
    $ultimoId = Turno::GuardarTurno($input->turno);
    var_dump($ultimoId);
    $answer = array( 'answer' => 'Doctor Ingresado!' );
        $json = json_encode( $answer );
        return $json;
});
$app->delete('/borrarusuario[/{iduser}]', function ($request, $response, $args) {
    //ARREGLAR EL METODO BORRARADMINISTRADOR ME PARECE QUE ES
    //var_dump();
    $body = $request->getBody();
    //var_dump($body);
    $input = json_decode($body); 
    //var_dump($input->idusuario->data);
    $objDatos = json_decode(file_get_contents("php://input"));
    //var_dump($args['iduser']);
    Administrador::BorrarAdministrador($args['iduser']);
    //echo intval($objDatos->idusuario);
    /*$answer = array( 'answer' => 'Administrador Borrado!' );
    $json = json_encode( $answer );
    return $json; ^*/
    /*$answer = array('answer' => 'Administrador Borrado');
    $json = json_encode( $answer );
    return $json;*/
    echo $args['iduser'];
});
$app->post('/subirimagen[/]', function ($request, $response, $args) {
    if ( !empty( $_FILES ) ) {
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    // $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'img' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    $uploadPath ='fotos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
    move_uploaded_file( $tempPath, $uploadPath );
    $answer = array( 'answer' => 'Archivo Cargado!' );
    $json = json_encode( $answer );
    echo $json;
}else{
    $response->write("Error!");
    return $response;
}
});
$app->get('/hello[/{name}]', function ($request, $response, $args) {
    $response->write("Hello, " . $args['name']);
    return $response;
})->setArgument('name', 'World!');

$app->get('/getusuarios[/{perfil}]', function ($request, $response, $args) {
	if($args['perfil'] == 'pacientes'){
            $listado = Paciente::TraerTodosLosPacientes();
            return json_encode($listado);
        }else if($args['perfil'] == 'administradores'){
            $listado = Administrador::TraerTodosLosAdministradores();
            return json_encode($listado);
        }else if($args['perfil'] == 'doctores'){
            $listado = Doctor::TraerTodosLosDoctores();
            return json_encode($listado);
        }
        else{
            return "Fallo algo";
        }
});
$app->get('/getdoctoresturnos[/{perfil}]', function ($request, $response, $args) {
        if($args['perfil'] == 'doctores'){
            $listado = Doctor::TraerTodosLosDoctoresTurnos();
            return json_encode($listado);
        }
        else{
            return "Fallo algo";
        }
});
$app->put('/modificarPaciente[/]', function($request, $response, $args) {
    $body = $request->getBody();
    //$body = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    $input = json_decode($body); 
    var_dump($input);
    echo Paciente::ModificarPaciente($input->paciente);  
});
$app->put('/modificarAdministrador[/]', function($request, $response, $args) {
    $body = $request->getBody();
    //$body = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    $input = json_decode($body); 
    var_dump($input);
    echo Administrador::ModificarAdministrador($input->administrador);  
});
$app->put('/modificarDoctor[/]', function($request, $response, $args) {
    $body = $request->getBody();
    //$body = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    $input = json_decode($body); 
    var_dump($input);
    echo Doctor::ModificarDoctor($input->doctor);  
});
$app->get('/getturnos[/{id}/{perfil}]', function ($request, $response, $args) {
    //$body = $request->getBody();
    //$objDatos = json_decode(file_get_contents("php://input"));
    //Cualquiera de los 2 sirve :)
    //$input = json_decode($body);
    //$input = $args['perfil'];
    //console_log($input);
    $listado = Turno::TraerTodosLosTurnos($args['id'], $args['perfil']);
    return json_encode($listado);
    //return json_encode($input);
});
$app->get('/traerTurnosPorIdDoctor[/{id}]', function ($request, $response, $args) {
    $turnos = Doctor::TraerTurnosDisponibles($args['id']);
    return json_encode($turnos);
});
$app->get('/traerPacientePorId[/{id}]', function ($request, $response, $args) {
    $paciente = Paciente::TraerUnPacientePorId($args['id']);
    return json_encode($paciente);
});
$app->get('/traerDoctorPorId[/{id}]', function ($request, $response, $args) {
    $paciente = Doctor::TraerUnDoctorPorId($args['id']);
    return json_encode($doctor);
});
$app->get('/usuarios[/]', function ($request, $response, $args) {
	$listado = Persona::TraerTodosLosUsuarios();
	return json_encode($listado);
    //$response->write("Monstrar los CDS");
    //return $response;
});
$app->get('/getespecialidades[/]', function ($request, $response, $args) {
    $listado = Doctor::TraerTodasLasEspecialidades();
    return json_encode($listado);
    //$response->write("Monstrar los CDS");
    //return $response;
});


/**
 * Step 4: Run the Slim application
 *
 * This method should be called last. This executes the Slim application
 * and returns the HTTP response to the HTTP client.
 */
$app->run();
function console_log( $data ){
  echo '<script>';
  echo 'console.log('. json_encode( $data ) .')';
  echo '</script>';
};