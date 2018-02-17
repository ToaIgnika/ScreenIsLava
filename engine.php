<?php
/**
 * Created by PhpStorm.
 * User: Yevhen
 * Date: 2018-02-13
 * Time: 3:59 PM
 *
 * */

echo session_status();
exit;
if(session_status() == PHP_SESSION_NONE) {
    session_start();
    $_SESSION["s_time"] = time();
    echo "started!";
} else {
    echo time() - $_SESSION["s_time"];
}
