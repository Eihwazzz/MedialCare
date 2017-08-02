<?php
require_once"AccesoDatos.php";
class Paciente
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_paciente;
	public $nombre;
	public $apellido;
    public $fechaNac;
    public $mail;    
    public $clave;
    public $dni;
    public $domicilio;
    public $foto;

	public function __construct($id_paciente=NULL)
	{
		if($id_paciente != NULL){
			$obj = Paciente::TraerUnPaciente($id_paciente);
			
			$this->apellido = $obj->apellido;
			$this->domicilio = $obj->domicilio;
			$this->dni = $obj->dni;
			$this->fechaNac = $obj->fechaNac;
			$this->mail = $obj->mail;
			$this->clave = $obj->clave;
			$this->nombre = $nombre;
			$this->foto = $obj->foto;
		}
	}
	
	public static function TraerUnPaciente($email,$clave) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pacientes where mail=:mail AND clave=:pass");
		$consulta->bindValue(':mail',$email, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('paciente');
		return $personaBuscada;	
					
	}
	public static function TraerUnPacientePorId($id) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pacientes where id_paciente=:id");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('paciente');
		return $personaBuscada;	
					
	}
        public static function TraerTodosLosPacientes()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from pacientes");
		$consulta->execute();			
		$arrPacientes= $consulta->fetchAll(PDO::FETCH_CLASS, "paciente");	
		return $arrPacientes;
	}
	public static function ChequearUsuario($email,$clave){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select id_usuario from usuario where mail=:mail AND clave=:pass");
		$consulta->bindValue(':mail',$email, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$idBuscada= $consulta->fetchColumn();
		return $idBuscada;	
	}

	public static function VerificarMailPaciente($mailYPerfil){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT clave from pacientes where mail = :mail");
		$consulta->bindValue(':mail',$mailYPerfil->mail, PDO::PARAM_STR);
		$consulta->execute();
		$numRows= $consulta->fetchColumn();
		if($numRows == 0){
			$resultado = 0;
		}else{
			$resultado = 1;
		}
		return $resultado;	
	}

	public static function TraerTodosLosUsuarios()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from usuario");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL TraerTodasLasPersonas() ");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $arrPersonas;
	}
	
	public static function BorrarPersona($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//$consulta =$objetoAccesoDato->RetornarConsulta("delete from persona	WHERE id=:id");	
		$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
		$consulta->bindValue(':id',$idParametro, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}
	
	public static function ModificarPersona($persona)
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			/*$consulta =$objetoAccesoDato->RetornarConsulta("
				update persona 
				set nombre=:nombre,
				apellido=:apellido,
				foto=:foto
				WHERE id=:id");
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();*/ 
			$consulta =$objetoAccesoDato->RetornarConsulta("CALL ModificarPersona(:id,:nombre,:apellido,:foto)");
			$consulta->bindValue(':id',$persona->id, PDO::PARAM_INT);
			$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
			$consulta->bindValue(':apellido', $persona->apellido, PDO::PARAM_STR);
			$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
			return $consulta->execute();
	}


	public static function InsertarPaciente($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pacientes (nombre,mail,clave,foto)values(:nombre,:mail,:clave,:foto)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}

	public static function TraerDomicilioPaciente($id) {	

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select latitud,longitud from pacientes where id_paciente=:id");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('paciente');
		return $personaBuscada;	
					
	}

	public static function InsertarPacienteConDomicilio($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into pacientes (nombre,mail,clave,foto,latitud,longitud,telefono)values(:nombre,:mail,:clave,:foto,:latitud,:longitud,:telefono)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':latitud', $persona->latitud, PDO::PARAM_STR);
		$consulta->bindValue(':longitud', $persona->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

        public static function ModificarPaciente($paciente)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE pacientes set nombre=:nombre,mail=:mail,clave=:clave,foto=:foto,telefono=:telefono WHERE id_paciente=:id");
		$consulta->bindValue(':id',$paciente->id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$paciente->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail',$paciente->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $paciente->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $paciente->foto, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $paciente->telefono, PDO::PARAM_STR);
		return $consulta->execute();		
		//return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
          	
				
	}



}
