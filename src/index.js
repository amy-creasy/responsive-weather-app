//Last Updated Date//

function formatDate(timestamp) {
let date = new Date(timestamp);

let currentHour = date.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = date.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

return `${currentHour}:${currentMinutes}`

}

//Updates Current Weather and Weather Stats//

function displayCurrentWeather (response) {
    document.querySelector("h1").innerHTML = response.data.name;
    document.querySelector(".current-weather-description").innerHTML = response.data.weather[0].description;
    document.querySelector("#cloudiness-value").innerHTML = `${response.data.clouds.all}%`;
    document.querySelector("#humidity-value").innerHTML = `${response.data.main.humidity}%`;
    document.querySelector("#wind-value").innerHTML = `${Math.round(response.data.wind.speed)}mph`;

    celsiusTemperature = document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);

    let iconElement = document.querySelector("#current-weather-icon")
    let icon = response.data.weather[0].icon
    iconElement.setAttribute ("src", `media/${icon}.png`)

    let dateElement = document.querySelector("#current-date");
    dateElement.innerHTML = formatDate(response.data.dt*1000);
}

//Search Engine and API//

function search (city) {
    let apiKey = "fa4c25ecf74bb9185db3d2b06a17953e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl). then(displayCurrentWeather);
}


function handleSubmit (event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

//Unit Conversion//

function convertToFahrenheit (event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature-value");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    celsiusLink.classList.add("inactive");
    fahrenheitLink.classList.remove("inactive");
    let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32)
    temperatureElement.innerHTML = fahrenheitTemperature;
}

function convertToCelsius (event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    celsiusLink.classList.remove("inactive");
    fahrenheitLink.classList.add("inactive");
    let temperatureElement = document.querySelector("#temperature-value");
    temperatureElement.innerHTML = celsiusTemperature;
}

//Gets API for Current Location//

function retrievePosition(position) {

  let apiKey = "fa4c25ecf74bb9185db3d2b06a17953e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric"
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?"
  let apiUrl = `${endPoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function getLocation(event) {

event.preventDefault();
navigator.geolocation.getCurrentPosition(retrievePosition);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let currentLocationLink = document.querySelector("#current-location");
currentLocationLink.addEventListener("click", getLocation);

search("London");