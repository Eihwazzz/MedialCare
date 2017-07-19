<?php
require_once"AccesoDatos.php";
class Doctor
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $cod_doctor;
	public $nombre;
	public $apellido;
    public $fechaNac;
    public $mail;    
    public $clave;
    public $dni;
    public $foto;

	public function __construct($cod_doctor=NULL)
	{
		if($cod_doctor != NULL){
			$obj = Doctor::TraerUnDoctor($cod_doctor);
			
			$this->apellido = $obj->apellido;
			$this->dni = $obj->dni;
			$this->fechaNac = $obj->fechaNac;
			$this->mail = $obj->mail;
			$this->clave = $obj->clave;
			$this->nombre = $nombre;
			$this->foto = $obj->foto;
		}
	}
	
	public static function TraerUnDoctor($email,$clave) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from doctores where mail=:mail AND clave=:pass");
		$consulta->bindValue(':mail',$email, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('doctor');
		return $personaBuscada;	
					
	}
        public static function TraerTodosLosDoctores()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from doctores");
		$consulta->execute();			
		$arrDoctores= $consulta->fetchAll(PDO::FETCH_CLASS, "doctor");	
		return $arrDoctores;
	}
	    public static function TraerTodosLosDoctoresTurnos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select doc.*, esp.nombre_espec from doctores doc, med_espec me, especialidades esp where doc.cod_doctor = me.cod_med and esp.cod_espec = me.cod_espec");
		$consulta->execute();			
		$arrDoctores= $consulta->fetchAll(PDO::FETCH_CLASS, "doctor");	
		return $arrDoctores;
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
	public static function TraerTodasLasEspecialidades()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from especialidades");
		$consulta->execute();			
		$arrPersonas= $consulta->fetchAll(PDO::FETCH_CLASS, "doctor");	
		return $arrPersonas;
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
	
	public static function TraerUnDoctorPorId($id) {	

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from doctores where cod_doctor=:id");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('doctor');
		return $personaBuscada;	
					
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


	public static function InsertarDoctor($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into doctores (nombre,mail,clave,foto)values(:nombre,:mail,:clave,:foto)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	public static function ModificarDoctor($doctor){

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE doctores set nombre=:nombre,mail=:mail,clave=:clave,foto=:foto WHERE cod_doctor=:id");
		$consulta->bindValue(':id',$doctor->id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$doctor->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail',$doctor->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $doctor->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $doctor->foto, PDO::PARAM_STR);
		return $consulta->execute();		
		//return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}



}
