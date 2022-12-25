const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
const INTERVAL_DELAY = 1000;
let timeId = 0;

btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);
btnStop.disabled = true;

function onBtnStartClick(evt) {
  timeId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor(body.style.backgroundColor);
    console.log('change color');
    btnStart.disabled = true;
    btnStop.disabled = false;
  }, INTERVAL_DELAY);
}

function onBtnStopClick(evt) {
  clearInterval(timeId);
  btnStart.disabled = false;
  btnStop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
