<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
include($root."/workspace/app/dbconnect.php");

//add new bookmark
function addBookmark(mysqli $db_connect, $params_array){
    $result=mysqli_query($db_connect,"INSERT INTO `bookmarks` VALUES (DEFAULT, '".$params_array['name']."','".$params_array['link']."','".$params_array['description']."','".$params_array['imgsource']."',NOW(),'".$params_array['categoryid']."');");
}

//delete bookmark
function deleteBookmark(mysqli $db_connect, $id){
    $result=mysqli_query($db_connect,"DELETE FROM `bookmarks` WHERE id=".$id);
}

//update bookmark
function updateBookmark(mysqli $db_connect, $params_array){
    $result=mysqli_query($db_connect,"UPDATE `bookmarks` SET name='".$params_array['name']."', link='".$params_array['link']."', description='".$params_array['description']."' WHERE id='".$params_array['id']."';");
}

//get bookmark by id
function getBookmarkById(mysqli $db_connect, $id) {
    $result=mysqli_query($db_connect,"SELECT * FROM `bookmarks` WHERE id=".$id);
    while($row = mysqli_fetch_assoc($result))
    {
       return $row;
    }
}

//get the list of all bookmarks
function getAllBookmarks(mysqli $db_connect) {
    $result=mysqli_query($db_connect,"SELECT * FROM `bookmarks` WHERE 1");
    return $result;
}
?>