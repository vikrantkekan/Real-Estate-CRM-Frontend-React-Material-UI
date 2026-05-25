<?php 
include_once('./config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');

/*

  $hub_mode=$_GET['hub_mode'];
  $hub_challenge=$_GET['hub_challenge'];
  $hub_verify_token=$_GET['hub_verify_token'];


if($hub_verify_token=='vikrantkekan9421973844'){
    
    
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

$myfile = fopen("sample.txt", "w") or die("Unable to open file!");

fwrite($myfile, $data);
fclose($myfile);

echo $hub_challenge;
    
}else{
    echo "Erro";
}

*/


$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

 error_log(print_r($input, true));
 

 //$entry=$input['entry'];
 
 
 
 $sql="insert into lead_notific(`from`,`stream`,`status`)values('fb','$inputJSON','0')";
 if($conn->query($sql)===TRUE){
    echo json_encode(200); 
 }else{
     echo $conn->error;
 }
 


?>