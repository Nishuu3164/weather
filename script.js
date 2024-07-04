const apiKey = 'f81b945845ebfe1d6a62f4f130cb4834'; // OpenWeatherMap API key

async function fetchWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

function displayWeather(cityWeather) {
    const weatherContainer = document.getElementById('weather-container');
    
    
    if (cityWeather.cod !== 200) {
        alert('City not found. Please enter a valid city name.');
        return;
    }

    const weatherCard = document.createElement('div');
    weatherCard.className = 'weather-card';

    const weatherImg = document.createElement('img');
    weatherImg.src = `https://openweathermap.org/img/wn/${cityWeather.weather[0].icon}@2x.png`;
    weatherImg.alt = cityWeather.weather[0].description;

    const weatherInfo = document.createElement('div');
    weatherInfo.className = 'weather-info';

    const cityName = document.createElement('h2');
    cityName.textContent = cityWeather.name;

    const temperature = document.createElement('div');
    temperature.className = 'temperature';
    temperature.textContent = `${cityWeather.main.temp}°C`;

    const description = document.createElement('div');
    description.className = 'description';
    description.textContent = cityWeather.weather[0].description;

    weatherInfo.appendChild(cityName);
    weatherInfo.appendChild(temperature);
    weatherInfo.appendChild(description);

    weatherCard.appendChild(weatherInfo);
    weatherCard.appendChild(weatherImg);

    weatherContainer.appendChild(weatherCard);
}

document.getElementById('search-button').addEventListener('click', async () => {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput) {
        const weatherData = await fetchWeather(cityInput);
        displayWeather(weatherData);
    } else {
        alert('Please enter a city name.');
    }
});
