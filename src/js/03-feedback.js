import throttle from 'lodash.throttle';

const FORM_STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const email = form.querySelector('input[name="email"]');
const message = form.querySelector('textarea[name="message"]');

recoverMessageFromStorage();
form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', throttle(onFormInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  if (email.value.trim() === '' || message.value.trim() === '') {
    alert('Please insert data to all fields!');
    return;
  }
  localStorage.removeItem(FORM_STORAGE_KEY);
  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  console.log(formData);
  e.currentTarget.reset();
}
function onFormInput(e) {
  const formData = {
    email: email.value.trim(),
    message: message.value.trim(),
  };
  const textInput = JSON.stringify(formData);

  localStorage.setItem(FORM_STORAGE_KEY, textInput);
}

function recoverMessageFromStorage() {
  const savedData = localStorage.getItem(FORM_STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    email.value = formData.email;
    message.value = formData.message;
  } else {
    email.value = '';
    message.value = '';
  }
}
