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
if($_POST['op'] == "1"){ /* INSERT */
    $sql = "INSERT INTO `$d1`.professor_projeto(nr_matricula, nr_projeto) VALUES(".$_POST["codP"].", ".$_POST["cod"].")";
    $localhost->query($sql);
}

$sql = "SELECT e.mat_prof, e.nome from `$d1`.professor e 
inner JOIN `$d1`.professor_projeto  a on e.mat_prof = a.nr_matricula 
inner join `$d1`.projeto p on  p.nr_projeto = a.nr_projeto and p.nr_projeto =".$_POST['cod'] ;
$r1 = $localhost->query($sql);
$res = array();
while ($r = $r1->fetch_array()){
    $rs = array($r[0], $r[1]);
    $res["".$r[0]] = $rs;
}  

$localhost->close();
$json = json_encode($res);
die($json);
?>