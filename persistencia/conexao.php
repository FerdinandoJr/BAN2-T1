<?php
	function conectar() { 
	global $database_localhost;

	$hostname_localhost = "localhost";
	$username_localhost = "root";
	$password_localhost = "";
	$database_localhost = "universidade";

	$localhost = new mysqli($hostname_localhost, $username_localhost, $password_localhost);
	#$localhost = mysqli($hostname_localhost, $username_localhost, $password_localhost);
	if (mysqli_connect_errno()) {
	    printf("Erro na Conexão com o Banco de Dados: %s\n", mysqli_connect_error());
	    exit();
	}
	return $localhost;
	}
?>

