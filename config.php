<?php

$host='srv1952.hstgr.io';

$db='u361267465_crm';

$user='u361267465_crm';

$pass='IgRU?2Ck|';


$conn=new mysqli($host,$user,$pass,$db);


if ($conn->connect_error) {

  die("Connection failed: " . $conn->connect_error);

}

?>