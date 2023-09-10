function cardAppear() {
  const bell = document.querySelector('.fa-bell');
  const card = document.querySelector('.card');
  const output = document.querySelector('.output');

  bell.addEventListener('click', () => {
    bell.classList.toggle('bell-active');
    card.classList.toggle('card-active');
    output.classList.toggle('output-active');
  });
}
cardAppear();

function takeValues() {
  const hour = document.querySelector('.hour');
  const minute = document.querySelector('.minute');
  const timeOfDay = document.querySelector('.time-of-day');

  const hourOutput = document.querySelector('.output1');
  const minuteOutput = document.querySelector('.output2');
  const timeOfDayOutput = document.querySelector('.output3');

  const confirmBtn = document.querySelector('.confirm');

  confirmBtn.addEventListener('click', () => {
    hourOutput.innerHTML = hour.value;
    minuteOutput.innerHTML = minute.value;
    timeOfDayOutput.innerHTML = timeOfDay.value;
  });
}
takeValues();
