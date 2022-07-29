// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handlingUserInput );

function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    // console.log(city);
    getCoordinates(city);
}


// gets lon and lat values
function getCoordinates(city) {
    let requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let lat = data[0].lat;
        let lon = data[0].lon;
        // console.log(lat)
        // console.log(lon)
        getCurrentWeather(lat, lon);
    });
}

//Weather API that uses values of lon and lat
function getCurrentWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
    .then(function (data) {
        console.log(data.current);
    });
}

        // 
    // figure out how to get current and future conditions if possible
    // Saved location to search history





// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
    // create a section tag with an ID of currentWeather
        // h1 tag city and corresponding weather icon
        // h2 tag date
        // div including the the temperature, the humidity, the wind speed, and the UV index



// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
    // create a conditional statement
        // what is consider favorable
        // apply css
            // bg color effect for sure
            // fav = green, mod = yellow, ser = red
            // maybe add icons that matches condition levels



// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
    // flex box or d flex
    // similar set up as the main display



// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
    // add event lister?
    // drop down tab?
    // event propagation?
    // Once click how would I go about directing it to search
        // link to search button
        // value pairs like local storage