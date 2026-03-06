<?php
// Database Configuration
define('DB_HOST', 'db.fr-pari1.bengt.wasmernet.com:10272');
define('DB_USERNAME', 'cfe0b0f174b6800035c95691bd62');
define('DB_PASSWORD', '068ccfe0-b0f1-75c6-8000-2d221e43ed82');
define('DB_NAME', 'social_media_db');

// Create connection function
function createConnection() {
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
    
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    return $conn;
}

// Create database if it doesn't exist
function createDatabase() {
    $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    
    $sql = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
    if ($conn->query($sql) === TRUE) {
        return true;
    } else {
        return false;
    }
}
?>