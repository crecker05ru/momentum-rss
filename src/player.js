export default function(playList) {
  const audioElement = document.querySelector('audio')
  const playListElement = document.querySelector('.play-list')
  const playPrevButton = document.querySelector('.play-prev')
  const playButton = document.querySelector('.play')
  const playNextButton = document.querySelector('.play-next')
  const timeline = document.querySelector('.timeline')
  const volume = document.querySelector('.volume')
  const volumeButton = document.querySelector('.volume-speaker')

let playNum = 0
audioElement.src = playList[playNum].src
let isPlay = false

let div = document.createElement('div')

function handlePlayerItem(index){
  playNum = index
  playAudio()
}

volumeButton.addEventListener('click', () => {
  audioElement.muted = !audioElement.muted
  volumeButton.classList.toggle('volume-mute')
  // audioElement.volume = 0
  console.log('audioElement.volume',audioElement.volume)
})
function drawPlayItems(){
  for(let i = 0; i < playList.length; i++) {
    const li = document.createElement('li')
    li.classList.add('play-item')
    li.classList.add('track-' + String(i + 1))
    li.textContent = playList[i].title
    playListElement.append(li)
    li.addEventListener('click',handlePlayerItem.bind(li,i))
    if(i === playNum){
      li.classList.add('track-active')
    }
  }
}
(function(){setTimeout(drawPlayItems,1)})()

audioElement.addEventListener('play', (e) => {
  console.log('audioElement',audioElement)
  console.log('e',e)
  console.log('playListElement.children',playListElement)
  for(let i = 0;i < playListElement.children.length;i++){ 
    playListElement.children[i].classList.remove('track-active')
  }
  playListElement.children[playNum].classList.add('track-active')

})

audioElement.addEventListener('ended',playNext)
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}


audioElement.addEventListener(
  "loadeddata",
  () => {
    // audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
    //   audio.duration
    // );
    //audioElement.volume = .75;
  }
);

timeline.addEventListener("click", e => {
  const timelineWidth = window.getComputedStyle(timeline).width;
  const timeToSeek = e.offsetX / parseInt(timelineWidth) * audioElement.duration;
  audioElement.currentTime = timeToSeek;
}, false);


volume.addEventListener('click', e => {
  const sliderWidth = window.getComputedStyle(volume).width;
  console.log('window.getComputedStyle(volume).width',window.getComputedStyle(volume).width)
  console.log('e.offsetX',e.offsetX)
  const newVolume = e.offsetX / parseInt(sliderWidth);
  audioElement.volume = newVolume;
  document.querySelector(".volume-level").style.width = newVolume * 100 + '%';
}, false)

setInterval(() => {
  const progressBar = document.querySelector(".progress");
  progressBar.style.width = audioElement.currentTime / audioElement.duration * 100 + "%";
  // document.querySelector(".time .current").textContent = getTimeCodeFromNum(
  //   audio.currentTime
  // );
}, 500);
// function playAudio() {
//   audio.src = // ссылка на аудио-файл;
//   audio.currentTime = 0;
//   audio.play();
// }

function playAudio() {
  audioElement.src = playList[playNum].src
  audioElement.play()
  isPlay = true
  togglePlayBtn()
}

function pauseAudio() {
  audioElement.pause();
}

function playAndPause() {
 // audio.src = // ссылка на аудио-файл;
//  audioElement.src = playList[playNum].src
 console.log('playList',playList)
 console.log('audioElement.src',audioElement.src)
//  audioElement.src = playList[playNum].src;
//  audioElement.currentTime = 0;
  if(!isPlay){
    audioElement.play();
    isPlay = true
    togglePlayBtn()
  }else {
    audioElement.pause()
    isPlay = false
    togglePlayBtn()
  }
}

function playPrev(){
  if(playNum >= 0){
    playNum = playNum - 1
  }
  if(playNum === -1){
    playNum = playList.length - 1
  }
  playAudio()
  console.log('playNum',playNum)
}

function playNext(){
  if(playNum <= playList.length){
    playNum = playNum + 1
  }
  if(playNum === playList.length){
    playNum = 0
  }
  playAudio()
  console.log('playNum',playNum)
}
playPrevButton.addEventListener('click',playPrev)
playNextButton.addEventListener('click',playNext)

function togglePlayBtn() {
  if(!isPlay){
    playButton.classList.remove('pause');
  }else {
    playButton.classList.add('pause');
  }
}

playButton.addEventListener('click',() => {
  playAndPause()
})
}