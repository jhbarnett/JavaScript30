// get our elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress_filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelector('[data-skip]')
const ranges = player.querySelector('.player-slider')

//build our functions
function togglePlay(){
  video[video.paused ? 'play' : 'pause']()
}

function updateButton(){
  toggle.textContent = this.paused ? '►' : '❚ ❚' 
}

function skip(){
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
  video[this.name] = this.value
}

function handleProgress(){
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub(e){
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

//hookup the event listeners
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)
video.addEventListener('timeupdate', handleProgress)
toggle.addEventListener('click', togglePlay)
skipButtons.forEach(button => button.addEventListener('click', skip))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
let mousedown = false
progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e)))
progress.addEventListener('mouseup', () => mousedown = true)
progress.addEventListener('mousedown', mousedown = false)
