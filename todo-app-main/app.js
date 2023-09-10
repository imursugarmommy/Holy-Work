const input = document.querySelector('.type');
const checkbox = document.querySelectorAll('li .circle');

document.addEventListener('keydown', addTodos);

function addTodos(e) {
  if (e.key === 'Enter') {
    // const listHTML = document.querySelector('tasks');
    // const newLi = listHTML.setAttribute('li');
    // let list = [];
    // const todo = input.value;
    // list.push({ name: `${todo}` });
    // newLi.innerHTML = `
    // <li class="flex">
    //   <div class="flex">
    //     <div class="circle"></div>
    //     <p class="task-text">${todo}</p>
    //   </div>
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="18"
    //     height="18">
    //     <path
    //       fill="#494C6B"
    //       fill-rule="evenodd"
    //       d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
    //   </svg>
    // </li>`;
  }
}

checkbox.forEach((box) => {
  box.addEventListener('click', () => {
    if (!box.classList.contains('checked')) {
      box.classList.add('checked');
      const todoText = box.parentNode.querySelector('p');
      todoText.innerHTML = `<s>Placeholder</s>`;
      todoText.style.color = 'var(--very-dark-grayish-blue)';
    } else {
      box.classList.remove('checked');
    }
  });
});
