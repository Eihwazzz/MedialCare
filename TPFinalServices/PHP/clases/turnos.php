<?php
require_once"AccesoDatos.php";
class Turno
{
//--------------------------------------------------------------------------------//
//--ATRIBUTOS
	public $id_turno;
	public $id_paciente;
    public $cod_doctor;
    public $fecha;    
    public $horario;

	public function __construct($id_turno=NULL)
	{
		if($id_turno != NULL){
			$obj = Turno::TraerUnTurno($id_turno);
			
			$this->id_paciente = $obj->id_paciente;
			$this->cod_doctor = $obj->cod_doctor;
			$this->fecha = $obj->fecha;
			$this->horario = $obj->horario;
		}
	}
	
	public static function TraerUnTurno($id_paciente,$cod_doctor) 
	{	
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("select * from administradores where mail=:mail AND clave=:pass");
		$consulta->bindValue(':mail',$email, PDO::PARAM_STR);
		$consulta->bindValue(':pass', $clave, PDO::PARAM_STR);
		$consulta->execute();
		$personaBuscada= $consulta->fetchObject('administrador');
		return $personaBuscada;	
					
	}
        public static function TraerTodosLosTurnos($id, $perfil)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		if(strtolower($perfil) == 'paciente'){
			$consulta =$objetoAccesoDato->RetornarConsulta("
				SELECT t.*, e.nombre_espec 
				FROM especialidades e, turnos t, med_espec me
				WHERE t.cod_doctor = me.cod_med
				AND e.cod_espec = me.cod_espec
				AND t.id_paciente = :id");
		}else if(strtolower($perfil) == 'doctor'){
			$consulta =$objetoAccesoDato->RetornarConsulta("
				SELECT t.*, e.nombre_espec 
				FROM especialidades e, turnos t, med_espec me
				WHERE t.cod_doctor = me.cod_med
				AND e.cod_espec = me.cod_espec
				AND cod_doctor=:id");
		}else{
			$consulta =$objetoAccesoDato->RetornarConsulta("
				SELECT t.*, e.nombre_espec 
				FROM especialidades e, turnos t, med_espec me
				WHERE t.cod_doctor = me.cod_med
				AND e.cod_espec = me.cod_espec");
		}
		$consulta->bindValue(':id', $id, PDO::PARAM_INT);
		$consulta->execute();
		$arrTurnos= $consulta->fetchAll(PDO::FETCH_CLASS, "turno");	
		return $arrTurnos;
	}

	public static function TraerTurnos()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT t.fecha,  e.nombre_espec
			FROM turnos t, med_espec me, especialidades e 
			WHERE t.cod_doctor = me.cod_med
			AND e.cod_espec = me.cod_espec");
		$consulta->execute();
		$arrTurnos= $consulta->fetchAll(PDO::FETCH_CLASS, "turno");	
		return $arrTurnos;
	}
	
	public static function TraerTurnosPorDoctor($idDoctor)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT t.fecha,  t.horario
			FROM turnos t
			WHERE t.cod_doctor = :idDoctor");
		$consulta->bindValue(':idDoctor',$idDoctor, PDO::PARAM_INT);
		$consulta->execute();
		$arrTurnos= $consulta->fetchAll(PDO::FETCH_CLASS, "turno");	
		return $arrTurnos;
	}
	/*
	select hora from disponibilidad_horaria
        WHERE hora NOT IN (SELECT t.horario
			FROM turnos t
			WHERE t.cod_doctor = 1
            AND t.fecha = date_format('2017-08-10', '%Y-%m-%d'))
	*/
    public static function TraerDisponibilidadHoraria($datos)
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT hora 
			FROM disponibilidad_horaria
        	WHERE hora NOT IN (SELECT t.horario
			FROM turnos t
			WHERE t.cod_doctor = :idDoctor
            AND t.fecha = :fecha)");
		$dt = DateTime::createFromFormat('d/m/Y', $datos->info->fecha);
		$format = "Y-m-d"; //or something else that date() accepts as a format
		//return date_format(date_create($dt->format(DateTime::ATOM)), $format);
		$consulta->bindValue(':idDoctor',$datos->info->idDoctor, PDO::PARAM_INT);
		$consulta->bindValue(':fecha',date_format(date_create($dt->format(DateTime::ATOM)), $format), PDO::PARAM_STR);
		$consulta->execute();
		$arrTurnos= $consulta->fetchAll(PDO::FETCH_CLASS, "turno");	
		return $arrTurnos;
	}

	public static function TraerTurnosPorEspecialidad()
	{
		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("
			SELECT 
				MONTH(t.fecha) AS MES, 
			    COUNT(t.nombre_espec) AS CANT_ESPEC, 
			    t.nombre_espec
			FROM 
				turnos t
			GROUP BY
				t.nombre_espec, MES
			ORDER BY
				MES");
		$consulta->execute();
		$arrTurnos= $consulta->fetchAll(PDO::FETCH_CLASS, "turno");	
		return $arrTurnos;
	}

	public static function GuardarTurno($turno){

		$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
		$consulta =$objetoAccesoDato->RetornarConsulta("INSERT into turnos (cod_doctor,id_paciente,fecha,horario,nombre_espec)values(:idDoctor,:idPaciente,:fecha,:hora,:nombreEspec)");
		//$consulta =$objetoAccesoDato->RetornarConsulta("CALL InsertarPersona (:nombre,:apellido,:dni,:foto)");
		//$timestamp = strtotime($turno->fecha);
		$dt = DateTime::createFromFormat('d/m/Y', $turno->fecha);
		//return date('d/m/Y', $dt->getTimestamp());
		//return $dt->format(DateTime::ATOM);
		//echo $dt->getTimestamp(); # or $dt->format('U');
		//date('d/m/Y', $dt->getTimestamp());
		$consulta->bindValue(':idDoctor',$turno->cod_doctor, PDO::PARAM_INT);
		$consulta->bindValue(':idPaciente', $turno->id_paciente, PDO::PARAM_INT);
		$consulta->bindValue(':fecha', $dt->format(DateTime::ATOM), PDO::PARAM_STR);
		$consulta->bindValue(':nombreEspec', $turno->nombreEspec, PDO::PARAM_STR);
		$consulta->bindValue(':hora', $turno->hora, PDO::PARAM_INT);
		$consulta->execute();		
		return $objetoAccesoDato->RetornarUltimoIdInsertado();
	
				
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

}
