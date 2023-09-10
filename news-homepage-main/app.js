const burger = document.querySelector('.burger');
const burgerLines = document.querySelectorAll('.burger-line');
const pullOut = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
  if (pullOut.classList.contains('nav-active')) {
    pullOut.style.transform = 'translate(calc(100% + 10rem))';
    pullOut.classList.remove('nav-active');
    burgerLines.forEach((line) => {
      setTimeout(() => {
        line.style.backgroundColor = 'var(--very-dark-blue)';
      }, 300);
    });
  } else {
    pullOut.style.transform = 'translateX(0)';
    pullOut.classList.add('nav-active');
    burgerLines.forEach((line) => {
      line.style.backgroundColor = 'var(--grayish-blue)';
    });
  }
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    pullOut.style.transform = 'translate(calc(100% + 10rem))';
    pullOut.classList.remove('nav-active');
    burgerLines.forEach((line) => {
      setTimeout(() => {
        line.style.backgroundColor = 'var(--very-dark-blue)';
      }, 300);
    });
  }
});
