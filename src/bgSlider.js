export default function(randomNum,timeOfDayEn,userOptions,currentBgApi,currentTags) {
  const body = document.querySelector('body')
  const slideNext = document.querySelector('.slide-next')
const slidePrev = document.querySelector('.slide-prev')

const APIUNSP = "5DzFUmghf51J7E8u2zOGjnh-mEJjCDWkCBzxizle8AU"
const APIFLICK = "a24db682c4ecc684beddcbf1c1267f33"

const BgApiMap = {
  "Github": `https://raw.githubusercontent.com/crecker05ru/momentum-gallery/assets/images/${timeOfDayEn}/${String(randomNum).padStart(2,'0')}.jpg`,
  "Unsplash": `https://api.unsplash.com/photos/random?orientation=landscape&query=${currentTags[0].value || timeOfDayEn}&count=20&client_id=${APIUNSP}`,
  "Flickr": `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${APIFLICK}&tags=${currentTags[0].value || timeOfDayEn}&per_page=20&extras=url_l&format=json&nojsoncallback=1`,
}

let fetchApi = BgApiMap[currentBgApi]
// чтобы обновился currentBgApi нужно перезапустить этот модуль,повторный вызов 
// этого модуля создает второй модуль 
console.log('fetchApi',fetchApi)
function bgHadler(){
  if(currentBgApi === "Github"){

  }else if(currentBgApi === "Unsplash"){
    
  }else if(currentBgApi === "Flickr"){

  }
}
function githubHandler(){

}

function unsplashHandler(){
  
}

function flickrHandler(){
  
}

let apiUrls = []

async function getUsnplashImage() {
  const url = fetchApi;
  const res = await fetch(url)
  const data = await res.json()
  console.log('data urls',data)
  let urls = data.map(item => item.urls.regular)
  console.log('urls',urls)
  apiUrls = urls
  console.log('apiUrls',apiUrls)
  return urls
 }

 async function getFlickrImage() {
  const url = fetchApi;
  const res = await fetch(url)
  const data = await res.json()
  console.log('data urls',data)
  let urls = data.photos.photo.map(item => item.url_l)
  console.log('urls',urls)
  apiUrls = urls
  console.log('apiUrls',apiUrls)
  return urls
 }

 function fetchApiData(){
  if(currentBgApi === "Unsplash"){
    getUsnplashImage()
   }else if(currentBgApi === "Flickr"){
    getFlickrImage()
   }
   console.log('userOptions in bgSlider',userOptions)
 }

 fetchApiData()


function setBg(){
console.log('apiUrls',apiUrls)
console.log('currentBgApi',currentBgApi)
console.log('randomNum',randomNum)
const img = new Image();
//img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDayEn}/${String(randomNum).padStart(2,'0')}.jpg`
// if(currentBgApi === "Github"){
//   img.src = `https://raw.githubusercontent.com/crecker05ru/momentum-gallery/assets/images/${timeOfDayEn}/${String(randomNum).padStart(2,'0')}.jpg`
// }else if(currentBgApi === "Unsplash"){
//   img.src = apiUrls[randomNum]
// }else if(currentBgApi === "Flickr"){
//   img.src = apiUrls[randomNum]
// }

// if(currentBgApi === "Github"){
//   img.src = `https://raw.githubusercontent.com/crecker05ru/momentum-gallery/assets/images/${timeOfDayEn}/${String(randomNum).padStart(2,'0')}.jpg`
// }else {
//   img.src = apiUrls[randomNum]
// }

currentBgApi === "Github" ? img.src = `https://raw.githubusercontent.com/crecker05ru/momentum-gallery/assets/images/${timeOfDayEn}/${String(randomNum).padStart(2,'0')}.jpg` 
: img.src = apiUrls[randomNum]

// img.addEventListener('load', () =>  {
//   body.style.backgroundImage = img.src
// })
img.onload = () => {      
  body.style.backgroundImage = `url(${img.src})`// `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`
}
setTimeout(setBg, 1000 * 60);
}

setBg()

function getSlideNext(){
  console.log('randomNum',randomNum)
  if(randomNum < 20){
    randomNum += 1
  }else {
    randomNum = 1
  }
  setBg()
}

function getSlidePrev(){
  console.log('randomNum',randomNum)
  if(randomNum > 0){
    randomNum -= 1
  } else {
    randomNum = 20
  }
  setBg()
}

slidePrev.addEventListener('click', getSlidePrev)
slideNext.addEventListener('click', getSlideNext)
}