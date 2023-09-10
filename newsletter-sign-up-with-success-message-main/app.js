const input = document.getElementById('email');
const pattern = new RegExp(`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`);
const subscribeBtn = document.getElementById('submit');

const container = document.querySelector('.container');
const success = document.querySelector('.success');
const userEmail = document.querySelector('.user-email');
const invalid = document.querySelector('.invalid');

subscribeBtn.addEventListener('click', () => {
  if (pattern.test(input.value)) {
    userEmail.innerHTML = input.value;
    container.classList.add('hidden');
    success.classList.remove('hidden');
  } else {
    input.style.border = '1px solid var(--tomato)';
    input.style.animation = 'shake 300ms linear';
    invalid.style.display = 'block';
  }
});

const dismissBtn = document.querySelector('.dismiss');

dismissBtn.addEventListener('click', () => {
  input.value = '';
  container.classList.remove('hidden');
  success.classList.add('hidden');

  input.style.border = '1px solid var(--grey)';
  input.style.animation = 'none';
  invalid.style.display = 'none';
});
