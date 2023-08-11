const apiKey = '625805d6ddb0cabe56ac9eafaf18fe37';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const weatherInfoContainer = document.getElementById('weather-info');
const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('get-weather-btn');

async function getWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        const weatherData = `
            <h2>${data.weather[0].description}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Feels Like: ${data.main.feels_like} °C</p>
            <p>Pressure: ${data.main.pressure} hPa</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;

        weatherInfoContainer.innerHTML = weatherData;
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

getWeatherBtn.addEventListener('click', () => {
    const userLocation = locationInput.value;
    if (userLocation) {
        getWeather(userLocation);
    } else {
        alert('Please enter a valid location.');
    }
});
