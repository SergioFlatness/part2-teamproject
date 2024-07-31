document.addEventListener('DOMContentLoaded', () => {
    showNews();
});

function showWeather() {
    const weatherApiKey = '81c32e0166c08b96a43605797a7bd659';
    const weatherCity = 'Seoul';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&appid=${weatherApiKey}&units=metric`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                <h2>Weather</h2>
                <p>City: ${data.name}</p>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('widget-container').innerHTML = weatherInfo;
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function showNews() {
    const newsApiKey = '8853b42cfa264087b27d071901006ce8';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

    fetch(newsApiUrl)
        .then(response => response.json())
        .then(data => {
            const articles = data.articles.slice(0, 5).map(article => `
                <div>
                    <h3><a href="${article.url}" target="_blank">${article.title}</a></h3>
                    <p>${article.description}</p>
                    <p><em>Source: ${article.source.name}</em></p>
                </div>
            `).join('');
            const newsInfo = `
                <h2>News</h2>
                ${articles}
            `;
            document.getElementById('widget-container').innerHTML = newsInfo;
        })
        .catch(error => console.error('Error fetching the news data:', error));
}
