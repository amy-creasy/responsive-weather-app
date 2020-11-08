//Day and Time//
let today = new Date();

let daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = daysOfTheWeek[today.getDay()];

let currentHour = today.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = today.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

//Current Weather//

function displayCurrentWeather (response) {
console.log(response.data);
document.querySelector("h1").innerHTML = response.data.name;
document.querySelector("#temperature-value").innerHTML = Math.round(response.data.main.temp);
document.querySelector(".current-weather-description").innerHTML = response.data.weather[0].description;
document.querySelector("#humidity-value").innerHTML = `${response.data.main.humidity}%`;
document.querySelector("#wind-value").innerHTML = `${Math.round(response.data.wind.speed)}mph`;
}

let apiKey = "fa4c25ecf74bb9185db3d2b06a17953e";
let city = "London"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayCurrentWeather);