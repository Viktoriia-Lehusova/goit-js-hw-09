import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

const inputTimer = document.querySelector('#datetime-picker');
const timer = document.querySelector('.timer');
const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

let selectedDate = '';
let timerId = null;
btnStart.disabled = true;

btnStart.addEventListener('click', onClickBtnStart);

timer.style.display = 'flex';
timer.style.gap = '10px';
timer.style.fontSize = '26px';

const inputFlatPickr = new flatpickr(inputTimer, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date();
    selectedDate = selectedDates[0];
    onAuditDates(currentTime, selectedDate);
  },
});

function onAuditDates(currentTime, selectedDates) {
  if (selectedDates.getTime() < currentTime.getTime()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    btnStart.disabled = true;
  } else {
    btnStart.disabled = false;
  }
}

function onClickBtnStart(evt) {
  timerId = setInterval(() => {
    countdownTimer();
    btnStart.disabled = true;
  }, 1000);

  btnStart.disabled = true;
}

function countdownTimer() {
  const currentTime = new Date();
  const differentBtwnDates = selectedDate.getTime() - currentTime.getTime();
  const { days, hours, minutes, seconds } = convertMs(differentBtwnDates);
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
  updateTimer({ days, hours, minutes, seconds });
  if (differentBtwnDates <= 1000) {
    clearInterval(timerId);
  }
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerDays.textContent = `${days}`;
  timerHours.textContent = `${hours}`;
  timerMinutes.textContent = `${minutes}`;
  timerSeconds.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
