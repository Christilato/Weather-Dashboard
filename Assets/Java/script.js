var APIKey = "4975dbb81a9172a983659e417ce941fa";
var city;
var rootUrl = "http://api.openweathermap.org";

//data/2.5/weather?q=" + city + "&appid=" + APIKey;

var searchHistory = [];

var searchBtnEl = $("#search-button");
var searchInputEl = $("#search-input");
var searchFormEl = $("#search-form");
var todayContainer = $("#today");
var forecastContainer = $("#forecast");
var searchHistoryContainer = $("#history");

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


// function to display the search history list
    //(for loop)start at end of search history array
    // create a button for those items
    // append the button to the search history container
    //& count down (backwards bc most recent first)

// 

// function to update history in local storage & update history that is being displayed
    // enter search term, if it does not exit, then we push it to the search history array
    //localStorage.setItem(searchhistory)


// function to get search history from local storage
    // localStorage.getItem(SearchHistory)


// function that displays the current weather data that is fecthed from the curren weather api
    // declare var for date, (all the response date we need)(wind, temp, icon, etc.)
    // declaire var for html elements that we are creating- 
    // building this section in the js
    // once declared then we set attributes (classes, weather will need src)
    // do .appends to make sure its appeneded to the parents
    // conditional formatting for the UV (3 seperate classes for UVI)

// function that displays the forecast card
    // similar to the function prior
    
// function that builds 5 of those cards 
    // use dayjs to declare variable for start/end date
    // for loop through the days & data (we are calling the 7 day forecast)
    // conditional formatting for if they are between the first and last date


// funcction thaat fethces the data from weather geo location
    // take in latitude & longitude 

//    another function that takke in the city and returns the latitude & longitude

// function for search handle that will call on the coordinates
// ^^ same thing if someone clicks on the history items


// searchBtnEl.on("click", function(e){
//     e.preventDefault ();
//     var searchInputEl 
//     console.log(searchInputEl);
// })




// fetch("http://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API}")

 //You'll need to adjust your application to accept user input, to store in the city variable that you've created.

