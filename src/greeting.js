export default function (timeOfDay,timeofDayLanguage,language,userName){
  const greetingElement = document.querySelector('.greeting')
  const nameElement = document.querySelector('.name')
  nameElement.value = userName
  //const greetingText = `Good ${timeOfDay} ${nameElement.value}`
  const greetingText = `Good ${timeOfDay}`
const ruGreetings = {
  [timeofDayLanguage['ru'][0]]: 'Доброй',
  [timeofDayLanguage['ru'][1]]: 'Доброе',
  [timeofDayLanguage['ru'][2]]: 'Добрый',
  [timeofDayLanguage['ru'][3]]: 'Добрый',
  
}

nameElement.addEventListener("keypress", (e) => {
  if(e.key === 'Enter'){
    localStorage.setItem('name', nameElement.value)
  }

})

const greetingTranslation = {
  // 'ru': `${ruGreetings[timeOfDay]} ${timeOfDay} ${nameElement.value}`,
  // 'en': `Good ${timeOfDay} ${nameElement.value}`
    'ru': `${ruGreetings[timeOfDay]} ${timeOfDay}`,
  'en': `Good ${timeOfDay}`
}

function showGreeting(greetingText) {
  greetingElement.innerText = greetingTranslation[language]
}

showGreeting(greetingText)

function setLocalStorage() {
  localStorage.setItem('name', nameElement.value)
}
window.addEventListener('beforeunload', setLocalStorage)
} 