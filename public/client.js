document.addEventListener("DOMContentLoaded", function () {
  async function searchWeather() {
    const locationInput = document.getElementById("locationInput");

    if (!locationInput) {
      console.error('Input element with ID "locationInput" not found.');
      return;
    }

    const locationName = locationInput.value;

    try {
      const result = await getWeatherByLocationName(locationName);
      console.log(result);

      if (result.success) {
        console.log("Weather data:", result.data);
      } else {
        console.error("Error:", result.error);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  async function getWeatherByLocationName(locationName) {
    try {
      const response = await fetch(`/weather?locationName=${locationName}`);
      const weatherData = await response.json();

      if (response.ok) {
        return { success: true, data: weatherData };
      } else {
        return { success: false, error: weatherData.error || "Unknown error" };
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      return { success: false, error: "Error fetching weather data" };
    }
  }
});

async function searchWeather() {
  var locationInput = document.getElementById("locationInput");
  var locationName = locationInput.value;
  var weatherName = document.getElementById("weatherName");
  var weatherCountry = document.getElementById("weatherCountry");
  var weatherTem = document.getElementById("weatherTem");
  var weatherTem_min = document.getElementById("weatherTem_min");
  var weatherTem_max = document.getElementById("weatherTem_max");
  var weatherHum = document.getElementById("weatherHum");
  var weatherWind_speed = document.getElementById("weatherWind_speed");
  console.log("Searching for weather in", locationName);
  try {
    const response = await fetch(`/weather?locationName=${locationName}`); //fetch:请求接口
    const weatherDataInfo = await response.json();

    if (response.ok) {
      // Successful response
      const weatherData = weatherDataInfo.data;
      weatherName.innerText = "City Name:" + " " + weatherData.name;
      weatherCountry.innerText = "Country:" + " " + weatherData.sys.country;
      weatherTem.innerText = "Temperature:" + " " + weatherData.main.temp + "℉";
      weatherTem_min.innerText =
        "Min Temperature:" + " " + weatherData.main.temp_min + "℉";
      weatherTem_max.innerText =
        "Max Temperature:" + " " + weatherData.main.temp_max + "℉";
      weatherHum.innerText =
        "Humidity:" + " " + weatherData.main.humidity + "%";
      weatherWind_speed.innerText =
        "Wind Speed:" + " " + weatherData.wind.speed + "m/s";

      // Show images after setting weather data
      showImages();
      return { success: true, data: weatherData };
    } else {
      // Response with error status
      weatherName.innerText = "City not found";
      hideImages();
      return { success: false, error: weatherData.error || "Unknown error" };
    }
  } catch (error) {
    // Network or parsing error
    console.error("Error fetching weather data:", error);
    return { success: false, error: "Error fetching weather data" };
  }
}

function showImages() {
  // Get all image elements and make them visible
  const images = document.querySelectorAll(".box2 img");
  images.forEach((image) => {
    image.style.display = "block";
  });
}

function hideImages() {
  // Get all image elements and hide them
  const images = document.querySelectorAll(".box2 img");
  images.forEach((image) => {
    image.style.display = "none";
  });
}
