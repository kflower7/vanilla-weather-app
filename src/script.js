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

// When Last Updated

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

// Current Location and data

function currentLocation() {
  navigator.geolocation.getCurrentPosition(getCityName);
}

function getCityName(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a7083641b7ebf003aec9614bf223ec5f";
  let apiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCityName);
  axios.get(forecastApiUrl).then(displayCurrentForecast);
}

function displayCityName(response) {
  currentCityDisplay = document.querySelector("#current-city");
  currentCityName = response.data[0].name.toUpperCase();
  apiKey = "a7083641b7ebf003aec9614bf223ec5f";
  unit = "metric";
  let currentTemperatureUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCityName}&limit=1&units=${unit}&appid=${apiKey}`;

  currentCityDisplay.innerHTML = `${currentCityName}`;
  axios.get(currentTemperatureUrl).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let currentMainTemp = document.querySelector("#main-temp");
  let currentMax = document.querySelector("#main-high");
  let currentMin = document.querySelector("#main-low");
  let mainCelsiusTemperature = response.data.main.temp;
  let mainCelsiusHigh = response.data.main.temp_max;
  let mainCelsiusLow = response.data.main.temp_min;
  let currentForecast = document.querySelector("#main-forecast");
  let currentBackgroundImage = document.querySelector("#main-image");
  let currentForecastImage = response.data.weather[0].main;
  if (currentForecastImage === "Clear") {
    currentForecastImage = "sunny";
  }
  if (currentForecastImage === "Clouds") {
    currentForecastImage = "cloudy";
  }
  if (currentForecastImage === "Snow") {
    currentForecastImage = "snowy";
  }
  if (currentForecastImage === "Rain") {
    currentForecastImage = "rainy";
  }

  currentForecast.innerHTML = `${currentForecastImage}`;
  currentMainTemp.innerHTML = Math.round(mainCelsiusTemperature);
  currentMax.innerHTML = Math.round(mainCelsiusHigh);
  currentMin.innerHTML = Math.round(mainCelsiusLow);
  currentBackgroundImage.setAttribute(
    "src",
    `images/${currentForecastImage}.png`
  );
  currentBackgroundImage.setAttribute(
    "alt",
    response.data.weather[0].description
  );

  function mainFahrenheitConversion(event) {
    event.preventDefault();
    let mainDegree = document.querySelector("#main-temp");
    let highDegree = document.querySelector("#main-high");
    let lowDegree = document.querySelector("#main-low");

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    mainDegree.innerHTML = Math.round((mainCelsiusTemperature * 9) / 5 + 32);
    highDegree.innerHTML = Math.round((mainCelsiusHigh * 9) / 5 + 32);
    lowDegree.innerHTML = Math.round((mainCelsiusLow * 9) / 5 + 32);
  }

  function mainCelsiusConversion(event) {
    event.preventDefault();
    let mainDegreeC = document.querySelector("#main-temp");
    let highDegreeC = document.querySelector("#main-high");
    let lowDegreeC = document.querySelector("#main-low");

    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");

    mainDegreeC.innerHTML = Math.round(mainCelsiusTemperature);
    highDegreeC.innerHTML = Math.round(mainCelsiusHigh);
    lowDegreeC.innerHTML = Math.round(mainCelsiusLow);
  }

  let mainFahrenheitLink = document.querySelector("#fahrenheit-link");
  mainFahrenheitLink.addEventListener("click", mainFahrenheitConversion);

  let mainCelsiusLink = document.querySelector("#celsius-link");
  mainCelsiusLink.addEventListener("click", mainCelsiusConversion);
}

function displayCurrentForecast(response) {
  let currentForecast = response.data.list;

  let currentForecastElement = document.querySelector("#forecast");

  let currentForecastHTML = `<div class="row">`;
  currentForecast.forEach(function (formatDay, index) {
    let currentHighTemp = Math.round(formatDay.main.temp_max);
    let currentLowTemp = Math.round(formatDay.main.temp_min);
    let currentForecastIcon = formatDay.weather[0].main;
    formatForecast(currentTime);

    function formatForecast(day) {
      let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

      let currentForecastDay = index;
      if (currentForecastDay === 0) {
        currentForecastDay = days[day.getDay() + 1];
      }
      if (currentForecastDay === 1) {
        currentForecastDay = days[day.getDay() + 2];
      }
      if (currentForecastDay === 2) {
        currentForecastDay = days[day.getDay() + 3];
      }

      if (currentForecastIcon === "Clear") {
        currentForecastIcon = `<span class="fa-solid fa-sun" id="item2"></span>`;
      }
      if (currentForecastIcon === "Clouds") {
        currentForecastIcon = `<span class="fa-solid fa-cloud-sun" id="item2"></span>`;
      }
      if (currentForecastIcon === "Rain") {
        currentForecastIcon = `<span class="fa-solid fa-cloud-rain" id="item2"></span>`;
      }
      if (currentForecastIcon === "Snow") {
        currentForecastIcon = `<span class="fa-solid fa-snowflake" id="item2"></span>`;
      }

      if (index < 3) {
        currentForecastHTML =
          currentForecastHTML +
          `<div class="col-4">
  <h2 class="forecast-day" id="item1">${currentForecastDay}</h2>
  ${currentForecastIcon}
  <br />
  <p class="forecast-temp id="item3">
   <span id="forecast-temp-high">${currentHighTemp} |</span><span id="forecast-temp-low"> ${currentLowTemp} </span>
  </p>
</div>`;
      }
    }
  });

  currentForecastElement.innerHTML = currentForecastHTML;
}

window.onload = currentLocation();

function forecastLocation() {
  navigator.geolocation.getCurrentPosition(getFutureForecast);
}

function getFutureForecast(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a7083641b7ebf003aec9614bf223ec5f";
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(forecastApiUrl).then(displayFutureForecast);
}

function displayFutureForecast(response) {
  let futureForecast = response.data.list;
  console.log(futureForecast);

  let futureForecastElement = document.querySelector("#forecast");

  let futureForecastHTML = `<div class="row">`;
  futureForecast.forEach(function (formatDay, index) {
    let futureHighTemp = Math.round(formatDay.main.temp_max);
    let futureLowTemp = Math.round(formatDay.main.temp_min);
    let futureForecastIcon = formatDay.weather[0].main;
    formatFutureForecast(currentTime);

    function formatFutureForecast(futureDay) {
      let futureDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

      let futureForecastDay = index;
      console.log();

      if (futureForecastDay === 0) {
        futureForecastDay = futureDays[futureDay.getDay() + 4];
      }
      if (futureForecastDay === 1) {
        futureForecastDay = futureDays[futureDay.getDay() + 5];
      }
      if (futureForecastDay === 2) {
        futureForecastDay = futureDays[futureDay.getDay() + 6];
      }

      if (futureForecastIcon === "Clear") {
        futureForecastIcon = `<span class="fa-solid fa-sun" id="item2"></span>`;
      }
      if (futureForecastIcon === "Clouds") {
        futureForecastIcon = `<span class="fa-solid fa-cloud-sun" id="item2"></span>`;
      }
      if (futureForecastIcon === "Rain") {
        futureForecastIcon = `<span class="fa-solid fa-cloud-rain" id="item2"></span>`;
      }
      if (futureForecastIcon === "Snow") {
        futureForecastIcon = `<span class="fa-solid fa-snowflake" id="item2"></span>`;
      }

      if (index < 3) {
        futureForecastHTML =
          futureForecastHTML +
          `<div class="col-4">
  <h2 class="forecast-day" id="item1">${futureForecastDay}</h2>
  ${futureForecastIcon}
  <br />
  <p class="forecast-temp id="item3">
   <span id="forecast-temp-high">${futureHighTemp} |</span><span id="forecast-temp-low"> ${futureLowTemp} </span>
  </p>
</div>`;
      }
    }
  });

  futureForecastElement.innerHTML = futureForecastHTML;
}

let rightClick = document.querySelector("#right-arrow-link");
rightClick.addEventListener("click", forecastLocation);

// Search Bar

function cityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let h2 = document.querySelector("#current-city");
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=${unit}&appid=${apiKey}`;
  h2.innerHTML = `${searchCity.value.toUpperCase()}`;
  axios.get(apiUrl).then(showMainTemperature);
}

function showMainTemperature(response) {
  let mainDegree = document.querySelector("#main-temp");
  let mainHighDegree = document.querySelector("#main-high");
  let mainLowDegree = document.querySelector("#main-low");
  let mainForecast = document.querySelector("#main-forecast");
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

  celsiusTemperature = response.data.main.temp;
  celsiusTemperatureHigh = response.data.main.temp_max;
  celsiusTemperatureLow = response.data.main.temp_min;

  mainDegree.innerHTML = Math.round(celsiusTemperature);
  mainHighDegree.innerHTML = Math.round(celsiusTemperatureHigh);
  mainLowDegree.innerHTML = Math.round(celsiusTemperatureLow);
  mainForecast.innerHTML = response.data.weather[0].main;
  updateElement.innerHTML = formatUpdate(response.data.dt * 1000);
  backgroundImage.setAttribute("src", `images/${forecastImage}.png`);
  backgroundImage.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

// Forecast

function getForecast(coordinates) {
  let apiKey = "a33b693cfbefd271b0ed075f9a8f65f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.list;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (formatDay, index) {
    let highTemp = Math.round(formatDay.main.temp_max);
    let lowTemp = Math.round(formatDay.main.temp_min);
    let forecastIcon = formatDay.weather[0].main;
    formatForecast(currentTime);

    function formatForecast(day) {
      let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

      let forecastDay = index;
      if (forecastDay === 0) {
        forecastDay = days[day.getDay() + 1];
      }
      if (forecastDay === 1) {
        forecastDay = days[day.getDay() + 2];
      }
      if (forecastDay === 2) {
        forecastDay = days[day.getDay() + 3];
      }

      if (forecastIcon === "Clear") {
        forecastIcon = `<span class="fa-solid fa-sun" id="item2"></span>`;
      }
      if (forecastIcon === "Clouds") {
        forecastIcon = `<span class="fa-solid fa-cloud-sun" id="item2"></span>`;
      }
      if (forecastIcon === "Rain") {
        forecastIcon = `<span class="fa-solid fa-cloud-rain" id="item2"></span>`;
      }
      if (forecastIcon === "Snow") {
        forecastIcon = `<span class="fa-solid fa-snowflake" id="item2"></span>`;
      }

      if (index < 3) {
        forecastHTML =
          forecastHTML +
          `<div class="col-4">
  <h2 class="forecast-day" id="item1">${forecastDay}</h2>
  ${forecastIcon}
  <br />
  <p class="forecast-temp id="item3">
   <span id="forecast-temp-high">${highTemp} |</span><span id="forecast-temp-low"> ${lowTemp} </span>
  </p>
</div>`;
      }
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

// Accurace Forecast Days

// Celsius / Fahrenheit Conversion

function fahrenheitConversion(event) {
  event.preventDefault();
  let mainDegree = document.querySelector("#main-temp");
  let highDegree = document.querySelector("#main-high");
  let lowDegree = document.querySelector("#main-low");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  mainDegree.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  highDegree.innerHTML = Math.round((celsiusTemperatureHigh * 9) / 5 + 32);
  lowDegree.innerHTML = Math.round((celsiusTemperatureLow * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", fahrenheitConversion);

function celsiusConversion(event) {
  event.preventDefault();
  let mainDegreeC = document.querySelector("#main-temp");
  let highDegreeC = document.querySelector("#main-high");
  let lowDegreeC = document.querySelector("#main-low");

  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");

  mainDegreeC.innerHTML = Math.round(celsiusTemperature);
  highDegreeC.innerHTML = Math.round(celsiusTemperatureHigh);
  lowDegreeC.innerHTML = Math.round(celsiusTemperatureLow);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", celsiusConversion);

let celsiusTemperature = null;
let celsiusTemperatureHigh = null;
let celsiusTemperatureLow = null;
