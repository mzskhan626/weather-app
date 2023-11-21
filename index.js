const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "a71a99ead868e3b5633361c18fcadffb";
  const cityInput = document.querySelector(".search-box input");
  const city = cityInput.value;

  if (city === "") return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      let selectedUnit = "celsius"; // Default to Celsius

      // Function to update the temperature display based on the selected unit
      function updateTemperatureDisplay(json) {
        const temperature = document.querySelector(".weather-box .temperature");

        if (selectedUnit === "celsius") {
          const celsius = parseInt(json.main.temp);
          temperature.innerHTML = `${celsius}<span>°C</span>`;
        } else if (selectedUnit === "fahrenheit") {
          const celsius = parseInt(json.main.temp);
          const fahrenheit = (celsius * 9) / 5 + 32;
          temperature.innerHTML = `${fahrenheit.toFixed(2)}<span>°F</span>`;
        }
      }

      // Function to handle the Celsius button click
      document
        .getElementById("celsius-button")
        .addEventListener("click", () => {
          selectedUnit = "celsius";
          updateTemperatureDisplay(json); // Pass the JSON data from the API response
        });

      // Function to handle the Fahrenheit button click
      document
        .getElementById("fahrenheit-button")
        .addEventListener("click", () => {
          selectedUnit = "fahrenheit";
          updateTemperatureDisplay(json); // Pass the JSON data from the API response
        });

      search.addEventListener("click", () => {
        // Your existing code for fetching weather data

        // Update the temperature display after fetching data
        updateTemperatureDisplay(json); // Pass the JSON data from the API response
      });
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;
        case "Rain":
          image.src = "images/rain.png";
          break;
        case "Snow":
          image.src = "images/snow.png";
          break;
        case "Clouds":
          image.src = "images/cloud.png";
          break;
        case "Haze":
          image.src = "images/mist.png";
          break;
        default:
          image.src = "";
      }
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
});
