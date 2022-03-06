import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

setTextareaInput();

function onFormSubmit(e) {
  e.preventDefault();

  const dataSubmit = {
    email: e.currentTarget.email.value,
    massage: e.currentTarget.message.value,
  };

  if (!refs.form.elements.email.value || !refs.form.elements.message.value) {
    Notify.failure('All fields must be filled');
    return;
  }

  console.log(dataSubmit);
  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  const inputText = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, inputText);
}

function setTextareaInput() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!savedMessage) {
    return;
  }
  if (savedMessage.message) {
    refs.form.message.value = savedMessage.message;
  }
  if (savedMessage.email) {
    refs.form.email.value = savedMessage.email;
  }
}
