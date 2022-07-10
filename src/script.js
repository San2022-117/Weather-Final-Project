function formatDate(date) {
  let current = new Date(date);
  let hours = current.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = current.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sun", "Mon", "Tue", "Thr", "Fri", "Sat"];
  let day = days[current.getDay()];
  return ` ${day} | ${hours}:${minutes} `;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let weaklyForecastElement = document.querySelector("#weekly-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6)
      forecastHTML =
        forecastHTML +
        ` <div class="col-2 week-days">
<div class="week-day">${formatDay(forecastDay.dt)}</div>
                
                <div class="weather-img"><img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" width="70"></div>
                
                <div class="min-max">
                <span class="week-day-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
                <span class="week-day-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
                </div>
              </div>
           `;
  });

  forecsastHTML = forecastHTML + `</div>`;
  weaklyForecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "53a88e0ec99fb1cee4bb38a9047c2b0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#dayTime");
  let iconElement = document.querySelector("#icon");

  celTemp = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "53a88e0ec99fb1cee4bb38a9047c2b0c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  city = city.toLowerCase();
  city = city.trim();
  city = city.replace("brasil", "Brazil");
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");

  search(searchCityInput.value);
}

function displayFahrTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celLink.classList.remove("active");
  fahrLink.classList.add("active");
  let fahrTemp = (celTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}

function displayCelTemp(event) {
  event.preventDefault();
  celLink.classList.add("active");
  fahrLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celTemp);
}

let celTemp = null;

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);

let fahrLink = document.querySelector("#fahr");
fahrLink.addEventListener("click", displayFahrTemp);

let celLink = document.querySelector("#cel");
celLink.addEventListener("click", displayCelTemp);

search("New York");
