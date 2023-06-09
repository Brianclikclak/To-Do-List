const inputBox = document.getElementById("inputBox");
const btnSubmit = document.getElementById("btnSubmit");
const taskList = document.getElementById("taskList");

btnSubmit.addEventListener("click", (e) =>{
    e.preventDefault()
    if (inputBox.value === "") {
        alert("Please, you must write any task");
    }
    else{
        let li = document.createElement("li")
        li.innerHTML = inputBox.value;
        taskList.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = ""; 
})
