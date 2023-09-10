const alertWrapper = document.querySelector('.custom-alert');
const checkBox = document.querySelector('.check');
const inputs = document.querySelector('.input');

function checkFunction() {
  if (checkBox.checked == true) {
    alertWrapper.style.width = '800px';

    setTimeout(() => {
      alertWrapper.classList.remove('false');
      inputs.style.display = 'flex';
    }, 300);
  } else {
    alertWrapper.classList.add('false');
    inputs.style.display = 'none';

    setTimeout(() => {
      alertWrapper.style.width = 'max-content';
    }, 300);
  }
}

let cards = [];

function renderCards() {
  let cardsHTML = '';

  cards.forEach((cardObject, index) => {
    const { workability, color, svg, icon, title, message } = cardObject;
    const html = `
    <div class="card ${workability}">
      <div class="box-circle ${color}-circle"></div>
      <div class="${color}-box content-box">
      <div class="svg">
        ${svg}
      </div>
        <img
          src="Ellipse ${color}.png"
          alt="" />
        <i class="fa-solid fa-${icon} ${color}-icon icon"></i>
      </div>
      <div class="card-content">
        <h1 class="title">${title}</h1>
        <p class="message">
          ${message}
        </p>
      </div>
      <i class="fa-solid fa-xmark close"></i>
    </div>
  `;

    cardsHTML += html;
  });

  document.querySelector('.cards-wrapper').innerHTML = cardsHTML;

  document.querySelectorAll('.close').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      cards.splice(index, 1);
      renderCards();
    });
  });

  setTimeout(() => {
    if (cards.length > 2) {
      cards.splice(0, 1);
      renderCards();
    }
  }, 200);
}

const workabilityBtn = document.querySelectorAll('.custom-alert button');

workabilityBtn.forEach((button) => {
  button.addEventListener('click', (event) => {
    const titleInput = document.querySelector('.title');
    const messageInput = document.querySelector('.message');

    let workability;
    let color;
    let svg;
    let icon;
    let title;
    let message;

    if (event.target.id === 'success-button') {
      workability = 'success';
      color = 'green';
      svg = `
      <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="Mask group">
        <mask
          id="mask0_1_33"
          style="mask-type: alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100">
          <path
            id="Ellipse 10"
            d="M100 50.7123C100 93.7322 89.863 100 49.3151 100C8.76712 100 0 93.7322 0 50.7123C0 7.69231 9.86302 0 49.3151 0C88.7671 0 100 7.69231 100 50.7123Z"
            fill="#3EBD69"
            fill-opacity="0.49" />
        </mask>
        <g mask="url(#mask0_1_33)">
          <path
            id="Ellipse 8"
            d="M151.333 81.3579C151.333 165.358 99.8806 142.358 59.3326 142.358C18.7847 142.358 -60.6673 129.858 -4.66736 97.3578C51.3326 64.8579 74.8326 16.8579 88.8326 -31.1421C102.833 -79.1421 151.333 -2.64215 151.333 81.3579Z"
            fill="#459F64"
            fill-opacity="0.52" />
        </g>
      </g>
    </svg>
      `;
      icon = 'check';
      // if (titleInput.value === '') {
      title = 'Thank you for subscribing.';
      // } else {
      // title = titleInput.value;
      // }

      // if (messageInput.value === '') {
      message = 'You will recieve an email to confirm your subscribtion.';
      // } else {
      // message = messageInput.value;
      // }
    } else if (event.target.id === 'failed-button') {
      workability = 'failed';
      color = 'red';
      svg = `
      <svg
        width="176"
        height="192"
        viewBox="0 0 176 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <g id="Mask group">
          <mask
            id="mask0_1_36"
            style="mask-type: alpha"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="176"
            height="192">
            <path
              id="Ellipse 10"
              d="M175.333 127.358C175.333 211.358 123.881 188.358 83.3326 188.358C42.7847 188.358 -36.6673 175.858 19.3326 143.358C75.3326 110.858 98.8326 62.8579 112.833 14.8579C126.833 -33.1421 175.333 43.3578 175.333 127.358Z"
              fill="#A52E2E"
              fill-opacity="0.44" />
          </mask>
          <g mask="url(#mask0_1_36)">
            <path
              id="Ellipse 11"
              d="M124 96.7123C124 139.732 113.863 146 73.3151 146C32.7671 146 24 139.732 24 96.7123C24 53.6923 33.863 46 73.3151 46C112.767 46 124 53.6923 124 96.7123Z"
              fill="#A52E2E"
              fill-opacity="0.44" />
          </g>
        </g>
      </svg>
      `;
      icon = 'xmark';
      // if (titleInput.value === '') {
      title = 'Oups! An error Occured.';
      // } else {
      // title = titleInput.value;
      // }

      // if (messageInput.value === '') {
      message = 'Appologies for the inconvenience. Please try again.';
      // } else {
      //   message = messageInput.value;
      // }
    }

    cards.push({
      workability,
      color,
      svg,
      icon,
      title,
      message,
    });

    // titleInput.value = '';
    // messageInput.value = '';

    renderCards();
  });
});
