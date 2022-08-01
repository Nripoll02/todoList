//Definimos constantes
const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const todo = document.getElementById("todo");
let todoList = []; //Se crea el arreglo de todoList 

form.addEventListener("submit", function (e) { //Cuando se hace submit al formulario se ejecuta la funcion addTodo
  e.preventDefault();
  addTodo();
});

function addTodo() {
  const newTodo = input.value; //Obtenemos el valor del input
  if (!newTodo) return; //Si no hay nada escrito no hacemos nada
  todoList.push({ //Añadimos el nuevo todo a la lista
    text: newTodo,
    completed: false,
  });
  localStorage.setItem("todos", JSON.stringify(todoList)); //Guardamos la lista en localstorage
  render(); //Renderizamos la lista
}

function render() {
  todo.innerHTML = null; //Limpiamos el contenido del todo

  const todos = localStorage.getItem("todos"); //Obtenemos la lista de todos
  todoList = JSON.parse(todos) || []; //Operador OR para que si no hay nada en localstorage, todoList sea un arreglo vacio
  for (let i = 0; i < todoList.length; i++) {

    const item = document.createElement("li"); //Creamos un elemento li

    const checkbox = document.createElement("input"); //Creamos un elemento input

    checkbox.type = "checkbox";

    checkbox.addEventListener("click", function (e) { //Cuando se hace click en el checkbox se ejecuta la funcion toggleTodo
        todoList[i].completed = e.target.checked; //Cambiamos el valor de completed
        localStorage.setItem("todos", JSON.stringify(todoList)); //Guardamos la lista en localstorage

        //Operador ternario
        todoList[i].completed == true ? (//Si el toDo esta completado 

          item.classList.add("completed"), //Añadimos la clase completed
          item.classList.remove("uncompleted"), //Eliminamos la clase uncompleted
          checkbox.checked = todoList[i].completed//Cambiamos el valor del checkbox
        ) : (//Si el toDo no esta completado
          item.classList.add("uncompleted"), //Añadimos la clase uncompleted
          item.classList.remove("completed"), //Eliminamos la clase completed
          checkbox.checked = todoList[i].completed //Cambiamos el valor del checkbox
        )
      }




    );
  const text = document.createElement("p"); //Creamos un elemento p
  text.innerText = todoList[i].text; //Añadimos el texto al p

  const button = document.createElement("button"); //Creamos un elemento button
  button.innerText = "X"; //Añadimos el texto al button
  button.addEventListener("click", function () { //Cuando se hace click en el button se ejecuta la funcion deleteTodo
    todoList.splice(i, 1); //Eliminamos el todo de la lista
    localStorage.setItem("todos", JSON.stringify(todoList)); //Guardamos la lista en localstorage
    render();
  });
  item.appendChild(checkbox); //Añadimos el checkbox al li
  item.appendChild(text); //Añadimos el texto al li
  item.appendChild(button); //Añadimos el button al li
  todo.appendChild(item); //Añadimos el li al todo
  input.value = null; //Limpiamos el input
  todo.appendChild(item); //Añadimos el li al todo
}
}