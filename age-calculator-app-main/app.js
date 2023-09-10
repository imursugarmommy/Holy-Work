const d = new Date();

const dayInput = document.querySelector('.day-input');
const monthInput = document.querySelector('.month-input');
const yearInput = document.querySelector('.year-input');

const dayOutput = document.querySelector('.js-day-count');
const monthOutput = document.querySelector('.js-month-count');
const yearOutput = document.querySelector('.js-year-count');

const submit = document.querySelector('.submit');

const currentDayHTML = document.querySelector('.current-day');
const currentMonthHTML = document.querySelector('.current-month');
const currentYearHTML = document.querySelector('.current-year');

calculateAge();

dayInput.addEventListener('click', () => {
  dayInput.style.border = '1px solid var(--purple)';
  monthInput.style.border = '1px solid var(--light-grey)';
  yearInput.style.border = '1px solid var(--light-grey)';
});
monthInput.addEventListener('click', () => {
  dayInput.style.border = '1px solid var(--light-grey)';
  monthInput.style.border = '1px solid var(--purple)';
  yearInput.style.border = '1px solid var(--light-grey)';
});
yearInput.addEventListener('click', () => {
  dayInput.style.border = '1px solid var(--light-grey)';
  monthInput.style.border = '1px solid var(--light-grey)';
  yearInput.style.border = '1px solid var(--purple)';
});

submit.addEventListener('click', calculateAge);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    calculateAge();
  }
});

function calculateAge() {
  let day = dayInput.value;
  let month = monthInput.value;
  let year = yearInput.value;

  let currentYear = d.getFullYear();
  let currentMonth = d.getMonth() + 1;
  let currentDay = d.getDate();

  if (day > 31 || month > 12 || year > currentYear) {
    document.querySelector('.error').style.display = 'block';
    dayInput.style.border = '1px solid red';
    monthInput.style.border = '1px solid red';
    yearInput.style.border = '1px solid red';
    return;
  } else {
    document.querySelector('.error').style.display = 'none';
    dayInput.style.border = '1px solid var(--light-grey)';
    monthInput.style.border = '1px solid var(--light-grey)';
    yearInput.style.border = '1px solid var(--light-grey)';
  }

  let yearHTML = currentYear - year;
  let monthHTML = currentMonth - month;
  let dayHTML = currentDay - day;

  if (dayHTML < 0) {
    monthHTML--;
    dayHTML += 31;

    // if (
    //   monthHTML === 1 ||
    //   monthHTML === 3 ||
    //   monthHTML === 5 ||
    //   monthHTML === 7 ||
    //   monthHTML === 8 ||
    //   monthHTML === 10 ||
    //   monthHTML === 12
    // ) {
    // dayHTML += 31;
    // } else if (
    //   monthHTML === 4 ||
    //   monthHTML === 6 ||
    //   monthHTML === 9 ||
    //   monthHTML === 11
    // ) {
    //   dayHTML += 30;
    // } else if (monthHTML === 2) {
    //   dayHTML += 28;
    // }
  }
  if (dayHTML < 10) {
    dayHTML = '0' + dayHTML;
  }

  if (monthHTML < 0) {
    yearHTML--;
    monthHTML += 12;
  }
  if (monthHTML < 10) {
    monthHTML = '0' + monthHTML;
  }

  dayOutput.innerHTML = dayHTML;
  monthOutput.innerHTML = monthHTML;
  yearOutput.innerHTML = yearHTML;

  if (currentDay < 10) {
    currentDay = '0' + currentDay;
  }
  if (currentMonth < 10) {
    currentMonth = '0' + currentMonth;
  }

  currentDayHTML.innerHTML = currentDay;
  currentMonthHTML.innerHTML = currentMonth;
  currentYearHTML.innerHTML = currentYear;
}
