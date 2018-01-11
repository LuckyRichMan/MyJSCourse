<?php
 header("Access-Control-Allow-Origin: *");
    $root = realpath($_SERVER["DOCUMENT_ROOT"]);
    include($root.'/workspace/app/models/categories.php');  
    header('Content-Type: application/json; charset=UTF-8');
    if($_POST['action']=='add'){
        $params_array['name']=$_POST['name'];
        $params_array['description']=$_POST['description'];
        addCategory($db_connect,$params_array);
    }
    if($_POST['action']=='edit'){
        $params_array['id']=$_POST['id'];
        $params_array['name']=$_POST['name'];
        $params_array['description']=$_POST['description'];
        updateCategory($db_connect,$params_array);
    }
    if($_POST['action']=='delete'){
        $params_array['id']=$_POST['id'];
        deleteCategory($db_connect,$params_array['id']);
    }
    $tarifs=array();
    $result=getAllCategories($db_connect);
    while($row = mysqli_fetch_assoc($result))
    {
        array_push($tarifs, $row);
        
    }
$array = array("categories" => $tarifs);
$result_json=json_encode($array);
print_r($result_json);
?>