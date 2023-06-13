// Creamos las variables del input, del botón, la lista de tareas y los filtros
const inputBox = document.getElementById("inputBox");
const btnSubmit = document.getElementById("btnSubmit");
const taskList = document.getElementById("taskList");
const filterStatusSelect = document.getElementById("filterStatusSelect");
const filterTypeSelect = document.getElementById("filterTypeSelect");

// Crear la lista de tareas como elementos <li>
btnSubmit.addEventListener("click", (e) => {
  e.preventDefault();
  const selectedCategory = document.querySelector('input[name="category"]:checked').value;

  if (inputBox.value === "") {
    alert("Please, you must write any task");
  } else if (!selectedCategory) {
    alert("Please, choose a task category first");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    li.setAttribute("data-category", selectedCategory.toLowerCase()); // Convertimos a minúsculas
    taskList.appendChild(li);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    li.appendChild(deleteButton);

    let editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    li.appendChild(editIcon);

    let categoryText = document.createElement("span");
    categoryText.textContent = selectedCategory;
    categoryText.className = "category";
    categoryText.setAttribute("data-value", selectedCategory.toLowerCase());
    li.appendChild(categoryText);

    // Creando la función para editar la tarea ya creada
    editIcon.addEventListener("click", () => {
      const text = li.textContent.trim();
      const input = document.createElement("input");
      input.type = "text";
      input.value = text;
      li.innerHTML = "";
      li.appendChild(input);
      input.focus();
      input.addEventListener("blur", () => {
        const inputValue = input.value.trim();
        if (inputValue !== "") {
          li.textContent = inputValue;
        } else {
          li.textContent = text;
        }
        li.appendChild(deleteButton);
        li.appendChild(editIcon);
        updateTaskCategory(li); // Actualizar categoría de tarea al guardar edición
        saveTasks();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const inputValue = input.value.trim();
          if (inputValue !== "") {
            li.textContent = inputValue;
          } else {
            li.textContent = text;
          }
          li.appendChild(deleteButton);
          li.appendChild(editIcon);
          updateTaskCategory(li); // Actualizar categoría de tarea al guardar edición
          saveTasks();
        }
      });
    });

    // Crear la función para borrar las tareas ya creadas
    deleteButton.addEventListener("click", () => {
      li.remove();
      saveTasks();
    });

    saveTasks();
  }
  inputBox.value = "";
});

// Creando la función para tachar las tareas ya creadas
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveTasks();
  } else if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    saveTasks();
  }
}, false);

// Añadir evento "change" al selector de filtro por estado
filterStatusSelect.addEventListener("change", () => {
  const selectedStatus = filterStatusSelect.value;
  filterTasksByStatus(selectedStatus);
});

// Filtrar las tareas por estado
function filterTasksByStatus(status) {
  const tasks = taskList.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const isChecked = task.classList.contains("checked");
    const taskCategory = task.getAttribute("data-category");

    if (
      (status === "All") ||
      (status === "Todo" && !isChecked) ||
      (status === "Done" && isChecked)
    ) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
}

// Añadir evento "change" al selector de filtro por tipo
filterTypeSelect.addEventListener("change", () => {
  const selectedType = filterTypeSelect.value;
  filterTasksByType(selectedType);
});

// Filtrar las tareas por tipo
function filterTasksByType(type) {
  const tasks = taskList.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const taskCategory = task.getAttribute("data-category");

    if (type === "all" || taskCategory.toLowerCase() === type.toLowerCase()) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  }
}

// Actualizar la categoría de tarea al guardar la edición
function updateTaskCategory(task) {
  const categoryText = task.querySelector(".category");
  const selectedType = filterTypeSelect.value;
  categoryText.textContent = selectedType;
  categoryText.setAttribute("data-value", selectedType.toLowerCase());
}

// Guardar las tareas en el localStorage
function saveTasks() {
  const tasks = taskList.innerHTML;
  localStorage.setItem("tasks", tasks);
}

// Cargar las tareas desde el localStorage
function loadTasks() {
  if (localStorage.getItem("tasks")) {
    taskList.innerHTML = localStorage.getItem("tasks");
  }
  const tasks = taskList.getElementsByTagName("li");
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "delete";
    task.appendChild(deleteButton);

    const editIcon = document.createElement("i");
    editIcon.className = "fa-solid fa-pen-to-square";
    task.appendChild(editIcon);

    const categoryText = document.createElement("span");
    categoryText.textContent = task.getAttribute("data-category");
    categoryText.className = "category";
    categoryText.setAttribute("data-value", task.getAttribute("data-category"));
    task.appendChild(categoryText);

    editIcon.addEventListener("click", () => {
      const text = task.textContent.trim();
      const input = document.createElement("input");
      input.type = "text";
      input.value = text;
      task.innerHTML = "";
      task.appendChild(input);
      input.focus();
      input.addEventListener("blur", () => {
        const inputValue = input.value.trim();
        if (inputValue !== "") {
          task.textContent = inputValue;
        } else {
          task.textContent = text;
        }
        task.appendChild(deleteButton);
        task.appendChild(editIcon);
        updateTaskCategory(task);
        saveTasks();
      });
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          const inputValue = input.value.trim();
          if (inputValue !== "") {
            task.textContent = inputValue;
          } else {
            task.textContent = text;
          }
          task.appendChild(deleteButton);
          task.appendChild(editIcon);
          updateTaskCategory(task);
          saveTasks();
        }
      });
    });

    deleteButton.addEventListener("click", () => {
      task.remove();
      saveTasks();
    });
  }
}

// Cargar las tareas al cargar la página
loadTasks();

// Filtrar las tareas al cargar la página
filterTasksByStatus(filterStatusSelect.value);
filterTasksByType(filterTypeSelect.value);
