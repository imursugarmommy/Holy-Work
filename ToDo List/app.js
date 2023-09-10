const todoList = [
  {
    name: 'make dinner',
    dueDate: '05/21/2023',
  },
  {
    name: 'wash dishes',
    dueDate: '05/21/2023',
  },
];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const { name } = todoObject;
    const html = `
    <li class="todo">
      ${name}
      <div class="checkbox"></div>
    </li>
    `;
    todoListHTML += html;
  }

  document.querySelector('.todoList').innerHTML = todoListHTML;
}

const addNewBtn = document.querySelector('.new');
const addForm = document.querySelector('.form');

addNewBtn.addEventListener('click', () => {
  addForm.style.visibility = 'visible';
});

const addBtn = document.querySelector('.add');

addBtn.addEventListener('click', () => {
  const input = document.querySelector('.todo-input');
  const name = input.value;

  todoList.push({
    name,
  });

  input.value = '';

  renderTodoList();

  addForm.style.visibility = 'hidden';
});
