<?php
require_once"AccesoDatos.php";
class Logger
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_log;
	public $usuario;
	public $perfil;
	public $mail;    
    public $ip;
    public $pais;
    public $accion;

	public function __construct($id_log=NULL)
	{
		if($id_log != NULL){
			$obj = logger::TraerUnLog($id_log);
			
			$this->usuario = $obj->usuario;
			$this->perfil = $obj->perfil;
			$this->mail = $obj->mail;
			$this->ip = $obj->ip;
			$this->pais = $obj->pais;
			$this->accion = $obj->accion;
		}
	}

	public static function TraerUnLog($idLog) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from logs where id_log=:idLog");
		$consulta->bindValue(':idLog',$idLog, PDO::PARAM_INT);
		$consulta->execute();
		$logBuscado= $consulta->fetchObject('logger');
		return $logBuscado;	
					
	}
	
	public static function InsertarLog($datos)
	{

		try{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//return $datos;
		$consulta = $objetoAccesoDato->RetornarConsulta("INSERT into logs (usuario,perfil,mail,ip,pais,accion)values(:usuario,:perfil,:mail,:ip,:pais,:accion)");
		$consulta->bindValue(':usuario',$datos->info->usuario, PDO::PARAM_STR);
		$consulta->bindValue(':perfil', $datos->info->perfil, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $datos->info->mail, PDO::PARAM_STR);
		$consulta->bindValue(':ip', $datos->info->ip, PDO::PARAM_STR);
		$consulta->bindValue(':pais', $datos->info->pais, PDO::PARAM_STR);
		$consulta->bindValue(':accion', $datos->info->accion, PDO::PARAM_STR);
		$consulta->execute();
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
		}catch(Exception $e){
			return $e;
		}
	}


}
