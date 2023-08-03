//------Global variables-------
    //Placeholder for latitude and longitude value;
    let lat = 0;
    let lon = 0;
    const clearHistory = document.getElementById("clear-history");
// ----------------------------

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

//Provides correct capitalization of city's name
function cityNameFormatting(city) {
    let cityNameArr = city.split(" ");

    for (var i = 0; i < cityNameArr.length; i++) {
        cityNameArr[i] = cityNameArr[i].charAt(0).toUpperCase() + cityNameArr[i].slice(1);
    }

    let cityNameFormatted = cityNameArr.join(" ");
    return cityNameFormatted;
}

// Displays city name in the weather section
function displayName(city){
        let cityNameFormatted = cityNameFormatting(city);
        let cityName = document.getElementById('city-name');
        cityName.textContent = cityNameFormatted;
}

//Coverts time for unix to MM/DD/YY format
function dateFormatting(date) {
    let unixTimeMs = date * 1000;
    let unixDate = new Date(unixTimeMs);
    let dateFormatted = new Intl.DateTimeFormat('en-US').format(unixDate);
    return dateFormatted;
}

//Displays current date
function displayingCurrentDate(currentDate){
    let currentCityDate = document.getElementById('current-date');
    let currentDateFormatted = dateFormatting(currentDate);
    currentCityDate.textContent = currentDateFormatted;
}

//display weather icon
function displayingCurrentIcon (currentIcon){
    document.getElementById('current-weather-icon').src="https://openweathermap.org/img/w/"+ currentIcon +".png"; 
    currentIcon.textContent = currentIcon;
}

//displays converted temp from K to F
function displayingCurrentTemp(currentTemp){
    let currentFTemp = document.getElementById('current-temp');
    currentFTemp.textContent = 'Temp: ' + currentTemp.toFixed() + " °F";
}

function displayingFeelLikeTemp(currentFeelTemp){
    let currentFeelLikeTemp = document.getElementById('current-feel-like-temp');
    currentFeelLikeTemp.textContent = 'Feels like: ' + currentFeelTemp.toFixed() + " °F";
}

//displays humidity value
function currentHumidityDisplay(currentHumidityValue) {
    let currentHumidityPlaceholder = document.getElementById('current-humidity');
    currentHumidityFormat = 'Humidity: ' + currentHumidityValue + '%';
    currentHumidityPlaceholder.textContent = currentHumidityFormat;
}

//displays wind speed
function displayCurrentWindSpeed(currentWindSpeed) {
    let currentWindSpeedPlaceholder = document.getElementById('current-wind-speed');
    currentWindSpeedPlaceholder.textContent = 'Wind speed: ' + currentWindSpeed.toFixed(2) + ' mph';
}

// displays uv value
function displayUvIndex (uvValue){
    let uv = document.getElementById('uv-index');
    uv.textContent = 'UV Index: ' + uvValue;

    // changes color depending on if the UV is low, moderate, high, very high, or severe.
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
        displayingCurrentDate(currentDate);

        //grabs icon
        let currentIcon = data.current.weather[0].icon;
        displayingCurrentIcon(currentIcon);

        // grabs temp
        let currentTemp = data.current.temp;
        displayingCurrentTemp(currentTemp);

        // grabs feel like temp 
        let currentFeelTemp = data.current.feels_like;
        displayingFeelLikeTemp(currentFeelTemp);

        // grabs humidity
        let currentHumidityValue = data.current.humidity;
        currentHumidityDisplay(currentHumidityValue);

        //grab current wind speed
        let currentWindSpeed = data.current.wind_speed;
        displayCurrentWindSpeed(currentWindSpeed);
        
        // grabs current UV value
        let uvValue = data.current.uvi;
        displayUvIndex (uvValue);
    })
}

function displayFutureDates(...data){
    for (let day=0; day<data.length; day++) {
        let daysOut = day + 1;
        let dateFormatted = dateFormatting(data[day].dt);
        document.getElementById(`date-out-${daysOut}-day`).textContent = dateFormatted;
    }
}

function displayingFutureIcons (...data){
    for (let day=0; day<data.length; day++) {
        let daysOut = day + 1;
        let icon = data[day].weather[0].icon;
        document.getElementById(`icon-out-${daysOut}-day`).src="https://openweathermap.org/img/w/"+ icon +".png";
        document.getElementById(`icon-out-${daysOut}-day`).textContent;
    }
}

function displayFutureTemps(...data) {
    for (let day=0; day<data.length; day++) {
        let daysOut = day + 1;
        let temp = data[day].main.temp.toFixed() + '°F';
        document.getElementById(`temp-out-${daysOut}-day`).textContent = 'Temp: ' + temp;
    }
}

function displayFutureWindSpeed (...data){
    for (let day=0; day<data.length; day++) {
        let daysOut = day + 1;
        let windSpeed = data[day].wind.speed + 'mph';
        document.getElementById(`wind-speed-out-${daysOut}-day`).textContent = 'Wind Speed: ' + windSpeed;
    }
}

function displayFutureHumidity (...data) {
    for (let day=0; day<data.length; day++) {
        let daysOut = day + 1;
        let humidity = data[day].main.humidity;
        document.getElementById(`humidity-out-${daysOut}-day`).textContent = 'Humidity: ' + humidity;
    }
}

//Retrieves the weather for the next five days
function getFiveDayWeather(lat, lon) {
    let requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat='+ lat +'&lon='+ lon +'&units=imperial&appid=9fa809658341d19670907599fff8fcdc';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
    })
    .then(function (data) {

        let oneDayOut, twoDaysOut, threeDaysOut, fourDaysOut, fiveDaysOut; 
        let fiveDayOutlook = [];

        //Pulls weather information for the next five dates
        oneDayOut = data.list[4]; 
        twoDaysOut = data.list[14];
        threeDaysOut = data.list[23];
        fourDaysOut = data.list[29];
        fiveDaysOut = data.list[36];
        fiveDayOutlook.push(oneDayOut, twoDaysOut, threeDaysOut, fourDaysOut, fiveDaysOut);

        // pulls dates for the next five days
        displayFutureDates(...fiveDayOutlook);

        // pulls icons for the next five days
        displayingFutureIcons (...fiveDayOutlook);
        
        // pulls temperature for the next five days
        displayFutureTemps(...fiveDayOutlook);
        
        // pulls wind speed for the next five days
        displayFutureWindSpeed (...fiveDayOutlook);
        
        // pulls humidity for the next five days
        displayFutureHumidity (...fiveDayOutlook);
    })
}

//Creates search history button and functionality
function cityHistoryButton(city) {
    let cityButtons = $("<button>");
    cityButtons.text(cityNameFormatting(city));
    $(cityButtons).addClass('btn search-history-btn')
    $("#city-buttons").append(cityButtons);

    cityButtons.click(function() {
        showWeatherSection();
        displayName(city);
        getCoordinates(city);
        getCurrentWeather(lat, lon);
        getFiveDayWeather(lat, lon);
    })
}
//Dynamically add the passed city on the search history
function cityListPopulate(city){
    if (localStorage.getItem(city) === null){
        localStorage.setItem(city, JSON.stringify(0));
        cityHistoryButton(city);
    } 
}

function showWeatherSection(){
    let weatherContainer = document.getElementById("weather-info-container");
    weatherContainer.classList.remove("hidden");
}

function handlingUserInput() {
    let city = document.getElementById("user-input").value;
    if (city != "") {
        if (isNaN(parseInt(city))) {
            showWeatherSection();
            displayName(city);
            getCoordinates(city);
            getCurrentWeather(lat, lon);
            getFiveDayWeather(lat, lon);
            cityListPopulate(city);
        } else {
            alert ("Invalid entry: Numerical values are not accepted!");
        }
    } else {
        alert ("Invalid entry: Please enter a valid city name!");
    }
}

function clearingHistory(){
    localStorage.clear();
    location.reload();
}

function showSearchHistory(){
    const searchHistoryTitle = document.getElementById("search-history-title");
    searchHistoryTitle.classList.remove("hidden");
    clearHistory.classList.remove("hidden");
}

//Creates search history buttons upon refresh
for (let i=localStorage.length-1; i>=0; i--) {
    cityHistoryButton(localStorage.key(i));
}

//Hides search history container if nothing is in there
if (localStorage.length > 0) {
    showSearchHistory();
}

const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', handlingUserInput );
let recentSearchButtons = JSON.parse(localStorage.getItem("city")) || [];

clearHistory.addEventListener('click', clearingHistory);
