// script.js
const weatherAPIKey = '81c32e0166c08b96a43605797a7bd659';
const newsAPIKey = '8853b42cfa264087b27d071901006ce8';


document.addEventListener('DOMContentLoaded', () => {
    loadWeather();
    document.getElementById('newsButton').addEventListener('click', loadNews);
    document.getElementById('airQualityButton').addEventListener('click', loadTrends);
});

function loadWeather() {
    const weatherDiv = document.getElementById('weather');
    const city = 'Seoul'; // 원하는 도시로 변경 가능

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            const temp = data.main.temp;
            const weatherDescription = data.weather[0].description;
            weatherDiv.innerHTML = `현재 서울 날씨: ${temp}°C, ${weatherDescription}`;
        })
        .catch(error => {
            console.error('날씨 API 호출 오류:', error);
            weatherDiv.innerHTML = '날씨 정보를 불러오는 데 실패했습니다.';
        });
}


const contentDiv = document.getElementById('content');
fetch(`https://newsapi.org/v2/top-headlines?country=kr&pageSize=10&apiKey=${newsAPIKey}`)
    .then(response => response.json())
    .then(data => {
        contentDiv.innerHTML = '<h2>뉴스 헤드라인</h2>';
        data.articles.forEach(article => {
            contentDiv.innerHTML += `<div>${article.title}</div>`;
        });
    })
    .catch(error => {
        console.error('뉴스 API 호출 오류:', error);
        contentDiv.innerHTML = '뉴스 정보를 불러오는 데 실패했습니다.';
    });


function lookupWord() {
    const word = document.getElementById('word-input').value;
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found');
            }
            return response.json();
        })
        .then(data => {
            displayResult(data);
        })
        .catch(error => {
            document.getElementById('result').innerHTML = `<p>${error.message}</p>`;
        });
}

function displayResult(data) {
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';
    
    data.forEach(entry => {
        const wordElement = document.createElement('h2');
        wordElement.textContent = entry.word;
        resultContainer.appendChild(wordElement);
        
        entry.meanings.forEach(meaning => {
            const partOfSpeech = document.createElement('h3');
            partOfSpeech.textContent = meaning.partOfSpeech;
            resultContainer.appendChild(partOfSpeech);
            
            meaning.definitions.forEach((definition, index) => {
                const definitionElement = document.createElement('div');
                definitionElement.classList.add('definition');
                definitionElement.innerHTML = `<strong>Definition ${index + 1}:</strong> ${definition.definition}`;
                
                if (definition.example) {
                    const exampleElement = document.createElement('p');
                    exampleElement.innerHTML = `<em>Example:</em> ${definition.example}`;
                    definitionElement.appendChild(exampleElement);
                }
                
                resultContainer.appendChild(definitionElement);
            });
        });
    });
}
