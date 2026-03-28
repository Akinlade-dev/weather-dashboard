const API_KEY = 'a1b2c3d4e5f678901234567890123456'; // Replace with your actual API key
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value.trim();
    const resultDiv = document.getElementById('weather-result');
    
    if (!city) {
        resultDiv.innerHTML = '<p>Please enter a city name</p>';
        return;
    }
    
    resultDiv.innerHTML = '<p>Loading...</p>';
    
    try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        resultDiv.innerHTML = `
            <div class="weather-card">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}

// Allow Enter key to search
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});
