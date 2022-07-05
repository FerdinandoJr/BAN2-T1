<?php
ini_set('memory_limit', '-1');
ini_set('max_execution_time', 3500); 
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if(!isset($_POST['op'])){
    die("Acesso Não Autorizado!");
}

header("Access-Control-Allow-Origin: *"); 
include("conexao.php");
$localhost = conectar();

$d1 = 'universidade';

if($_POST['op'] == "0"){
    $sql = "SELECT * FROM `$d1`.departamento";
    $r1 = $localhost->query($sql);
    $res = array();
    while ($r = $r1->fetch_array()){
        $rs = array($r[0], $r[1], $r[2]);
        $res["".$r[0]] = $rs;
    }  

    $localhost->close();
    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);
    $sql = "INSERT INTO `$d1`.departamento(nome, escritorio) VALUES('".$d[0]."', '".$d[1]."')";
    $localhost->query($sql);

    //Pega o ID do ultimo registro
    $r1 = $localhost->query("SELECT LAST_INSERT_ID()");
    $r = $r1->fetch_array();
    $idINS = $r[0];
    $localhost->close();

    die($idINS."^".$d[0]."^".$d[1]);

}else if($_POST['op'] == "2"){ /* UPDADE */
    $d = explode("^", $_POST['dados']);
    $sql = "UPDATE `$d1`.departamento SET nome='".$d[0]."',escritorio='".$d[1]."'  WHERE nr_depart =".$_POST['m'];
    $localhost->query($sql);
}

$localhost->close();


?>