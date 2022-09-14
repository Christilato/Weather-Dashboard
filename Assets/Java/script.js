var APIKey = "4975dbb81a9172a983659e417ce941fa";
var city;
var rootUrl = "http://api.openweathermap.org";

//data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchHistoryArr = [];

var searchBtnEl = $("#search-button");
var searchInputEl = $("#search-input");
var searchFormEl = $("#search-form");
var todayContainerEl = $("#today");
var forecastContainerEl = $("#forecast");
var searchHistoryContainerEl = $("#history");




dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



// Event Listeners
    
searchBtnEl.on("click", function (e) {
    e.preventDefault();
    city = $("#searchInputEl").val();

    console.log(searchInputEl);
     
})



// function to display the search history list
    //(for loop)start at end of search history array
    // create a button for those items
    // append the button to the search history container
    //& count down (backwards bc most recent first)

function displayHistory () {
searchHistoryContainerEl.on("click", function (event) {
    city = event.target.innterText;
})
for (var i = 0; i > searchInputEl.length; i++) {
    var cityButton = $("<button>")
    cityButton.text(searchInputEl[i]);
    cityButton.attr("data", searchInputEl);
    searchHistoryContainerEl.append(cityButton);
}
}


// function to update history in local storage & update history that is being displayed
    // enter search term, if it does not exit, then we push it to the search history array
    //localStorage.setItem(searchhistory)

function updateHistory (){
    var previousCity = JSON.parse(localStorage.getItem("cities"));
    if (previousCity == null) {
        searchHistoryArr.push(city);
    } else {
        searchHistoryArr = previousCity;
        searchHistoryArr.unshift(city);
    }
    
    localStorage.setItem("cities", JSON.stringify(searchHistoryArr));

    // clear for next search
    

}





// function that displays the current weather data that is fecthed from the curren weather api
    // declare var for date, (all the response date we need)(wind, temp, icon, etc.)
    // declaire var for html elements that we are creating- 
    // building this section in the js
    // once declared then we set attributes (classes, weather will need src)
    // do .appends to make sure its appeneded to the parents
//**** conditional formatting for the UV (3 seperate classes for UVI)// **** do not have access

function currentWeathData (city, weather, timezone) {
    var date = dayjs().tz(timezone).format('M/D/YYYY');
        
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
    card.append(cardBody);

    heading.setAttribute("class", "h2 card-title")
    tempEl.setAttribute("class", "card-text");
    windEl.setAttribute("class", "card-text");
    humidityEl.setAttribute("class", "card-text");

    heading.textContent = `${city} (${date})`;
    weatherIcon.setAttribute("src", weatherIconLink);
    weatherIcon.setAttribute("alt", iconDescription);
    heading.append(weatherIcon);

    tempEl.textContent = `Temp: ${temp}F`;
    windEl.textContent = `Wind: ${wind}mph`;
    humidityEl.textContent = `Humidity: ${humidity}%`;

    cardBody.append(heading, tempEl, windEl, humidityEl);

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
    UvEl.append(uviBadge);

    cardBody.append(UvEl);

    //clears out the city
    todayContainerEl.innerHTML = "";
    todayContainerEl.append(card);

}

// mimic function prior (current Day forecast)
// function that builds 5 the forecast card
    // similar to the function prior
    // use dayjs to declare variable for start/end date
    // for loop through the days & data (we are calling the 7 day forecast)
    // conditional formatting for if they are between the first and last date

 // this is the function to display 5 forecast cards   
function forecastData (city, weather, timezone) {
    var date = dayjs().tz(timezone).format('M/D/YYYY');
        
    var tempForecast = weather.temp;
    var windForecast = weather.wind_speed;
    var humidityForecast = weather.humidity;
    var UvIndexForecast = weather.uvi;
    var iconDescriptionForecast = weather.weather[0].description || weather[0].main;
    var weatherIconLinkForecast = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;

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
    cardForecast.append(cardBodyForecast);

    headingForecast.setAttribute("class", "h2 card-title")
    tempElForecast.setAttribute("class", "card-text");
    windElForecast.setAttribute("class", "card-text");
    humidityElForecast.setAttribute("class", "card-text");

    headingForecast.textContentForecast = `${city} (${date})`;
    weatherIconForecast.setAttribute("src", weatherIconLink);
    weatherIconForecast.setAttribute("alt", iconDescription);
    headingForecast.append(weatherIcon);

    tempElForecast.textContent = `Temp: ${temp}F`;
    windElForecast.textContent = `Wind: ${wind}mph`;
    humidityElForecast.textContent = `Humidity: ${humidity}%`;

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
    UvElForecast.append(uviBadge);

    cardBodyForecast.append(UvElForecast);

    //clears out the city
    todayContainerEl.innerHTML = "";
    todayContainerEl.append(card); 

}



function renderItems (city, data) {
    currentWeathData(city, data.current, data.timezone);
    forecastData(data.daily, data.timezone);
}


function getData (location){
    var {lat} = location;
    var {lon} = location;
    var city = location.name;
    var apiUrl = `${rootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${APIKey}`;
    

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
    
}

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
}

function handleSearchFormSubmit(e) {
    // Don't continue if there is nothing in the search form
    if (!searchInputEl.value) {
      return;
    }
  
    e.preventDefault();
    var search = searchInputEl.value.trim();
    fetchCoords(search);
    searchInputEl.value = '';
  }
  
  function handleSearchHistoryClick(e) {
    // Don't do search if current elements is not a search history button
    if (!e.target.matches('.btn-history')) {
      return;
    }
  
    var btn = e.target;
    var search = btn.getAttribute('data-search');
    fetchCoords(search);
  }

