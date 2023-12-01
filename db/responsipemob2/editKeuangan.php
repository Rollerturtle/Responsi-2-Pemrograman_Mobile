<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);

$id=trim($data['id']);
$jenis=trim($data['jenis']);
$keterangan=trim($data['keterangan']);
$nominal=trim($data['nominal']);
http_response_code(201);
if($jenis!='' and $keterangan!='' and $nominal!=''){
$query = mysqli_query($koneksi,"update keuangan set jenis='$jenis',keterangan='$keterangan', nominal='$nominal' where
id='$id'");
$pesan = true;
}else{
$pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);