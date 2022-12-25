import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const delayInput = Number(form.delay.value);
  const stepInput = Number(form.step.value);
  const amountInput = Number(form.amount.value);
  for (let i = 1; i <= amountInput; i += 1) {
    const delayPlusStep = delayInput + stepInput * (i - 1);
    createPromise(i, delayPlusStep)
      .then(value => {
        Notiflix.Notify.success(value);
        console.log(value);
      })
      .catch(err => {
        Notiflix.Notify.failure(err);
        console.log(err);
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
  return promise;
}
