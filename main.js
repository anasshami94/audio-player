const songs = [
  {
    song: 'public/forest-lullaby.mp3',
    img: 'public/cover-1.png',
    title: 'Lost in the City Lights',
    subtitle: 'Cosmo Sheldrake',
  },
  {
    song: 'public/lost-in-city-lights.mp3',
    img: 'public/cover-2.png',
    title: 'Forest Lullaby',
    subtitle: 'Lesfm',
  },
]

const doc = document.getElementById('audio')
const docSrc = document.getElementById('mp3Source')
const img = document.getElementById('img')
const title = document.getElementById('title')
const subtitle = document.getElementById('subtitle')
const startTime = document.getElementById('start')
const endTime = document.getElementById('end')
const meter = document.getElementById('timeline')

let isPlaying = false,
  currentSong = 0
let totalTime = 0
const timesStart = (e) => {
  const currentTime = e.target.currentTime

  const currentMin = Math.floor(currentTime / 60)
  const currentSec = Math.floor(currentTime - currentMin * 60)
  startTime.innerHTML = `${currentMin.toString().padStart(2, 0)}:${currentSec.toString().padStart(2, 0)}`
  meter.value = totalTime === 0 ? totalTime : Math.floor((currentTime / totalTime) * 100)
}

const timesEnd = () => {
  totalTime = audio.duration
  // min, sec
  const totalMin = Math.floor(totalTime / 60)
  const totalSec = Math.floor(totalTime - totalMin * 60)
  endTime.innerHTML = `${totalMin.toString().padStart(2, 0)}:${totalSec.toString().padStart(2, 0)}`
}

const init = () => {
  totalTime = 0
  doc.removeEventListener('timeupdate', timesStart)
  doc.removeEventListener('loadedmetadata', timesEnd)
  doc.pause()
  docSrc.src = songs[currentSong].song
  doc.load()
  img.src = songs[currentSong].img
  title.innerHTML = songs[currentSong].title
  subtitle.innerHTML = songs[currentSong].subtitle
  doc.addEventListener('timeupdate', timesStart)
  doc.addEventListener('loadedmetadata', timesEnd)
}

const toggle = () => {
  isPlaying ? doc.pause() : doc.play()
  isPlaying = !isPlaying
}

const next = () => {
  currentSong = (currentSong + 1) % 2
  init()
}

const prev = () => {
  currentSong = (2 + currentSong - 1) % 2
  init()
}

init()
