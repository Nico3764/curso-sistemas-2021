<?php

include_once("../database.php");

$json_body = file_get_contents('php://input');
$object = json_decode($json_body);

$password = $object->password;
$username = $object->username;

try
{
	$SQLCode = "SELECT id FROM user WHERE username = '$username' AND password = '$password'";
	$id = $connection->query($SQLCode)->fetch(PDO::FETCH_NUM)[0];
	//echo json_encode($result[0]);
	if( $id != null )
	{
		$session_key = uniqid();//crea la UUID
		$SQLCodeUpdate = "UPDATE user SET session_key = '$session_key' WHERE id = '$id'"; 
		$rows = $connection->query($SQLCodeUpdate)->rowCount();

		if ($rows == 1)
		{
			echo json_encode([true, $session_key]);
		}
		else
		{ 
			echo json_encode([false, null]);		
			die();
		}
	}
	else
	{
		echo json_encode([false, null]);		
		die();
	}
}
catch( PDOException $connectionException )
{
    $status = array( status=>'db-error (login.php)', description=>$connectionException->getMessage() );
    echo json_encode($status);
    die();
}

?>