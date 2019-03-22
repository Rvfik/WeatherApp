import axios from 'axios';

const weatherLink = 'http://api.openweathermap.org/data/2.5/weather?q=Wroclaw,pl&APPID=0b72f178992e5ddc7fa93b511b4a5dff';

const getJSONfromAPI = () => {
    return axios.get(weatherLink)
        .then(response => {
            const res = response.data;
            return res;   
        })
        .catch(err => console.log(err));
}

async function getData() {
    let response = await getJSONfromAPI();
    console.log(response)

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
    let sunrise = new Date(response.sys.sunrise).toLocaleTimeString();
    let sunset = new Date(response.sys.sunset).toLocaleTimeString();
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



    


    document.getElementById('clouds').innerText = `clouds: ${clouds}%`
    document.getElementById('latitude').innerText = `latitude: ${latitude}°`
    document.getElementById('longitude').innerText = `longitude: ${longitude}°`
    document.getElementById('humidity').innerText = `humidity: ${humidity}%`
    document.getElementById('pressure').innerText = `pressure: ${pressure} hPa`
    document.getElementById('temp').innerText = `temp: ${temp}° C`
    document.getElementById('temp_max').innerText = `temp_max: ${temp_max}° C`
    document.getElementById('temp_min').innerText = `temp_min: ${temp_min}° C`
    document.getElementById('cityName').innerText = `cityName: ${cityName}`
    document.getElementById('country').innerText = `country: ${country}`
    document.getElementById('sunrise').innerText = `sunrise: ${sunrise} nie wiem jeszcze`
    document.getElementById('sunset').innerText = `sunset: ${sunset} nie wiem jeszcze`
    document.getElementById('visibility').innerText = `visibility: ${visibility} m`
    document.getElementById('description').innerText = `description: ${description}`
    document.getElementById('weatherParameter').innerText = `parameter: ${parameter}`
    document.getElementById('icon').innerText = `icon: ${icon}`
    document.getElementById('windDeg').innerText = `windDeg: ${windDeg}°`
    document.getElementById('windSpeed').innerText = `windSpeed: ${windSpeed}m/s`
}

getData()



