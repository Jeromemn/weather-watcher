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

dailyTemp = []

dailyWind = []

dailyHum = []

dailyUv = []

dailyData = []

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


//   console.log("city");
//   console.log(typeCity.value);
function GetcityWeather() {
  var requestURL = `http://api.openweathermap.org/geo/1.0/direct?q=${typeCity.value}&appid=${APIKey}`;

  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data[0]);
      var APIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${APIKey}`;

      fetch(APIUrl)
        .then((response) => response.json())
        .then((dataOne) => {
          console.log(dataOne);
          console.log(dataOne.current.temp);

    
            cityName = (data[0].name);
         searchedCity.textContent = cityName;
         
         temp.textContent = "Temp: " + ( dataOne.current.temp) + "°F";
         wind.textContent = "Wind: " + ( dataOne.current.wind_speed) + "mph";
         hum.textContent = "Humidity: " + ( dataOne.current.humidity) + "%";
         uv.textContent = "UV Index: " + ( dataOne.current.uvi);
         //  icon.image = (dataOne.current.weather[0].icon);

        //  for (i=0; i < 5; i++) {
          
        //   dailyTemp[i] = "Temp: " + (dataOne.daily[i+1].temp.day) + "°F";
        //   dailyWind[i] = "Wind: " + (dataOne.daily[i+1].wind_speed) + "mph";
        //   dailyHum[i] = "Humidity: " + (dataOne.daily[i+1].humidity) + "%";
        //   dailyUv[i] = "UV Index: " + (dataOne.daily[i+1].uvi);
        //   console.log(dataOne.daily[i]);

          
         displayFiveDay(dataOne.daily)
          
         
          // const fiveDay =document.getElementById('section-fiveday');
          
          // const root =document.getElementById('section-fiveday');
          // root.innerHTML = 
        //   fiveDay.append(`
        //    <div class="card border border-dark col-3" style="width: 18rem;">
        //   <div class="card-body">
        //    <h5 class="card-title" id="date"></h5>
        //    <ul>
        //     <li>Temp:${dailyTemp[i]}°F</li>
        //     <li>Wind:${dailyWind[i]}mph</li>
        //     <li>$Humidity:${dailyHum[i]}%</li>
        //     <li>UV Index:${dailyUv[i]}</li>
        //     <li id="uv"></li>
        //   </ul>
        //   </div>
        //  </div>`);
        //  root.appendChild('section-fiveday');
         
        



        //   console.log(displayWeather);
        });
    });
    
}


  // data.daily.forEach(function (dailyData, index) {
  //   $(`#section-fiveday`).empty();
  //   if (index >=5) return;
  //   // const root =document.getElementById('section-fiveday');
  //   // root.innerHTML = 
  //   $(`#section-fiveday`).append(`
  //    <div class="card border border-dark col-3" style="width: 18rem;">
  //   <div class="card-body">
  //    <h5 class="card-title" id="date"></h5>
  //    <ul>
  //     <li>Temp:${dailyTemp[i]}°F</li>
  //     <li>Wind:${dailyWind[i]}mph</li>
  //     <li>$Humidity:${dailyHum[i]}%</li>
  //     <li>UV Index:${dailyUv[i]}</li>
  //     <li id="uv"></li>
  //   </ul>
  //   </div>
  //  </div>`);
  // //  root.appendChild('section-fiveday');
  
  // })
// for card dates luxon.DateTime.fromSeconds(dailyData.dt) then format 

function displayFiveDay(forecast) {
  const root = document.getElementById('section-fiveday');

  forecast.forEach(function (dailyData, index) {
    console.log(dailyData);
    console.log(index);
    const card = document.createElement('div');
    card.classList.add('card','border','border-dark', 'col-3');
    card.style.width = '19rem';
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);
    const cardTitle = document.createElement('h5');
    cardTitle.textContent = (dailyData.dt);
    cardTitle.classList.add('card-title')
    const fiveDayUL = document.createElement('ul');
    const fiveDayTemp = document.createElement('li');
    fiveDayTemp.textContent = "Temp: " + (dailyData.temp.max) + "°F";
    const fiveDayWind = document.createElement('li');
    fiveDayWind.textContent = "Wind: " + (dailyData.wind_speed) + "mph";
    const fiveDayHum = document.createElement('li');
    fiveDayHum.textContent = "Humidity: " + (dailyData.humidity) + "%";
    const fiveDayUv = document.createElement('li');
    fiveDayUv.textContent = "UV Index: " + (dailyData.uvi);
  
    root.appendChild(card);
   
    cardBody.appendChild(cardTitle);
    cardTitle.appendChild(fiveDayUL);
    
    fiveDayUL.appendChild(fiveDayTemp);
    fiveDayTemp.appendChild(fiveDayWind);
    fiveDayWind.appendChild(fiveDayHum);
    fiveDayHum.appendChild(fiveDayUv);
    // fiveDayUL.appendChild(cardTitle);
    // fiveDayTemp.appendChild(fiveDayUL);






  }
   
  );
}
//   root.innerHTML = `<div class="card border border-dark col-3" style="width: 18rem;">
//       <div class="card-body">
//        <h5 class="card-title" id="date"></h5>
//        <ul>
//         <li id="icon"></li>
//         <li> ${dailyTemp[i]}"</li>
//         <li> {dailyWind[i]}</li>
//         <li> {dailyHum[i]}</li>
//         <li> {dailyUv[i]}</li>
//       </ul>
//       </div>
//      </div> `
//   ;


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




    


// let city = document.createElement('h3');
//           city = "";

//           city.textcontent = data[0].name;

//           currentCity.append(city);
