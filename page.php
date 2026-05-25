<?php 
include_once('./config.php');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST');
date_default_timezone_set("Asia/Kolkata");


$inputJSON = file_get_contents('php://input');

//$input = json_decode($inputJSON, true);
//$inputJSON='{"entry": [{"id": "251159368070011", "time": 1714732633, "changes": [{"value": {"created_time": 1714732630, "leadgen_id": "1117458006159310", "page_id": "251159368070011", "form_id": "238869312612263"}, "field": "leadgen"}]}], "object": "page"}';

$data2=json_decode($inputJSON,true);

foreach($data2['entry'] as $k1 => $v1){

  foreach($v1 as $k2=>$v2){

if($k2=='changes'){
foreach($v2 as $k3=>$v3){

foreach($v3 as $k4=>$v4){
if($k4=='value'){


  foreach($v4 as $k5=>$v5){

//echo $k5.'=>'.$v5."<br>";

if($k5=='ad_id'){$ad_id=$v5;}
elseif ($k5=='form_id') {$form_id=$v5;}
elseif ($k5=='leadgen_id') {$leadgen_id=$v5;}
elseif ($k5=='created_time') {$created_time=date("Y/m/d h:i:sa", $v5);}
elseif ($k5=='page_id') {$page_id=$v5;}
elseif ($k5=='adgroup_id') {$adgroup_id=$v5;}
else{}

}


//for single foreach loop lead changes

//retrieve campaigns and form mapping details

$query2="select * from campaigns where form_id='$form_id'";
$result_query2=$conn->query($query2);
if($result_query2->num_rows>0){
  while($rowquery=$result_query2->fetch_assoc()){

$campid=$rowquery['campid'];
$campid_s=$rowquery['camp_id'];
$projectid=$rowquery['pid'];
$camp_name=$rowquery['camp_name'];
$ad_id=$rowquery['ad_id'];
$map=$rowquery['field_map_pri'];
$forclie=$rowquery['forclie'];

  }
}
else{
die();
}

//echo $camp_name;

$query="insert into crm_leads(`lead_id`,`source`, `platform`, `project_id`, `campid`, `camp_name`, `on_date`,`last_foll_date`,`last_foll`,`old_updated_data`,`form_id`,`ad_id`,`status`,`forclie`)values('$leadgen_id','Digital','fb/insta','$projectid','$campid','$camp_name','$created_time','$created_time','{}','{}','$form_id','$ad_id','0','$forclie')";
if($conn->query($query)===TRUE){

//retrive token from pageid
$sql2="select token,pageid from connect where pageid='$page_id'";
$result2=$conn->query($sql2);
if($result2->num_rows>0){

while($row2=$result2->fetch_assoc()){
  $tok=$row2['token'];
}

//if token get retrieve fetch leads data
$url='https://graph.facebook.com/v19.0/'.$leadgen_id.'?access_token='.$tok;
$crl = curl_init();
        curl_setopt($crl, CURLOPT_URL, $url);
        curl_setopt($crl, CURLOPT_FRESH_CONNECT, true);
        curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
         
     $response = curl_exec($crl);
     $result = json_decode($response, true);
     curl_close($crl);

if(isset($result['error'])){
  die();
//here need to update token or anything else code


}else{

     $field_data=$result['field_data'];
    
// print_r($result);
//echo count($field_data);

$map=json_decode($map,true);

$update_str='';

for($i=0;$i<count($field_data);$i++){

//echo $map[$field_data[$i]['name']].'<br>';

//$update_str.=$map[$field_data[$i]['name']].',';

//echo $field_data[$i]['name']."=>".$field_data[$i]['values'][0].'<br>';
if($i==0){
$update_str.="".$map[$field_data[$i]['name']]."='".$field_data[$i]['values'][0]."'";
}else{
$update_str.=",".$map[$field_data[$i]['name']]."='".$field_data[$i]['values'][0]."'";
}


    }

//here lead update logic

echo $update_str;

$final="update crm_leads set ".$update_str." where lead_id='$leadgen_id'";
if($conn->query($final)===TRUE){
echo $update_str;


//send thannk-you mail

/*
   $postData = [
        "leadid" => $leadgen_id,
        "clientid" => $forclie
    ];

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, "https://3dotsdesign.in/demo/demo/email/Thank-you-mail.php");
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($postData));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json'
    ]);

    $response = curl_exec($ch);
    curl_close($ch);
*/


}else{
  echo $conn->error;
}

}

}
else{
  //if pageid not found insert into notification with status 2
  $sql31="insert into lead_notific(`lead_gen_id`,`from_s`,`stream`,`status`)values('$leadgen_id','fb','$inputJSON','2',)";
  $conn->query($sql31);
   die();
}

}
else{
  
  //lost lead didnt inserted move to notific 
   $sql3="insert into lead_notific(`lead_gen_id`,`from_s`,`stream`,`status`)values('$leadgen_id','fb','$inputJSON','0')";
    $conn->query($sql3);
}

//foreach end loop starting
  }

  }}

}}}


$sql="select tok from users";
 $result=$conn->query($sql);
 if($result->num_rows>0){
   while($row=$result->fetch_assoc()){
      $token[]=$row['tok']; 
      echo $row['tok'];
   }
 }

define('server_key','AAAAPcpbK30:APA91bE7u1Q7yCkuSPqxWt4m3xh683IliaNvWlhqlmQBATzzEtJtLJZwPy1vtoYvNjHuNVWoq10l1K5fAz_sRg40XIOIBlQ82taBTPyCjvc6P2Y8u_2QEHCJG5sH6m13dRZ4HeSLkRXH');

$header =['Authorization: key=' .server_key,'Content-Type: application/json'];

    $msg=['title'=>'New Lead Generated','body' =>'Notification from 3Dots Design',
          'icon' =>'',
          'image' =>'',
          'click_action' =>'',
        ];
        
        $payload=['registration_ids' => $token,'data'=> $msg,];
            
         $curl = curl_init();

   curl_setopt_array($curl, array(
  CURLOPT_URL => "https://fcm.googleapis.com/fcm/send",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST => "POST",
  CURLOPT_POSTFIELDS => json_encode($payload),
  CURLOPT_HTTPHEADER =>$header
));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);


echo json_encode(200);

?>