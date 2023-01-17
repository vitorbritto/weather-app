const API_KEY = 'PUT_API_KEY_HERE';
const OPEN_WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const WEATHER_TEMP_URL = 'http://openweathermap.org/img/wn';

const input = document.querySelector('input');
const button = document.querySelector('button');

const place = document.querySelector('#place');
const degress = document.querySelector('#degress');
const img = document.querySelector('img');
const wind = document.querySelector('#wind');
const content = document.querySelector('.content');

const handleClick = () => {
    if (!input.value) return;

    getWeatherData();
}

button.addEventListener('click', handleClick);

const getWeatherData = async () => {
    const URL = `${OPEN_WEATHER_BASE_URL}?q=${encodeURI(input.value)}&units=metrics&appid=${API_KEY}}`;

    try {
        await fetch(URL)
            .then(res => res.json())
            .then(data => {
                if (data?.cod && data.cod === 401) {
                    alert(data.message);
                    return;
                }

                if (data?.cod && data.cod === 404) {
                    alert(data.message);
                    return;
                }

                loadWeatherData(data);
            });
    } catch (error) {
        alert(error);
    }
}

const loadWeatherData = data => {
    place.innerHTML = `${data.name}, ${data.country}`;
    degress.innerHTML = `Temperature: ${Math.floor(data.main.temp)}&ordm; C`;
    img.src = `${WEATHER_TEMP_URL}/${data.weather[0].icon}@2x.png`;
    wind.innerHTML = `Wind: ${data.wind.speed} km/h`;
    content.style.display = "flex";
}