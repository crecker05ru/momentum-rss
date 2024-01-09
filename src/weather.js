import { APIKEY } from "./js/key";

let fetchOptions = {
  method: 'GET', // *GET, POST, PUT, DELETE, etc.
   // no-cors, *cors, same-origin
   // *default, no-cache, reload, force-cache, only-if-cached
   // include, *same-origin, omit
  headers: {
    'Accept-Language': 'ru-Ru',
    'Content-Language': 'ru-Ru',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
   // manual, *follow, error
   // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
   // body data type must match "Content-Type" header
}

export default function(language,userCity){
const weatherIcon = document.querySelector('.weather-icon')
const temperature = document.querySelector('.temperature')
const weatherDescription = document.querySelector('.weather-description')
const weatherError = document.querySelector('.weather-error')
const windElement = document.querySelector('.wind')
const humidityElement = document.querySelector('.humidity')
const cityElem = document.querySelector('.city')

cityElem.value = userCity

window.addEventListener('load', () => {
  // getLocalStorage()


  // if(!cityElem.value){
  //   cityElem.value = 'Минск'
  // }
//   setTimeout(() => {
//   getWeather(cityElem.value)
// }, 1000);
})



const weatherLang = {
  'ru':['Скорость ветра','м/с','Влажность'],
  'en': ['Wind speed','m/s','Humadity']
}
async function getWeather(city) { 
  // city = cityElem.value
  weatherError.textContent = ''
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${language}&appid=${APIKEY}&units=metric` 
  try {
    const res = await fetch(apiUrl,fetchOptions)
    const data = await res.json() 
    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`)
    temperature.textContent = `${data.main.temp.toFixed()}°C`
    weatherDescription.textContent = data.weather[0].description
    windElement.textContent = `${weatherLang[language][0]}: ${data.wind.speed.toFixed()}${weatherLang[language][1]}`
    humidityElement.textContent = `${weatherLang[language][2]}: ${data.main.humidity}%`
  }catch(e){
    console.log('error',e)
    weatherError.textContent = e
  }

}

weatherError.addEventListener('click',function(){
  this.style.display = "none"
}
)

getWeather(cityElem.value)

cityElem.addEventListener('change',() => {
  getWeather(cityElem.value)
})

function setLocalStorage() {
  localStorage.setItem('city', cityElem.value);
}
window.addEventListener('beforeunload', setLocalStorage)

}