var APIKey = "3356db443d68054a9f7c90bfbef2e0a0";
// Globals
// let cityName = document.querySelector("#city-name");
let country = document.querySelector("#country-name");
let temp = document.querySelector("#temp");
let hum = document.querySelector("#humidity");
const cityWeather = document.querySelector("#city-weather");
let wind = document.querySelector("#wind");
let uv = document.querySelector("#uv");
const searchButton = document.querySelector(`#search`);
const typeCity = document.querySelector("#type-city");
var weatherDescriptions = document.querySelector(`ul`);
var historyList = document.querySelector(`ul`);
let heading = document.getElementById("header");
let currentCity = document.getElementById("section-current-city");
let searchedCity = document.getElementById("searched-city");
const { DateTime } = luxon;
let date =document.getElementById("date");
let icon = document.getElementById("icon");


const todaysDate = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

date.textContent = todaysDate;


// // create main header ,
// let body = document.body;

// // five day forcast
// let fiveDF = document.createElement("h3");

// // search section
// let searchHeader = document.createElement("h2");

// // main weather section
// let currentCityHeader = document.createElement("h2");

// // create search history list
// let searchHistory = document.createElement("div");
// let listEl = document.createElement("li");

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
//   if (typeCity === "") {
//   alert('City Not found')     // get bryces input
//   return;
//   } else {
  GetcityWeather();
  
  
  console.log(GetcityWeather);
  }
);
//   console.log("city");
//   console.log(typeCity.value);
function GetcityWeather() {
  var requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${typeCity.value}&appid=${APIKey}`;

  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      var APIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&exclude=hourly,daily&appid=${APIKey}`;

      fetch(APIUrl)
        .then((response) => response.json())
        .then((dataOne) => {
          console.log(dataOne);
          console.log(dataOne.current.temp);

    
            cityName = (data[0].name);
         searchedCity.textContent = cityName;
         temp.textContent = "Temp:" + ( dataOne.current.temp) + "°F";
         wind.textContent = "Wind:" + ( dataOne.current.wind_speed);
         hum.textContent = "Humidity:" + ( dataOne.current.humidity) + "%";
         uv.textContent = "UV Index:" + ( dataOne.current.uvi);
         //  icon.image = (dataOne.current.weather[0].icon);



        //   console.log(displayWeather);
        });
    });
    
}




    


// let city = document.createElement('h3');
//           city = "";

//           city.textcontent = data[0].name;

//           currentCity.append(city);
