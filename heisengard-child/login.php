<?php
require_once ('../../../wp-config.php');

if (!empty($_POST)){
	global $wpdb;

    $response = array("result"=>array(), "error"=>"");
    $username = $_POST["username"];
    $pass = $_POST["pass"];

    /* Server side PHP input validation */
    if($username==="") {
        $response["error"] = "Please enter a username.";
    }elseif($pass===""){
        $response["error"] = "Please enter Password.";
    }
    if($response["error"]!=""){
        echo $response["error"];
    }
    
    $passhash = password_hash($pass, PASSWORD_DEFAULT);
    $sql = $wpdb->prepare("SELECT user_name, pass FROM MIGO_Users WHERE user_name = %s", $username);

    $result = $wpdb->get_results($sql, ARRAY_A); // Get result as associative array

    if (count($result) < 1){  // No matches
        echo "User does not exist";
    } else {    // Exactly one match - user_name is UNIQUE
        $row = $result[0];
        if (password_verify($pass, $row["pass"]) == true){
            echo "Password matches";
        } else {
            echo "Password does not match";
        }
    }
}

?>