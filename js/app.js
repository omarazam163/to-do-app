let mykey = "674c9ef460a208ee1fdda233";
const todo = document.getElementById("todo");
const btn = document.getElementById("add-todo");
const todos = document.getElementById("todos");

async function addTodo() {
  btn.innerHTML="loading...";
  let url = "https://todos.routemisr.com/api/v1/todos";
  let data = {
    title: todo.value,
    apiKey: mykey,
  };
  let res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": `application/json` },
  });
  let element = await res.json();
  btn.innerHTML="Add todo";
  if (res.status === 201) {
    console.log(element);
    renderTodos();
  }
}
btn.addEventListener("click", addTodo);

async function getTodos() {
  let url = `https://todos.routemisr.com/api/v1/todos/${mykey}`;
  let res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": `application/json` },
  });
  let result = await res.json();
  return result.todos;
}
async function renderTodos() {
  let todoLIst = await getTodos() || [];
  todos.innerHTML = "";
  todoLIst.forEach((element) => {
    console.log(todos);
    todos.innerHTML += `
            <div class="d-flex justify-content-between bg-light shadow rounded p-2" id="${
              element._id
            }">
            <p class="m-0 ${
              element.completed
                ? "text-decoration-line-through"
                : "text-decoration-none"
            }">${element.title}</p>
            <div class="w-25 d-flex justify-content-around ">
<i class="fa-solid fa-trash text-danger fs-4 bttn" onclick="deleteTodo('${
      element._id
    }')"></i>
<i class="fa-solid fa-pen-nib text-black fs-4 bttn" onclick='updateTodo("${
      element._id
    }")'></i>
            </div>
        </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", renderTodos);

async function deleteTodo(id) {
  let todo = document.getElementById(id);
  todo.remove();
  let url = "https://todos.routemisr.com/api/v1/todos";
  let data = {
    todoId: id,
  };
  let res = await fetch(url, {
    method: "DELETE",
    body: JSON.stringify(data),
    headers: { "Content-Type": `application/json` },
  });
  let result = await res.json();
  console.log(result);
}

async function updateTodo(id) {
  let todoItemPara = document.getElementById(id);
  todoItemPara.children[0].classList.add("text-decoration-line-through");
  todoItemPara.children[0].classList.remove("text-decoration-none");
  let url = "https://todos.routemisr.com/api/v1/todos";
  let data = {
    todoId: id,
  };
  let res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": `application/json` },
  });
  let result = await res.json();
  console.log(result);
}
