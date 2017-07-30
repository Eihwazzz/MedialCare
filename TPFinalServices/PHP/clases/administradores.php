<?php
require_once"AccesoDatos.php";
class Administrador
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_administrador;
	public $nombre;
    public $mail;
    public $clave;    
    public $foto;

	public function __construct($id_administrador=NULL)
	{
		if($id_administrador != NULL){
			$obj = Administrador::TraerUnAdministrador($id_administrador);
			
			$this->mail = $obj->mail;
			$this->clave = $obj->clave;
			$this->nombre = $nombre;
			$this->foto = $obj->foto;
		}
	}
	
	public static function TraerUnAdministrador($email,$clave) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from administradores where mail=:mail AND clave=:pass");
		$consulta->bindValue(':mail',$email, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('administrador');
		return $personaBuscada;	
					
	}
        public static function TraerTodosLosAdministradores()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from administradores");
		$consulta->execute();			
		$arrAdministradores= $consulta->fetchAll(PDO::FETCH_CLASS, "administrador");	
		return $arrAdministradores;
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

	public static function VerificarMailAdministrador($mailYPerfil){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT clave from administradores where mail = :mail");
		$consulta->bindValue(':mail',$mailYPerfil->mail, PDO::PARAM_STR);
		$consulta->execute();
		$result= $consulta->fetchColumn();
		if($result == 0){
			$resultado = 0;
		}else{
			$resultado = $result;
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
	
	public static function BorrarAdministrador($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from administradores	WHERE id_administrador=:id");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL BorrarPersona(:id)");	
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


	public static function InsertarAdministrador($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into administradores (nombre,mail,clave,foto)values(:nombre,:mail,:clave,:foto)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	public static function ModificarAdministrador($administrador){

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE administradores set nombre=:nombre,mail=:mail,clave=:clave,foto=:foto WHERE id_administrador=:id");
		$consulta->bindValue(':id',$administrador->id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$administrador->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail',$administrador->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $administrador->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $administrador->foto, PDO::PARAM_STR);
		return $consulta->execute();		
		//return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}



}
