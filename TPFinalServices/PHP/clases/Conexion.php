<?php
class Conexion
{
	private static $ObjetoAccesoDatos;
    private $objetoPDO;
 	
 	public $host = 'mysql:host=localhost;dbname=medicalDB;charset=utf8';
 	public $usuario = "root"; // "claudiou";
 	public $clave = "";

    private function __construct()
    {
        try { 
            $this->objetoPDO = new PDO($this->host, $this->usuario, $this->clave, array(PDO::ATTR_EMULATE_PREPARES => false,PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            $this->objetoPDO->exec("SET CHARACTER SET utf8");
            }
        catch (PDOException $e) { 
            print "Error!: " . $e->getMessage(); 
            die();
        }
    }
    
    public static function DameAcceso()
    { 
        if (!isset(self::$ObjetoAccesoDatos)) {
            $cnn = new Conexion();
            self::$ObjetoAccesoDatos = $cnn->objetoPDO;
        } 
        return self::$ObjetoAccesoDatos;        
    }
 
 
     // Evita que el objeto se pueda clonar
    public function __clone()
    { 
        trigger_error('La clonación de este objeto no está permitida', E_USER_ERROR); 
    }
}