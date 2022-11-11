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

function search(city) {
  let apiKey = "95f1fa4890db228t0ade7ff3b54e18o5";
  let unit = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}query=${city}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search-input").value;
  search(city);
}

function showPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocationTemperature);
}

function showLocationTemperature(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "95f1fa4890db228t0ade7ff3b54e18o5";
  let unit = "metric";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/current?";
  let apiUrl = `${apiEndpoint}lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemp);
}

function getForecast(coordinates) {
  let apiKey = "95f1fa4890db228t0ade7ff3b54e18o5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemperature = response.data.temperature.current;
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#feels-like-temperature").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} m/s`;
  document.querySelector("#city").innerHTML = response.data.city;
  document
    .querySelector("#icon")
    .setAttribute("src", response.data.condition.icon_url);
  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function changeCelsius(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let celsiusElement = document.querySelector("#current-temperature");
  celsiusElement.innerHTML = Math.round(celsiusTemperature);
}

function changeFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitElement = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitElement);
}

function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <h4>${formatDay(forecastDay.time)}</h4>
          <p>
          <img src=${forecastDay.condition.icon_url} alt=${
          forecastDay.condition.icon
        } />
          <h6>Sunny</h6>
          <span class="forecast-temperature">${Math.round(
            forecastDay.temperature.minimum
          )}°/ ${Math.round(forecastDay.temperature.maximum)}°</span>
          </p>
        </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let currentTime = new Date();
let currentDate = document.querySelector("#current-time");
currentDate.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-search");
searchForm.addEventListener("submit", showCity);

let button = document.querySelector("#location");
button.addEventListener("click", showPosition);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeCelsius);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeFahrenheit);

let celsiusTemperature = null;

search("Kyiv");
