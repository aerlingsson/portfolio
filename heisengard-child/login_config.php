<?php
session_start();
$db_con = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD);
if (empty($db_con)){
	echo "DB EMPTY";
}
if ($db_con->connect_error) {  // Did not connect
    echo "Could not connect to database";
    die('Connect Error: ' . $db_con->connect_error);
} else {
	echo "Connected to DB<br>";
}
?>