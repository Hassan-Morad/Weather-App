//declare global variables
let daysCards = document.querySelector(".weather-card");
let search = document.getElementById("searchInpput");
let WeatherData; // store weather data get from api

let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

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
  "November",
  "December",
];
let apiResponse;
let globalNum;
async function getWeatherDate(location = "cairo", num = 3) {
  globalNum = num;
  apiResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=987690841652456f924143918230508&q=${location}&days=${num}`
  );
  WeatherData = await apiResponse.json();
  displayCurrentDay();
  displayNextDays();
}
function displayCurrentDay() {
  let box = "";
  box += `<div class="col-lg-4 p-2 col-md-6">
    <div class="inner-item text-white bg-dark rounded-4 p-1 px-3">
      <div class="head d-flex justify-content-between">
        <p class="font">${
          weekDays[new Date(WeatherData.forecast.forecastday[0].date).getDay()]
        }</p>
        <p class="font">
        ${new Date(WeatherData.forecast.forecastday[0].date).getDate()} 
        ${
          months[new Date(WeatherData.forecast.forecastday[0].date).getMonth()]
        }</p>
      </div>
      <p class="font">${WeatherData.location.name}, ${
    WeatherData.location.region
  }, ${WeatherData.location.country}</p>
      <div class="d-flex justify-content-between">
        <div class="num">${WeatherData.current.temp_c}<sup>o</sup>C</div>
        <div class=" w-25">
            <img src='${
              WeatherData.current.condition.icon
            }' alt="weather condition icon" class=" w-100" />
          </div>
      </div>
      <p  class="text-capitalize fs-5 pt-4 text-primary">${
        WeatherData.current.condition.text
      }</p>
      <div class=" mt-4 mb-3">
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-umbrella me-1"></i>${
            WeatherData.current.humidity
          }%
        </span>
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-wind me-1"></i> ${
            WeatherData.current.wind_kph
          }km/h</span
        >
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-compass "></i>East</span
        >
      </div>
    </div>
  </div>`;
  daysCards.innerHTML = box;
}
function displayNextDays() {
  let box = "";
  for (let i = 1; i < globalNum; i++) {
    box += `<div class="col-lg-4 p-2 col-md-6">
    <div class="inner-item text-white bg-dark rounded-4 p-1 px-3">
      <div class="head d-flex justify-content-between">
        <p class="font">${
          weekDays[new Date(WeatherData.forecast.forecastday[i].date).getDay()]
        }</p>
        <p class="font">
        ${new Date(WeatherData.forecast.forecastday[i].date).getDate()} 
        ${
          months[new Date(WeatherData.forecast.forecastday[i].date).getMonth()]
        }</p>
      </div>
      <p class="font">${WeatherData.location.name} , ${
      WeatherData.location.region
    } , ${WeatherData.location.country}</p>
      <div class="d-flex justify-content-between">
        <div class="num">${
          WeatherData.forecast.forecastday[i].day.maxtemp_c
        }<sup>o</sup>C</div>
        <div class=" w-25">
            <img src='${
              WeatherData.forecast.forecastday[i].day.condition.icon
            }' alt="weather condition icon" class=" w-100" />
          </div>
      </div>
      <p  class="text-capitalize fs-5 pt-4 text-primary">${
        WeatherData.forecast.forecastday[i].day.condition.text
      }</p>
      <div class=" mt-4 mb-3">
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-umbrella me-1"></i>${
            WeatherData.forecast.forecastday[i].day.avghumidity
          }%
        </span>
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-wind me-1"></i> ${
            WeatherData.forecast.forecastday[i].day.maxwind_kph
          }km/h</span
        >
        <span class="me-4" style="color: #6a6d71"
          ><i class="fa-solid fa-compass"></i>East</span
        >
      </div>
    </div>
  </div>`;
  }
  daysCards.innerHTML += box;
}
function searchFun() {
  if (searchInput.value === "") {
    getWeatherDate("");
  } else if (searchInput.value !== "") {
    getWeatherDate(searchInput.value);
  }
}
function getCurrentWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (currentPosition) {
      getWeatherDate(
        [
          currentPosition.coords.latitude,
          currentPosition.coords.longitude,
        ].join(",")
      );
    });
  }
}
async function displayAllData() {
  await getWeatherDate();
  getCurrentWeather();
}
displayAllData();
