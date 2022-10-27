var apiKey = "4975dbb81a9172a983659e417ce941fa";
//var rootUrl = "http://api.openweathermap.org";
var city;
var currentDate = moment().format("MMM Do, YYY");
var searchHistoryArr = (localStorage.getItem('city'))?JSON.parse(localStorage.getItem('city')):[];

var searchBtnEl = $("#search-button");
var searchInputEl = $("#search-input");
var searchFormEl = $("#search-form");
var todayContainerEl = $("#today");
var forecastContainerEl = $("#forecast");
var searchHistoryContainerEl = $("#history");

displayCity();

function displayCity () {
    searchHistoryContainerEl.html("")
    $(searchHistoryArr).each(function (i,el) {
        searchHistoryContainerEl.prepend("<li>" + el + "<li>");
    })
    $("li").attr("class", "list-group-item list-group-item-action");

    $("li").on("click", function () {
        var liEl = $(this).text();
        city = liEl;
        displayWeather();
    });
};

function searchForm(event) {
    event.preventDefault();
    city = $("#search-input").val().trim();
    if(!searchHistoryArr.includes(city)) {
        searchHistoryArr.push(city)}
        if (!city) {
            return;
        }
        displayCity();

        $("#cityName").text(city);
        $("input[name= 'form-input']").val("");

        localStorage.setItem("city", JSON.stringify(searchHistoryArr));
    }
    searchFormEl.on("submit",searchForm);

function displayWeather () {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    fetch(requestUrl)
    .then(function (response) {
        return response.json()
    })
    .then(function(data) {
        var cityName = data.name
        var latEl = data.coord.lat
        var lonEl = data.coord.lon

        var requestUrlLatLon = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latEl + "&lon=" + lonEl + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
        fetch(requestUrlLatLon)
        .then(function(response) {
            return response.json()
        })
        .then(function (data) {
            $("#cityName").text(cityName);
            $("#currentDate").text(currentDate);
            $("#weatherIcon").attr({"src":"http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png", "width":"100px", "height":"100px"});
            $("#currentTemp").text("Temperature: " + data.current.temp + " °F");
            $("#currentHum").text("Humidity: " + data.current.humidity + "%");
            $("#currentWind").text("Wind Speed: " + data.current.wind_speed + " mph");
            $("#currentUvi").text("UV Index: " + data.current.uvi);
            
            if(data.current.uvi >= 6) {
                $("#currentUvi").attr("class", "bg-danger")
            } else if(data.current.uvi >= 3) {
                $("#currentUvi").attr("class", "bg-warning")
            } else {
                $("#currentUvi").attr("class", "bg-success")
            }

            $("#forecastDate1").text(moment().add(1, 'day').format("MMM Do, YYYY"));
            $("#forecastDate2").text(moment().add(2, 'day').format("MMM Do, YYYY"));
            $("#forecastDate3").text(moment().add(3, 'day').format("MMM Do, YYYY"));
            $("#forecastDate4").text(moment().add(4, 'day').format("MMM Do, YYYY"));
            $("#forecastDate5").text(moment().add(5, 'day').format("MMM Do, YYYY"));
            
            // set weather icon for 5-day forecast
            $("#forecastIcon1").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon2").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon3").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon4").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});
            $("#forecastIcon5").attr({"src":"http://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + "@2x.png", "width":"50px", "height":"50px"});

            // set temp for 5-day forecast
            $("#temp1").text("Temp: " + data.daily[1].temp.day + " °F");
            $("#temp2").text("Temp: " + data.daily[2].temp.day + " °F");
            $("#temp3").text("Temp: " + data.daily[3].temp.day + " °F");
            $("#temp4").text("Temp: " + data.daily[4].temp.day + " °F");
            $("#temp5").text("Temp: " + data.daily[5].temp.day + " °F");

            // set humidity for 5-day forecast
            $("#hum1").text("Humidity: " + data.daily[1].humidity + "%");
            $("#hum2").text("Humidity: " + data.daily[2].humidity + "%");
            $("#hum3").text("Humidity: " + data.daily[3].humidity + "%");
            $("#hum4").text("Humidity: " + data.daily[4].humidity + "%");
            $("#hum5").text("Humidity: " + data.daily[5].humidity + "%");
        })
    })

};

searchFormEl.on("submit", displayWeather);
