<?php

// Connection to database
$database = mysqli_connect("localhost", "root", "", "spotify2023");
// Check succesfull connection
if (!$database) {
    die("Connection failded to database: " . mysqli_connect_error());
}

// ---< Queries for 1st graphic >---
// Top 10 artists with most ranking points 
$query1 = 'SELECT ARTIST, TOTAL_POINTS FROM `spotifyinfo` GROUP BY ARTIST ORDER BY TOTAL_POINTS DESC LIMIT 10;';
// Make query
$result1 = mysqli_query($database, $query1);
// Check result
if (!$result1) {
    die("Error in query: " . mysqli_error($database));
}
// Save query in 2 dimension array
$artists = mysqli_fetch_all($result1, MYSQLI_ASSOC);

// ---< Queries for 2nd graphic >---
// Territories (continent columnm) with most streams
$query2 = 'SELECT CONTINENT AS TERRITORY, SUM(TOTAL_POINTS) AS POINTS FROM `spotifyinfo` GROUP BY TERRITORY ORDER BY POINTS DESC;';
// Make query
$result2 = mysqli_query($database, $query2);
// Check result
if (!$result2) {
    die("Error in query: " . mysqli_error($database));
}
//Save query in 2 dimension array
$territories = mysqli_fetch_all($result2, MYSQLI_ASSOC);

// ---< Queries for 3rd graphic >---
// Top 20 countries with most songs in the top200
$query3 = 'SELECT NATIONALITY, COUNT(*) AS NUMSONGS FROM `spotifyinfo` GROUP BY NATIONALITY ORDER BY NUMSONGS DESC LIMIT 15;';
// Make query
$result3 = mysqli_query($database, $query3);
// Check result
if (!$result3) {
    die("Error in query: " . mysqli_error($database));
}
//Save query in 2 dimension array
$nationality = mysqli_fetch_all($result3, MYSQLI_ASSOC);

// Data codification to print with json
$data = ["Artists" => $artists, "Territories" => $territories, "Nationality" => $nationality];
// Print with json encode
echo json_encode($data);
?>