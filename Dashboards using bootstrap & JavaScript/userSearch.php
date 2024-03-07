<?php
// Connection to database
$database = mysqli_connect("localhost", "root", "", "spotify2023");
if (!$database) {
    die("Connection failed to database: " . mysqli_connect_error());
}

// Getting artist name
$artistName = isset($_GET['artist']) ? $_GET['artist'] : '';
if (empty($artistName)) {
    die("Please, type a valid artist name.");
}

// String that contains the query using the name typed
$query = "SELECT TITLE, ARTISTS, RANK, TOTAL_POINTS, SONG_URL FROM `spotifyinfo` WHERE ARTIST = '$artistName' GROUP BY TITLE ORDER BY RANK ASC;";
// Making query
$result = mysqli_query($database, $query);
// Check result
if (!$result) {
    die("Error en la consulta: " . mysqli_error($database));
}
// Save in 2D array
$resultsArray = mysqli_fetch_all($result, MYSQLI_ASSOC);
// Codified JSON valid data type
$data = ["User search" => $resultsArray];
header('Content-Type: application/json');
echo json_encode($data);
?>
