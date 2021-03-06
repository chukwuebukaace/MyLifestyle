var urlId = "bb2c88d223252f9cbf3c41f7d0c2aa16";

var currentweatherDayEl = document.querySelector("#weather-current-day");
var currentWeatherIconEl = document.querySelector("#weather-current-icon");

var currentWeatherTempEl = document.querySelector("#weather-current-temp");


// Get user lon and lat
function getUserLocation() {

    var locationJson = JSON.parse(localStorage.getItem("lifestyle-location"));

    getUserWeather(locationJson.geometry.location.lat, locationJson.geometry.location.lng);
};

function getUserWeather(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + urlId;

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {

                // Day of the week
                currentweatherDayEl.textContent = moment().format("dddd");
                // Current Weather Icon
                currentWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");

                // Current Temp
                currentWeatherTempEl.textContent = Math.floor(data.current.temp) + " F";

                // Daily Weather

                for (var i = 0; i < 5; i++) {
                    var weatherIconEl = document.querySelector(".img-day-" + i);
                    var weatherTempEl = document.querySelector(".temp-day-" + i);
                    var weatherDayEl = document.querySelector(`#day-` + i);
                    weatherDayEl.textContent = moment(data.daily[i + 1].dt * 1000).format("ddd");
                    weatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + data.daily[i].weather[0].icon + ".png")
                    weatherTempEl.textContent = Math.floor(data.daily[i].temp.day) + " F";

                }
            });
        } else {
            alert("Unable to get weather");
        }
    });
};

getUserLocation();