<?php

$connection = null;
//Ejecutando la conexión en un bloque protegido. En caso de falla X al conectar, se atrapa la excepción
try
{
    $connection = new PDO('mysql: host=127.0.0.1:3306;dbname=crud','nico','1234');
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    

}
catch (PDOException $connectionException) 
{
    //Contestamos al cliente que su petición no se puede efectuar por un problema
    $status = array( status=>'db-error (database.php)', description=>$connectionException->getMessage() );
    echo json_encode($status);

    //Cortamos la ejecución del programa del servidor de forma forzada
    die();
};

?>
