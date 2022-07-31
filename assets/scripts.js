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

        // grabs humidity
        currentHumidityValue = data.current.humidity;
        currentHumidityDisplay(currentHumidityValue);

        //grab current wind speed
        currentWindSpeed = data.current.wind_speed;
        displayCurrentWindSpeed(currentWindSpeed);
        
        // grabs current UV value
        uvValue = data.current.uvi;
        displayUvIndex (uvValue);
        uvIndicator (uvValue);

        // grabs forecasted weather temp
        futureTemp = data.daily.temp;
        // displayForecastedTemp (futureTemp);
        console.log(futureTemp)



    })

}



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
    let currentWeatherIcon = document.getElementById('current-weather-icon').src="http://openweathermap.org/img/w/"+ currentIcon +".png";    
    
    currentIcon.textContent = currentIcon;
    
}

//displays converted temp from K to F (could you condense code here and make use for 5 day forecast?)
let currentFTemp = document.getElementById('current-temp');
function currentTempDisplay(temp){
    currentF = 1.8*(temp-273) + 32;
    roundedcurrentF = currentF.toFixed() + " °F";

    currentFTemp.textContent = roundedcurrentF;
    
}

//displays humidity value (could you condense code here and make use for 5 day forecast?)
let currentHumidityPlaceholder = document.getElementById('current-humidity');
function currentHumidityDisplay(currentHumidityValue) {
    currentHumidityFormat = currentHumidityValue + '%';

    currentHumidityPlaceholder.textContent = currentHumidityFormat;
}

//displays wind speed (could you condense code here and make use for 5 day forecast?)
let currentWindSpeedPlaceholder = document.getElementById('current-wind-speed');
function displayCurrentWindSpeed(currentWindSpeed) {
    let = mphCurrentWindSpeed = (currentWindSpeed * 2.236936).toFixed(2) + ' mph';
    currentWindSpeedPlaceholder.textContent = mphCurrentWindSpeed;
}

// displays uv value
let uv = document.getElementById('uv-index');
function displayUvIndex (uvValue){
    uv.textContent = uvValue;
}


// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// changes color depending on if the UV is low, moderate, high, very high, or severe.
function uvIndicator (uvValue) {
    if (uvValue <= 2.9) {
        uv.style.backgroundColor = 'green';
    } else if (uvValue >= 3 && uvValue <= 5.9){
        uv.style.backgroundColor = 'yellow';
    } else if (uvValue >= 6 && uvValue <= 7.9 ){
        uv.style.backgroundColor = 'orange';
    } else if (uvValue >= 8 && uvValue < 11) {
        uv.style.backgroundColor = 'red';
    } else {
        uv.style.backgroundColor = 'var(--purple-color)';
    }
} 



// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// let = forecastedTemp = document.getElementById('forecasted-temp');
// function displayForecastedTemp (futureTemp) {
//     forecastedTemp.textContent = forecastedTemp
//     console.log(forecastedTemp)
// }



// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
    //add button for history
    // history buttons take input from search 
    // add event lister on search buttons
    // make an if statement on if the value is from the search or the local 
    // Once click how would I go about directing it to search
        // link to search button
        // value pairs like local storage