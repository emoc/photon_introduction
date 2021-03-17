<?php
/*
   Script PHP pour produire un fichier JSON simple 
   
   {
     "temperature":19.3,
     "humidite":65,
     "luminosite":624,
     "valeur":123
   } 

   nb : le fichier PHP doit être enregistré en UTF-8 sans BOM 

*/
// $data = [ 'temperature' => rand(150,220) / 1019.3, 'humidite' => 65, 'luminosite' => 624, 'valeur' => 123 ];

$tem = rand(150,220) / 10;
$hum = rand(40,80);
$lum = rand(300, 2000);
$val = rand(100, 1000);

$data = [ 'temperature' => $tem, 'humidite' => $hum, 'luminosite' => $lum, 'valeur' => $val ];

header('Content-type:application/json;charset=utf-8');
echo json_encode( $data );

?>