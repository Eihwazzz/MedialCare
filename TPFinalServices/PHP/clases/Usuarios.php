<?php
include_once 'Conexion.php';
/**
* 
*/
class Usuario
{
    public $id;
    public $mail;
    public $clave;    
    public $perfil;
    private $nombre;
 
    
    function __construct($id)
    {
        $cnn = Conexion::DameAcceso();
        $sentencia = $cnn->prepare('SELECT * FROM usuario WHERE id = ?');
        $sentencia->execute(array($id));

        $fila = $sentencia->fetchObject();

        if (count($fila) > 0){
            $this->id = $id;
            $this->mail = $fila->mail;
            $this->clave = $fila->clave;
            $this->perfil = $fila->perfil;
            $this->nombre = $fila->nombre;
           
        }
    }

    public function __get($prop){
        if(property_exists('Usuario', $prop))
            return $this->$prop;
        else
            return null;
    }
    
    public function ModificarClave($clave){

        $cnn = Conexion::DameAcceso();

        $sentencia = $cnn->prepare('UPDATE usuario SET clave = ? WHERE id = ?');
        $sentencia->bindParam(1, $this->cod($clave));
        $sentencia->bindParam(2, $this->id);

        if ($sentencia->execute())
            return true;
        else
            return false;
    }

    public static function ChequearLogin($usuario, $clave){

   
        $cnn = Conexion::DameAcceso();

        $sentencia = $cnn->prepare('SELECT id, clave FROM usuario WHERE mail = ?');
        $sentencia->execute(array(strtolower($usuario)));

        $fila = $sentencia->fetchObject();
        
        if (isset($fila->clave))
        {
           if($fila->clave== $clave)
           {
            return $fila->id;
           }

            // hash_equals
            
            // if (hash_equals($this->cod($clave), $fila->clave)) // si 
           
           /* if (self::cod1($clave) === $fila->clave)
                return $fila->id_usuario;
            else
                return false;
                */
        }       
        else
            return false;
          

    }

   

    public static function ChequearLoginxID($usuario, $clave){

        $cnn = Conexion::DameAcceso();

        $sentencia = $cnn->prepare('SELECT id, clave FROM usuario WHERE id = ?');
        $sentencia->execute(array($usuario));

        $fila = $sentencia->fetchObject();
        
        if (isset($fila->clave))
        {
            // if (md5(crypt($clave, "CRYPT_BLOWFISH")) == $fila->clave)
            // if (hash_equals($this->cod($clave), $fila->clave))
            if (self::cod1($clave) === $fila->clave)
                return true;
            else
                return false;
        }       
        else
            return false;

    }

    private function cod($clave){
        // return sha1(crypt($clave, "CRYPT_BLOWFISH"));
        return sha1(md5(crypt($clave, "CRYPT_BLOWFISH")));
    }

    private static function cod1($clave){
        // return sha1(crypt($clave, "CRYPT_BLOWFISH"));
        return sha1(md5(crypt($clave, "CRYPT_BLOWFISH")));
    }

}
// $us = new Usuario(1);
// echo $us->clave . "<br>";
// echo $us->perfil;