import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function startCountdown() {
  startBtn.disabled = true;
  inputField.disabled = true;
  const countDown = setInterval(() => {
    const now = new Date();
    const timeInterval = userSelectedDate - now;

    if (timeInterval <= 0) {
      clearInterval(countDown);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      startBtn.disabled = false;
      inputField.disabled = false;
      clearInterval(countDown);
      return;
    }

    const timeComponents = convertMs(timeInterval);
    updateTimerDisplay(timeComponents);
  }, 1000);
}

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
const startBtn = document.querySelector('.start-btn');
const inputField = document.querySelector('#datetime-picker');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.error({
        title: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
      return;
    }
    startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

const inputFiels = flatpickr(inputField, options);

startBtn.addEventListener('click', startCountdown);