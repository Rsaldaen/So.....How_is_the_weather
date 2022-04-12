const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"]
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const API_KEY ='18745655292e94d818a39f32aac287bd'

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? "PM" : "AM"

    timeEl.innerHTML = hoursIn12HrFormat + ":" + minutes + ' ' + ampm

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000)

function getWeatherData() {
    
    var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,minutely&appid=" + API_KEY;

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });
}
getWeatherData();


function showWeatherDate (data)
    let {humidity, pressure, wind_speed, uvi} = data.current;

    currentWeatherItemsEl.innerHTML =
    <><div class="weather-item">
            <div>Humidity</div>
            <div>${humidity}</div>
        </div><><div class="weather-item">
            <div>Pressure</div>
            <div>${pressure}</div>
        </div><div class="weather-item">
                    <div>Wind Speed</div>
                    <div>${wind_speed}</div>
                </div><div class="weather-item">
                    <div>UV Index</div>
                    <div>${uvi}</div>
                </div>

            </></>

    let otherDayForcast = ''
    data.daily.forEach((d, idx) => {
        if(idx == 0) {

        }else{
            otherDayForcast += 
                <div class="weather-forecast-item">
                    <div class="day">$(window.moment(day.dt*1000).format('ddd))</div>
                    <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                    <div class="temp">Night - ${day.temp.night}&#176; F</div>
                    <div class="temp">Day - ${day.temp.day}&#176; F</div>
                </div>
                
            }
        })

