import axios from 'axios';

document.getElementById('citySearchButton').addEventListener('click', getAllData)

const getJSONfromAPI = async () => {
    const city = document.getElementById('citySearch').value || "Wroclaw";
    document.getElementById('searchErrorMessage').textContent = '';

    return axios.get(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0b72f178992e5ddc7fa93b511b4a5dff`)
        .then(response => {
            const weather = response.data
            return weather;
        }).catch((e) => {
            document.getElementById('searchErrorMessage').textContent = 'Wrong name of the city was typed'
        })
}

async function getData() {
    let response = await getJSONfromAPI();

    let humidity = response.main.humidity;
    let pressure = response.main.pressure;
    let temp = Math.floor(response.main.temp - 273.15);
    let tempMax = Math.floor(response.main.temp_max - 273.15);
    let tempMin = Math.floor(response.main.temp_min - 273.15);
    let cityName = response.name;
    let country = response.sys.country;
    let sunrise = Unix_timestamp(response.sys.sunrise);
    let sunset = Unix_timestamp(response.sys.sunset);
    let visibility = Math.floor(response.visibility * 0.001);
    let windDeg = response.wind.deg;
    let windSpeed = response.wind.speed;

    document.getElementById('humidity').innerText = `${humidity}%`
    document.getElementById('pressure').innerText = `${pressure} hPa`
    document.getElementById('temp').innerText = `${temp}°C`
    document.getElementById('tempMax').innerText = `${tempMax}°C`
    document.getElementById('tempMin').innerText = `${tempMin}°C`
    document.getElementById('cityName').innerText = `${cityName}, ${country}`
    document.getElementById('sunrise').innerText = `${sunrise}`
    document.getElementById('sunset').innerText = `${sunset}`
    document.getElementById('visibility').innerText = `${visibility} km`
    // document.getElementById('windDeg').innerText = `${windDeg}°`
    document.getElementById('windSpeed').innerText = `${windSpeed} m/s`


    let iconHeaderDay = response.weather.map(el => el.icon).reduce(icon => icon)
    let selectHeaderDayIcon = `<img src=http://openweathermap.org/img/w/${iconHeaderDay}.png width="90" height="90">`;
    document.getElementById('iconDayHeader').innerHTML = selectHeaderDayIcon;
}

function Unix_timestamp(t) {
    var dt = new Date(t * 1000);
    var hr = dt.getHours();
    var m = "0" + dt.getMinutes();
    var s = "0" + dt.getSeconds();
    return hr + ':' + m.substr(-2);
}

getData()

const getForecastfromAPI = async () => {
    const city = document.getElementById('citySearch').value || "Wroclaw";

    return axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=0b72f178992e5ddc7fa93b511b4a5dff`)
        .then(response => {
            const forecast = response.data
            return forecast;

        }).catch((e) => {
            document.getElementById('searchErrorMessage').textContent = 'Wrong name of the city was typed'
        })
}

async function getForecast() {
    let response = await getForecastfromAPI();

    let tempFiveDays = response.list.filter(el => el.dt_txt.includes("12:00:00"));

    let tempForecast = tempFiveDays.map(el => ({
        temp: el.main.temp,
        icon: el.weather.map(item => item.icon).reduce(item => item),
        weekDay: el.dt_txt
    }));

    for (let day of tempForecast) {

        let indexOf = tempForecast.indexOf(day);
        let dayTemp = Math.floor(day.temp - 273.15);
        let weekDay = new Date(day.weekDay);
        let dayIcon = day.icon;

        let NumberOfWeekday = weekDay.getDay();
        const NameOfWeekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        let selectIconDay = `<img src=http://openweathermap.org/img/w/${dayIcon}.png>`;

        document.getElementById(`temperatureDay${indexOf + 1}`).innerText = `${dayTemp}°C`;
        document.getElementById(`weekDay${indexOf + 1}`).innerText = NameOfWeekday[NumberOfWeekday];
        document.getElementById(`iconDay${indexOf + 1}`).innerHTML = selectIconDay;
    }
}
getForecast()



function getAllData() {
    getData();
    getForecast();
    document.getElementById('citySearch').value = null;
}