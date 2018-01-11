<?php
    //file with db parameters and connect routine
    $db_name="friday13";
    $db_hostname="127.0.0.1";
    $db_username="root";
    $db_password="";
    $db_connect=mysqli_connect($db_hostname, $db_username, $db_password, $db_name);
    if (!$db_connect) {
        echo "Error: Unable to connect to MySQL." . PHP_EOL;
        echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
        echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
        exit;
    }
    $query=mysqli_query($db_connect,"set names utf8");
?>