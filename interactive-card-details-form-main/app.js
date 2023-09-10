const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('month');
const yearInput = document.getElementById('year');
const cvcInput = document.getElementById('cvc');

const nameDisplay = document.querySelector('.name-display');
const numberDisplay = document.querySelector('.number-display');
const monthDisplay = document.querySelector('.month-display');
const yearDisplay = document.querySelector('.year-display');
const cvcDisplay = document.querySelector('.cvc-display');

const submitBtn = document.querySelector('.confirm');

const nameAlert = document.getElementById('name-alert');
const numberAlert = document.getElementById('number-alert');
const dateAlert = document.getElementById('date-alert');
const cvcAlert = document.getElementById('cvc-alert');

const checkNumbers = /[^a-zA-Z]/;

const success = document.querySelector('.finished');
const form = document.querySelector('.content');

const currentDate = new Date();

// form.style.display = 'flex';
// success.style.display = 'none';

submitBtn.addEventListener('click', () => {
  const namePattern = /^[a-zA-Z]+\s+[a-zA-Z]+(\s+[a-zA-Z]+)*$/;

  nameAlert.innerHTML = '';
  numberAlert.innerHTML = '';
  dateAlert.innerHTML = '';
  cvcAlert.innerHTML = '';

  if (namePattern.test(nameInput.value)) {
    nameDisplay.innerHTML = nameInput.value;
    nameInput.style.border = '1px solid var(--light-grayish-violet)';
  } else {
    const words = nameInput.value.trim().split(/\s+/);
    const minWordCount = 2;

    nameDisplay.innerHTML = 'Jane Appleseed';
    nameInput.style.border = '1px solid var(--red)';

    if (checkNumbers.test(nameInput.value)) {
      nameAlert.innerHTML = 'Wrong format, letters only';
    } else if (words.length < minWordCount) {
      nameAlert.innerHTML =
        'Wrong format, must contain at least name and last name';
    }
    if (nameInput.value === '') {
      nameAlert.innerHTML = 'Can not be blank';
    }
  }

  const numberPattern = /^(\d{4}\s?){1,4}$/;
  const NumberValue = numberInput.value.trim();
  const numCount = NumberValue.replace(/[^0-9]/g, '').length;

  if (numberPattern.test(numberInput.value) && numCount <= 16) {
    numberDisplay.innerHTML = numberInput.value;
    numberInput.style.color = '1px solid var(--light-grayish-violet)';
  } else {
    numberAlert.innerHTML = 'Wrong format, numbers only';
    numberDisplay.innerHTML = '0000 0000 0000 0000';
    numberInput.style.border = '1px solid var(--red)';

    if (numCount > 16) {
      numberAlert.innerHTML = 'Card number is too long';
    }
    if (numberInput.value === '') {
      numberAlert.innerHTML = 'Can not be blank';
    }
  }

  const numPattern = /^[0-9]+$/;

  if (
    parseInt(monthInput.value) <= 12 &&
    parseInt(monthInput.value) > 0 &&
    numPattern.test(monthInput.value)
  ) {
    monthDisplay.innerHTML = monthInput.value;
    if (parseInt(monthInput.value) < 10) {
      monthDisplay.innerHTML = '0' + monthInput.value;
    }
    monthInput.style.color = '1px solid var(--light-grayish-violet)';
  } else {
    dateAlert.innerHTML = 'Please pick an exsisting month';
    monthDisplay.innerHTML = '00';
    monthInput.style.border = '1px solid var(--red)';

    if (!numPattern.test(monthInput.value)) {
      dateAlert.innerHTML = 'Must only contain numbers';
    }
    if (monthInput.value === '') {
      dateAlert.innerHTML = 'Can not be blank';
    }
  }

  if (
    parseInt(yearInput.value) <= currentDate.getFullYear() &&
    parseInt(yearInput.value) >= 0 &&
    numPattern.test(yearInput.value)
  ) {
    yearDisplay.innerHTML = yearInput.value;
    if (parseInt(yearInput.value) < 10) {
      yearDisplay.innerHTML = '0' + yearInput.value;
    }
    yearInput.style.color = '1px solid var(--light-grayish-violet)';
  } else {
    dateAlert.innerHTML = 'Please pick an exsisting year';
    yearDisplay.innerHTML = '00';
    yearInput.style.border = '1px solid var(--red)';

    if (!numPattern.test(yearInput.value)) {
      dateAlert.innerHTML = 'Must only contain numbers';
    }
    if (yearInput.value === '') {
      dateAlert.innerHTML = 'Can not be blank';
    }
  }

  if (numPattern.test(cvcInput.value)) {
    cvcDisplay.innerHTML = cvcInput.value;
    cvcInput.style.color = '1px solid var(--light-grayish-violet)';
  } else {
    cvcAlert.innerHTML = 'invalid';
    cvcDisplay.innerHTML = '00';
    cvcInput.style.border = '1px solid var(--red)';

    if (!numPattern.test(cvcInput.value)) {
      cvcAlert.innerHTML = 'Must only contain numbers';
    }
    if (cvcInput.value === '') {
      cvcAlert.innerHTML = 'Can not be blank';
    }
  }

  if (
    parseInt(yearInput.value) ===
      parseInt(currentDate.getFullYear().toString().substr(-2)) &&
    parseInt(monthInput.value) > currentDate.getMonth() + 1
  ) {
    dateAlert.innerHTML = 'Date can not be in the future';
    yearDisplay.innerHTML = '00';
    monthDisplay.innerHTML = '00';
    yearInput.style.border = '1px solid var(--red)';
    monthInput.style.border = '1px solid var(--red)';
  }

  if (
    namePattern.test(nameInput.value) &&
    numberPattern.test(numberInput.value) &&
    numCount <= 16 &&
    parseInt(monthInput.value) <= 12 &&
    parseInt(monthInput.value) > 0 &&
    numPattern.test(monthInput.value) &&
    parseInt(yearInput.value) <= 23 &&
    parseInt(yearInput.value) >= 0 &&
    numPattern.test(yearInput.value) &&
    numPattern.test(cvcInput.value)
  ) {
    form.style.display = 'none';
    success.style.display = 'flex';
  }
});

const continueBtn = document.querySelector('.continue');

continueBtn.addEventListener('click', () => {
  form.style.display = 'flex';
  success.style.display = 'none';

  nameDisplay.innerHTML = 'Jane Appleseed';
  numberDisplay.innerHTML = '0000 0000 0000 0000';
  monthDisplay.innerHTML = '00';
  yearDisplay.innerHTML = '00';
  cvcDisplay.innerHTML = '000';

  nameInput.value = '';
  numberInput.value = '';
  monthInput.value = '';
  yearInput.value = '';
  cvcInput.value = '';

  nameInput.style.border = '1px solid var(--light-grayish-violet)';
  numberInput.style.border = '1px solid var(--light-grayish-violet)';
  monthInput.style.border = '1px solid var(--light-grayish-violet)';
  yearInput.style.border = '1px solid var(--light-grayish-violet)';
  cvcInput.style.border = '1px solid var(--light-grayish-violet)';
});
