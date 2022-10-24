// Current Date and Time

let currentTime = new Date();

function formatTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentHour = date.getHours();
  let currentMinute = date.getMinutes();
  let currentDay = days[date.getDay()];

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let formattedTime = `${currentHour}:${currentMinute} ${currentDay}`;

  return formattedTime;
}

let todaysTime = document.querySelector("#current-time");
todaysTime.innerHTML = formatTime(currentTime);

function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "Novemeber",
    "December",
  ];
  let currentDate = date.getDate();
  let currentMonth = months[date.getMonth()];
  let currentYear = date.getFullYear();

  let formattedDate = `${currentDate} ${currentMonth} ${currentYear}`;

  return formattedDate;
}

let todaysDate = document.querySelector("#current-date");
todaysDate.innerHTML = formatDate(currentTime);

// Search Bar

function cityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let h2 = document.querySelector("#current-city");
  let apiKey = "a7083641b7ebf003aec9614bf223ec5f";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=${unit}&appid=${apiKey}`;
  h2.innerHTML = `${searchCity.value.toUpperCase()}`;
  axios.get(apiUrl).then(showMainTemperature);
}

function showMainTemperature(response) {
  let mainDegree = document.querySelector("#main-temp");
  let mainTemp = Math.round(response.data.main.temp);
  let mainHighDegree = document.querySelector("#main-high");
  let highTemp = Math.round(response.data.main.temp_max);
  let mainLowDegree = document.querySelector("#main-low");
  let lowTemp = Math.round(response.data.main.temp_min);
  let mainForecast = document.querySelector("#main-forecast");
  let forecast = response.data.weather[0].main;
  let updateElement = document.querySelector("#updated");
  let backgroundImage = document.querySelector("#main-image");
  let forecastImage = response.data.weather[0].main;
  if (forecastImage === "Clear") {
    forecastImage = "sunny";
  }
  if (forecastImage === "Clouds") {
    forecastImage = "cloudy";
  }
  if (forecastImage === "Snow") {
    forecastImage = "snowy";
  }
  if (forecastImage === "Rain") {
    forecastImage = "rainy";
  }
  mainDegree.innerHTML = `${mainTemp}`;
  mainHighDegree.innerHTML = `${highTemp}`;
  mainLowDegree.innerHTML = `${lowTemp}`;
  mainForecast.innerHTML = `${forecast}`;
  updateElement.innerHTML = formatUpdate(response.data.dt * 1000);
  backgroundImage.setAttribute("src", `images/${forecastImage}.png`);
}

function formatUpdate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = days[date.getDay()];

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `Last updated ${day} ${hours}:${minutes}`;
}

let form = document.querySelector(".search-bar");
form.addEventListener("submit", cityName);

// Celsius / Fahrenheit Conversion

function fahrenheitConversion() {
  let mainDegree = document.querySelector("#main-temp");
  let temperature = mainDegree.innerHTML;
  let fahrenheit = Math.round((temperature * 9) / 5 + 32);
  mainDegree.innerHTML = `${fahrenheit}`;

  let highDegree = document.querySelector("#main-high");
  let highTemp = highDegree.innerHTML;
  let highFahrenheit = Math.round((highTemp * 9) / 5 + 32);
  highDegree.innerHTML = `${highFahrenheit}`;

  let lowDegree = document.querySelector("#main-low");
  let lowTemp = lowDegree.innerHTML;
  let lowFahrenheit = Math.round((lowTemp * 9) / 5 + 32);
  lowDegree.innerHTML = `${lowFahrenheit}`;
}

let conversion = document.querySelector("#fahrenheit-link");
conversion.addEventListener("click", fahrenheitConversion);

function celsiusConversion() {
  let mainDegreeC = document.querySelector("#main-temp");
  let temperatureC = mainDegreeC.innerHTML;
  let celsius = Math.round(((temperatureC - 32) * 5) / 9);
  mainDegreeC.innerHTML = `${celsius}`;

  let highDegreeC = document.querySelector("#main-high");
  let highTempC = highDegreeC.innerHTML;
  let highCelsius = Math.round(((highTempC - 32) * 5) / 9);
  highDegreeC.innerHTML = `${highCelsius}`;

  let lowDegreeC = document.querySelector("#main-low");
  let lowTempC = lowDegreeC.innerHTML;
  let lowCelsius = Math.round(((lowTempC - 32) * 5) / 9);
  lowDegreeC.innerHTML = `${lowCelsius}`;
}

let conversionBack = document.querySelector("#celsius-link");
conversionBack.addEventListener("click", celsiusConversion);
