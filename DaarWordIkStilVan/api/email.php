<?php
/**
 * Created by PhpStorm.
 * User: pieterpaul.luijten
 * Date: 7-8-2016
 * Time: 14:25
 */

include "../functions/Email.php";
header('Content-Type: application/json');
$response = false;

if (array_key_exists('REQUEST_METHOD', $_SERVER)) {
    if ($_SERVER['REQUEST_METHOD'] != "POST") {
        echo json_encode("Invalid method.");
        return;
    }

    //if (array_key_exists('PATH_INFO', $_SERVER)) {
    //$request = explode('/', trim($_SERVER['PATH_INFO'], '/'));
    //}

    $input = json_decode(file_get_contents('php://input'), true);
    if ($input != null) {
        $name = $input["name"];
        $email = $input["email"];
        $message = $input["message"];
        $response = Email::SendEmail($name, $email, $message);
    }
}

echo json_encode($response);
?>