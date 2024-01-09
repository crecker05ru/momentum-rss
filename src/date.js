export default function (language) {
  const dateElement = document.querySelector('.date')
  const timeElement = document.querySelector('.time')
  function showTime() {
    const date = new Date()
    const currentTime = date.toLocaleTimeString()
    timeElement.innerText = currentTime
    setTimeout(showTime, 1000);
  }
  showTime();
  
  function showDate() {
    const date = new Date()
    const options = {weekday: 'long', month: 'long', day: 'numeric',  timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString(language, options);
    dateElement.innerText = currentDate
    setTimeout(showDate, 1000 * 60);
  }
  showDate()
}