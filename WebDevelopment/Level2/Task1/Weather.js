function getWeather() {
  var city = document.getElementById("cityInput").value;
  var apiKey = "be79f555723a8a40223de3466f961ccf"; 

  var req = new XMLHttpRequest();
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        var response = JSON.parse(req.responseText);
        displayWeather(response);
      } else {
        displayError();
      }
    }
  };

  req.open("GET", url, true);
  req.send();
}

function displayWeather(data) {
  var weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = "";

  var cityName = document.createElement("h2");
  cityName.textContent = data.name;
  weatherInfo.appendChild(cityName);

  var temperature = document.createElement("p");
  temperature.textContent = "Temperature: " + (data.main.temp - 273.15).toFixed(2) + "°C";
  weatherInfo.appendChild(temperature);

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + data.main.humidity + "%";
  weatherInfo.appendChild(humidity);

  var description = document.createElement("p");
  description.textContent = "Description: " + data.weather[0].description;
  weatherInfo.appendChild(description);
}

function displayError() {
  var weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = "<p> Unable to fetch weather data </p>";
}
