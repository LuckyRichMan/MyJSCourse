<?php
 header("Access-Control-Allow-Origin: *");
    $root = realpath($_SERVER["DOCUMENT_ROOT"]);
    include($root.'/workspace/app/models/bookmarks.php');  
    header('Content-Type: application/json; charset=UTF-8');
    if($_POST['action']=='add'){
        $params_array['name']=$_POST['name'];
        $params_array['link']=$_POST['link'];
        $params_array['description']=$_POST['description'];
        $params_array['categoryid']=$_POST['categoryid'];
        /*$target_dir = $root."/uploads/";
        $target_file = $target_dir . basename($_FILES["imgfile"]["name"]);
        $uploadOk = 1;
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $check = getimagesize($_FILES["imgfile"]["tmp_name"]);
            if($check !== false) {
                echo "File is an image - " . $check["mime"] . ".";
                $uploadOk = 1;
            } else {
                echo "File is not an image.";
                $uploadOk = 0;
            }
        }
        // Check if file already exists
        if (file_exists($target_file)) {
            echo "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["imgfile"]["size"] > 500000) {
            echo "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "gif" ) {
            echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            echo "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["imgfile"]["tmp_name"], $target_file)) {
                echo "The file ". basename( $_FILES["imgfile"]["name"]). " has been uploaded.";
            } else {
                echo "Sorry, there was an error uploading your file.";
            }
        }
        $params_array['imgsource']="uploads/".basename($_FILES["imgfile"]["name"]);*/
        addBookmark($db_connect,$params_array);
    }
    if($_POST['action']=='edit'){
        $params_array['id']=$_POST['id'];
        $params_array['name']=$_POST['name'];
        $params_array['link']=$_POST['link'];
        $params_array['description']=$_POST['description'];
        $params_array['categoryid']=$_POST['categoryid'];
        updateBookmark($db_connect,$params_array);
    }
    if($_POST['action']=='delete'){
        $params_array['id']=$_POST['id'];
        deleteBookmark($db_connect,$params_array['id']);
    }
    $tarifs=array();
    $result=getAllBookmarks($db_connect);
    while($row = mysqli_fetch_assoc($result))
    {
        array_push($tarifs, $row);
        
    }
$array = array("bookmarks" => $tarifs);
$result_json=json_encode($array);
print_r($result_json);
?>