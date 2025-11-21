import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const makePromise = ({ delay, shouldResolve }) => {
  console.log(delay);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

function executePromise(promiseCallback) {
  promiseCallback
    .then((value) => {
        iziToast.success({
          message: `Fulfilled promise in ${value}ms`,
        });
    })
    .catch((error) => {
        iziToast.error({
          message: `Rejected promise in ${error}ms`,
        });
    });
   return;
}

function getValue(groupName) {
  const radioButtons = document.getElementsByName(groupName);
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      return radioButton.value;
    }
  }
  return null;
}

const SubmitBtn = document.querySelector('.submit-btn');
const inputBox = document.querySelector('.input');
const form = document.querySelector('.form');

let userDalay = 0;
inputBox.addEventListener('input', e => {
  userDalay = e.target.value;
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  const promise = makePromise({
    delay,
    shouldResolve: state === 'fulfilled',
  });

  executePromise(promise);
  form.reset();
});