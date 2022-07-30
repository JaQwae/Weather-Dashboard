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
    getCoordinates(city);
    displayName(city);
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
        
        getCurrentWeather(lat, lon);
    });
}

//Weather API 
function getCurrentWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
    .then(function (data) {
        // grabs unix time
        currentDate = data.current.dt;
        displayCurrentDate(currentDate);

        //grabs icon
        currentIcon = data.current.weather[0].icon;
        displayingCurrentIcon(currentIcon);

        // grabs temp
        currentTemp = data.current.temp;
        currentTempDisplay(currentTemp);
    });

}

    
    // Saved location to search history*******





// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index

function displayName(city){
    let cityName = document.getElementById('city-name')    
    cityName.textContent = city;
}

//displays current date in MM/DD/YY format (could you condense code here and make use for 5 day forecast?)
function displayCurrentDate(currentDate){
    let currentCityDate = document.getElementById('current-date')
    let currentUnixTime = currentDate;
    let currentUnixTimeMs = currentDate * 1000;
    let currentUnixDate = new Date(currentUnixTimeMs);
    let currentDateFormated = new Intl.DateTimeFormat('en-US').format(currentUnixDate);

    currentCityDate.textContent = currentDateFormated;
}

//display weather icon (could you condense code here and make use for 5 day forecast?)
function displayingCurrentIcon (){
    currentWeatherIcon = document.getElementById('current-weather-icon').src="http://openweathermap.org/img/w/"+ currentIcon +".png";    
    
    currentIcon.textContent = currentIcon;
    
}

//displays converts temp from K to F (could you condense code here and make use for 5 day forecast?)
currentFTemp = document.getElementById('current-temp')
function currentTempDisplay(temp){
    currentF = 1.8*(temp-273) + 32;
    roundedcurrentF = currentF.toFixed()

    currentFTemp.textContent = roundedcurrentF;
    
}



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
    //add button for history
    // history buttons take input from search 
    // add event lister on search buttons
    // make an if statement on if the value is from the search or the local 
    // Once click how would I go about directing it to search
        // link to search button
        // value pairs like local storage