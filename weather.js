// weather.js
import fs from "fs";
import fetch from "node-fetch"; // Node >=18 has fetch built-in, so you can remove this line if you're on v18+

// Replace with your actual WeatherAPI key
const API_KEY = "7a5f1569900d497b99e34511250409";
const CITY = "London";

// Example endpoint: Current weather
const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${CITY}&aqi=no`;

async function getWeather() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }

    const data = await response.json();

    // Format into readable text
    let output = `Weather Report for ${data.location.name}, ${data.location.region}, ${data.location.country}\n`;
    output += `Date/Time: ${data.location.localtime}\n\n`;
    output += `Condition: ${data.current.condition.text}\n`;
    output += `Temperature: ${data.current.temp_c}°C (${data.current.temp_f}°F)\n`;
    output += `Feels Like: ${data.current.feelslike_c}°C (${data.current.feelslike_f}°F)\n`;
    output += `Humidity: ${data.current.humidity}%\n`;
    output += `Wind: ${data.current.wind_kph} kph from ${data.current.wind_dir}\n`;

    // Write to local file
    fs.writeFileSync("weather_report.txt", output, "utf8");
    console.log("✅ Weather report saved to weather_report.txt");
  } catch (err) {
    console.error("Error fetching weather data:", err.message);
  }
}
