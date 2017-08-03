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

    public static function TraerTodosLosDoctoresTurnosPorEspecialidad($idEspecialidad)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select doc.*, esp.nombre_espec from doctores doc, med_espec me, especialidades esp where doc.cod_doctor = me.cod_med and esp.cod_espec = me.cod_espec and esp.cod_espec = :idEspecialidad");
		$consulta->bindValue(':idEspecialidad',$idEspecialidad, PDO::PARAM_INT);
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
	public static function ChequearCodigoDoctor($codigo){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			select codigo 
			from codigo_registros 
			where codigo=:codigo");
		$consulta->bindValue(':codigo',$codigo, PDO::PARAM_INT);
		$consulta->execute();
		$result= $consulta->fetchAll(PDO::FETCH_CLASS, "doctor");
		if($result == 0){
			$resultado = 0;
		}else{
			$resultado = $result;
		}
		return $resultado;	
	}

	public static function marcarAsistencia($datos){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso();
		$consulta =$objetoAccesoDato->RetornarConsulta("
			update turnos 
			set asistido = :asistencia
			where id_turno=:idTurno");
		$consulta->bindValue(':asistencia',$datos->asistencia, PDO::PARAM_INT);
		$consulta->bindValue(':idTurno',$datos->turno, PDO::PARAM_INT);
		$consulta->execute();
		return $consulta->rowCount() ? true : false;	
	}

	public static function VerificarMailDoctor($mailYPerfil){
		
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT clave from doctores where mail = :mail");
		$consulta->bindValue(':mail',$mailYPerfil->mail, PDO::PARAM_STR);
		$consulta->execute();
		$result= $consulta->fetchAll(PDO::FETCH_CLASS, "doctor");
		if($result == 0){
			$resultado = 0;
		}else{
			$resultado = $result;
		}
		return $resultado;
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

	public static function TraerCantidadDoctoresPorEspecialidad()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			select count(me.cod_med) as cantidad, e.nombre_espec
			from med_espec me, especialidades e
			where me.cod_espec = e.cod_espec
			group by e.nombre_espec");
		$consulta->execute();			
		$listado= $consulta->fetchAll(PDO::FETCH_CLASS, "persona");	
		return $listado;
	}
	
	public static function BorrarDoctor($idParametro)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("delete from doctores WHERE cod_doctor=:id");	
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
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into doctores (nombre,mail,clave,foto,telefono)values(:nombre,:mail,:clave,:foto,:telefono)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_STR);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}	

	public static function BorrarDisponibilidad($idDoctor)
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			DELETE FROM rel_doctor_dia 
			WHERE cod_doctor=:id");	
		$consulta->bindValue(':id',$idDoctor, PDO::PARAM_INT);		
		$consulta->execute();
		return $consulta->rowCount();
		
	}

	public static function InsertarDiasDisponibilidad($datos)
	{
		try{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		//return $datos->dias;
		for ($i = 0; $i < count($datos->dias); $i++) {
			//return $datos->dias[$i];
			$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into rel_doctor_dia (cod_doctor,cod_dia)values(:idDoctor,:codigo)");
		    $consulta->bindValue(':codigo',$datos->dias[$i], PDO::PARAM_INT);
		    $consulta->bindValue(':idDoctor', $datos->idDoctor, PDO::PARAM_INT);
		    $consulta->execute();
		}

		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}catch(Exception $e){
		return $e;
	}
	
				
	}

	public static function TraerDomicilioDoctor($id) {	

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select latitud,longitud from doctores where cod_doctor=:id");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('doctor');
		return $personaBuscada;	
					
	}

	public static function TraerEspecialidad($id) {	

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT e.nombre_espec
			FROM especialidades e, med_espec me
			WHERE e.cod_espec = me.cod_espec
			AND me.cod_med = :id");
		$consulta->bindValue(':id',$id, PDO::PARAM_INT);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('doctor');
		return $personaBuscada;	
					
	}

	public static function InsertarDoctorConDomicilio($persona)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("INSERT into doctores (nombre,mail,clave,foto,latitud,longitud,telefono)values(:nombre,:mail,:clave,:foto,:latitud,:longitud,:telefono)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		$consulta->bindValue(':nombre',$persona->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail', $persona->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $persona->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $persona->foto, PDO::PARAM_STR);
		$consulta->bindValue(':latitud', $persona->latitud, PDO::PARAM_STR);
		$consulta->bindValue(':longitud', $persona->longitud, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $persona->telefono, PDO::PARAM_STR);
		$consulta->execute();	
		$idDoctor = $objetoAccesoDato->RetornarUltimoIdInsertado();

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta = $objetoAccesoDato->RetornarConsulta("INSERT into med_espec (cod_med, cod_espec) values(:idDoctor,:especialidad)");	
		$consulta->bindValue(':especialidad',$persona->especialidad, PDO::PARAM_INT);
		$consulta->bindValue(':idDoctor', $idDoctor, PDO::PARAM_INT);
		$consulta->execute();	
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
	}

	public static function ModificarDoctor($doctor){

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("UPDATE doctores set nombre=:nombre,mail=:mail,clave=:clave,foto=:foto,telefono=:telefono WHERE cod_doctor=:id");
		$consulta->bindValue(':id',$doctor->id, PDO::PARAM_INT);
		$consulta->bindValue(':nombre',$doctor->nombre, PDO::PARAM_STR);
		$consulta->bindValue(':mail',$doctor->mail, PDO::PARAM_STR);
		$consulta->bindValue(':clave', $doctor->clave, PDO::PARAM_STR);
		$consulta->bindValue(':foto', $doctor->foto, PDO::PARAM_STR);
		$consulta->bindValue(':telefono', $doctor->telefono, PDO::PARAM_STR);
		return $consulta->execute();		
		//return $objetoAccesoDato->RetornarUltimoIdInsertado();
	}



}
