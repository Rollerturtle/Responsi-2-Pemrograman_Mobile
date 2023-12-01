<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);

$jenis=trim($data['jenis']);
$keterangan=trim($data['keterangan']);
$nominal=trim($data['nominal']);

http_response_code(201);
if($jenis!='' and $keterangan!='' and $nominal!=''){
$query = mysqli_query($koneksi,"insert into keuangan(jenis,keterangan,nominal) values('$jenis','$keterangan', '$nominal')");
$pesan = true;
}else{
$pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);