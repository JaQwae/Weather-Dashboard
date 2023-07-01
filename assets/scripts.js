//------Global variables-------
    //Placeholder for latitude and longitude value;
    let lat = 0;
    let lon = 0;
// ----------------------------

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handlingUserInput );

// Updates lon and lat values
function getCoordinates(city) {
    let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city +'&limit=5&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        lat = data[0].lat;
        lon = data[0].lon;
    });
}

//Retrieves the current location's weather information 
function getCurrentWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
    .then(function (data) {
        // grabs unix time
        let currentDate = data.current.dt;
        displayCurrentDate(currentDate);

        //grabs icon
        let currentIcon = data.current.weather[0].icon;
        displayingCurrentIcon(currentIcon);

        // grabs temp
        let currentTemp = data.current.temp;
        currentTempDisplay(currentTemp);

        // grabs humidity
        let currentHumidityValue = data.current.humidity;
        currentHumidityDisplay(currentHumidityValue);

        //grab current wind speed
        let currentWindSpeed = data.current.wind_speed;
        displayCurrentWindSpeed(currentWindSpeed);
        
        // grabs current UV value
        let uvValue = data.current.uvi;
        displayUvIndex (uvValue);
        uvIndicator (uvValue);
    })
}

function handlingUserInput() {
    let city = document.getElementById("userInput").value;
    // getCoordinates(city);
    displayName(city);
    // getCurrentWeather(lat, lon);
    // getFiveDayWeather(lat, lon);
    // cityListPopulate(city);

    //Save the search location for future use
    // let searchHistory = JSON.parse(localStorage.getItem("city")) || []
    // searchHistory.push(city)
    // localStorage.setItem("city", JSON.stringify(searchHistory)) 
}



//Provides correct capitalization of city's name
function cityNameFormatting(city) {
    let cityNameArr = city.split(" ");

    for (var i = 0; i < cityNameArr.length; i++) {
        cityNameArr[i] = cityNameArr[i].charAt(0).toUpperCase() + cityNameArr[i].slice(1);
    }

    let cityNameFormatted = cityNameArr.join(" ");
    return cityNameFormatted;
}

function displayName(city){
    let cityNameFormatted = cityNameFormatting(city);
    city = cityNameFormatted;
    
    let cityName = document.getElementById('city-name');
    cityName.textContent = city;
}

//displays current date in MM/DD/YY format
function displayCurrentDate(currentDate){
    let currentCityDate = document.getElementById('current-date')
    let currentUnixTimeMs = currentDate * 1000;
    let currentUnixDate = new Date(currentUnixTimeMs);
    let currentDateFormated = new Intl.DateTimeFormat('en-US').format(currentUnixDate);

    currentCityDate.textContent = currentDateFormated;
}

//display weather icon
function displayingCurrentIcon (){
    document.getElementById('current-weather-icon').src="https://openweathermap.org/img/w/"+ currentIcon +".png"; 
    currentIcon.textContent = currentIcon;
}

//displays converted temp from K to F
let currentFTemp = document.getElementById('current-temp');
function currentTempDisplay(currentTemp){
    currentFTemp.textContent = 'Temp: ' + currentTemp.toFixed() + " °F";
}

//displays humidity value
let currentHumidityPlaceholder = document.getElementById('current-humidity');
function currentHumidityDisplay(currentHumidityValue) {
    currentHumidityFormat = 'Humidity: ' + currentHumidityValue + '%';
    currentHumidityPlaceholder.textContent = currentHumidityFormat;
}

//displays wind speed
let currentWindSpeedPlaceholder = document.getElementById('current-wind-speed');
function displayCurrentWindSpeed(currentWindSpeed) {
    currentWindSpeedPlaceholder.textContent = 'Wind speed: ' + currentWindSpeed.toFixed(2) + ' mph';
}

// displays uv value
let uv = document.getElementById('uv-index');
function displayUvIndex (uvValue){
    uv.textContent = 'UV Index: ' + uvValue;
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
function getFiveDayWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
    .then(function (data) {
        // pulls dates for the next five days
        oneDayOutDate = data.list[4].dt;
        twoDaysOutDate = data.list[14].dt;
        threeDaysOutDate = data.list[24].dt;
        fourDaysOutDate = data.list[29].dt;
        fiveDaysOutDate = data.list[36].dt;
        displayFutureDates(oneDayOutDate, twoDaysOutDate, threeDaysOutDate, fourDaysOutDate, fiveDaysOutDate);

        // pulls icons for the next five days
        oneDayOutIcon = data.list[4].weather[0].icon;
        twoDaysOutIcon = data.list[14].weather[0].icon;
        threeDaysOutIcon = data.list[24].weather[0].icon;
        fourDaysOutIcon = data.list[29].weather[0].icon;
        fiveDaysOutIcon = data.list[36].weather[0].icon;
        displayingFutureIcons (oneDayOutIcon, twoDaysOutIcon, threeDaysOutIcon, fourDaysOutIcon, fiveDaysOutIcon);

        // pulls temperature for the next five days
        oneDayOutTemp = (data.list[4].main.temp).toFixed() + ' °F';
        twoDaysOutTemp = (data.list[14].main.temp).toFixed() + ' °F';
        threeDaysOutTemp = (data.list[24].main.temp).toFixed() + ' °F';
        fourDaysOutTemp = (data.list[29].main.temp).toFixed() + ' °F';
        fiveDaysOutTemp = (data.list[36].main.temp).toFixed() + ' °F';
        displayFutureTemps(oneDayOutTemp, twoDaysOutTemp, threeDaysOutTemp, fourDaysOutTemp, fiveDaysOutTemp);

        // pulls wind speed for the next five days
        oneDayOutWindSpeed = (data.list[4].wind.speed) + ' mph';
        twoDaysOutWindSpeed = (data.list[14].wind.speed) + ' mph';
        threeDaysOutWindSpeed = (data.list[24].wind.speed) + ' mph';
        fourDaysOutWindSpeed = (data.list[29].wind.speed) + ' mph';
        fiveDaysOutWindSpeed = (data.list[36].wind.speed) + ' mph';
        displayFutureWindSpeed (oneDayOutWindSpeed, twoDaysOutWindSpeed, threeDaysOutWindSpeed, fourDaysOutWindSpeed, fiveDaysOutWindSpeed);

        // pulls humidity for the next five days
        oneDayHumidity = data.list[4].main.humidity;
        twoDaysHumidity = data.list[14].main.humidity;
        threeDaysHumidity = data.list[24].main.humidity;
        fourDaysHumidity = data.list[29].main.humidity;
        fiveDaysHumidity = data.list[36].main.humidity;
        displayFutureHumidity (oneDayHumidity, twoDaysHumidity, threeDaysHumidity, fourDaysHumidity, fiveDaysHumidity);
    })
}

function displayFutureDates(oneDayOutDate, twoDaysOutDate, threeDaysOutDate, fourDaysOutDate, fiveDaysOutDate){
    // displays next day date
    let oneDayOutCityDate = document.getElementById('one-day-out-date');
    let unixTimeOneDayOutMs = oneDayOutDate * 1000;
    let unixOneDayOutDate = new Date(unixTimeOneDayOutMs);
    let oneDayOutDateFormatted = new Intl.DateTimeFormat('en-US').format(unixOneDayOutDate);
    oneDayOutCityDate.textContent = oneDayOutDateFormatted;

    // displays date two days out
    let twoDaysOutCityDate = document.getElementById('two-days-out-date');
    let unixTimeTwoDaysOutMs = twoDaysOutDate * 1000;
    let unixTwoDaysOutDate = new Date(unixTimeTwoDaysOutMs);
    let twoDaysOutDateFormatted = new Intl.DateTimeFormat('en-US').format(unixTwoDaysOutDate);
    twoDaysOutCityDate.textContent = twoDaysOutDateFormatted;

    // displays date three days out
    let threeDaysOutCityDate = document.getElementById('three-days-out-date');
    let unixTimeThreeDaysOutMs = threeDaysOutDate * 1000;
    let unixThreeDaysOutDate = new Date(unixTimeThreeDaysOutMs);
    let threeDaysOutDateFormatted = new Intl.DateTimeFormat('en-US').format(unixThreeDaysOutDate);
    threeDaysOutCityDate.textContent = threeDaysOutDateFormatted;

    // displays date four days out
    let fourDaysOutCityDate = document.getElementById('four-days-out-date');
    let unixTimeFourDaysOutMs = fourDaysOutDate * 1000;
    let unixFourDaysOutDate = new Date(unixTimeFourDaysOutMs);
    let fourDaysOutDateFormatted = new Intl.DateTimeFormat('en-US').format(unixFourDaysOutDate);
    fourDaysOutCityDate.textContent = fourDaysOutDateFormatted;

    // displays date five days out
    let fiveDaysOutCityDate = document.getElementById('five-days-out-date');
    let unixTimeFiveDaysOutMs = fiveDaysOutDate * 1000;
    let unixFiveDaysOutDate = new Date(unixTimeFiveDaysOutMs);
    let fiveDaysOutDateFormatted = new Intl.DateTimeFormat('en-US').format(unixFiveDaysOutDate);
    fiveDaysOutCityDate.textContent = fiveDaysOutDateFormatted;
}

function displayingFutureIcons (oneDayOutIcon, twoDaysOutIcon, threeDaysOutIcon, fourDaysOutIcon, fiveDaysOutIcon){
    // display next day weather icon
    document.getElementById('one-day-out-icon').src="https://openweathermap.org/img/w/"+ oneDayOutIcon +".png"; 
    oneDayOutIcon.textContent = oneDayOutIcon;
    
    // display weather icon two days out
    document.getElementById('two-days-out-icon').src="https://openweathermap.org/img/w/"+ twoDaysOutIcon +".png";
    twoDaysOutIcon.textContent = twoDaysOutIcon;

    // display weather icon three days out
    document.getElementById('three-days-out-icon').src="https://openweathermap.org/img/w/"+ threeDaysOutIcon +".png";
    threeDaysOutIcon.textContent =threeDaysOutIcon;

    // display weather icon four days out
    document.getElementById('four-days-out-icon').src="https://openweathermap.org/img/w/"+ fourDaysOutIcon +".png";
    fourDaysOutIcon.textContent = fourDaysOutIcon;

    // display weather icon five days out
    document.getElementById('five-days-out-icon').src="https://openweathermap.org/img/w/"+ fiveDaysOutIcon +".png";
    fiveDaysOutIcon.textContent = fiveDaysOutIcon;
    
}

function displayFutureTemps(oneDayOutTemp, twoDaysOutTemp, threeDaysOutTemp, fourDaysOutTemp, fiveDaysOutTemp) {
    // display temp for next day
    oneDayOutTempDisplayed = document.getElementById('one-day-out-temp');
    oneDayOutTempDisplayed.textContent = 'Temp: ' + oneDayOutTemp;
    
    // display temp for two days out
    twoDaysOutTempDisplayed = document.getElementById('two-days-out-temp');
    twoDaysOutTempDisplayed.textContent = 'Temp: ' + twoDaysOutTemp;

    // display temp for three days out
    threeDaysOutTempDisplayed = document.getElementById('three-days-out-temp');
    threeDaysOutTempDisplayed.textContent = 'Temp: ' + threeDaysOutTemp;

    // display temp for four days out
    fourDaysOutTempDisplayed = document.getElementById('four-days-out-temp');
    fourDaysOutTempDisplayed.textContent = 'Temp: ' + fourDaysOutTemp;

    // display temp for five days out
    fiveDaysOutTempDisplayed = document.getElementById('five-days-out-temp');
    fiveDaysOutTempDisplayed.textContent = 'Temp: ' + fiveDaysOutTemp;
}

function displayFutureWindSpeed (oneDayOutWindSpeed, twoDaysOutWindSpeed, threeDaysOutWindSpeed, fourDaysOutWindSpeed, fiveDaysOutWindSpeed){
    oneDayWindSpeedDisplayed = document.getElementById('one-day-out-wind');
    oneDayWindSpeedDisplayed.textContent = 'Wind Speed: ' + oneDayOutWindSpeed;

    twoDaysWindSpeedDisplayed = document.getElementById('two-days-out-wind');
    twoDaysWindSpeedDisplayed.textContent = 'Wind Speed: ' + twoDaysOutWindSpeed;

    threeDaysWindSpeedDisplayed = document.getElementById('three-days-out-wind');
    threeDaysWindSpeedDisplayed.textContent = 'Wind Speed: ' + threeDaysOutWindSpeed;

    fourDaysWindSpeedDisplayed = document.getElementById('four-days-out-wind');
    fourDaysWindSpeedDisplayed.textContent = 'Wind Speed: ' + fourDaysOutWindSpeed;

    fiveDaysWindSpeedDisplayed = document.getElementById('five-days-out-wind');
    fiveDaysWindSpeedDisplayed.textContent = 'Wind Speed: ' + fiveDaysOutWindSpeed;
}

function displayFutureHumidity (oneDayHumidity, twoDaysHumidity, threeDaysHumidity, fourDaysHumidity, fiveDaysHumidity) {
    // display humidity for the next day out
    oneDayHumidityDisplayed = document.getElementById('one-day-out-humidity');
    oneDayHumidityDisplayed.textContent = 'Humidity: ' + oneDayHumidity;

    // display humidity for two days out
    twoDaysHumidityDisplayed = document.getElementById('two-days-out-humidity')
    twoDaysHumidityDisplayed.textContent = 'Humidity: ' + twoDaysHumidity;

    // display humidity for three days out
    threeDaysHumidityDisplayed = document.getElementById('three-days-out-humidity')
    threeDaysHumidityDisplayed.textContent = 'Humidity: ' + threeDaysHumidity;

    // display humidity for four days out
    fourDaysHumidityDisplayed = document.getElementById('four-days-out-humidity')
    fourDaysHumidityDisplayed.textContent = 'Humidity: ' + fourDaysHumidity;

    // display humidity for five days out
    fiveDaysHumidityDisplayed = document.getElementById('five-days-out-humidity')
    fiveDaysHumidityDisplayed.textContent = 'Humidity: ' + fiveDaysHumidity;
}

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


var recentSearchButtons = JSON.parse(localStorage.getItem("city")) || []
for (let i = 0; i < recentSearchButtons.length; i++) {
    cityListPopulate(recentSearchButtons[i]); 
}


//Dynamically add the passed city on the search history
function cityListPopulate (city){
    if(recentSearchButtons.indexOf(city) ===  -1) {
        return;
    }else {
        var cityButtons = $("<button>")//+city//.toUpperCase()+"</button>");
        cityButtons.text(city);
        $(cityButtons).addClass('title btn-large')
        $("#history-container").append(cityButtons);
        cityButtons.click(function(){
        city = $(this).text();
        cityListPopulate();
        getCoordinates(city);
        displayName(city);
        })
    }
}
