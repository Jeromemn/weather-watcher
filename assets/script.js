var APIKey = "3356db443d68054a9f7c90bfbef2e0a0";
// Globals
let cityName = document.querySelector("#city-name");
let country = document.querySelector("#country-name");
let temp = document.querySelector("#temp");
let hum = document.querySelector("#humidity");
const cityWeather = document.querySelector("#city-weather");
let wind = document.querySelector("#wind");
let uv = document.querySelector("#uv");
const fetchButton = document.querySelector(`#Fetch-button`);
var weatherDescriptions = document.querySelector(`ul`);
var historyList = document.querySelector(`ul`);
// create input and store in variable, 

function displayCities() {
    cityInput.innerHTML = "";

    for (var i = 0; i < cityHistory.length; i++) {
        let city = historyList[i];
        let btn = document.createElement("button");
        btn.textContent = city;

        btn.setAttribute("data-index", i)
        history.appendChild(btn);
    }

}

function cityLocal() {
    let cityHistory = JSON.parse(localStorage.getItem("historyList"));

    if (!cityHistory) {
        historyList = cityHistory;
    }
    displayCities();
}

function setCities() {
    localStorage.setItem("historyList", JSON.stringify(historyList))
}
cityForm.addEventListener("submit", function(event) {
    event.preventDefault();
    console.log(event);

    let city = cityText.value.trim();
    console.log(city);

    if (city === "");

    displayCities();
    setCities();


});

function getApi() {
var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}';

fetch(requestURL)
    .then(function (response) {
        return response.json();
    })
    // returns and condenses info into an array 
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            // creating elements 
            let cityName = document.createElement(`h3`);
            let country = document.createElement(`h4`);
            let uv = document.createElement(`li`);
            let temp = document.createElement(`li`);
            let wind = document.createElement(`li`);
            let hum = document.createElement(`li`);

            // setting h elements and li text
            cityName.textContent = data[i].cityName;
            country.textContent = data[i].country;
            uv.textContent = data[i].uv;
            temp.textContent = data[i].temp;
            wind.textContent = data[i].wind;
            hum.textContent = data[i].hum;

            // append 
            weatherDescriptions.appendChild(temp);
            weatherDescriptions.appendChild(uv);
            weatherDescriptions.appendChild(wind);
            weatherDescriptions.appendChild(hum);
           
        }
    })
}
