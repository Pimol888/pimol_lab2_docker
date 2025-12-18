async function loadTodos() {
  const res = await fetch('/items');
  const todos = await res.json();

  const list = document.getElementById('todoList');
  list.innerHTML = '';

  todos.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t.name + (t.completed ? ' ✅' : '');
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById('todoInput');
  const name = input.value;
  if (!name) return;

  await fetch('/items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  input.value = '';
  loadTodos();
}

loadTodos();
