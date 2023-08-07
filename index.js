const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');
const weatherLink = document.getElementById('weather-link');


let isCloudy = false;
let isClear = false;
let isRainy = false;
let isSnowy = false;
let isHazy = false;

function changeBackground(weather) {
    const body = document.body;
    body.classList.remove('clear-background', 'cloudy-background', 'rain-background', 'snow-background', 'haze-background');
  
    if (isClear && weather === 'Clear') {
        body.classList.add('clear-background');
    } else if (isCloudy && weather === 'Clouds') {
        body.classList.add('cloudy-background');
    } else if (isRainy && weather === 'Rain') {
        body.classList.add('rain-background');
    } else if (isSnowy && weather === 'Snow') {
        body.classList.add('snow-background');
    } else if (isHazy && weather === 'Haze') {
        body.classList.add('haze-background');
    }
}

function fetchWeatherData() {
    const APIKey = '5047e87e89d4f0a21d2c5bb65fb5b770';
    const city = input.value;

    if (city === '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                changeBackground('');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    isClear = true;
                    isCloudy = false;
                    isRainy = false;
                    isSnowy = false;
                    isHazy = false;
                    changeBackground('Clear');
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    isClear = false;
                    isCloudy = false;
                    isRainy = true;
                    isSnowy = false;
                    isHazy = false;
                    changeBackground('Rain');
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    isClear = false;
                    isCloudy = false;
                    isRainy = false;
                    isSnowy = true;
                    isHazy = false;
                    changeBackground('Snow');
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    isClear = false;
                    isCloudy = true;
                    isRainy = false;
                    isSnowy = false;
                    isHazy = false;
                    changeBackground('Clouds');
                    break;
                case 'Haze':
                    image.src = 'images/mist.png';
                    isClear = false;
                    isCloudy = false;
                    isRainy = false;
                    isSnowy = false;
                    isHazy = true;
                    changeBackground('Haze');
                    break;
                default:
                    image.src = '';
                    isClear = false;
                    isCloudy = false;
                    isRainy = false;
                    isSnowy = false;
                    isHazy = false;
                    changeBackground('');
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}

search.addEventListener('click', fetchWeatherData);
input.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
        fetchWeatherData();
    }
});


setInterval(() => {
    const time = document.getElementById("time");
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    time.textContent = hours + ":" + minutes + ":" + seconds;

    const container = document.querySelector('.container');

    function showContainerWithDelay() {
      container.style.display = 'block'; 
    }

    setTimeout(showContainerWithDelay, 7000);
});

weatherLink.addEventListener('click', () => {
    const textElement = document.querySelector('.text1');
    textElement.style.display = 'none'; // Skryť text
    container.style.display = 'block';
    getWeather(input.value);
  });
  