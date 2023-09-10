const addBtn1 = document.querySelector('.button1');
const addBtn2 = document.querySelector('.button2');
const card1 = document.querySelector('.card1');
const card2 = document.querySelector('.card2');

let cartQuantity = 0;
let waitingListQuantity = 0;

addBtn1.addEventListener('click', () => {
  card1.style.animation = 'transform1 2s cubic-bezier(0.96, 0.03, 0.47, 1.02)';
  setTimeout(() => {
    card1.style.animation = 'none';
    cartQuantity++;
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  }, 2000);
});

addBtn2.addEventListener('click', () => {
  card2.style.animation = 'transform2 2s cubic-bezier(0.96, 0.03, 0.47, 1.02)';
  setTimeout(() => {
    card2.style.animation = 'none';
    cartQuantity++;
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  }, 2000);
});

const waitingListBtn = document.querySelector('.waiting-list');
const clockIcon = document.querySelector('.fa-clock-rotate-left');

waitingListBtn.addEventListener('click', () => {
  clockIcon.style.transition =
    'transform 1000ms cubic-bezier(0.96, 0.03, 0.47, 1.02)';
  clockIcon.style.transform = 'rotate(-360deg)';
  setTimeout(() => {
    waitingListQuantity++;
    document.querySelector('.waiting-list-quantity').innerHTML =
      waitingListQuantity;
    clockIcon.style.transition = 'none';
    clockIcon.style.transform = 'none';
  }, 1000);
});
