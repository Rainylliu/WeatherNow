import express from "express";
import LocationWeatherInfo from "location-weather-info";

const app = express();
const port = 3001;

const weather = new LocationWeatherInfo("c143a0179deec5064ed72df015c30c1c");
console.log(weather);
const cors = require("cors");
app.use(cors());
app.use(express.static("public")); 
app.use(express.json()); 

app.get("/weather", async (req, res) => {
  try {
    const location = req.query.locationName;
    const data = await weather.getWeatherByLocation(location);
    res.json(data);
  } catch (error) {
    res.status(500).send("Error occurred");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
