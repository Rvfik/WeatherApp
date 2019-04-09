import axios from 'axios';

document.getElementById('citySearchButton').addEventListener('click', BuildApp)

const getJSONfromAPI = async () => {
    const city = document.getElementById('citySearch').value || "wroclaw";
    document.getElementById('searchErrorMessage').textContent = '';

    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0b72f178992e5ddc7fa93b511b4a5dff`)
        .then(response => {
            const weather = response.data
            return weather;
        }).catch((e) => {
            document.getElementById('searchErrorMessage').textContent = 'Wrong name of the city was typed'
            console.log(e)
        })
}

async function getData() {
    let response = await getJSONfromAPI();

    let clouds = response.clouds.all;
    let latitude = response.coord.lat;
    let longitude = response.coord.lon;
    let humidity = response.main.humidity;
    let pressure = response.main.pressure;
    let temp = Math.floor(response.main.temp - 273.15);
    let temp_max = Math.floor(response.main.temp_max - 273.15);
    let temp_min = Math.floor(response.main.temp_min - 273.15);
    let cityName = response.name;
    let country = response.sys.country;
    let sunrise = Unix_timestamp(response.sys.sunrise);
    let sunset = Unix_timestamp(response.sys.sunset);
    let visibility = response.visibility;
    let description = response.weather[0].description;
    let parameter = response.weather[0].main;
    let icon = response.weather[0].icon;
    let windDeg = response.wind.deg;
    let windSpeed = response.wind.speed;
    // let rain1h = response.rain.1h        // Rain volume for the last 1 hour, mm
    // let rain3h = response.rain.3h        // Rain volume for the last 3 hours, mm
    // let snow1h = response.snow.1h        // Snow volume for the last 1 hour, mm
    // let snow3h = response.snow.3h        // Snow volume for the last 3 hours, mm

    document.getElementById('clouds').innerText = `${clouds}%`
    // document.getElementById('latitude').innerText = `latitude: ${latitude}°`
    // document.getElementById('longitude').innerText = `longitude: ${longitude}°`
    document.getElementById('humidity').innerText = `${humidity}%`
    document.getElementById('pressure').innerText = `${pressure} hPa`
    document.getElementById('temp').innerText = `${temp}° C`
    document.getElementById('temp_max').innerText = `max ${temp_max}° C min ${temp_min}° C`
    // document.getElementById('temp_min').innerText = `min ${temp_min}° C`
    document.getElementById('cityName').innerText = `${cityName}, ${country}`
    document.getElementById('sunrise').innerText = `${sunrise}`
    document.getElementById('sunset').innerText = `${sunset}`
    document.getElementById('visibility').innerText = `${visibility} m`
    // document.getElementById('description').innerText = `${description}`
    // document.getElementById('weatherParameter').innerText = `parameter: ${parameter}`
    // document.getElementById('icon').innerText = `icon: ${icon}`
    // document.getElementById('windDeg').innerText = `${windDeg}°`
    document.getElementById('windSpeed').innerText = `${windSpeed} m/s`
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
    const city = document.getElementById('citySearch').value || "wroclaw";

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
    console.log(response.list.filter(el => el))



    let tempForecast = tempFiveDays.map(el => ({
        temp: el.main.temp,
        icon: el.weather.map(item => item.icon).reduce(item => item)
    }));
    console.log(tempForecast[0].temp)


    for (let day of tempForecast) {

        let indexOf = tempForecast.indexOf(day)
        let dayTemp = Math.floor(day.temp - 273.15);

        document.getElementById(`temperatureDay${indexOf + 1}`).innerText = `${dayTemp}° C`
        // document.getElementById(`iconDay${indexOf + 1}`).innerHTML = `${dayTemp}° C`
    }
}
getForecast()

function BuildApp() {
    getData();
    getForecast();
}