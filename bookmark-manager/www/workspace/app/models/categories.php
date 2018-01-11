<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
include($root."/workspace/app/dbconnect.php");

//add new category
function addCategory(mysqli $db_connect, $params_array){
    $result=mysqli_query($db_connect,"INSERT INTO `categories` VALUES (DEFAULT, '".$params_array['name']."','".$params_array['description']."',NOW());");
}

//delete category
function deleteCategory(mysqli $db_connect, $id){
    $result=mysqli_query($db_connect,"DELETE FROM `categories` WHERE id=".$id);
    $result=mysqli_query($db_connect,"DELETE FROM `bookmarks` WHERE categoryid=".$id);
}

//update category
function updateCategory(mysqli $db_connect, $params_array){
    $result=mysqli_query($db_connect,"UPDATE `categories` SET name='".$params_array['name']."', description='".$params_array['description']."' WHERE id='".$params_array['id']."';");
}

//get category by id
function getCategoryById(mysqli $db_connect, $id) {
    $result=mysqli_query($db_connect,"SELECT * FROM `categories` WHERE id=".$id);
    while($row = mysqli_fetch_assoc($result))
    {
       return $row;
    }
}

//get the list of all categories
function getAllCategories(mysqli $db_connect) {
    $result=mysqli_query($db_connect,"SELECT * FROM `categories` WHERE 1");
    return $result;
}
?>