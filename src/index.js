function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

let currentTime = new Date();
let currentDate = document.querySelector("#current-time");
currentDate.innerHTML = formatDate(currentTime);

function search(city) {
  let apiKey = "cd6ee0a45e487c4d00f0679648792bc6";
  let unit = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let apiUrl = `${apiEndpoint}q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

function showLocationTemperature(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=cd6ee0a45e487c4d00f0679648792bc6&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}

function changeCelsius(event) {
  event.preventDefault();
  let celsiusSign = document.querySelector("#current-temperature");
  celsiusSign.innerHTML = "30";
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheitSign = document.querySelector("#current-temperature");
  fahrenheitSign.innerHTML = "86";
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

function showTemp(response) {
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#feels-like-temperature").innerHTML = `${Math.round(
    response.data.main.feels_like
  )}°C`;
  document.querySelector("#minimum-temperature").innerHTML = `${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#maximum-temperature").innerHTML = `${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#city").innerHTML = response.data.name;
}

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("input", showCity);

let button = document.querySelector("#location");
button.addEventListener("click", showPosition);
search("Kyiv");
