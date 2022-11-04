var APIKey = "4691ad58a51757db63d57f20ee381f75";
var city;
var rootUrl = "https://api.openweathermap.org";

//data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchHistoryArr = [];

var searchBtnEl = document.querySelector("#search-button");
var searchInputEl = document.querySelector("#search-input");
var searchFormEl = document.querySelector("#search-form");
var todayContainerEl = document.querySelector("#today");
var forecastContainerEl = document.querySelector("#forecast");
var searchHistoryContainerEl = document.querySelector("#history");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



function displayHistory () {
searchHistoryContainerEl.innerHTML = ""
for (var i = searchHistoryArr.length -1 ; i >= 0 ; i--) {
    var cityButton = document.createElement("button")
    cityButton.setAttribute("type", "button");
    cityButton.classList.add("history-btn", "btn");
    cityButton.setAttribute("data-search", searchHistoryArr[i]);
    cityButton.textContent= searchHistoryArr[i];
    searchHistoryContainerEl.appendChild(cityButton);
}
};

function updateHistory (search){
    if (searchHistoryArr.indexOf(search) !== -1) {
        return;
    }
    searchHistoryArr.push(search);
    localStorage.setItem("cities", JSON.stringify(searchHistoryArr));
    displayHistory();
};

function getHistory () {
    var storedHistory = localStorage.getItem("cities");
    if(storedHistory) {
        searchHistoryArr = JSON.parse(storedHistory);
    }
    displayHistory();
}

function currentWeathData (city, weather) {
    var date = dayjs().format('M/D/YYYY');
        
    var temp = weather.temp;
    var wind = weather.wind_speed;
    var humidity = weather.humidity;
    var UvIndex = weather.uvi;
    var iconDescription = weather.weather[0].description || weather[0].main;
    var weatherIconLink = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

    var card = document.createElement("div");
    var cardBody = document.createElement("div");
    var heading = document.createElement ("h2");
    var weatherIcon = document.createElement("img");
    var tempEl = document.createElement ("p");
    var windEl = document.createElement ("p");
    var humidityEl = document.createElement("p");
    var UvEl = document.createElement("p");
    var uviBadge = document.createElement("button");

    card.setAttribute("class", "card");
    cardBody.setAttribute("class", "card-body");
    card.appendChild(cardBody);

    heading.setAttribute("class", "h2 card-title")
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute("src", weatherIconLink);
    weatherIcon.setAttribute("alt", iconDescription);
    heading.appendChild(weatherIcon);

    tempEl.textContent = `Temp: ${temp}F`;
    windEl.textContent = `Wind: ${wind}mph`;
    humidityEl.textContent = `Humidity: ${humidity}%`;

    cardBody.appendChild(heading, tempEl, windEl, humidityEl);

    UvEl.textContent = "UV Index: ";
    uviBadge.classList.add("btn", "btn-sm");

    if(UvIndex < 3) {
        uviBadge.classList.add("btn-success");
    } else if (UvIndex < 7) {
        uviBadge.classList.add("btn-warning");
    } else {
        uviBadge.classList.add("btn-danger");
    }

    uviBadge.textContent = UvIndex;
    UvEl.appendChild(uviBadge);

    cardBody.appendChild(UvEl);

    //clears out the city
    todayContainerEl.innerHTML = "";
    todayContainerEl.appendChild(card);

};
  
function forecastData (forecast) {
    // var date = dayjs().tz(timezone).format('M/D/YYYY');
    console.log(forecast[0]);   
    var tempForecast = forecast[0].main.temp;
    console.log(tempForecast);
    var windForecast = forecast[0].wind.speed;
    var humidityForecast = forecast[0].main.humidity;
    var UvIndexForecast = "4";
    var iconDescriptionForecast = forecast[0].weather[0].description;
    var weatherIconLinkForecast = `https://openweathermap.org/img/w/${forecast[0].weather[0].icon}.png`;

    var cardForecast = document.createElement("div");
    var cardBodyForecast = document.createElement("div");
    var headingForecast = document.createElement ("h2");
    var weatherIconForecast = document.createElement("img");
    var tempElForecast = document.createElement ("p");
    var windElForecast = document.createElement ("p");
    var humidityElForecast = document.createElement("p");
    var UvElForecast = document.createElement("p");
    var uviBadgeForecast = document.createElement("button");

    cardForecast.setAttribute("class", "card-forecast");
    cardBodyForecast.setAttribute("class", "card-body-forecast");
    cardForecast.appendChild(cardBodyForecast);

    headingForecast.setAttribute("class", "h2 card-title")
    tempElForecast.setAttribute("class", "card-text");
    windElForecast.setAttribute("class", "card-text");
    humidityElForecast.setAttribute("class", "card-text");

    headingForecast.textContentForecast = dayjs(forecast.dt_txt).format("M/D/YYYY");
    weatherIconForecast.setAttribute("src", weatherIconLinkForecast);
    weatherIconForecast.setAttribute("alt", iconDescriptionForecast);
    headingForecast.appendChild(weatherIconForecast);
console.log(tempForecast);
    tempElForecast.textContent = `Temp: ${tempForecast}F`;
    windElForecast.textContent = `Wind: ${windForecast}mph`;
    humidityElForecast.textContent = `Humidity: ${humidityForecast}%`;

    cardBodyForecast.append(headingForecast, tempElForecast, windElForecast, humidityElForecast);

    UvElForecast.textContent = "UV Index: ";
    uviBadgeForecast.classList.add("btn", "btn-sm");

    if(UvIndexForecast < 3) {
        uviBadgeForecast.classList.add("btn-success");
    } else if (UvIndexForecast < 7) {
        uviBadgeForecast.classList.add("btn-warning");
    } else {
        uviBadgeForecast.classList.add("btn-danger");
    }

    uviBadgeForecast.textContent = UvIndexForecast;
    UvElForecast.appendChild(uviBadgeForecast);

    cardBodyForecast.appendChild(UvElForecast);

    // clears out the city
    todayContainerEl.innerHTML = "";
    todayContainerEl.appendChild(cardBodyForecast); 

};

function renderForecastCards (dailyForecast) {
    var start = dayjs().add(1, "day").startOf("day").unix();
    var end = dayjs().add(6, "day").startOf("day").unix();
    var headingsCol = document.createElement("div");
    var heading = document.createElement("h4");
    headingsCol.setAttribute("class", "col-12");
    heading.textContent= "5 day forecast";
    headingsCol.appendChild(heading);
    forecastContainerEl.innerHTML = "";
    forecastContainerEl.appendChild(headingsCol);

    for (var i = 0; i < dailyForecast.length; i++ ) {
        if( dailyForecast[i].dt >= start && dailyForecast[i].dt < end) {
            if(dailyForecast[i].dt_txt.slice(11, 13) == "12") {
                forecastData(dailyForecast[i])
            }
        }
    };
}

function renderItems (city, data) {
    currentWeathData(city, data.list[0], data.city.timezone);
    forecastData(data.list);
    
};


function getData (location){
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var apiUrl = `${rootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`;
    

    fetch(apiUrl)  
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        renderItems(city, data);       
    })

    .catch(function(err){
        console.error(err);
    })
    
};

function fetchCoords(search){
    var apiUrl = `${rootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;
    
    fetch(apiUrl)
    .then(function (response){
        return response.json();
    })
    .then(function (data){
        if(!data[0]){
            alert("Location not found")
        } else {
            updateHistory(search);
            getData(data[0]);
        }
    })
    .catch(function(err){
        console.error(err);
    })
};

function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInputEl.value) {
      return;
    }
  
    e.preventDefault();
    var search = searchInputEl.value.trim();
    fetchCoords(search);
    searchInputEl.value = '';
  };
  
  function handleSearchHistoryClick(e) {
    // Don't do search if current elements is not a search history button
    if (!e.target.matches('.btn')) {
      return;
    }
  
    var btn = e.target;
    var search = btn.getAttribute('data-search');
    fetchCoords(search);
  };

  getHistory();

  //Event Listeners
    searchFormEl.addEventListener("submit", handleSearchFormSubmit);

    searchHistoryContainerEl.addEventListener("click", handleSearchHistoryClick);


