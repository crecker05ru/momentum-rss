import playList from "./js/playList"
import { APIKEY } from "./js/key"
import { quotesLibary } from "./js/quotesLibary"
import "./css/style.css"
import "./css/owfont-regular.css"
import date from "./date"
import greeting from "./greeting"
import quotes from "./quotes"
import player from "./player"
import weather from "./weather"
import bgSlider from "./bgSlider"
import todo from "./todo"
// import './assets/favicon.ico'

let userOptions = JSON.parse(localStorage.getItem("userOptions")) || {
  en: {
    Language: [
      { value: "EN", isChecked: true },
      { value: "RU", isChecked: false },
    ],
    "Photo source": [
      { value: "Github", isChecked: true },
      { value: "Unsplash", isChecked: false },
      { value: "Flickr", isChecked: false },
    ],
    "Show": [
      { value: "Player", isChecked: true },
      { value: "Weather", isChecked: true },
      { value: "Time", isChecked: true },
      { value: "Date", isChecked: true },
      { value: "Greeting", isChecked: true },
      { value: "Quote", isChecked: true }, 
      { value: "Todo", isChecked: true },
    ],
    "Photo tags": [
      { value: "nature", isChecked: true },
      { value: "cars", isChecked: true },
      { value: "buildings", isChecked: true },
      { value: "animals", isChecked: true },
    ],
  },
  ru: {
    Язык: [
      { value: "EN", isChecked: false },
      { value: "RU", isChecked: true },
    ],
    "Источник фото": [
      { value: "Github", isChecked: true },
      { value: "Unsplash", isChecked: false },
      { value: "Flickr", isChecked: false },
    ],
    "Показать блоки": [
      { value: "Плеер", isChecked: true },
      { value: "Погода", isChecked: true },
      { value: "Время", isChecked: true },
      { value: "Дата", isChecked: true },
      { value: "Приветствие", isChecked: true },
      { value: "Цитаты", isChecked: true },
      { value: "Список дел", isChecked: true },
    ],
    "Фото тэги": [
      { value: "nature", isChecked: true },
      { value: "cars", isChecked: true },
      { value: "buildings", isChecked: true },
      { value: "animals", isChecked: true },
    ],
  },
}



const appSettings = document.querySelector(".app-settings")
const toggleSettings = document.querySelector(".toggle-settings")
const appBlocks = document.querySelectorAll(".app-block")
console.log('appBlocks',appBlocks)

function drawAppBlock(){
  for(let i = 0;i < appBlocks.length;i++){
    if(!userOptions['ru']["Показать блоки"][i].isChecked){
      appBlocks[i].classList.remove('hide-block')
    }else {
      appBlocks[i].classList.add('hide-block')
    }
    if(userOptions['en']["Show"][i].isChecked){
      appBlocks[i].classList.remove('hide-block')
    }else {
      appBlocks[i].classList.add('hide-block')
    }

  }
}

drawAppBlock()
// const inputsCheckbox = document.querySelectorAll(".app-settings__input")
// const spanValue1 = document.querySelectorAll(".app-settings__value1")
const settingsDiv = document.querySelector(".app-settings")
// const settingsList = document.querySelector(".app-settings__list")
let language =
//userOptions['en'].Language.filter(lang => lang.isChecked === true)[0].value.toLowerCase()
  localStorage.getItem("language") || 'en' //navigator.language.split("-")[0]
// spanValue1[0].innerText = language === "ru" ? "en" : "ru"

let backgroundApi
// inputsCheckbox.forEach((element) => {
//   element.addEventListener("click", () => {
//     element.classList.toggle("input-checked")
//     changeLanguage()
//   })
// })

function changeLang (){
  if(userOptions['en']["Language"][0].isChecked === true){
    console.log('if userOptions["en"]["Language"][0].isChecked',userOptions['en']["Language"][0].isChecked)
    userOptions['en']["Language"][1].isChecked = false
    userOptions['ru']["Язык"][1].isChecked = false
  }else if(userOptions['en']["Language"][1].isChecked === false){
    console.log('if else userOptions["en"]["Language"][1].isChecked',userOptions['en']["Language"][1].isChecked)
    userOptions['en']["Language"][0].isChecked = true
    userOptions['ru']["Язык"][0].isChecked = true
  }
  if(userOptions['ru']["Язык"][0].isChecked === true){
    userOptions['en']["Language"][1].isChecked = false
    userOptions['ru']["Язык"][1].isChecked = false
  }else if(userOptions['ru']["Язык"][1].isChecked === false){
    userOptions['en']["Language"][0].isChecked = true
    userOptions['ru']["Язык"][0].isChecked = true
  }
}

function changeBackgroundApi (data,checkbox){
  // currentBgApi = BgApiMap[data.value]
  currentBgApi = data.value
  console.log('currentBgApi',currentBgApi)
  let chBox = document.querySelectorAll('.app-settings__input')
  userOptions[language]["Photo source" || "Источник фото"] = userOptions[language]["Photo source" || "Источник фото"].map(item => {
    if(item.value !== data.value){
      item.isChecked = false 
      
      console.log('checkbox',checkbox)
      
      chBox.forEach(elem => {
        if(elem.dataset.optionValue === item.value){
          console.log('elem chBox',elem)
          elem.checked = item.isChecked
          if(elem.checked){
            elem.classList.add("input-checked")
          }else {
            elem.classList.remove("input-checked")
          }
        }
      })
      console.log('chBox',chBox)
      // if(checkbox.dataset.optionValue === item.value){
      //   checkbox.checked = false
      //   checkBox.classList.remove("input-checked")
      //   console.log('checkBox.classList.remove("input-checked")',checkBox.classList)
      // }
    }
    return item
  })
  // location.reload()
  // updateCheckStatus()
  console.log(userOptions[language]["Photo source" || "Источник фото"])
}

// function updateCheckStatus(){
//   let chBox = document.querySelectorAll('.app-settings__input')
//   chBox.forEach(elem => {
//     if(elem.checked){
//       elem.classList.add("input-checked")
//     }else {
//       elem.classList.remove("input-checked")
//     }
//   })
//   console.log('chBox',chBox)
// }
const appOptions = {
  en: {
    Language: ["ru", "en"],
    "Photo source": ["github", "unsplash", "flickr"],
    Show: ["time", "date", "greeting", "quote", "weather", "audio", "todolist"],
    "Photo tags": ["nature", "cars", "buildings", "animals"],
  },
  ru: {
    Язык: ["ru", "en"],
    "Источник фото": ["github", "unsplash", "flickr"],
    "Показать блоки": [
      "time",
      "date",
      "greeting",
      "quote",
      "weather",
      "audio",
      "todolist",
    ],
    "Фото тэги": ["nature", "cars", "buildings", "animals"],
  },
}
let userSetup
//document.documentElement.setAttribute("lang", language)
//languageElement.textContent = document.documentElement.lang
console.log("language", language)
console.log("document.documentElement.lang", document.documentElement.lang)
let quotesData = quotesLibary[language]

function drawSettingList() {
  for (const key in userOptions[language]) {
    let ul = document.createElement("ul")
    ul.classList.add("app-settings__list")
    let h4 = document.createElement("h4")
    h4.innerText = `${key}`
    h4.classList.add("app-settings__header")
    settingsDiv.append(ul)
    ul.append(h4)
    if (Array.isArray(userOptions[language][key])) {
      userOptions[language][key].forEach((elem) => {
        let li = document.createElement("li")
        li.dataset.optionKey = key
        let span = document.createElement("span")
        let checkBox = document.createElement("input")
        checkBox.type = "checkbox"
        checkBox.classList.add("app-settings__input")
        checkBox.dataset.optionValue = elem.value
        checkBox.checked = elem.isChecked // сделать двухсторонюю связь
        if (checkBox.checked) {
          checkBox.classList.add("input-checked")
        } else {
          checkBox.classList.remove("input-checked")
        }
        li.classList.add("app-settings__item")
        span.classList.add("app-settings__value1")
        span.innerText = `${elem.value}`
        ul.append(li)
        li.append(checkBox)
        li.append(span)
        checkBox.addEventListener("change", (e) => {
          console.log('elem.isChecked',elem.isChecked)
          console.log('checkBox.dataset.optionValue',checkBox.dataset.optionValue)

          // if(key === "Language" || key === "Язык"){
          //   // changeLang()
          //   changeLanguage()
          // }

          if(key === "Photo source" || key === "Источник фото"){
            changeBackgroundApi(elem,checkBox)
            // bgSlider(randomNum, timeOfDayEn,userOptions,currentBgApi,currentTags)
          }

          if (checkBox.checked) {
            checkBox.classList.add("input-checked")
            elem.isChecked = true
          } else {
            checkBox.classList.remove("input-checked")
            elem.isChecked = false
            //userOptions[language][li.dataset.optionKey][checkBox.dataset.optionValue].isChecked = false
          }

          if(key === "Language" || key === "Язык"){
            // changeLang()
            // changeLanguage()
            if(elem.value === "RU"){
              elem.isChecked = true
              checkBox.checked = true
              userOptions['en']["Language"][0].isChecked = false
              userOptions['ru']["Язык"][0].isChecked = false
              userOptions['en']["Language"][1].isChecked = true
              userOptions['ru']["Язык"][1].isChecked = true
              changeLanguage()
            }
            if(elem.value === "EN"){
              elem.isChecked = true
              checkBox.checked = true
              userOptions['en']["Language"][0].isChecked = true
              userOptions['ru']["Язык"][0].isChecked = true
              userOptions['en']["Language"][1].isChecked = false
              userOptions['ru']["Язык"][1].isChecked = false
              changeLanguage()
            }
            
          }

          if(key === "Show" || key === "Показать блоки"){
            drawAppBlock()
          }
          if(key === "Photo tags" || key === "Фото тэги"){
           currentTags = userOptions[language]["Photo tags" || "Фото тэги"].filter(item => item.isChecked === true)
           
          }
          console.log('key in listener',key)
          console.log('userOptions checkbox',userOptions)
          console.log('currentTags',currentTags)
        })
      })
    }
    console.log("key in userOptions", key)
    // let li = document.createElement('li')
    // let span = document.createElement('span')
    // let checkBox = document.createElement('input')
    // checkBox.type = 'checkbox'
    // checkBox.classList.add('app-settings__input')
    // li.classList.add('app-settings__item')
    // span.classList.add('app-settings__value1')
    // settingsList.append(li)
    // li.append(checkBox)
    // li.append(span)
    // span.innerText = `${key}: ${appOptions[key]}`
  }
}

function hideBlock(block) {}
let timeofDayLanguage = {
  ru: ["ночи", "утро", "день", "вечер"],
  en: ["night", "morning", "afternoon", "evening"],
}

let randomNum

function getRandomNum() {
  randomNum = Number(
    String(Math.floor(Math.random() * 20 + 1)).padStart(2, "0")
  )
}
getRandomNum()

let minsk = {
  ru: "Минск",
  en: "Minsk",
}

let userCity = ""
let userName = ""

function getTimeOfDay() {
  const date = new Date()
  const timeofDay = timeofDayLanguage[language]
  const hours = date.getHours()
  let current = timeofDay[Math.floor(hours / 6)]
  console.log(hours)
  console.log("current", current)
  setTimeout(getTimeOfDay, 1000 * 60)
  return current
}

function getTimeOfDayEn() {
  const date = new Date()
  const timeofDay = timeofDayLanguage["en"]
  const hours = date.getHours()
  let current = timeofDay[Math.floor(hours / 6)]
  setTimeout(getTimeOfDay, 1000 * 60)
  return current
}

let timeOfDayEn = getTimeOfDayEn()
let timeOfDay = getTimeOfDay()



let currentTags = userOptions[language]["Photo tags" || "Фото тэги"].filter(item => item.isChecked === true)

let currentBgApi = userOptions[language]["Photo source" || "Источник фото"].filter(item => item.isChecked === true)[0].value || "Github"
date(language,userOptions)
quotes(quotesData, randomNum,userOptions)
bgSlider(randomNum, timeOfDayEn,userOptions,currentBgApi,currentTags)
todo(userOptions)

console.log("work 12")
console.log("playList", playList)
player(playList,userOptions)

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    userName = localStorage.getItem("name")
  }
  if (localStorage.getItem("language")) {
    document.documentElement.lang = localStorage.getItem("language")
    userOptions.language = localStorage.getItem("language")
    // console.log("userOptions.language", userOptions.language)
  }
  if (localStorage.getItem("city")) {
    userCity = localStorage.getItem("city")
  }
  if (localStorage.getItem("userOptions")) {
    userOptions = JSON.parse(localStorage.getItem("userOptions"))
    // console.log("userOptions", JSON.parse(userOptions))
  }
}

window.addEventListener("load", () => {
  getLocalStorage()
  if (!userCity) {
    console.log("language", language)
    userCity = minsk[language]
  }
  weather(language, userCity,userOptions)
  greeting(timeOfDay, timeofDayLanguage, language, userName,userOptions)
  drawSettingList()
  console.log('userOptions checkbox',userOptions)
  backgroundApi = userOptions['en']["Photo source" || "Источник фото"].filter(item => item.isChecked === true)[0]
console.log('backgroundApi',backgroundApi)
})

window.addEventListener("beforeunload", () => {
  localStorage.setItem("userOptions", JSON.stringify(userOptions))
  //localStorage.setItem("userOptions", userOptions)
})

// function changeLanguage() {
//   if (document.documentElement.lang === "ru") {
//     document.documentElement.lang = "en"
//     localStorage.setItem("language", document.documentElement.lang)
//     document.documentElement.setAttribute("lang", "en")
//     language = "en"
//     userOptions.language = language
//   } else {
//     document.documentElement.lang = "ru"
//     localStorage.setItem("language", document.documentElement.lang)
//     document.documentElement.setAttribute("lang", "ru")
//     language = "ru"
//     userOptions.language = language
//   }
//   console.log("language 2", language)
//   location.reload()
// }

function changeLanguage() {
  if (document.documentElement.lang === "ru") {
    document.documentElement.lang = "en"
    localStorage.setItem("language", document.documentElement.lang)
    document.documentElement.setAttribute("lang", "en")
    language = "en"
    userOptions.language = language
  } else {
    document.documentElement.lang = "ru"
    localStorage.setItem("language", document.documentElement.lang)
    document.documentElement.setAttribute("lang", "ru")
    language = "ru"
    userOptions.language = language
  }
  console.log("language 2", language)
  location.reload()
}
toggleSettings.addEventListener("click", () => {
  // if(appSettings.style.display === 'block'){
  //   appSettings.style.display = 'none'
  // }else {
  //   appSettings.style.display = 'block'
  // }
  appSettings.classList.toggle("settings-show")
})

console.log("language 2", language)
