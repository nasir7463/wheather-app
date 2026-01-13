const apiKey = "f0a7c1f8c4ec991344cbc2869978aff8";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.getElementById("search-btn");
const geoBtn = document.getElementById("geo-btn");
const weatherIcon = document.querySelector(".weather-icon");

// Main function to fetch data
async function fetchWeather(url) {
    try {
        const response = await fetch(url + `&appid=${apiKey}`);
        if (!response.ok) throw new Error("City not found");
        
        const data = await response.json();
        updateUI(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to update the HTML elements
function updateUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    
    // Set dynamic icon from OpenWeatherMap's library
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Event: Search by City
searchBtn.addEventListener("click", () => {
    if (searchBox.value) {
        fetchWeather(`${baseUrl}&q=${searchBox.value}`);
    }
});

// Event: Search by Current Location (GPS)
geoBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`${baseUrl}&lat=${latitude}&lon=${longitude}`);
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});