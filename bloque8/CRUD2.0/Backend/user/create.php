<?php

include_once( "database.php");

$json_body = file_get_contents('php://input');

//Deserializar: JSON->FormatoPHP 
//Transformamos texto JSON en objeto PHP para poder manipularlo con el lenguaje
$object = json_decode($json_body);

//Tomamos la información necesaria del objeto recibido
$password = $object->password;
$username = $object->username;

$new_user = [7, $username, $password];
array_push($_SESSION['data'], $new_user);

echo json_encode($_SESSION['data']);

?>