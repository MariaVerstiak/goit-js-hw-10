import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const makePromise = ({ delay, shouldResolve }) => {
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

function executePromise(promise) {
  promise
    .then(value => {
      iziToast.success({
        message: `Fulfilled promise in ${value}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `Rejected promise in ${error}ms`,
      });
    });
}

const form = document.querySelector('.form');

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
