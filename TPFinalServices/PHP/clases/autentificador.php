<?php
include_once 'JWT.php';
include_once 'ExpiredException.php';
include_once 'BeforeValidException.php';
include_once 'SignatureInvalidException.php';
include_once 'Personas.php';
include_once 'pacientes.php';
include_once 'administradores.php';
include_once 'doctores.php';


header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
/*header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');*/



$objDatos = json_decode(file_get_contents("php://input"));

//$idUser = Persona::ChequearUsuario($objDatos->mail, $objDatos->clave);
if($objDatos->perfil == "Administrador"){
    $persona = Administrador::TraerUnAdministrador($objDatos->mail, $objDatos->clave);
    $idUsuario = $persona->id_administrador;
}else if($objDatos->perfil == "Paciente"){
    $persona = Paciente::TraerUnPaciente($objDatos->mail, $objDatos->clave);
    $idUsuario = $persona->id_paciente;
}else if($objDatos->perfil == "Doctor"){
    $persona = Doctor::TraerUnDoctor($objDatos->mail, $objDatos->clave);
    $idUsuario = $persona->cod_doctor;
}else{
    echo false;
}

if ($idUsuario == false){
	// header('HTTP/1.1 401 Usuario o clave incorrecto');
	// header('url=clave.html');
	echo false;
}
else{


	/* $usuario = new Usuario($idUser);
	$token = array(
		    "id" => $usuario->id,
		    "nombre" => $usuario->nombre,
		    "perfil" => $objDatos->perfil,
		     "exp" => time() + 96000
		    // "iat" => 1356999524,
		    // "nbf" => 1357000000
		    		);
		    		*/

$token = array(
		    "id" => $idUsuario,
		    "mail" => $persona->mail,
		    "nombre" => $persona->nombre,
		    "perfil" => $objDatos->perfil,
		     "exp" => time() + 900
		    // "iat" => 1356999524,
		    // "nbf" => 1357000000
		    		);

		 $token = Firebase\JWT\JWT::encode($token, 'tokenMed');
		
		$array['tokenMed'] = $token;

	//$auth = new Auth($idUser);

	echo json_encode($array);
}
