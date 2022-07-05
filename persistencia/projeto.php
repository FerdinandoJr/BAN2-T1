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
    $sql = "SELECT * FROM `$d1`.projeto";
    $r1 = $localhost->query($sql);
    $res = array();
    while ($r = $r1->fetch_array()){

        $dateI = explode("-", $r[3]);
        $dateF = explode("-", $r[4]);
        $dateI = $dateI[2]."/".$dateI[1]."/".$dateI[0];
        $dateF = $dateF[2]."/".$dateF[1]."/".$dateF[0];


        $rs = array($r[0], $r[1], $r[2], $dateI, $dateF, $r[5], $r[6]);
        $res["".$r[0]] = $rs;
    }  

    $localhost->close();
    $json = json_encode($res);
    die($json);

}else if($_POST['op'] == "1"){ /* INSERT */
    $d = explode("^", $_POST['dados']);

    $dateI = explode("/", $d[2]);
    $dateF = explode("/", $d[3]);
    $dateI = $dateI[2]."-".$dateI[1]."-".$dateI[0];
    $dateF = $dateF[2]."-".$dateF[1]."-".$dateF[0];

    
    $sql = "INSERT INTO `$d1`.projeto(nome, orgao, data_ini, data_fim, orcamento, pesquisador) VALUES('".$d[0]."', '".$d[1]."', '".$dateI."', '".$dateF."', ".$d[4].", ".$d[5].")";
    $localhost->query($sql);

    //Pega o ID do ultimo registro
    $r1 = $localhost->query("SELECT LAST_INSERT_ID()");
    $r = $r1->fetch_array();
    $idINS = $r[0];
    $localhost->close();
    die($idINS."^".$d[0]."^".$d[1]."^".$d[2]."^".$d[3]."^".$d[4]."^".$d[5]);

}


$localhost->close();


?>