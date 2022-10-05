var APIKey = "3356db443d68054a9f7c90bfbef2e0a0";
// Globals
let temp = document.querySelector("#temp");
let hum = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let uv = document.querySelector("#uv");
const searchButton = document.querySelector(`#search`);
const typeCity = document.querySelector("#type-city");
let heading = document.getElementById("header");
let searchedCity = document.getElementById("searched-city");
const { DateTime } = luxon;
let date =document.getElementById("date");
let icon = document.getElementById("icon");
const history = document.querySelector('#history');
const todaysIcon = document.querySelector('#icon');
const replaceWeather = document.querySelector('#replaceWeather');
const todaysDate = DateTime.now().toLocaleString(DateTime.DATE_HUGE);

date.textContent = todaysDate;

function innit() {
  displayCityHistory();
  
}

function getCityWeather(city) {
  var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`;

  fetch(requestURL)
    .then((response) => response.json())
    .then((data) => {
      var APIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=imperial&appid=${APIKey}`;

      fetch(APIUrl)
        .then((response) => response.json())
        .then((dataOne) => {

    
            cityName = (data[0].name);
         searchedCity.textContent = cityName;
         todaysIcon.src = "https://openweathermap.org/img/w/" + dataOne.current.weather[0].icon + ".png";
         temp.textContent = "Temp: " + ( dataOne.current.temp) + "°F";
         wind.textContent = "Wind: " + ( dataOne.current.wind_speed) + "mph";
         hum.textContent = "Humidity: " + ( dataOne.current.humidity) + "%";
         uv.textContent = "UV Index: " + ( dataOne.current.uvi);
      
          
         displayFiveDay(dataOne.daily);
       
      
        });
    });
    
}


function displayFiveDay(forecast) {
  const root = document.getElementById('section-fiveday');


  removeChildren(root);
  forecast.forEach(function (dailyData, index) {
    if (index < 1 || index > 5) return;

    const card = document.createElement('div');
    card.classList.add('card','border','border-dark', 'col', 'm-3','bg-dark','text-white');
    card.style.width = '100%';
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    card.appendChild(cardBody);

    const cardTitle = document.createElement('h5');
    cardTitle.textContent = luxon.DateTime.fromSeconds(dailyData.dt).weekdayLong;
    cardTitle.classList.add('card-title')
    const fiveDayUL = document.createElement('ul');
    fiveDayUL.classList.add('text-left', 'p-2');
    const weatherIcon = document.createElement('img');
    weatherIcon.src = "https://openweathermap.org/img/w/" + dailyData.weather[0].icon + ".png";
    const fiveDayTemp = document.createElement('li');
    fiveDayTemp.classList.add('list-inline-item', 'p-2');
    fiveDayTemp.textContent = "Temp: " + (dailyData.temp.max) + "°F";
    const fiveDayWind = document.createElement('li');
    fiveDayWind.classList.add('list-inline-item');
    fiveDayWind.textContent = "Wind: " + (dailyData.wind_speed) + "mph";
    const fiveDayHum = document.createElement('li');
    fiveDayHum.classList.add('list-inline-item');
    fiveDayHum.textContent = "Humidity: " + (dailyData.humidity) + "%";
    const fiveDayUv = document.createElement('li');
    fiveDayUv.classList.add('list-inline-item');
    fiveDayUv.textContent = "UV Index: " + (dailyData.uvi);
  
    root.appendChild(card);
   
    cardBody.appendChild(cardTitle);
    cardTitle.appendChild(fiveDayUL);
    fiveDayUL.appendChild(weatherIcon);
    fiveDayUL.appendChild(fiveDayTemp);
    fiveDayTemp.appendChild(fiveDayWind);
    fiveDayWind.appendChild(fiveDayHum);
    fiveDayHum.appendChild(fiveDayUv);
    
  }
   
  );
}



searchButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (!typeCity.value.length) return;
  getCityWeather(typeCity.value);
  saveCity()
  replaceWeather.style.display = 'none';
  
}
);

function saveCity() {
  
  const cityHistoryArray = JSON.parse(localStorage.getItem('cityHistoryArray')) || [];
  if (!cityHistoryArray.includes(typeCity.value)) {
    cityHistoryArray.push(typeCity.value);  
    localStorage.setItem('cityHistoryArray', JSON.stringify(cityHistoryArray));
    displayCityHistory();
  }
  
}


function displayCityHistory() {
    const cityHistoryArray = JSON.parse(localStorage.getItem('cityHistoryArray')) || [];
    removeChildren(history);
    cityHistoryArray.forEach(function(city) {
      const cityButton = document.createElement('button');
      cityButton.classList.add('btn', 'btn-secondary', 'col','mb-2')
      cityButton.textContent = city;
      history.appendChild(cityButton);
      cityButton.addEventListener('click', function(event) {
        event.preventDefault();
        getCityWeather(city);
        replaceWeather.style.display = 'none';
    });
    })
    
  
}


function removeChildren(parentElement) {

  while (parentElement.firstChild) {

      parentElement.removeChild(parentElement.firstChild);

  }

}



innit();
