alert("Looks like it works!");

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
  let days = ["Sun", "Mon", "Tues", "Thur", "Fri", "Sat"];
  let day = days[current.getDay()];
  return `${day}, ${hours}:${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let pressureElement = document.querySelector("#pressure");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  debugger;
  let dateElement = document.querySelector("dateInfo");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  pressureElement.innerHTML = response.data.main.pressure;
  windElement.innerHTML = response.data.wind.speed;
  humidityElement.innerHTML = response.data.main.humidity;
  debugger;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiKey = "a46a064ebf3d176c277f7b42ebc41329";
let city = "Perth";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
