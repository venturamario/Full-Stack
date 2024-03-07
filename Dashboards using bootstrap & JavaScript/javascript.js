// ---< Javascript functions for index.html >---

// Connect to database and get generated queries for index.html
function connectphp() {
    // Debugging print
    console.log("Conectando a PHP... ");
    // AJAX (Asynchronous JavaScript & XML) request to database using php doc connection.php
    $.ajax({
        //php doc
        url: 'connection.php',
        // http 
        type: 'GET',
        success: function (data) {
            console.log("Datos recibidos: ", data);
            var obj = JSON.parse(data);
            console.log("Objeto:", obj);

            // 1 var for each chart
            var topArtistsData = obj.Artists;
            var territories = obj.Territories;
            var nationalities = obj.Nationality;

            // Charts creation
            territorieschart(territories);
            artistschart(topArtistsData);
            nationalitieschart(nationalities);
        }
    });
}

// 1st CHART --> Territories chart function
function territorieschart(territories) {
    // X axis: name of the territory
    var territoriesLabels = territories.map(function (item) {
        return item.TERRITORY;
    });

    // Chart config
    Highcharts.setOptions({
        // Spotify type green color palette
        colors: ['#1ED760', '#25D366', '#172B4D'],

        // Global chart config
        chart: {
            style: {
                fontFamily: 'Arial, sans-serif',
            },
            backgroundColor: 'transparent',
        },
        // Title config
        title: {
            style: {
                color: '#000000', // Title color
                fontSize: '24px', // Title size
            },
        },
        // Legend config
        legend: {
            itemStyle: {
                color: '#000000', // Legend text color
            },
        },
        // Data labels config
        plotOptions: {
            series: {
                dataLabels: {
                    style: {
                        color: '#172B4D',
                    },
                },
            },
        },
    });

    // We use a pie because the addition of all these points represent the 100% of the points of the database.
    // Using a pie is an easy way to have a visual representation of the percentage of points every territory
    // represents of the total number of points ever given to any artist of an specific country
    Highcharts.chart('chart1', {
        chart: {
            type: 'pie'
        },
        title: {
            color: '#000000',
            text: 'Territories with more ranking points'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y} points)',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                colors: ['#1db954', '#34c065', '#4ac776', '#61ce87', '#77d598', '#8edcaa', '#a5e3bb', '#bbeacc', '#d2f1dd', '#e8f8ee']
            }
        },
        series: [{
            name: 'Territory points',
            data: territories.map(function (item, index) {
                return {
                    name: territoriesLabels[index],  // Usa el nombre del territorio
                    y: parseInt(item.POINTS)
                };
            }),
            colorByPoint: true,
            dataLabels: {
                enabled: true,
                format: '{point.name}', // Puedes ajustar el formato según tus necesidades
                style: {
                    fontWeight: 'bold'
                }
            }
        }]
    });   
}

// 2nd CHART --> Artists chart function 
function artistschart(topArtistsData) {
    // X axis: name of the artist
    var artistLabels = topArtistsData.map(function (item) {
        return item.ARTIST;
    });

    // Y axis: number of listens
    var listensData = topArtistsData.map(function (item) {
        return parseInt(item.TOTAL_POINTS);
    });

    // Get minimum and maximum for more precise graphic representation
    // Calcular el valor mínimo y máximo dinámicamente
    var min = Math.min(...listensData);
    var minValue = min - 1;   // Adds a little bit of margin
    var max = Math.max(...listensData);
    var maxValue = max + 1    // Adds a little bit of margin

    // Chart config
    Highcharts.setOptions({
        // Spotify type green color palette
        colors: ['#1db954', '#34c065', '#4ac776', '#61ce87', '#77d598', '#8edcaa', '#a5e3bb', '#bbeacc', '#d2f1dd', '#e8f8ee'],

        // Global chart config
        chart: {
            style: {
                fontFamily: 'Arial, sans-serif', // Font
            },
            backgroundColor: 'transparent',
        },
        // Title config
        title: {
            style: {
                color: '#000000', // Title color
                fontSize: '24px', // Title size
            },
        },
        // X axis
        xAxis: {
            labels: {
                style: {
                    color: '#000000',
                },
            },
        },
        // Y axis
        yAxis: {
            title: {
                style: {
                    color: '#000000',
                },
            },
            labels: {
                style: {
                    color: '#000000',
                },
            },
        },
        // Legend config
        legend: {
            itemStyle: {
                color: '#000000',
            },
        },

        // Data labels config
        plotOptions: {
            series: {
                dataLabels: {
                    style: {
                        color: '#172B4D', // Text color on labels
                    },
                },
            },
        },
    });

    Highcharts.chart('chart2', {
        chart: {
            type: 'bar'
        },
        title: {
            color: '#000000',
            text: 'Artists with more ranking points'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                colors: ['#1db954', '#34c065', '#4ac776', '#61ce87', '#77d598', '#8edcaa', '#a5e3bb', '#bbeacc', '#d2f1dd', '#e8f8ee']
            }
        },
        xAxis: {
            categories: artistLabels,
        },
        yAxis: {
            title: {
                text: 'Total points at ranking'
            },
            // Dynamic range of the axis
            min: minValue,
            max: maxValue,
        },
        series: [{
            name: 'Points',
            data: listensData,
            colorByPoint: true,
            dataLabels: {
                enabled: true,
                format: '{y}',
                style: {
                    fontWeight: 'bold'
                }
            }
        }]
    });
}

// 3rd CHART --> Nationalities chart function
function nationalitieschart(nationalities) {

    // Getting the values obtained
    var nationality = nationalities.map(function (item) {
        return item.NATIONALITY;
    });
    var listensData = nationalities.map(function (item) {
        return parseInt(item.NUMSONGS);
    });

    // Get minimum and maximum for more precise graphic representation
    var min = Math.min(...listensData);
    var minValue = min - 1;   // Adds a little bit of margin
    var max = Math.max(...listensData);
    var maxValue = max + 1    // Adds a little bit of margin

    // Chart config
    Highcharts.setOptions({
        // Spotify type green color palette
        colors: ['#1db954', '#34c065', '#4ac776', '#61ce87', '#77d598', '#8edcaa', '#a5e3bb', '#bbeacc', '#d2f1dd', '#e8f8ee'],

        // Global config of the chart
        chart: {
            style: {
                fontFamily: 'Arial, sans-serif', // Font
            },
            backgroundColor: 'transparent', // Background of the chart
        },

        // Title config
        title: {
            style: {
                color: '#000000', // Title color
                fontSize: '24px', // Title size
            },
        },
        // Config x axis
        xAxis: {
            labels: {
                style: {
                    color: '#000000', // Color x axis
                },
            },
        },
        // Config y axis
        yAxis: {
            title: {
                style: {
                    color: '#000000', // Color  y axis
                },
            },
            labels: {
                style: {
                    color: '#000000', // Color of labels y axis
                },
            },
        },
        // Legend config
        legend: {
            itemStyle: {
                color: '#000000',
            },
        },

        // Data labels config
        plotOptions: {
            series: {
                dataLabels: {
                    style: {
                        color: '#172B4D', // Text color
                    },
                },
            },
        },
    });

    Highcharts.chart('chart3', {
        chart: {
            type: 'column'
        },
        title: {
            color: '#000000',
            text: 'Countries with more songs'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
                colors: ['#1db954', '#34c065', '#4ac776', '#61ce87', '#77d598', '#8edcaa', '#a5e3bb', '#bbeacc', '#d2f1dd', '#e8f8ee']
            }
        },
        xAxis: {
            categories: nationality,
        },
        yAxis: {
            title: {
                text: 'Number of songs'
            },
            // Dynamic range of the axis
            min: minValue,
            max: maxValue,
        },
        series: [{
            name: 'Country',
            data: listensData,
            colorByPoint: true,
            dataLabels: {
                enabled: true,
                format: '{y}',
                style: {
                    fontWeight: 'bold'
                }
            }
        }]
    });
}


// ---< Javascript functions for userSearch.html >---

// Connection to database for doc userSearch.html
function connectphpsearch() {
    // Debugging print
    console.log("Conectando a PHP para la consulta... ");
    // Getting artist name
    var artistName = document.getElementById('userSearch').value;

    // Check if the user has typed something
    if (artistName.trim() === '') {
        // Clear table so we can make different searchs without mixing the results pf the query
        clearTable();
        // Html message for the user
        var message = "Please, type a valid artist name<br></p>";
        $('#searchMessage').html(message);
        // Debugging print
        console.log("Please, type a valid artist name.");
        // To ensure the function does not continue
        return;
    }

    // Making the new URL with the typed artist name
    var url = 'userSearch.php?artist=' + encodeURIComponent(artistName);

    // AJAX (Asynchronous JavaScript & XML) request to database using php doc userSearch.php
    // This request is not in connection.php because we need the user to type the name of an artist so that
    // we can make a specific query ang get a result. The script will be executed every time the user
    // searches for an artist.
    $.ajax({
        //php doc
        url: url,
        // http 
        type: 'GET',
        success: function (data) {

            // Debugging print
            console.log("Datos de la búsqueda: ", data);
            // Getting the user search and using it as a parameter for the displayResults function
            var searchResults = data["User search"];

            // We have to print different messages for the user depending on the query results
            if (searchResults.length == 0) {
                // Clear table so we can make different searchs without mixing the results pf the query
                clearTable();
                // Html message for the user
                var message = artistName + " doesn't have any song in the top 200<br></p>";
                $('#searchMessage').html(message);
            } else {
                // Html message for the user
                var message = "These are " + artistName + "'s songs in the top 200<br></p>";
                $('#searchMessage').html(message);
                // Using results as a parameter
                displayResults(searchResults);
            }
        }
    });
}

// Displaying the results of the user search
function displayResults(results) {
    // Clear table so we can make different searchs without mixing the results pf the query
    clearTable();
    // Debugging
    console.log(results);
    // Getting the table by its id
    var table = document.getElementById('searchResultsTable');

    // Foreach to create the table
    // Each iteration displays a row creating its columns
    results.forEach(function (result) {
        var row = table.insertRow(-1);
        var titleCell = row.insertCell(0);
        titleCell.textContent = result.TITLE;
        // TITLE
        var artistsCell = row.insertCell(1);
        artistsCell.textContent = result.ARTISTS;
        //ARTISTS
        var rankCell = row.insertCell(2);
        rankCell.textContent = result.RANK;
        // TOTAL_POINTS
        var totalPointsCell = row.insertCell(3);
        totalPointsCell.textContent = result.TOTAL_POINTS;
        // URL
        var songUrlCell = row.insertCell(4);
        songUrlCell.innerHTML = `<a href="${result.SONG_URL}" target="_blank">Listen</a>`;
    });
}

// Clear table
function clearTable() {
    // Getting table by its id
    var table = document.getElementById('searchResultsTable');
    // Num of rows we need to iterate
    var rowCount = table.rows.length;
    // Deleting every row inserted previously
    for (var i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}